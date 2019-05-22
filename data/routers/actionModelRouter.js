const express = require('express');

const projects = require('../helpers/projectModel');
const Action = require('../helpers/actionModel.js');
const router = express.Router();

//GET

router.get('/', async (req, res) => {
    try{
        const actions = await Action.get();
        res.status(200).json(actions);
    } catch(err) {
        res.status(500).json({ message: 'Error retrieving actions'})
    }
})

//GET by ID
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const action = await Action.get(id);
        res.status(200).json(action);
    } catch(err) {
        res.status(500).json({message: 'User ID does not exist.'})
    }
})

//POST 
router.post ('/', async (req, res) => {
    const postBody = req.body

    try{
        const newAction = await Action.insert(postBody)
        res.status(200).json(newAction)
    } catch(err){
        res.status(500).json({message: "Could not add post"})
    }
})

//PUT
router.put('/:id', async (req, res) => {
    const {id} = req.params
    const content = req.body

    try {
        const updatedPost = await Action.update(id, content)
        res.status(200).json(updatedPost)
    } catch(err){
        res.status(500).json({message: "could not update post"})
    }
})

//DELETE 
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    
    try{
        const deleteItem = await Action.remove(id);
        res.status(200).json(deleteItem)
    } catch(err){
        res.status(500).json({message: "could not update post"})
    }
})




module.exports = router;