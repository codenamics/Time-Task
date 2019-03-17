const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateMonthInput = require("../../validation/month");
const Todo = require("../../models/Todo");

//Create new todo

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { todoTitle, todoDescription, status } = req.body;

    const newTodo = new Todo({
      todoTitle,
      todoDescription,
      status,
      user: req.user.id
    });
    newTodo
      .save()
      .then(todo => {
        res.json(todo);
      })
      .catch(err => console.log(err));
  }
);

//Get all tasks of current login user

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Todo.find({
      user: req.user.id
    })
      .sort({
        date: -1
      })
      .then(todo => {
        res.json(todo);
      })
      .catch(err =>
        res.status(404).json({
          notasks: "No todos found"
        })
      );
  }
);

//Get all todos by current logged in user
router.post(
  "/search",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Todo.find({
      user: req.user.id,

      todoDescription: { $all: req.body.search }
    })
      .then(todos => {
        if (todos.length === 0) {
          res.status(404).json({
            notasks: "No todos found"
          });
        }
        res.json(todos);
      })
      .catch(err =>
        res.status(404).json({
          notasks: "No todos found"
        })
      );
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Todo.findOne({
      user: req.user.id,
      _id: req.params.id
    })
      .then(todo => {
        res.json(todo);
      })
      .catch(err =>
        res.status(404).json({
          notask: "There is not todo with that ID to be deleted"
        })
      );
  }
);

//Delete user todo

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Todo.findOne({
      user: req.user.id,
      _id: req.params.id
    })
      .then(todo => {
        todo.remove().then(() => {
          res.json({
            success: true
          });
        });
      })
      .catch(err =>
        res.status(404).json({
          notask: "There is not todo with that ID to be deleted"
        })
      );
  }
);

module.exports = router;
