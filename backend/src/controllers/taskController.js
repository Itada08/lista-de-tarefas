import * as taskService from "../services/taskService.js"

export async function listarTasks(req, res, next) {
    try {
        const tasks = await taskService.listarTasks(req.query.status);
        res.status(200).json(tasks);
    } catch (erro) {
        next(erro);
    }
}

export async function buscarTask(req, res, next) {
    try {
        const task = await taskService.buscarTask(Number(req.params.id));
        res.status(200).json(task);
    } catch (erro) {
        next(erro);
    }
}

export async function criarTask(req, res, next) {
    try {
        const task = await taskService.criarNovaTask(req.body);
        res.status(201).json(task);
    } catch (erro) {
        next(erro);
    }
}

export async function atualizarTask(req, res, next) {
    try {
        const task = await taskService.atualizarTask(Number(req.params.id), req.body);
        res.status(200).json(task);
    } catch (erro) {
        next(erro);
    }
}

export async function removerTask(req, res, next) {
    try {
        await taskService.removerTask(Number(req.params.id));
        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

