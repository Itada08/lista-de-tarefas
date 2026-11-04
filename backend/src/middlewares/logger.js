export function logger(req, res, next) {
    console.log(`Data: ${new Date().toISOString()}`);
    console.log(`Método: ${req.method}`);
    console.log(`URL: ${req.originalUrl}`);
    next();
}