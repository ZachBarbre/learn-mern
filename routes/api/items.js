const express = require('express');
const router = express.Router();

const ItemModel = require('../../models/item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', async (req, res) => {
    const items = await ItemModel.find().sort({date: -1});
    res.json(items);
});

// @route POST api/items
// @desc Create a Item
// @access Public
router.post('/', async (req, res) => {
    const newItem = new ItemModel({
        name: req.body.name
    });
    const item = await newItem.save();
    res.json(item);
});

// @route Delete api/items/:id
// @desc Delete a Item
// @access Public
router.delete('/:id', async (req, res) => {
    try {
        const item = await ItemModel.findById(req.params.id);
        const deletedItem = item.remove();
        res.json({success: true})
    } catch (error) {
        res.status(404).json({sucess: false})
    }
});

module.exports = router;