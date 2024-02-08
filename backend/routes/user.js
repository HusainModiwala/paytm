import { Router } from "express";
import zod from "zod";
import { User, Account } from "../db/db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../middleware/middleware.js";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const{ username, firstName, lastName, password } = req.body;

    const signupBody = zod.object({
        username: zod.string().email(),
        firstName: zod.string(),
        lastName: zod.string(),
        password: zod.string()
    })

    const success = signupBody.safeParse(req.body);
    if(!success) return res.status(400).json({message: "Invalid inputs."});

    const user = await User.findOne({username});
    if(user) return res.status(409).json({message: "User already exists."});

    const createdUser = await User.create({firstName, lastName, username, password});
    const token = jwt.sign({id: createdUser._id}, JWT_SECRET);

    const balance = Math.floor(Math.random() * 10000) + 1;
    await Account.create({userId: createdUser._id, balance});

    return res.status(200).json({message: "User created successfully", token});
})

userRouter.post("/signin", async(req, res) => {
    const signinBody = zod.object({
        username: zod.string().email(),
        password: zod.string()
    })
    const success = signinBody.safeParse(req.body);
    if(!success) return res.status(400).json({message: "Invalid inputs."});

    const {username, password} = req.body;
    const user = await User.findOne({$and: [{username}, {password}]});

    if(!user) return res.status(411).json({message: "Error while logging in"});
    console.log("user", user);
    const token = jwt.sign({id: user._id}, JWT_SECRET);
    return res.status(200).json({token});
})

userRouter.put("/", authMiddleware, async(req, res) => {
    const updateBody = zod.object({
        firstName: zod.string().optional(),
        lastName: zod.string().optional(),
        password: zod.string().minLength(8).optional()
    })

    const result = updateBody.safeParse(req.body);
    if(!result.success) return res.status(411).json({message: "Error while updating information"});

    const user = await User.findByIdAndUpdate(req.userId, {$set: result.data}, {new: true});
    if(!user) return res.status(411).json({message: "Error while updating information"});

    return res.status(200).json({message: "Updated successfully"});
})

userRouter.get("/bulk", async (req, res) => {
    const filterName = req.query["filter"] ?? "";

    const users = await User.find(
        {
            $or: [
                {firstName: {"$regex": filterName}},
                {lastName: {"$regex": filterName}}
            ]
        }
    )
    .select("-password");
    if(!users) return res.status(404).json({message: "User not found"});

    return res.status(200).json(users);
})

userRouter.get('/me', authMiddleware, async(req, res)=>{
    res.json("Authenticated");
})
export default userRouter;

