const User = require("../models/user-model");



const home = async (req, res) => {
    try {
        res.send("Hello from auth-controller")

    } catch (error) {
        console.log(error);

    }
};

const register = async (req, res, next) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "email already exist" })
        }

        const userCreated = await User.create({ username, email, phone, password });
        res.status(201).json({
            msg: " Registration Successfull",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });

    } catch (error) {
        // res.status(500).json("internal server error ")
        next(error)

    }
}

// User Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credential" });
        }

        // const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);

        if (user) {
            res.status(200).json({
                msg: " Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            });
        } else {
            res.status(401).josn({ message: "Invalid email or password" })
        }
    } catch (error) {
        res.status(500).json("interval server error ")

    }
};

// to send user data
const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });

    } catch (error) {
        console.log(`error from the user routr${error}`);


    }
}

module.exports = { home, register, login, user };

