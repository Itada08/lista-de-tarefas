import { z } from 'zod';

export const taskSchema = z.object({
    titulo: z.string().trim().min(1, 'Título é obrigatório'),
    descricao: z.string().optional(),
});

export const atualizarTaskSchema = z.object({
    titulo: z.string().trim().min(1, 'Título não pode ser vazio').optional(),
    descricao: z.string().optional(),
    concluida: z.boolean().optional(),
});