import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import RouterResponse from '../libraries/RouterResponse';


export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return RouterResponse.unauthorizedError(res);
	}

	const [type, token] = authHeader.split(' ');
    
    if(type !== 'Bearer') {
        return RouterResponse.unauthorizedError(res, 'JWT invalido');
    }

	try {
		verify(token, process.env.ACCESS_TOKEN_SECRET);

		return next();
	} catch (error) {
		return RouterResponse.unauthorizedError(res, 'JWT invalido');
	}
}