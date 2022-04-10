import AuthValidator from './validators/AuthValidator';
import CardValidator from './validators/CardValidator';
import UserValidator from './validators/UserValidator';

export const routes = {    
    // Rotas de Autenticação
    'POST /login': {
        path: 'AuthController.getAccessToken',
        middlewares: AuthValidator.getAccessToken()
    },
    'POST /registrar': {
        path: 'UserController.add',
        middlewares: UserValidator.add()
    },

    // Rotas de Card
    'POST /cards': {
        path: 'CardController.addCard',
        middlewares: CardValidator.addCard()
    },
    'GET /cards': {
        path: 'CardController.getCards',
        middlewares: CardValidator.get()
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