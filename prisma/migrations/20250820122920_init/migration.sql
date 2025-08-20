-- CreateTable
CREATE TABLE "Participante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jaGanhou" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Brinde" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "_BrindeToParticipante" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BrindeToParticipante_A_fkey" FOREIGN KEY ("A") REFERENCES "Brinde" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BrindeToParticipante_B_fkey" FOREIGN KEY ("B") REFERENCES "Participante" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Participante_email_key" ON "Participante"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_BrindeToParticipante_AB_unique" ON "_BrindeToParticipante"("A", "B");

-- CreateIndex
CREATE INDEX "_BrindeToParticipante_B_index" ON "_BrindeToParticipante"("B");
