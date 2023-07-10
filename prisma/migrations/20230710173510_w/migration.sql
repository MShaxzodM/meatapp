-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sum" INTEGER NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buy" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meatTypeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "buy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buy" ADD CONSTRAINT "buy_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buy" ADD CONSTRAINT "buy_meatTypeId_fkey" FOREIGN KEY ("meatTypeId") REFERENCES "MeatType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
