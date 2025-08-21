import type { Express, Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';


const prisma = new PrismaClient();

export const createBrinde = async (req: Request, res: Response) => {
  try {
    const { nome } = req.body;

    const brinde = await prisma.brinde.create({
      data: { nome }
    });

    return res.status(201).json(brinde);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getBrindes = async (_req: Request, res: Response) => {
  try {
    const brindes = await prisma.brinde.findMany({
      include: { participantes: true }
    });

    return res.json(brindes);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBrinde = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const brinde = await prisma.brinde.findUnique({
      where: { id: Number(id) },
    });

    if (!brinde) {
      return res.status(404).json({ error: 'Brinde não encontrado' });
    }

    await prisma.brinde.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: 'Brinde apagado com sucesso' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
