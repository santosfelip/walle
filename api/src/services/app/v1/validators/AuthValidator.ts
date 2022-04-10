import { ParamSchema } from 'express-validator';
import RouterRequest from '../../../../libraries/RouterRequest';

export default class AuthValidator {

    public static getAccessToken() {
        const schema: Record<string, ParamSchema> = {
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