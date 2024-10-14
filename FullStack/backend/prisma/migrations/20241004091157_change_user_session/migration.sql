/*
  Warnings:

  - You are about to drop the column `endTime` on the `UserSession` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `UserSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSession" DROP COLUMN "endTime",
DROP COLUMN "startTime";
