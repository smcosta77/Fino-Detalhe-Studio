/*
  Warnings:

  - You are about to drop the `_AppointmentToProfessional` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Professional` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."_AppointmentToProfessional" DROP CONSTRAINT "_AppointmentToProfessional_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AppointmentToProfessional" DROP CONSTRAINT "_AppointmentToProfessional_B_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "professionalId" TEXT;

-- DropTable
DROP TABLE "public"."_AppointmentToProfessional";

-- CreateIndex
CREATE INDEX "Appointment_appointmentDate_idx" ON "Appointment"("appointmentDate");

-- CreateIndex
CREATE INDEX "Appointment_professionalId_appointmentDate_idx" ON "Appointment"("professionalId", "appointmentDate");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_name_key" ON "Professional"("name");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE SET NULL ON UPDATE CASCADE;
