const Stripe = require("stripe");
const prisma = require("../config/prisma");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { userId } = req.user;
  const { address } = req.body;

  if (!address)
    return res.status(400).json({ error: "Shipping address is required" });

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const line_items = cart.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.CLIENT_URL}/success?session_id=CHECKOUT_SESSION_ID`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        userId: String(userId),
        address: JSON.stringify(address),
        company: "Practice-Session",
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.webhookCall = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    console.error("❌ Webhook verification failed:", error.message);
    return res.status(400).json({ Webhook_Error: error.message });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata;

    if (!metadata || !metadata.userId) {
      return res.status(400).json({ error: "Missing metadata for order." });
    }

    const userId = parseInt(metadata.userId);
    const address = metadata.address;

    const cart = await prisma.cart.findUnique({
      where: { userId: Number(userId) },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const orderItemsData = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const total = cart.items.reduce((sum,curr)=>sum+curr.product.price*curr.quantity,0)

    // create order
    await prisma.order.create({
      data: {
        userId: Number(userId),
        address,
        status: "pending",
        paymentStatus: session.payment_status,
        paymentId: session.payment_intent,
        total,
        items: {
          create: orderItemsData,
        },
      },
    });

    // clear the cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    console.log("✅ Order successfully created:");
    res.status(200).json({ received: true });
  }
};
