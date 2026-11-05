export default function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    if (status === 500) {
        console.error(err);
    }
    const mensagem = status === 500 ? 'Erro interno do servidor' : err.message;
    res.status(status).json({ erro: mensagem });
}