const { Router } = require('express');
const { check } = require('express-validator');
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todo-controller');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.use(validateJWT);

router.get('/get-todos', getTodos);

router.post(
  '/create-todo',
  [check('title', 'Title is required').not().isEmpty(), validateFields],
  createTodo
);

router.put(
  '/update/:id',
  [check('id', 'Id is required').not().isEmpty()],
  updateTodo
);

router.delete(
  '/delete/:id',
  [check('id', 'Id is required').not().isEmpty()],
  deleteTodo
);

module.exports = router;
