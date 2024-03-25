import { Router } from 'express';
import assert from 'assert';
import {
  create,
  findAll,
  findById,
  parseInsertable,
  parseUpdateable,
  patch,
} from './model';

const router = Router();

router.get('/', (req, res) => {
  try {
    res.json(findAll());
  } catch (error) {
    // A quick hack that we will move away from
    // in the next iteration.
    // For this part, we will assume that all errors
    // are due to invalid input and are actual errors.
    // For a proper solution we would like to create
    // a reusable error handler and to allow
    // the model to specify the error type.
    assert(error instanceof Error);

    // generally, the controller should not know
    // what is our error handling strategy
    // or returned error format. Here we are
    // showing a more involve example of how we can
    // return an error message to the client.
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get('/:id', (req, res) => {
  try {
    // not ideal exposing the id validation logic
    // to the controller but it will have to do for now
    const articleId = Number(req.params.id);

    if (!Number.isInteger(articleId)) {
      res.status(400).json({
        error: 'Article ID must be an integer',
      });
      return;
    }

    const article = findById(articleId);

    if (!article) {
      res.status(404).json({
        error: 'Article was not found',
      });
      return;
    }

    res.json(article);
  } catch (error) {
    assert(error instanceof Error);

    res.status(400).json({
      error: error.message,
    });
  }
});

router.post('/', (req, res) => {
  try {
    const articleBody = parseInsertable(req.body);

    res.status(201).json(create(articleBody));
  } catch (error) {
    assert(error instanceof Error);

    res.status(400).json({
      error: error.message,
    });
  }
});

router.patch('/:id', (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      res.status(400).json({
        error: 'Article ID must be an integer',
      });
      return;
    }

    const articleBody = parseUpdateable(req.body);
    const articlePatched = patch(id, articleBody);

    if (!articlePatched) {
      res.status(404).json({
        error: 'Article was not found',
      });
      return;
    }

    res.json(articlePatched);
  } catch (error) {
    assert(error instanceof Error);

    res.status(400).json({
      error: error.message,
    });
  }
});

export default router;
