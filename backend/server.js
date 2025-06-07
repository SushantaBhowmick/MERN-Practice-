const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors')

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*', credentials: true }));
app.use((req, res, next) => {
    console.log("requrl",req.originalUrl)
  if (req.originalUrl === "/api/payment/webhook") {
    next(); // skip parsing body for webhook
  } else {
    express.json()(req, res, next);
  }
});
app.use("/uploads",express.static("uploads"))


app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        msg:"Welcome to react practice"
    })
})

// routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const prodRoutes = require('./routes/produRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/task',taskRoutes)
app.use('/api/product',prodRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/payment',paymentRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})