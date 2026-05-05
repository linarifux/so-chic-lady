import StoreConfig from '../models/StoreConfig.js';

// @desc    Get store config
// @route   GET /api/config
// @access  Public (or Private/Admin if you prefer)
export const getStoreConfig = async (req, res) => {
    let config = await StoreConfig.findOne();
    if (!config) {
        config = await StoreConfig.create({}); // Create default if empty
    }
    res.json(config);
};

// @desc    Update store config
// @route   PUT /api/config
// @access  Private/Admin
export const updateStoreConfig = async (req, res) => {
    let config = await StoreConfig.findOne();
    
    if (config) {
        config.returnPolicy = req.body.returnPolicy || config.returnPolicy;
        config.shippingInfo = req.body.shippingInfo || config.shippingInfo;
        config.currentPromotions = req.body.currentPromotions || config.currentPromotions;
        config.storeHours = req.body.storeHours || config.storeHours;

        const updatedConfig = await config.save();
        res.json(updatedConfig);
    } else {
        res.status(404);
        throw new Error('Configuration introuvable');
    }
};