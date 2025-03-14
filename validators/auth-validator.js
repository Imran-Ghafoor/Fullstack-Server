const { z } = require("zod");


const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(255, { message: "password must be greater than 1024 characters" }),
    password: z
        .string({ required_error: "password is equired" })
        .trim()
        .min(7, { message: "password must be at least of 6 characters" })
        .max(1024, { message: "password must be greater than 1024 charachters" })
});
// create an object schema
const signupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "username is required" })
        .trim()
        .min(3, { message: "Name must be at least of 3 characters" })
        .max(255, { message: "Name must not be more than 255 charachters" }),
    email: z
        .string({ required_error: "email is equired" })
        .trim()
        .email({ message: "Invalid email adress" })
        .min(3, { message: "email must be at least of 3 characters" })
        .max(255, { message: "Email must not be more than 255 charachters" }),
    phone: z
        .string({ required_error: "Phone is equired" })
        .trim()
        .min(11, { message: "phone must be at least of 11 characters" })
        .max(20, { message: "phone must not be more than 20 charachters" }),
    password: z
        .string({ required_error: "password is equired" })
        .trim()
        .min(7, { message: "password must be at least of 7 characters" })
        .max(1024, { message: "password must not be more than 1024 charachters" })
});

module.exports = { signupSchema, loginSchema };