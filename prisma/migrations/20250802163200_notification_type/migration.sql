/*
  Warnings:

  - Changed the type of `type` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SCHEMA"."notificationType" AS ENUM ('INFO_REQUEST_NOTIFICATION', 'INFO_REQUEST_NOTIFICATION_CLOSED');

-- AlterTable
ALTER TABLE "SCHEMA"."Notification" DROP COLUMN "type",
ADD COLUMN     "type" "SCHEMA"."notificationType" NOT NULL;
