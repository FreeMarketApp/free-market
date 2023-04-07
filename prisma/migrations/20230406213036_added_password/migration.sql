-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "createddate" TIMESTAMP(6) NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
