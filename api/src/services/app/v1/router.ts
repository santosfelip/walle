import { isAuthenticated } from '../../../middlewares/isAuthenticated';
import AuthValidator from './validators/AuthValidator';
import CardValidator from './validators/CardValidator';

export const routes = {    
    // Rota de Autenticação
    'POST /login': {
        path: 'AuthController.getAccessToken',
        middlewares: AuthValidator.getAccessToken()
    },

    // Rota de Card
    'POST /cards': {
        path: 'CardController.addCard',
        middlewares: CardValidator.addCard()
    },
    'GET /cards': {
        path: 'CardController.getCards',
        middlewares: [isAuthenticated]
    },
    'PUT /cards/:id': {
        path: 'CardController.updateCard',
        middlewares: [CardValidator.put(), CardValidator.addCard()]
    },
    'DELETE /cards/:id': {
        path: 'CardController.deleteCard',
        middlewares: CardValidator.delete()
    },
}