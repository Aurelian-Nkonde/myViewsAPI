-- CreateEnum
CREATE TYPE "SCHEMA"."reactionType" AS ENUM ('LIKE', 'UNLIKE');

-- CreateEnum
CREATE TYPE "SCHEMA"."infoRequestStatus" AS ENUM ('PENDING', 'CLOSED');

-- CreateTable
CREATE TABLE "SCHEMA"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCHEMA"."Post" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCHEMA"."Reaction" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "SCHEMA"."reactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCHEMA"."InfoRequest" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "SCHEMA"."infoRequestStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InfoRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SCHEMA"."Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "read" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "SCHEMA"."User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "SCHEMA"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "SCHEMA"."Post"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_id_key" ON "SCHEMA"."Reaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InfoRequest_id_key" ON "SCHEMA"."InfoRequest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_id_key" ON "SCHEMA"."Notification"("id");
