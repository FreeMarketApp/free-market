-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "createddate" TIMESTAMP(6) NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "seller" BOOLEAN NOT NULL,
    "profile_img" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_store" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "id" SERIAL NOT NULL,
    "user_store_id" INTEGER NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_price" TEXT NOT NULL,
    "item_photo" TEXT NOT NULL,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_store_user_id_key" ON "user_store"("user_id");

-- AddForeignKey
ALTER TABLE "user_store" ADD CONSTRAINT "user_store_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_user_store_id_fkey" FOREIGN KEY ("user_store_id") REFERENCES "user_store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
