const express = require ('express');

const Project = require('../helpers/projectModel');
const router = express.Router();

//GET
router.get('/', async (req, res) => {
    try {
        const projects = await Project.get();
        res.status(200).json(projects)
    } catch(err) {
        res.status(500).json({message: "could not retrieve projects"})
    }
})

//GET by ID
router.get('/:id', async(req, res) => {
    const {id} = req.params
    try{
        const project = await Project.getProjectActions(id);
        res.status(200).json(project)
    } catch(err){
        res.status(500).json({message: 'Project ID does not exist.'})
    }
})

//POST 
router.post('/', async (req, res) => {
    const newProjectContent = req.body

    try {
        const newProject = await Project.insert(newProjectContent);
        res.status(200).json({newProject})
    } catch(err){
        res.status(500).json({message: 'Project could not be added.'})
    }
} )

//PUT
router.put('/:id', async (req, res) => {
    const updateProjectContent = req.body
    const {id} = req.params
    try{
        const updateProject = await Project.update(id, updateProjectContent);
        res.status(200).json(updateProject)
    } catch(err) {
        res.status(500).json({message: 'Could not update project.'})
    }
})

//DELETE 
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const removeproject = await Project.remove(id)
        res.status(200).json(removeproject);
    } catch(err){
        res.status(500).json({message: 'Could not remove project.'})
    }
})

module.exports = router;