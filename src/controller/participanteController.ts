import type { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const createParticipante = async (req: Request, res: Response) => {
  try {
    const { nome, email, telefone } = req.body;

    const participante = await prisma.participante.create({
      data: { nome, email, telefone }
    });

    return res.status(201).json(participante);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
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
