import uuid from 'uuid';
import moment from 'moment';
import property_model from "../models/property_model";

class PropertyController {

    addproperty(request, response){
                const property= {
                    id: uuid.v4(),
                    owner: 24656547,
                    status: request.body.status.trim().replace(/\s+/g, ''),
                    price: request.body.price,
                    state :  request.body.state,
                    ​city  : request.body.city,
                    ​address​ : request.body.address,
                    type  : request.body.type,
                    created_on: moment.now(),
                    ​image_url  : request.body.image_url,​
                    category : request.body.category.trim().replace(/\s+/g, ''),
                    title : request.body.title,
                    description : request.body.description
                }
              property_model.push(property);
    
                return response.status(201).send({
                    status: 201,
                    message: 'Property added successfully',
                    property
                });           
    } 
    getAllProperties(request, response) {
        return response.status(200).send({
            status: 200,
            properties: property_model
        });
    }
    getCarById(request, response){
        const found = property_model.find((property) => {
            return property.id === parseInt(request.params.property_id);
        });
        if(found){
            response.status(200).send({
                status : 200,
                property : found
            })
        }else{
            response.status(404).send({
                status: 404,
                message: 'Property not found'
            });
        }      
    }
    
    searchProperties(request, response){
        const {query} = request;

        if(query.status){
            const filtered= property_model.filter(property => property.status=== request.query.status);
            if (filtered.length === 0) {
                return response.status(200).send({
                  status: 200,
                  data: 'Not found',
                });
              }
        
              return response.status(200).send({
                status: 200,
                data: filtered,
              });
        }
        if(query.category){
            const filtered= property_model.filter(property => property.category=== request.query.category);
            if (filtered.length === 0) {
                return response.status(200).send({
                  status: 200,
                  data: 'Not found',
                });
              }
        
              return response.status(200).send({
                status: 200,
                data: filtered,
              });
        }

        if(query.status && query.type && query.category){
            const filtered= property_model.filter(property=> property.status=== query.status && property.type=== query.type && property.category=== query.category);
            if (filtered.length === 0) {
                return res.status(200).send({
                  status: 200,
                  data: 'Not found',
                });
              }
        
              return response.status(200).send({
                status: 200,
                data: filtered,
              });
        }
        if(query.status && query.category && query.state){
            const filtered= property_model.filter(property => property.status=== query.status && property.category=== query.category && property.state=== query.state); 
            if (filtered.length === 0) {
                return response.status(200).send({
                  status: 200,
                  data: 'Not found',
                });
              }
        
              return response.status(200).send({
                status: 200,
                data: filtered,
              });
        }
        if(query.status && query.category && query.min_price && query.max_price){
            const filtered= property_model.filter(property => property.status=== query.status && property.category=== query.category && property.price >= query.min_price && property.price <= query.max_price);
            if (filtered.length === 0) {
                return response.status(200).send({
                  status: 200,
                  data: 'Not found',
                });
              }
        
              return response.status(200).send({
                status: 200,
                data: filtered,
              });
        }
    }

    updatePrice(request, response){
        const found = property_model.find((property) => {
            return property.id === parseInt(request.params.property_id);
        });
        if(found){
            const property= found;
            property.price= request.body.price;
            return response.status(200).send({
                status: 200,
                property
            });            
        }else{
            return response.status(404).send({
                status: 404,
                message: 'Property not found'
            });
        } 

    }
    updateStatus(request, response){
        const found = property_model.find((property) => {
            return property.id === parseInt(request.params.property_id);
        });
        if(found){
            const property= found;
            property.status= request.body.status;
            return response.status(200).send({
                status: 200,
                data: property
            });
        }else{
            return response.status(404).send({
                status: 404,
                message: 'Property not found'
            });
        }
    }
    deleteProperty(request, response){
        const found = property_model.find((property) => {
            return property.id === parseInt(request.params.car_id);
        });
        if(found){
            const targetIndex= property_model.indexOf(found);
            property_model_model.splice(targetIndex, 1);
            return response.status(200).send({
                status: 200,
                message: 'Property deleted successfully'
            });
        }else{
            return response.status(404).send({
                status: 404,
                message: 'Property not found'
            });
        }
    }
}

const propertyController = new PropertyController();
export default  propertyController;