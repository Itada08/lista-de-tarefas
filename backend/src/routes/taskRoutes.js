import { Router } from 'express';

import { atualizarTask, buscarTask, criarTask, listarTasks, removerTask } from "../controllers/taskController.js"

const router = Router();

router.get('/', listarTasks);
router.get('/:id', buscarTask);
router.post('/', criarTask);
router.put('/:id', atualizarTask);
router.delete('/:id', removerTask);

export default router;