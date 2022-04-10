import express from 'express';
import RouterResponse from '../../../../libraries/RouterResponse';
import { Card } from '../../../../models/Card';
import { v4 as uuidv4 } from 'uuid';
import { BaseRepository } from '../../../../repositories/BaseRepository';

export default class CardController {
    static repository = new BaseRepository(Card);

    //Cria um novo usuario na base de dados
    public async addCard(req: express.Request, res: express.Response) {
        
        try {
            const newCard: cardInterface = {
                id: uuidv4(),
                titulo: req.body.titulo,
                conteudo: req.body.conteudo,
                lista: req.body.lista
            };
            await CardController.repository.create(newCard);

            RouterResponse.success(newCard, res);
        } catch (error) {
            RouterResponse.error('Error to crate Card', res);
        }
    }

    public async getCards(req: express.Request, res: express.Response) {
        let dataResponse:any = [];
        
        try {
            dataResponse = await CardController.repository.findAll();

            RouterResponse.success(dataResponse, res);
        } catch(err) {  
            RouterResponse.error(err, res);
        }
    }

    public async updateCard(req: express.Request, res: express.Response) {
        try {
            const card: cardInterface = {
                titulo: req.body.titulo,
                lista: req.body.lista,
                conteudo: req.body.conteudo
            };
            const dataResponse = await CardController.repository.update(card,req.params.id);
            
            RouterResponse.success(dataResponse, res);
        } catch(err) {  
            RouterResponse.error(err, res);
        }
    }

    public async deleteCard(req: express.Request, res: express.Response) {
        try {
            const cardSaved = await CardController.repository.findById(req.params.id);
     
            if (!cardSaved) {
                return RouterResponse.notFound(res, 'Card not found');
            }

            await cardSaved.destroy();
            
            RouterResponse.success(await CardController.repository.findAll(), res);
        } catch(err) {  
            RouterResponse.error(err, res);
        }
    }
}

interface cardInterface {
    id?: string,
    titulo : string, 
    conteudo: string, 
    lista: string
};