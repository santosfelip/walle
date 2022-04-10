import { Request, Response, NextFunction } from 'express';
import { BaseRepository } from '../repositories/BaseRepository';
import RouterResponse from '../libraries/RouterResponse';

export const logEntity = (entity, keyLog: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
            const repository = new BaseRepository(entity);
			const entitySaved = await repository.findById(req.params.id);

            // Recebe o nome da Entidade e coloca a primeira letra em maiúscula
            const name = getClassName(entitySaved);

            switch (req.method) {
                case 'PUT':
                    console.log(`${dateTime()} - ${name} ${entitySaved.id} - ${entitySaved[keyLog]} - Alterado`)
                    break;
                case 'DELETE':
                    console.log(`${dateTime()} - ${name} ${entitySaved.id} - ${entitySaved[keyLog]} - Removido`)
                    break;
            }

			return next();
		} catch (error) {
			return RouterResponse.serverError(error,res);
		}
	};
};

const getClassName = (className) => {
    return  String(className.constructor.name).charAt(0).toUpperCase() + 
            String(className.constructor.name).slice(1);
};

const dateTime = () => {
    const currentDate = new Date();
    return `${dateFormatted(currentDate)} ${timeFormatted(currentDate)}`
};

const dateFormatted = (currentDate) => {
    const day  = currentDate.getDate().toString(),
        month  = (currentDate.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.

        dayFormatted = (day.length == 1) ? '0'+day : day,
        monthFormatted = (month.length == 1) ? '0'+month : month,
        yearFormatted = currentDate.getFullYear();

    return `${dayFormatted}/${monthFormatted}/${yearFormatted}`;
}

const timeFormatted = (currentDate) => {
    return `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
}