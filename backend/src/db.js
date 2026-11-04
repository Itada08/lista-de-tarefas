import fs from 'fs/promises';

const caminho = new URL('./data/tasks.json', import.meta.url);

export async function readDb() {
    const texto = await fs.readFile(caminho, 'utf-8');
    return JSON.parse(texto);
}

export async function writeDb(tasks) {
  const texto = JSON.stringify(tasks, null, 2);
  await fs.writeFile(caminho, texto);
}