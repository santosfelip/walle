import 'dotenv/config'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';
import { BaseRepository } from '../../../../repositories/BaseRepository';
import { User } from '../../../../models/User';

export default class AuthController {
    static repository = new BaseRepository(User);

    public async getAccessToken(req: Request, res: Response) {
        const { login, senha } = req.body;

        try {
            //Busca o usuário no banco pelo email cadastrado
            const [User] = await AuthController.repository.find({ login });
 
            if(!User) {
                return RouterResponse.error('Credentials not found', res);
            }

            // Compare o hash com o password enviado
            const match = await bcrypt.compare(senha, User.senha);
           
            if(!match) {
                return RouterResponse.error('Credenciais não encontradas', res);
            }

            // Objeto com os dados do usuário não confidenciais
            const dataResponse = {
                id: User.id,
                login: User.login,
                nome: User.nome
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