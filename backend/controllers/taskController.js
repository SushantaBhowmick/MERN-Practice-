const prisma = require("../config/prisma");

exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const { userId } = req.user;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        userId,
      },
    });
    res.status(201).json({
      success: true,
      msg: "Task created successfully!",
      task,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error creating task", details: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  const { userId } = req.user;

  // console.log("called")

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search || "";
  
  try {
    const tasks = await prisma.task.findMany({
      skip,
      take:limit,
      where:{
        OR:[
          {
            title:{
              contains:search,
              mode:"insensitive"
            },
          },
          {
            description:{
              contains:search,
              mode:'insensitive'
            }
          }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    const totalTask = await prisma.task.count({
      where:{
        OR:[
          {
            title:{
              contains:search,
              mode:"insensitive"
            }
          },
          {
            description:{
              contains:search,
              mode:"insensitive"
            }
          },
        ]
      }
    });
    res.status(200).json({
      success: true,
      tasks,
      limit,
      page,
      totalTask,
      totalPages:Math.ceil(totalTask/limit)
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating task", details: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const task = await prisma.task.findFirst({
      where: { id: parseInt(id), userId },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating task", details: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { title, description, dueDate, status } = req.body;

  try {
    const task = await prisma.task.updateMany({
      where: { id: parseInt(id), userId },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status,
      },
    });
    if (task.count === 0)
      return res.status(404).json({ error: "Task not found or unauthorized" });
    res.status(200).json({
      success: true,
      task,
      msg: "Task updated",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating task", details: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const task = await prisma.task.deleteMany({
      where: { id: parseInt(id), userId },
    });
    if (task.count === 0)
      return res.status(404).json({ error: "Task not found or unauthorized" });
    res.status(200).json({
      success: true,
      msg: "Task deleted",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating task", details: error.message });
  }
};
