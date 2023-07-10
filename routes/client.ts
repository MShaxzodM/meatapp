import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    try {
        req.body.prepaid_date = new Date(req.body.prepaid_date);
        req.body.calculate_date = new Date(req.body.calculate_date);
        const client = await prisma.client.create({ data: req.body });
        res.send(client);
    } catch (err) {
        res.send(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 7;
        const offset = req.query.offset
            ? parseInt(req.query.offset as string)
            : 0;
        const search = req.query.search ? req.query.search : "";
        const clients: any = await prisma.client.findMany({
            where: {
                name: {
                    contains: search as string,
                    mode: "insensitive",
                },
            },
            take: limit,
            skip: offset,
        });
        const count = await prisma.client.count();
        const Clients = await Promise.all(
            clients.map(async (client: any) => {
                const { id } = client;
                const all_sum: any =
                    await prisma.$queryRaw`SELECT SUM(b.quantity * mt.price)::numeric AS total_cost FROM buy b JOIN "MeatType" mt ON b."meatTypeId" = mt.id where b."clientId" = ${id}`;
                const paid_sum: any =
                    await prisma.$queryRaw`select sum(sum)::numeric from payment where "clientId"=${id}`;
                client.debt = all_sum[0].total_cost - paid_sum[0].sum;
                if (client.debt > 0) {
                    client.debt_status = false;
                } else {
                    client.debt_status = true;
                }
                return client;
            })
        );
        res.send({ count, Clients });
    } catch (err) {
        res.send(err);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const client: any = await prisma.client.findUnique({
            include: { orders: {}, buy: {}, payment: {} },
            where: { id: id },
        });
        const all_sum: any =
            await prisma.$queryRaw`SELECT SUM(b.quantity * mt.price)::numeric AS total_cost FROM buy b JOIN "MeatType" mt ON b."meatTypeId" = mt.id where b."clientId" = ${id}`;
        const paid_sum: any =
            await prisma.$queryRaw`select sum(sum)::numeric from payment where "clientId"=${id}`;
        client.debt = all_sum[0].total_cost - paid_sum[0].sum;
        if (client.debt > 0) {
            client.debt_status = false;
        } else {
            client.debt_status = true;
        }

        res.send(client);
    } catch (err) {
        res.send(err);
    }
});
export default router;
