const Plant = require('../models/plantModel');

exports.addPlant = async (req, res) => {
    try {
        const { name, date_added, land_id } = req.body;
        const image = req.file ? req.file.buffer : null;

        // Check if required fields are provided
        if (!name || !date_added || !land_id) {
            return res.status(400).json({
                error: true,
                message: 'Name, date_added, and land_id are required',
                plant: null
            });
        }

        // Create the plant
        const plant = await Plant.create(name, date_added, image, land_id);

        // Respond with the created plant
        res.status(201).json({
            error: false,
            message: 'Plant added successfully',
            plant: {
                id: plant.id,
                name: plant.name,
                date_added: plant.date_added,
                image: plant.image,
                land_id: plant.land_id
            }
        });
    } catch (error) {
        console.error(`Error adding plant: ${error.message}`);
        res.status(500).json({
            error: true,
            message: 'Failed to add plant',
            plant: null
        });
    }
};

exports.updatePlant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, date_added, land_id } = req.body;
        const image = req.file ? req.file.buffer : null;

        if (!name || !date_added || !land_id) {
            return res.status(400).json({
                error: true,
                message: 'Name, date_added, and land_id are required',
                plant: null
            });
        }

        const updatedPlant = await Plant.update(id, name, date_added, image, land_id);
        res.status(200).json({
            error: false,
            message: 'Plant updated successfully',
            plant: updatedPlant
        });
    } catch (error) {
        console.error(`Error updating plant: ${error.message}`);
        res.status(500).json({
            error: true,
            message: error.message,
            plant: null
        });
    }
};

exports.deletePlant = async (req, res) => {
    try {
        const { id } = req.params;
        await Plant.delete(id);
        res.status(200).json({
            error: false,
            message: 'Plant deleted successfully',
            plant: { id }
        });
    } catch (error) {
        console.error(`Error deleting plant: ${error.message}`);
        res.status(500).json({
            error: true,
            message: error.message,
            plant: null
        });
    }
};

exports.getPlantById = async (req, res) => {
    try {
        const { id } = req.params;
        const plant = await Plant.findById(id);
        if (!plant) {
            return res.status(404).json({
                error: true,
                message: 'Plant not found',
                plant: null
            });
        }
        res.status(200).json({
            error: false,
            message: 'Plant retrieved successfully',
            plant
        });
    } catch (error) {
        console.error(`Error getting plant: ${error.message}`);
        res.status(500).json({
            error: true,
            message: error.message,
            plant: null
        });
    }
};

exports.getPlantsByLand = async (req, res) => {
    try {
        const { land_id } = req.query;
        
        // Check if the land_id query parameter is provided
        if (!land_id) {
            return res.status(400).json({
                error: true,
                message: 'Land ID is required',
                plants: null
            });
        }
        
        // Fetch plants by land_id
        const plants = await Plant.findByLandId(land_id);
        
        // Respond with the plants
        res.status(200).json({
            error: false,
            message: 'Plants retrieved successfully',
            plants
        });
    } catch (error) {
        console.error(`Error getting plants by land: ${error.message}`);
        res.status(500).json({
            error: true,
            message: error.message,
            plants: null
        });
    }
};
