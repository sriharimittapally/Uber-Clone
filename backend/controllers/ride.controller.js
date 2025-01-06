const { validationResult } = require('express-validator');
const rideModel = require('../models/ride.model');
const rideService = require('../services/ride.service');
const mapService = require('../services/maps.service');
const {sendMessageToSockedId} = require('../socket.js')

module.exports.createRide = async (req, res) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

   const { pickup, destination, vehicleType} = req.body;

   try {
    const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});
    res.status(201).json(ride);

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

    console.log(pickupCoordinates)

    const captainsInRadius = await mapService.getCaptainsInRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

    ride.otp = ""

    const rideWithUser =await rideModel.findOne({_id: ride._id}).populate('user');

   captainsInRadius.map(  captain=>{
    sendMessageToSockedId(captain.sockedId,{
        event: 'new-ride',
        data: rideWithUser
    })
   })

   } catch (err) {
    return res.status(500).json({message: err.message});
   }
}


module.exports.getFare = async (req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {pickup, destination} = req.query;
     try {
        const fare = await  rideService.getFare(pickup, destination);
        return res.status(200).json(fare)
     } catch (error) {
        return res.status(500).json({message: err.message})
     }
}

module.exports.confirmRide = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {rideId} = req.body;

    try {
        const ride = await rideService.confirmRide({rideId, captain: req.captain});

        sendMessageToSockedId(ride.user.sockedId,{
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({message:  error.message})
    }
}

module.exports.startRide = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:  errors.array()})
    }

    const {rideId, otp} = req.query;
    
   try {
    const ride = await rideService.startRide({rideId, otp, captain: req.captain});

    sendMessageToSockedId(ride.user.sockedId,{
        event: 'ride-started',
        data: ride 
    })

    return res.status(200).json(ride);

   } catch (error) {
    return res.status(500).json({message: err.message});
   }
}

//end rie captain
module.exports.endRide = async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {rideId} = req.body;

    try {
        const ride = await rideService.endRide({rideId, captain: req.captain});

        sendMessageToSockedId(ride.user.sockedId,{
        event: 'ride-ended',
        data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}