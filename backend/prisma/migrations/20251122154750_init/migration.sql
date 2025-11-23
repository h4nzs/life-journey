-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokoh_utama" (
    "id" TEXT NOT NULL,
    "tekad" TEXT,
    "keimanan" TEXT,
    "kondisi_jiwa" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokoh_utama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tujuan" (
    "id" TEXT NOT NULL,
    "jenis_tujuan" TEXT NOT NULL,
    "hasil" TEXT,
    "tokohId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tujuan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perjalanan" (
    "id" TEXT NOT NULL,
    "arah" TEXT NOT NULL,
    "ketahanan" TEXT,
    "tujuanId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perjalanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rintangan" (
    "id" TEXT NOT NULL,
    "jenis_rintangan" TEXT NOT NULL,
    "perjalananId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rintangan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emosi" (
    "id" TEXT NOT NULL,
    "jenis_emosi" TEXT NOT NULL,
    "rintanganId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emosi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tokoh_utama_userId_key" ON "tokoh_utama"("userId");

-- AddForeignKey
ALTER TABLE "tokoh_utama" ADD CONSTRAINT "tokoh_utama_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tujuan" ADD CONSTRAINT "tujuan_tokohId_fkey" FOREIGN KEY ("tokohId") REFERENCES "tokoh_utama"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perjalanan" ADD CONSTRAINT "perjalanan_tujuanId_fkey" FOREIGN KEY ("tujuanId") REFERENCES "tujuan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rintangan" ADD CONSTRAINT "rintangan_perjalananId_fkey" FOREIGN KEY ("perjalananId") REFERENCES "perjalanan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emosi" ADD CONSTRAINT "emosi_rintanganId_fkey" FOREIGN KEY ("rintanganId") REFERENCES "rintangan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
