import { ParamSchema } from 'express-validator';
import { Card } from '../../../../models/Card';
import RouterRequest from '../../../../libraries/RouterRequest';

export default class CardValidator {
    
    public static addCard() {
        const schema: Record<string, ParamSchema> = {
            titulo: {
                in: 'body',
                isString: true,
                isEmpty: {
                    negated: true
                }
            },
            conteudo: {
                in: 'body',
                isString: true,
                isEmpty: {
                    negated: true
                }
            },
            lista: {
                in: 'body',
                isString: true,
                isEmpty: {
                    negated: true
                },
                isIn: {
                    options: [['ToDo', 'Doing', 'Done']]
                }
            },
        }

        return RouterRequest.checkSchema(schema, true);
    }

    public static get() {
        return RouterRequest.checkSchema({}, true);
    }

    public static put() {
        const schema: Record<string, ParamSchema> = {
            id: {
                in: 'params',
                isUUID: true,
                isEmpty: {
                    negated: true
                }
            }
        }

        return RouterRequest.checkSchema(schema, true, Card, 'titulo');
    }

    public static delete() {
        const schema: Record<string, ParamSchema> = {
            id: {
                in: 'params',
                isUUID: true,
                isEmpty: {
                    negated: true
                }
            }
        }

        return RouterRequest.checkSchema(schema, true, Card, 'titulo');
    }

}