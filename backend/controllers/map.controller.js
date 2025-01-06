const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');




//Address Co-ordinates
module.exports.getCoordinates =  async (req, res, next) =>{


    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()})
    }

    const {address} = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({message:"Co-ordinates not found"})
    }
}

//Distance and Time
module.exports.getDistanceTime = async (req, res, next)=>{


    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {orign, destination} = req.query;

        const distanceTime = await mapService.getDistanceTime(orign, destination);
        res.status(200).json(distanceTime);

    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal Server error"});
    }
}

//Auto Complete suggestions
module.exports.getAutoCompleteSuggestions = async (req, res, next)=>{
    try {

        const errors = validationResult(req);

        if(errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {input} = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}
