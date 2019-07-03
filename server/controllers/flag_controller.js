import flag_model from '../models/flag_model';
import moment from 'moment';

class FlagController {

    postFlag(request, response){
        if(!request.body.created_on || !request.body.reason 
            || !request.body.description) {
                response.status(400).send({
                    status: 400,
                    message: 'Each field is required, retry please'
                });
            }
            const flag= {
                id: flag_model.length,
                car_id: 2,
                created_on: request.body.created_on,
                reason: request.body.reason,
                description: request.body.description,
                
            }
            flag_model.push(flag);

            return response.status(201).send({
                status: 201,
                message: 'Flag added successfully',
                car
            });
    }
}

const flagController= new FlagController();
export default flagController;