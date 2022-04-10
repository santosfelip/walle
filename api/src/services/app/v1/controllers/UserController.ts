import bcrypt from 'bcryptjs';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../../models/User';
import { BaseRepository } from '../../../../repositories/BaseRepository';
import RouterResponse from '../../../../libraries/RouterResponse';

export default class UserController {
    static repository = new BaseRepository(User);

    //Cria um novo usuario na base de dados
    public async add(req: express.Request, res: express.Response) {
        try {
            // Busca no banco se já existe o email cadastrado
            const [result] = await UserController.repository.find({ login: req.body.login });

            if(result) {
               return RouterResponse.error('Login already registered', res);
            }

            const newUser: userInterface = {
                id: uuidv4(),
                nome:  req.body.nome,
                login: req.body.login,
                senha: bcrypt.hashSync(req.body.senha, bcrypt.genSaltSync(10))
            };

            // Salva o novo usuário no BD
            await UserController.repository.create(newUser);

            // exclue a senha salva sem o hash para não envia-la
            delete newUser.senha;

            RouterResponse.success(newUser, res);
        } catch (error) {
            RouterResponse.error('Error to create user', res);
        }
    }
}

interface userInterface {
    id: string,
    nome: string,
    login: string,
    senha: string
};