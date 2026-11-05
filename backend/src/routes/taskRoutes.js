import { Router } from 'express';

import { atualizarTask, buscarTask, criarTask, listarTasks, removerTask } from "../controllers/taskController.js"

import validar from '../middlewares/validar.js';

import { taskSchema, atualizarTaskSchema } from "../schemas/taskSchema.js"

const router = Router();

router.get('/', listarTasks);
router.get('/:id', buscarTask);
router.post('/', validar(taskSchema), criarTask);
router.put('/:id', validar(atualizarTaskSchema), atualizarTask);
router.delete('/:id', removerTask);

export default router;