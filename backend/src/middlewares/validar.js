export default function validar(schema) {
    return (req, res, next) => {
        const resultado = schema.safeParse(req.body);
        if (!resultado.success) {
            return res.status(400).json({
                erro: resultado.error.issues.map((i) => i.message),
            });
        }
        req.body = resultado.data;
        next();
    };
}