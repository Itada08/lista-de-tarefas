import { readDb, writeDb } from "../db.js"

import { criarTask } from "../models/taskModel.js"

function tarefaNaoEncontrada() {
    const erro = new Error('Tarefa não encontrada');
    erro.status = 404;
    return erro;
}

export async function listarTasks(status) {
    const tasks = await readDb()

    if (status === "concluidas") {
        const task = tasks.filter((t) => t.concluida === true);
        return task;
    } else if (status === "pendentes") {
        const task = tasks.filter((t) => t.concluida === false);
        return task;
    } else {
        const task = tasks
        return task;
    }

}

export async function buscarTask(id) {
    const tasks = await readDb();
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        throw tarefaNaoEncontrada()
    }
    return task;
}

export async function criarNovaTask(dados) {
    const tasks = await readDb()

    const ids = tasks.map((t) => t.id);
    const proximoId = Math.max(0, ...ids) + 1;

    const task = criarTask(dados, proximoId)

    tasks.push(task)
    await writeDb(tasks)

    return task
}

export async function atualizarTask(id, dados) {
    const tasks = await readDb()

    const indice = tasks.findIndex((t) => t.id === id)

    if (indice === -1) {
        throw tarefaNaoEncontrada()
    }

    tasks[indice] = { ...tasks[indice], ...dados, id: id, criadaEm: tasks[indice].criadaEm }

    await writeDb(tasks)

    return tasks[indice]
}

export async function removerTask(id) {
    const tasks = await readDb()

    const indice = tasks.findIndex((t) => t.id === id)

    if (indice === -1) {
        throw tarefaNaoEncontrada()
    }

    tasks.splice(indice, 1)
    await writeDb(tasks)
}