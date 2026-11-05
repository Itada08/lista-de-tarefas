export function criarTask({titulo, descricao = ""}, id) {
    return {
        id,
        titulo,
        descricao,
        concluida: false,
        criadaEm: new Date().toISOString()
    };
}