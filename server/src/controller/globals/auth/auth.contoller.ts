import { Request, Response } from "express";
import User from "../../../model/user.model";
import bcrypt from 'bcrypt'
import { bytes } from "node:stream/consumers";

class Authcontroller {
    static registerUser = async (req: Request, res: Response) => {
        try {
            const { username, password, email } = req.body
            if (!username || !password || !email) {
                res.status(400).json({
                    message: "Please provide username, password, email"
                })
                return
            }

            await User.create({
                username: username,
                password: bcrypt.hashSync(password, 12),
                email: email,
            })

            res.status(200).json({
                message: "User registered successfully"
            })
        } catch (error) {
            console.error("Register user error:", error)
            res.status(500).json({
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            })
        }
    }

    static loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({
                message: "Please provide email,password"
            })
            return
        }
        const data = await User.findAll({
            where: {
                email
            }
        })
        if (data.length == 0) {
            res.status(404).json({
                message: "Not registered"
            })

        } else {
            //check password,
            const isPasswordValid = bcrypt.compareSync(password, data[0].password)
            if (isPasswordValid) {
                //sucessfully login
            }
            else {
                res.status(403).json({
                    message: "Invalid email or password"
                })
            }


        }

    }
}


export default Authcontroller;