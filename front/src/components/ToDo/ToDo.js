import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { GlobalContext } from '../../ToDoApp';

const ToDo = () => {
  const { actions, states, dispatch } = useContext(GlobalContext);

  const [toDoState, setToDoState] = useForm({
    todo: '',
  });

  const handleAddToDo = e => {
    e.preventDefault();
  };

  const load = () => {};

  useEffect(() => {
    actions.todo
      .todoStartLoading()
      .then(data => {
        !!data && dispatch.todo(data);
      })
      .catch(err => console.log(err));
  }, [actions.ui, actions.todo, dispatch]);

  return (
    <Container className="my-5">
      <Row className="justify-content-between align-items-center">
        <Col xs={5}>
          <p>Add New To Do</p>
          <div>
            <Form onsubmit={handleAddToDo}>
              <Form.Group controlId="todoInput">
                <Form.Control
                  type="text"
                  placeholder="Practice"
                  value={toDoState.todo}
                  onChange={setToDoState}
                  name="todo"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Form>
          </div>
        </Col>
        <Col xs={5}>To Do</Col>
      </Row>
    </Container>
  );
};

export default ToDo;
