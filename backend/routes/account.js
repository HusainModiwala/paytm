import { Router } from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { Account } from "../db/db.js";
import { startSession } from "mongoose";

const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    try {
        const accountDetails = await Account.findOne({userId: req.userId});
        if(!accountDetails) return res.status(401).json({message: "Unauthorized request."});

        return res.status(200).json({balance: accountDetails.balance});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const { to, amount } = req.body;
    if(!to || !amount) return res.status(400).json({message: "Enter correct info for transaction."});
    let finalAmount = parseInt(amount);

    try {
        const session = await startSession();

        session.startTransaction();

        const accountDetailsSender = await Account.findOne({userId: req.userId}).session(session);
        console.log(req.userId);
        const accountDetailsReceiver = await Account.findOne({userId: to}).session(session);
        console.log(accountDetailsReceiver);

        if(!accountDetailsSender || !accountDetailsReceiver) return res.status(400).json({message: "Invalid sender/receiver account."});
        if(accountDetailsSender.balance < finalAmount) return res.status(400).json({message: "Insufficient balance."});

        await Account.updateOne({userId: req.userId}, {$inc: {balance: -finalAmount}}).session(session);
        await Account.updateOne({userId: to}, {$inc: {balance: finalAmount}}).session(session);

        session.commitTransaction();

        return res.status(200).json({message: "Transfer successful"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

export default accountRouter;