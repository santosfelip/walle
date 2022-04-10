import express from 'express';

export default class RouterResponse {
    
    public static success(data: Object, res: express.Response): void {
        res.status(200);
        res.json(this.dataResponse(true, data));
    }

    public static successEmpty(res: express.Response): void {
        res.status(200);
        res.json(this.dataResponse(true, {}));
    }

    public static error(error: string|Object, res: express.Response): void {
        res.status(500);
        res.json(this.dataResponse(false, error));
    }

    public static serverError(error: Error, res: express.Response): void {
        res.status(500);
        res.json(this.dataResponse(false, error.message));
    }

    public static notFound(res: express.Response, message: string = 'Page Not Found'): void {
         // Seta cache para a rota procurada para 60 minutos
         res.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
         res.status(404);
         res.json(this.dataResponse(false, message));
    }

    public static unauthorizedError(res: express.Response, msg?: any): void {
        res.status(401);
        const data = msg || 'No permission to access this service';
        res.json((typeof data === 'string') ? { message: data } : data);
    }

    public static dataResponse(status: boolean, data: string|Object): Object {
        if(!status) {
            return { status: false, data: data};
        }

        return (typeof data === 'string') ? { data: data } : data;
    }
}