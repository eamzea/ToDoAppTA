const { request, response } = require('express');
const ToDo = require('../models/ToDo');

const getTodos = async (req = request, res = response) => {
  try {
    const todos = await ToDo.find().populate('user', 'name');

    return res.status(200).json({
      ok: true,
      todos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the manager',
    });
  }
};

const createTodo = async (req = request, res = response) => {
  const todo = new ToDo(req.body);

  try {
    todo.user = req.uid;

    await todo.save();

    return res.status(200).json({
      ok: true,
      todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the manager',
    });
  }
};

const updateTodo = async (req = request, res = response) => {
  const todoId = req.params.id;
  const { uid } = req;

  try {
    const todo = await ToDo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        ok: false,
        msg: 'The todo does not exists',
      });
    }

    if (todo.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Without permissions',
      });
    }

    const newTodo = {
      ...req.body,
      user: uid,
    };

    const todoUpdated = await ToDo.findByIdAndUpdate(todoId, newTodo, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      msg: 'Todo updated',
      todoUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the manager',
    });
  }
};

const deleteTodo = async (req = request, res = response) => {
  const todoId = req.params.id;
  const { uid } = req;

  try {
    const todo = await ToDo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        ok: false,
        msg: 'The todo does not exists',
      });
    }

    if (todo.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Without permissions',
      });
    }

    await ToDo.findByIdAndDelete(todoId);

    return res.status(200).json({
      ok: true,
      msg: 'Todo deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the manager',
    });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
