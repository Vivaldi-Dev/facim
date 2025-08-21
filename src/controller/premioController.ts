import type { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const darPremio = async (req: Request, res: Response) => {
  try {
    const { participanteId, brindeIds } = req.body; 

    const participante = await prisma.participante.update({
      where: { id: participanteId },
      data: {
        jaGanhou: true,
        brindes: {
          connect: brindeIds.map((id: number) => ({ id }))
        }
      },
      include: { brindes: true }
    });

    return res.json(participante);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
