// const {Pool} = require('pg')

// const pool = new Pool({
//     connectionString:process.env.DATABASE_URL,
// });

// module.exports=pool;

const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();


module.exports = prisma;
