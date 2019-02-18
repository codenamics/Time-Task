const express = require('express')
const router = express.Router()
const passport = require('passport')

const Tasks = require('../../models/Tasks')


//Create new task

router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        title,
        description,
        time
    } = req.body
    const newTask = new Tasks({
        title,
        description,
        time,
        user: req.user.id
    })
    newTask.save()
        .then(post => {
            res.json(post)
        }).catch(err => res.status(404).json({
            notasks: "No tasks found"
        }))
})

//Get all tasks by admin user

router.get('/all', (req, res) => {

    Tasks.find().sort({
            date: -1
        })
        .then(tasks => {
            res.json(tasks)
        }).catch(err => res.status(404).json({
            notasks: "No tasks found"
        }))


})

//Get all tasks of current login user

router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Tasks.find({
            user: req.user.id
        }).sort({
            date: -1
        })
        .then(tasks => {
            res.json(tasks)
        }).catch(err => res.status(404).json({
            notasks: "No tasks found"
        }))
})

//Get task by ID of current logged in user

router.get('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Tasks.findOne({
            user: req.user.id,
            _id: req.params.id
        })
        .then(task => {
            res.json(task)
        }).catch(err => res.status(404).json({
            notask: 'There is not task with that ID'
        }))
})

//Delete user task

router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Tasks.findOne({
            user: req.user.id,
            _id: req.params.id
        })
        .then(task => {
            task.remove()
                .then(() => {
                    res.json({
                        success: true
                    })
                })
        }).catch(err => res.status(404).json({
            notask: 'There is not task with that ID to be deleted'
        }))
})

//Update user task

router.put('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        // title,
        // description,
        time
    } = req.body
    let updateTask = {}
    // updateTask.title = title
    // updateTask.description = description
    updateTask.time = time
    Tasks.findOneAndUpdate({
            user: req.user.id,
            _id: req.params.id
        }, {
            $set: updateTask
        }, {
            new: true
        })
        .then(task => {
            res.json(task)
        }).catch(err => res.status(404).json({
            notask: 'There is not task with that ID to be updated'
        }))
})


module.exports = router