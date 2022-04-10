import { Request, Response, NextFunction } from 'express';
import { BaseRepository } from '../repositories/BaseRepository';
import RouterResponse from '../libraries/RouterResponse';

export const entitySavedInDB = (entity) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.params.id) {
				return next();
			}

			const repository = new BaseRepository(entity);
			const entitySaved = await repository.findById(req.params.id);
		 
			if (!entitySaved) {
				return RouterResponse.notFound(res, 'Not found');
			}

			return next();
		} catch (error) {
			return RouterResponse.serverError(error,res);
		}
	};
};