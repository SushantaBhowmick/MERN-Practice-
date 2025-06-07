const prisma = require("../config/prisma");

exports.addToCart = async (req, res) => {
  const { userId } = req.user;
  const { productId, quantity = 1 } = req.body;

  try {
    let cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    let item;
    if (existingItem) {
      item = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      item = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      item,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.user;

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
    // console.log(cart)

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        success: true,
        cartItems: [],
        message: "Cart is empty",
      });
    }

    res.status(200).json({
      success: true,
      cartItems: cart.items,
    });
  } catch (error) {
    console.log("error",error)
    res.status(500).json({
      error: "Failed to fetch cart",
      details: error.message,
    });
  }
};

exports.updateCartItem = async (req, res) => {
  const { userId } = req.user;
  const cartItemId = parseInt(req.params.id);
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: "Quantity must be at least 1" });
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem || cartItem.cartId !== cart.id) {
      return res.status(403).json({ error: "Unauthorized or item not found" });
    }

    const updateItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    res.status(200).json({
      success: true,
      message: "Cart item quantity updated",
      cartItem: updateItem,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update cart",
      details: error.message,
    });
  }
};

exports.deleteCartItem = async (req, res) => {
  const { userId } = req.user;
  const cartItemId = parseInt(req.params.id);

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem || cartItem.cartId !== cart.id) {
      return res.status(403).json({ error: "Unauthorized or item not found" });
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete cart item",
      details: error.message,
    });
  }
};

exports.clearCart = async (req, res) => {
  const { userId } = req.user;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete cart item",
      details: error.message,
    });
  }
};
