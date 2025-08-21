import type { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const createParticipante = async (req: Request, res: Response) => {
  try {
    const { nome, email, telefone } = req.body;

    if (!nome || !email || !telefone) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    const existing = await prisma.participante.findFirst({
      where: {
        OR: [
          { nome: nome },
          { email: email }
        ]
      }
    });

    if (existing) {
      return res.status(400).json({ 
        error: "Já existe um participante com esse nome ou email" 
      });
    }

    const participante = await prisma.participante.create({
      data: { nome, email, telefone }
    });

    return res.status(201).json(participante);

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const getParticipantes = async (_req: Request, res: Response) => {
  try {
    const participantes = await prisma.participante.findMany({
      include: { brindes: true }
    });

    return res.json(participantes);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getParticipantesComBrindes = async (_req: Request, res: Response) => {
  try {
    const participantes = await prisma.participante.findMany({
      where: { brindes: { some: {} } }, 
      include: { brindes: true }
    });

    return res.json(participantes);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getParticipantesSemBrindes = async (_req: Request, res: Response) => {
  try {
    const participantes = await prisma.participante.findMany({
      where: { brindes: { none: {} } }, 
      include: { brindes: true }
    });

    return res.json(participantes);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const deleteAllParticipantes = async (_req: Request, res: Response) => {
  try {
    await prisma.participante.deleteMany({});
    return res.json({ message: "Todos os participantes foram deletados com sucesso." });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const deleteParticipanteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const participante = await prisma.participante.findUnique({
      where: { id: Number(id) },
    });

    if (!participante) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }

    await prisma.participante.delete({
      where: { id: Number(id) },
    });

    return res.json({ message: `Participante com ID ${id} deletado com sucesso.` });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
