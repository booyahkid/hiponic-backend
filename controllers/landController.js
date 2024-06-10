const Land = require('../models/landModel');

exports.addLand = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id; // Get the user ID from the authenticated user

        // Check if required fields are provided
        if (!name) {
            return res.status(400).json({
                error: true,
                message: 'Name is required',
                listLand: null
            });
        }

        // Create the land associated with the authenticated user
        const land = await Land.create(name, userId);

        // Respond with the created land
        res.status(201).json({
            error: false,
            message: 'Land added successfully',
            listLand: { id: land.id, name: land.name, user_id: userId }
        });
    } catch (error) {
        console.error(`Error adding land: ${error.message}`);
        res.status(500).json({
            error: true,
            message: 'Failed to add land',
            listLand: null
        });
    }
};

exports.changeLandName = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, user_id } = req.body;
        if (!name || !user_id) {
            return res.status(400).json({
                error: true,
                message: 'Name and user_id are required',
                listLand: null
            });
        }
        const updatedLand = await Land.update(id, name, user_id);
        res.status(200).json({
            error: false,
            message: 'Land name updated successfully',
            listLand: { id: updatedLand.id, name: updatedLand.name, user_id }
        });
    } catch (error) {
        console.error(`Error updating land: ${error.message}`);
        res.status(500).json({
            error: true,
            message: error.message,
            listLand: null
        });
    }
};

exports.deleteLand = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({
                error: true,
                message: 'user_id is required',
                listLand: null
            });
        }
        await Land.delete(id, user_id);
        res.status(200).json({
            error: false,
            message: 'Land deleted successfully',
            listLand: { id, user_id }
        });
    } catch (error) {
        console.error(`Error deleting land: ${error.message}`);
        res.status(500).json({
            error: true,
            message: error.message,
            listLand: null
        });
    }
};

exports.getLand = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({
                error: true,
                message: 'user_id is required',
                listLand: null
            });
        }
        const land = await Land.getById(id, user_id);
        if (!land) {
            return res.status(404).json({
                error: true,
                message: 'Land not found',
                listLand: null
            });
        }
        res.status(200).json({
            error: false,
            message: 'Land retrieved successfully',
            listLand: { id: land.id, name: land.name, user_id }
        });
    } catch (error) {
        console.error(`Error getting land: ${error.message}`);
        res.status(500).json({
            error: true,
            message: error.message,
            listLand: null
        });
    }
};

exports.getAllLands = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({
                error: true,
                message: 'user_id is required',
                listLand: null
            });
        }
        const lands = await Land.getAllByUserId(user_id);
        res.status(200).json({
            error: false,
            message: 'Lands retrieved successfully',
            listLand: lands.map(land => ({ id: land.id, name: land.name, user_id }))
        });
    } catch (error) {
        console.error(`Error getting all lands: ${error.message}`);
        res.status(500).json({
            error: true,
            message: error.message,
            listLand: null
        });
    }
};
