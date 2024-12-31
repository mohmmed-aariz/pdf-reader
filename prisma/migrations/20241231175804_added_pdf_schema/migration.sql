-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'GUEST';

-- CreateTable
CREATE TABLE "PdfDocument" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "pdfUrl" TEXT NOT NULL,
    "pdfKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER,

    CONSTRAINT "PdfDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PdfDocument" ADD CONSTRAINT "PdfDocument_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
