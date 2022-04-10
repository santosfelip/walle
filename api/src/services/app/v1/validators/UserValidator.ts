import { ParamSchema } from 'express-validator';
import RouterRequest from '../../../../libraries/RouterRequest';

export default class UserValidator {

    public static add() {
        const schema: Record<string, ParamSchema> = {
            nome: {
                in: 'body',
                isString: true,
                isEmpty: {
                    negated: true
                }
            },
            login: {
                in: 'body',
                isString: true,
                isEmpty: {
                    negated: true
                }
            },
            senha: {
                in: 'body',
                isString: true,
                isEmpty: {
                    negated: true
                },
                isLength: {
                    options: { min: 8 },
                }
            }
        }

        return RouterRequest.checkSchema(schema, false);
    }

}