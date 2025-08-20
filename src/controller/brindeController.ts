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
