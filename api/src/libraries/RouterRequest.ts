import express from 'express';
import RouterResponse from './RouterResponse';
import { checkSchema, ParamSchema, Result, ValidationError, validationResult } from 'express-validator';

// Midlewares
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { entitySavedInDB } from '../middlewares/entitySavedInDB';
import { logEntity } from '../middlewares/logEntity';

export default class RouterRequest {
    
    public static checkSchema(schema: Record<string, ParamSchema>, privateRouter: boolean = true, entity = null, keyLog = null) {

        const listValidators: Array<any> = [
            checkSchema(schema),
            RouterRequest.validate
        ];

        // Middleware para Logs <Remoção|Alteração>
        if (entity && keyLog) {
            listValidators.unshift(logEntity(entity, keyLog));
        }

        // Middleware para buscar entidade no banco e incluir no body da request
        if (entity) {
            listValidators.unshift(entitySavedInDB(entity));     
        }

        // Middleware de Autorização - Verifica o token no header da req
        if(privateRouter) {
            listValidators.unshift(isAuthenticated);
        }

        return listValidators;
    }

    public static validate(req: express.Request, res: express.Response, next: express.NextFunction) {
        
        const errors: Result<ValidationError> = validationResult(req);
        if (!errors.isEmpty()) {
            RouterResponse.error(errors.array(), res);
        }
        else {
            next();
        }
    }
}