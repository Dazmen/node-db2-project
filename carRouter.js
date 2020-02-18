const express = require('express');
const db = require('./data/dbConfig');
const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Unable to fetch cars" })
        })
});
router.post('/', validateCarBody, (req, res) => {
    const newCar = req.body;
    db('cars').insert(newCar)
        .then(ids => {
            db('cars').where({ carId: ids[0] })
                .then(postedCar => {
                    res.status(201).json(postedCar)
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Unable to post car" })
        })
});
router.get('/:id', validateCarId, (req, res) => {
    db('cars').where({ carId: req.params.id })
        .first()
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Unable to fetch car" })
        })
});
router.put('/:id', validateCarId, validateCarBody, (req, res) => {
    db('cars').where({ carId: req.params.id }).update(req.body)
        .then(count => {
            db('cars').where({ carId: req.params.id})
                .then(changedCar => {
                    res.status(200).json(changedCar)
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Unable to update car" })
        })
});
router.delete('/:id', validateCarId, (req, res) => {
    db('cars').where({ carId: req.params.id }).del()
        .then(count => {
            res.status(200).json({ message: "Car Deleted" })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Unable to delete car" })
        })
});

module.exports = router;

function validateCarBody(req, res, next){
    const car = req.body;
    if(car.VIN && car.make && car.model && car.mileage){
        next();
    } else {
        console.log(car);
        res.status(400).json({ error: "A VIN, make, model and mileage is required" })
    }
};
function validateCarId(req, res, next){
    db('cars').where({ carId: req.params.id })
        .first()
        .then(car => {
            if(car){
                next();
            } else {
                res.status(400).json({ error: "car with this ID does not exist"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server Unable to fetch car" })
        })
};