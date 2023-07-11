import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    try {
        req.body.date = new Date(req.body.date);
        req.body.meatTypeId = parseInt(req.body.meatTypeId);
        req.body.clientId = parseInt(req.body.clientId);
        const order = await prisma.order.create({ data: req.body });
        res.send(order);
    } catch (err) {
        res.send("Cant create orders");
    }
});

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 7;
        const offset = req.query.offset
            ? parseInt(req.query.offset as string)
            : 0;
        const search = req.query.search ? req.query.search : "";
        const orders: any = await prisma.order.findMany({
            include: {
                client: {},
            },

            take: limit,
            skip: offset,
        });
        res.send(orders);
    } catch (err) {
        res.send(err);
    }
});

router.put("/", async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        req.body.date = req.body.ate ? new Date(req.body.date) : undefined;
        req.body.meatTypeId = req.body.meatTypeId
            ? parseInt(req.body.meatTypeId)
            : undefined;
        req.body.clientId = req.body.clientId
            ? parseInt(req.body.clientId)
            : undefined;
        const order = await prisma.order.update({
            data: req.body,
            where: { id: id },
        });
        res.send(order);
    } catch (err) {
        res.send("Cant update order");
    }
});

router.delete("/", async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        const deleted = await prisma.order.delete({ where: { id: id } });
        res.send(deleted);
    } catch (err) {
        res.send("cant delete");
    }
});
export default router;
