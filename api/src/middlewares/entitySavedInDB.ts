import { Request, Response, NextFunction } from 'express';
import { BaseRepository } from '../repositories/BaseRepository';
import RouterResponse from '../libraries/RouterResponse';


export const entitySavedInDB = (typeOfEntity) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const repository = new BaseRepository(typeOfEntity);
			const entitySaved = await repository.findById(req.params.id);
		 
			if (!entitySaved) {
				return RouterResponse.notFound(res, 'Not found');
			}
	
			req.body.typeOfEntity = entitySaved;
	
			return next();
		} catch (error) {
			return RouterResponse.serverError(error,res);
		}
	};
};