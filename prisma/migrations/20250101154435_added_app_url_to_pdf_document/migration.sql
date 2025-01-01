/*
  Warnings:

  - Added the required column `pdfAppUrl` to the `PdfDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `PdfDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PdfDocument" ADD COLUMN     "pdfAppUrl" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;
