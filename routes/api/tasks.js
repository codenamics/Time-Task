const express = require('express')
const router = express.Router()
const passport = require('passport')
const validateMonthInput = require('../../validation/month')
const Month = require('../../models/Tasks')


//Create new month

router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validateMonthInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    const {
        name,
        year
    } = req.body
    console.log(req.body)
    const newMonth = new Month({
        name,
        year,
        user: req.user.id
    })
    newMonth.save()
        .then(post => {
            res.json(post)
        }).catch(err => console.log(err))
})


router.post(
    '/addTask',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {

        Month.findOne({
            user: req.user.id,
            _id: req.body.id.id

        }).then(month => {
            const newMonth = {
                title: req.body.title,
                description: req.body.description,
                time: req.body.time,
            };

            month.tasks.unshift(newMonth);

            month.save().then(month => res.json(month));
        });
    }
);



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
    Month.find({
            user: req.user.id
        }).sort({
            date: -1
        })
        .then(month => {
            res.json(month)
        }).catch(err => res.status(404).json({
            notasks: "No month found"
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

//Delete user month

router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Month.findOne({
            user: req.user.id,
            _id: req.params.id
        })
        .then(month => {
            month.remove()
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