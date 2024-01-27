import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ArticleNotFound } from './errors';
import { type Database } from '@/database';
import { buildRespository } from './model';
import { jsonRoute } from '@/utils/middleware';
import { parsers } from './schema';

export default (database: Database) => {
  const router = Router();
  const articles = buildRespository(database);

  router
    .route('/')
    .get(jsonRoute(() => articles.findAll()))
    .post(
      jsonRoute((req) => {
        const body = parsers.parseInsertable(req.body);

        return articles.create(body);
      }, StatusCodes.CREATED)
    );

  router
    .route('/:id(\\d+)')
    .get(
      jsonRoute(async (req) => {
        const id = parsers.parseId(req.params.id);
        const record = await articles.findById(id);

        if (!record) {
          throw new ArticleNotFound();
        }

        return record;
      })
    )
    .delete(
      jsonRoute(async (req) => {
        const id = parsers.parseId(req.params.id);
        const record = await articles.remove(id);

        if (!record) {
          throw new ArticleNotFound();
        }

        return record;
      })
    )
    .patch(
      jsonRoute(async (req) => {
        const id = parsers.parseId(req.params.id);
        const bodyPatch = parsers.parsePartial(req.body);
        const record = await articles.patch(id, bodyPatch);

        if (!record) {
          throw new ArticleNotFound();
        }

        return record;
      })
    );

  return router;
};
