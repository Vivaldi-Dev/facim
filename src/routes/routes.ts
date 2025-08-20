import { Router } from "express";

import { darPremio } from "../controller/premioController";
import { createBrinde, getBrindes } from "../controller/brindeController";
import { createParticipante, getParticipantes, getParticipantesComBrindes, getParticipantesSemBrindes } from "../controller/participanteController";


const router = Router();

router.post("/participantes", createParticipante);
router.get("/participantes", getParticipantes);
router.get('/participantes/with', getParticipantesComBrindes);
router.get('/participantes/without', getParticipantesSemBrindes);

router.post("/brindes", createBrinde);
router.get("/brindes", getBrindes);

router.post("/premios", darPremio);

export default router;
