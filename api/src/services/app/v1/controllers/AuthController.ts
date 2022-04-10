import 'dotenv/config'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';

export default class AuthController {

    public async getAccessToken(req: Request, res: Response) {
        const { login, senha } = req.body;

        try {
            // TODO: Busca o usuário no banco pelo email cadastrado
            
            if(login != 'letscode') {
                return RouterResponse.error('Credenciais não encontradas', res);
            }

            // Compare o hash com o password enviado
            //const match = await bcrypt.compare(senha, senha);
           
            // if(!match) {
            //     return RouterResponse.error('Credenciais não encontradas', res);
            // }

            // Objeto com os dados do usuário não confidenciais
            const dataResponse = {
                id: 123,
                login: 'letscode'
            };

            const accessToken = jwt.sign(dataResponse, process.env.ACCESS_TOKEN_SECRET, {
                subject: String(dataResponse.id),
                expiresIn: process.env.EXPIRE_TOKEN
            });

            RouterResponse.success({ accessToken }, res);
        } catch(err) {
            RouterResponse.error(err, res);
        }
    }
}