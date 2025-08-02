/*
  Warnings:

  - Changed the type of `read` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SCHEMA"."Notification" DROP COLUMN "read",
ADD COLUMN     "read" BOOLEAN NOT NULL;
