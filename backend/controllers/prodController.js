const prisma = require("../config/prisma");
const { deleteFromCloud } = require("../utils/cloudinary");

exports.getAllProducts = async (req, res) => {
  const categoryId = req.query.categoryId
    ? parseInt(req.query.categoryId)
    : undefined;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * 10;
  const search = req.query.serach || "";

  const minPrice = req.query.minPrice
    ? parseFloat(req.query.minPrice)
    : undefined;
  const maxPrice = req.query.maxPrice
    ? parseFloat(req.query.maxPrice)
    : undefined;
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order === "asc" ? "asc" : "desc";

  const whereClause = {
    AND: [
      categoryId ? { categoryId } : {},
      minPrice !==undefined || maxPrice !==undefined
      ?{
        price:{
          ...(minPrice !==undefined && {gte: minPrice}),
          ...(maxPrice !==undefined && {lte: maxPrice})
        }
      }:{},
      {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    ],
  };

  try {
    const product = await prisma.product.findMany({
      skip,
      take: limit,
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: { [sortBy]: order },
    });

    const totalProduct = await prisma.product.count({
      where: whereClause,
    });

    res.status(200).json({
      success: true,
      product,
      limit,
      page,
      totalProduct,
      totalPages: Math.ceil(totalProduct / limit),
    });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: "Internal Server Error!", details: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;
  const files = req.files;
  console.log(files)
  
  try {

       if (!files || files.length === 0){
        return res.status(400).json({ error: "No files uploaded" });
       }

    const imageUrls = files.map((file)=>file.path)
      
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        images:imageUrls,
        stock: parseInt(stock),
        categoryId:parseInt(categoryId),
      },
    });

    res.status(201).json({
      success: true,
      msg: "Product created successfully!",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error!", details: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error!", details: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, stock } = req.body;
  const data = {};

  if (name !== undefined) data.name = name;
  if (description !== undefined) data.description = description;
  if (price !== undefined) data.price = parseFloat(price);
  if (image !== undefined) data.image = image;
  if (stock !== undefined) data.stock = parseInt(stock);

  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error!", details: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product  = await prisma.product.findUnique({
      where:{id:parseInt(id)}
    })
    if (!product) return res.status(404).json({ error: "Product not found" });

    await Promise.all(product.images.map((url)=>deleteFromCloud(url)))

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.status(201).json({
      success: true,
      msg: "Product deleted successfully!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error!", details: error.message });
  }
};






// exports.updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price, stock, categoryId, oldImagesToKeep = "[]" } = req.body;

//   const files = req.files || [];

//   try {
//     // Parse kept images from JSON string
//     const keepImages = JSON.parse(oldImagesToKeep); // array of URLs

//     const product = await prisma.product.findUnique({
//       where: { id: parseInt(id) },
//     });

//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     // Delete unwanted images from Cloudinary
//     const imagesToDelete = product.images.filter(img => !keepImages.includes(img));
//     await Promise.all(imagesToDelete.map(url => deleteFromCloudinary(url)));

//     // Upload new images (Cloudinary stores URLs in file.path)
//     const newImageUrls = files.map(file => file.path);

//     const updatedProduct = await prisma.product.update({
//       where: { id: parseInt(id) },
//       data: {
//         name,
//         description,
//         price: parseFloat(price),
//         stock: parseInt(stock),
//         categoryId: parseInt(categoryId),
//         images: [...keepImages, ...newImageUrls], // merge old (kept) + new
//       },
//     });

//     res.status(200).json({
//       success: true,
//       msg: "Product updated successfully!",
//       product: updatedProduct,
//     });
//   } catch (error) {
//     console.error("Update Product Error:", error);
//     res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// };