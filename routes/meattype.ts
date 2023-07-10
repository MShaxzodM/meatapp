import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    try {
        const meattype = await prisma.meatType.create({ data: req.body });
        res.send(meattype);
    } catch (err) {
        res.send(err);
    }
});
router.put("/", async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        const updated = await prisma.meatType.update({
            data: req.body,
            where: { id: id },
        });
        res.send(updated);
    } catch (err) {
        res.send(err);
    }
});

router.delete("/", async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        const deleted = await prisma.meatType.delete({
            where: {
                id: id,
            },
        });
        res.send(deleted);
    } catch {
        res.send("Not deleted");
    }
});
router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 7;
        const offset = req.query.offset
            ? parseInt(req.query.offset as string)
            : 0;
        const search = req.query.search ? req.query.search : "";
        const meattypes: any = await prisma.meatType.findMany({
            where: {
                name: {
                    contains: search as string,
                    mode: "insensitive",
                },
            },
            take: limit,
            skip: offset,
        });
        res.send(meattypes);
    } catch (err) {
        res.send(err);
    }
});

export default router;
