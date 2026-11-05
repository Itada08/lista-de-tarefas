import { readDb } from "../db.js"

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
        const erro = new Error('Tasks não encontrada');
        erro.status = 404;
        throw erro;
    }
    return task;
}

