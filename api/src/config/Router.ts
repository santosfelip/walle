import express, { Router } from 'express';
import cors from 'cors';

import RouterResponse from '../libraries/RouterResponse';
import mapRoutes from 'express-routes-mapper';
import { routes } from '../services/app/v1/router';

export default class Routes {

    private app: express.Router;

    constructor(app: express.Router) {
        this.app = app;

        this.middlewares();
        this.loadingRoutes();
    }

    private middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({ origin: '*' }));
    }

    private loadingRoutes() {
        // Rota para a documentação
        this.app.use('/doc', express.static(__dirname + '/../../apidoc'));

        // carrega as rotas dos serviços
        this.app.use('/', this.loadingServices());

        this.app.use('*', (_req, res, _next) => RouterResponse.notFound(res));

        // impede estourar erro na api
        this.app.use((err: Error, req: express.Request, res: express.Response) => 
            RouterResponse.serverError(err, res)
        );
    }

    private loadingServices(): Router {
        // recebe as 2 pastas atuais
        let path: string = __dirname.replace(process.cwd(), '').substr(1);
        // separa as pastas em um array
        const dirs: Array<string> = path.split('/');
        // remove a ultima pasta
        dirs.pop();
        // recebe o nome da última pasta
        path = dirs.join('/');

        const router: Router = express.Router();
        const mappedRoutes = mapRoutes(routes, `${path}/services/app/v1/controllers/`);
        router.use('/', mappedRoutes);

        return router;
    }
}