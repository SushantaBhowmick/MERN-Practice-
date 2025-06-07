const prisma = require("../config/prisma");

exports.createOrder = async (req, res) => {
  const { userId } = req.user;
  const {address}=req.body;
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
        data:{
            userId,
            total:totalAmount,
            status:"pending",
            address,
            items:{
                create:cart.items.map((item)=>({
                    productId:item.productId,
                    quantity:item.quantity,
                    price:item.product.price
                }))
            }
        }
    })

    await prisma.cartItem.deleteMany({where:{cartId:cart.id}});

     res.status(201).json({ success: true, message: "Order placed", order });
  } catch (error) {
    console.error("Create Order Failed:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
