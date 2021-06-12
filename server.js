const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");

const URI = 'mongodb+srv://admin_khunchay:admin1234@cluster0.sspfa.mongodb.net/social?retryWrites=true&w=majority'

const connectDB = async () => {
   await mongoose.connect(URI, 
        {useNewUrlParser: true, useUnifiedTopology: true },
        ()=> {
            console.log("connceted to MongoDB")
        }
    );
}

//midelware
app.use(express.json())
app.use(helmet());
app.use(morgan("common"))


app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)

connectDB()

app.listen(8800,()=>{
    console.log("backennd server is running!")
})