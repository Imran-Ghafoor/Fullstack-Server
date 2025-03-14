require('dotenv').config();
const express = require("express");
const cors = require("cors")
const app = express();
const authRoute = require("./router/auth-router")
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const port = 4000;
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

//handling cors policy issue
const corsOptions = {
    origin: "http://localhost:5173",
    method: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
// admin route
app.use("/api/admin", adminRoute);


app.use(errorMiddleware);

// app.get("/", (req, res) => {
//     res.status(200).send("Hello Imran")
// })

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
