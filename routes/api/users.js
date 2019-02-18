require('dotenv').load();
const crypto = require('crypto')
const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.API_KEY
        }
    })
);

router.post('/register', (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    const {

        password,
        email
    } = req.body

    User.findOne({
        email
    }).then(
        user => {
            if (user) {
                return res.status(400).json({
                    email: "Email already exists"
                })
            } else {
                const newUser = new User({
                    password,
                    email
                })
                bcrypt.genSalt(12, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.json({
                                    id: user.id,
                                    email: user.email,
                                    date: user.date
                                })
                            }).catch(err => {
                                console.log(err)
                            })
                    })
                })
            }
        }
    )
})

router.post('/login', (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    const {
        email,
        password
    } = req.body

    User.findOne({
        email
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                email: 'Email not found'
            })
        }
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        email: user.email
                    }
                    jwt.sign(payload, process.env.SECRET_OR_KEY, (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                    })
                } else {
                    return res.status(400).json({
                        pass: 'Password incorrect'
                    })
                }
            })
    })
})

router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email
    })
})

router.post('/reset', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString('hex')
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) {
                    return res.status(400).json({
                        email: "No email found"
                    })
                }
                user.resetToken = token
                user.resetTokenExp = Date.now() + 36000000
                return user.save()
            })
            .then(result => {
                transporter.sendMail({
                    to: req.body.email,
                    from: 'time&task@com.com',
                    subject: 'Password rest',
                    html: `'<p>Password reset</p>'
                    <a href="http://localhost:3000/reset/${token}">Reset password</a>
                    `
                })
            })
            .catch(err => {
                console.log(err)
            })
    })
})

router.post('/new-password', (req, res) => {
    const {
        token,
        newPassword
    } = req.body
    let resetUser;

    User.findOne({
            resetToken: token,
            resetTokenExp: {
                $gt: Date.now()
            }
        })
        .then(user => {
            resetUser = user
            return bcrypt.hash(newPassword, 12)
        }).then(
            hashedPassword => {
                resetUser.password = hashedPassword
                resetUser.resetToken = undefined
                resetUser.resetTokenExp = undefined
                return resetUser.save()
            }
        ).then(result => {
            res.status(200).json({
                msg: "Success"
            })
        })
        .catch(err => console.log(err))
})
module.exports = router