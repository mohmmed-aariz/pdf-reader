/*
  Warnings:

  - Added the required column `totalPages` to the `PdfDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PdfDocument" ADD COLUMN     "pdfPagesUrl" TEXT[],
ADD COLUMN     "totalPages" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PdfPage" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "pageNumber" INTEGER NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "pdfAppUrl" TEXT NOT NULL,
    "pdfKey" TEXT NOT NULL,
    "pdfDocumentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PdfPage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PdfPage" ADD CONSTRAINT "PdfPage_pdfDocumentId_fkey" FOREIGN KEY ("pdfDocumentId") REFERENCES "PdfDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
