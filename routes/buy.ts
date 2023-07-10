import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    try {
        req.body.date = new Date(req.body.date);
        const buy = await prisma.buy.create({ data: req.body });
        res.send(buy);
    } catch (err) {
        res.send(err);
    }
});
export default router;
