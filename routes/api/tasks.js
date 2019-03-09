const express = require('express')
const router = express.Router()
const passport = require('passport')
const validateMonthInput = require('../../validation/month')
const Month = require('../../models/Tasks')
const pdfTemplate = require('../../documents');
const pdf = require('html-pdf');
const path = require("path");


router.post(`/create-pdf/:id`, passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let userData = req.user

    Month.findOne({
            user: req.user.id,
            _id: req.params.id
        })

        .then(month => {

            pdf.create(pdfTemplate(month, userData), {}).toFile('documents/result.pdf', (err) => {
                if (err) {
                    res.send(Promise.reject());
                }

                res.send(Promise.resolve());
            });
        }).catch(err => res.status(404).json({
            notask: 'There is not task with that ID to be deleted'
        }))


});

router.get('/fetch-pdf', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.sendFile(path.join(__dirname, '../../documents', 'result.pdf'));

})




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

router.post('/month', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Month.find({
            user: req.user.id,
            name: {
                $all: req.body.search
            }
        })
        .then(months => {
            res.json(months)
        }).catch(err => res.status(404).json({
            notasks: "No months found"
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

//Get month by ID
router.get('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Month.findOne({
            user: req.user.id,
            _id: req.params.id
        })
        .then(month => {
            res.json(month)
        }).catch(err => res.status(404).json({
            notask: 'There is not task with that ID to be deleted'
        }))
})


router.delete('/task/:id/:task_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Month.findOne({
            user: req.user.id,
            _id: req.params.id
        })
        .then(month => {

            const removeIndex = month.tasks
                .map(item => item.id)
                .indexOf(req.params.task_id);

            month.tasks.splice(removeIndex, 1);

            month.save().then(month => res.json(month))
        })
        .catch(err => res.status(404).json({
            notask: 'There is not task with that ID to be deleted'
        }))
})

//Update user task

router.put('/:id/:task_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        time
    } = req.body

    Month.findOne({
            user: req.user.id,
            _id: req.params.id
        })
        .then(task => {
            const timeIndex = task.tasks.filter(task => task.id === req.params.task_id)

            timeIndex[0].time = req.body.time
            task.save().then(month => res.json(month))
        })
        .catch(err => res.status(404).json({
            notask: 'There is not task with that ID to be updated'
        }))
})


router.get('/:id/:task_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Month.findOne({
            user: req.user.id,
            _id: req.params.id
        })
        .then(task => {
            let timeIndex = task.tasks.filter(task => task.id === req.params.task_id)

            res.json(timeIndex)
        })
        .catch(err => res.status(404).json({
            notask: 'There is not task with that ID to be updated'
        }))
})

module.exports = router