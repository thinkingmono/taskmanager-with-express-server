const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/customError')

//WITH ASYNC WRAPPER
const getAllTasks = asyncWrapper(async (req, res) => {
    //Get all tasks from mongodb collection using find Task model method.
    const tasks = await Task.find({})
    //Response tasks object.
    res.status(200).json({ tasks })
})

const createNewTask = asyncWrapper(async (req, res) => {
    //Create new task using Task model. Passing json object into create method.
    const task = await Task.create(req.body)
    //Return status 201 success and task json object recently created.
    res.status(201).json({ task })
})

const getSingleTask = asyncWrapper(async (req, res, next) => {
    //Destructure id from request params and assign a new alias taskId.
    const { id: taskId } = req.params;
    //Find one task in mongodb collection. Pass destructured id wish to find.
    const task = await Task.findOne({ _id: taskId })
    //Check if task was found. if not throw error.
    if (!task) {
        return next(createCustomError(`No task with that id ${taskId}`, 404))
    }
    //If there is a task return status and task recovered.
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    //Destructure id from request params and assign a new alias taskId.
    const { id: taskId } = req.params;
    //Find one task in mongodb collection and delete it. Pass destructured id wish to delete. return task deleted.
    const task = await Task.findOneAndDelete({ _id: taskId })
    //Check if there is a task. if not throw error.
    if (!task) {
        return next(createCustomError(`No task with that id ${taskId}`, 404))
    }
    //If there is a task return status and task deleted.
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res, next) => {
    //Destructure id from request params and assign a new alias taskId.
    const { id: taskId } = req.params;
    //Find one task in mongodb collection and update it. Pass destructured id wish to update, data from request body to update and options to return new task and run field schema validators. return task updated.
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true, runValidators: true
    })
    //Check if there is a task. if not throw error.
    if (!task) {
        return next(createCustomError(`No task with that id ${taskId}`, 404))
    }
    //If there is a task return status and task updated.
    res.status(200).json({ task })
})

//WITHOUT ASYNC WRAPPER
// const getAllTasks = async (req, res) => {
//     try {
//         //Get all tasks from mongodb collection using find Task model method.
//         const tasks = await Task.find({})
//         //Response tasks object.
//         res.status(200).json({ tasks })
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// }

// const createNewTask = async (req, res) => {
//     try {
//         //Create new task using Task model. Passing json object into create method.
//         const task = await Task.create(req.body)
//         //Return status 201 success and task json object recently created.
//         res.status(201).json({ task })
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// }

// const getSingleTask = async (req, res) => {
//     try {
//         //Destructure id from request params and assign a new alias taskId.
//         const { id: taskId } = req.params;
//         //Find one task in mongodb collection. Pass destructured id wish to find.
//         const task = await Task.findOne({ _id: taskId })
//         //Check if task was found. if not throw error.
//         if (!task) {
//             return res.status(404).json({ msg: `No task with that id ${taskId}` })
//         }
//         //If there is a task return status and task recovered.
//         res.status(200).json({ task })
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// }

// const deleteTask = async (req, res) => {
//     try {
//         //Destructure id from request params and assign a new alias taskId.
//         const { id: taskId } = req.params;
//         //Find one task in mongodb collection and delete it. Pass destructured id wish to delete. return task deleted.
//         const task = await Task.findOneAndDelete({ _id: taskId })
//         //Check if there is a task. if not throw error.
//         if (!task) {
//             return res.status(404).json({ msg: `No task with that id: ${taskId}` })
//         }
//         //If there is a task return status and task deleted.
//         res.status(200).json({ task })
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }

// const updateTask = async (req, res) => {
//     try {
//         //Destructure id from request params and assign a new alias taskId.
//         const { id: taskId } = req.params;
//         //Find one task in mongodb collection and update it. Pass destructured id wish to update, data from request body to update and options to return new task and run field schema validators. return task updated.
//         const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
//             new: true, runValidators: true
//         })
//         //Check if there is a task. if not throw error.
//         if (!task) {
//             return res.status(404).json({ msg: `No task with that id: ${taskId}` })
//         }
//         //If there is a task return status and task updated.
//         res.status(200).json({ task })
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }

module.exports = { getAllTasks, createNewTask, getSingleTask, updateTask, deleteTask }