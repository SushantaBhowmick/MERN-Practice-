const prisma = require("../config/prisma");

exports.geteUserProfile = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      // include:{
      //     tasks:true,
      // },
    });
    if (user) {
      delete user.password;
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
exports.getUserTasks = async (req, res, next) => {
  const { userId } = req.user;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const tasks = await prisma.task.findMany({
      skip,
      take: limit,
      where: { userId },
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
    const totalTask = await prisma.task.count({
      where: { userId },
    });
    return res.status(200).json({
      success: true,
      tasks,
      page,
      limit,
      totalTask,
      totalPages: Math.ceil(totalTask / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
exports.updateProfile = async (req, res, next) => {
  const { userId } = req.user;
  const { name, email, role } = req.body;
  const updateData = {};

  if (name !== undefined) updateData.name = name;
  if (email !== undefined) updateData.email = email;
  if (role !== undefined) updateData.role = role;

  try {
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: updateData,
    });
    return res.status(200).json({
      user,
      success: true,
      msg: "User Updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
