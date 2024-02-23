const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

const userController = {
    register: async (req, res) => {
        try {
            console.log("start");
            const { fullname, email, password, confirmPassword, role, gender, profilePicture, phoneNumber, } = req.body;

            if (!fullname || !email || !password || !confirmPassword || !gender || !phoneNumber) {
                return res.status(403).send({
                    success: false,
                    message: "All Fields are required",
                });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Password and Confirm Password do not match. Please try again.",
                });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists. Please sign in to continue.",
                });
            }

            let newProfilePicture = profilePicture;
            if (!profilePicture) newProfilePicture = `https://api.dicebear.com/5.x/initials/svg?seed=${fullname}`;

            const newUser = new User({
                fullname,
                email,
                password,
                role,
                gender,
                profilePicture: newProfilePicture,
                phoneNumber,
            });

            const user = await newUser.save();

            const token = user.getJwtToken();

            res.cookie("token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400), // 1 day
                sameSite: "none",
                secure: true,
            });

            res.status(200).json({
                success: true,
                msg: "Registered Successfully",
                token,
                user,
            });
        } catch (err) {
            console.log("error");
            return res.status(500).json({ msg: err.message });
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;

            const user = await User.findById(req.user.id);

            const isMatch = await user.comparePassword(oldPassword);

            if (!isMatch) {
                return res.status(400).json({ msg: "Your password is wrong." });
            }

            user.password = newPassword;
            await user.save();

            res.status(200).json({ success: true, msg: "Password updated successfully." })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    Login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Please Fill All the Required Fields",
                });
            }

            const user = await User.findOne({ email });
            // console.log(user);

            if (!user) {
                return res.status(400).json({ msg: "Email or Password is incorrect." });
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return res.status(400).json({ msg: "Email or Password is incorrect." });
            }

            const token = user.getJwtToken();

            res.cookie("token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400), // 1 day
                sameSite: "none",
                secure: true,
            });

            res.json({
                success: true,
                msg: "Logged in Successfully!",
                token,
                user: {
                    ...user._doc,
                    password: "",
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie("token", { path: "/" });
            return res.status(200).json({ message: "Logout Successfully" });;
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // forgotPassword: async (req, res) => {
    //     const { email } = req.body;

    //     try {
    //         const user = await User.findOne({ email });

    //         if (!user) {
    //             return res.status(401).json({ message: "user not exist" });
    //         }

    //         const token = user.createAccessToken();
    //         console.log(token);

    //         const url = `${process.env.FRONTEND_PORT}/ResetPassword/${token}/`;

    //         const message = `
    //         <h1>You have requested a password reset</h1>
    //         <p>Please make a put request to the following link:</p>
    //         <a href=${url} clicktracking=off>${url}</a>
    //         `;
    //         // console.log(user.email);
    //         // console.log(message);

    //         await sendEmail(
    //             {
    //                 to: user.email,
    //                 subject: "Password Reset Request",
    //                 text: message,
    //             });
    //         console.log("end");
    //         res.status(200).json({ message: "Kindly check your email for further instructions" });
    //     } catch (error) {
    //         res.send(error);
    //     }
    // },

    // resetPassword: async (req, res) => {
    //     const { token } = req.params;
    //     const { password, confirmPassword } = req.body;

    //     try {
    //         if (password !== confirmPassword) {
    //             return res.status(401).json({
    //                 message: "Password Mismatch",
    //             });
    //         }
    //         let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    //         const { id } = decoded;
    //         const user = await User.findById(id);

    //         if (!user) {
    //             return res.json({ message: "invalid user" });
    //         }
    //         user.password = password;
    //         await user.save();
    //         res.status(200).json({ message: "Password Reset" });
    //     } catch (error) {
    //         res.status(400).json({
    //             message: "Password reset token is invalid or has expired.",
    //         });
    //     }
    // },
};

module.exports = userController;