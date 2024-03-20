/*
  Warnings:

  - Added the required column `is_mapped` to the `Endpoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Endpoint" ADD COLUMN     "is_mapped" BOOLEAN NOT NULL;
