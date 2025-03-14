const User = require("../models/user-model")
const Contact = require("../models/contact-model")


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);

    }
};

//single User Logic
const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 })
        return res.status(200).json(data);

    } catch (error) {
        next(error);

    }
}
//update user-data
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await User.updateOne({ _id: id }, { $set: updatedUserData, });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error)
    }
};

//-------------------


//delete user 
const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id })
        return res.status(200).json({ message: "User Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}

// get AllContact-data
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);


        if (!Contact || Contact.length === 0) {
            return res.status(404).json({ message: "No Contacts found" });
        }
        res.status(200).json(contacts);
    } catch (error) {
        next(error);


    }
}

// delete conatct 
const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id })
        return res.status(200).json({ message: "Conatct Delete Successfully" })
    } catch (error) {
        next(error)
    }
}



module.exports = { getAllUsers, getAllContacts, deleteContactById, deleteUserById, getUserById, updateUserById };