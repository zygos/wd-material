import { Router } from 'express';
import { UserNotFound } from './errors';
import { type Database } from '@/database';
import { buildRespository } from './model';
import { jsonRoute } from '@/utils/middleware';
import { parsers } from './schema';

export default (database: Database) => {
  const router = Router();
  const users = buildRespository(database);

  router
    .route('/')
    .get(jsonRoute(() => users.findAll()))
    .post(
      jsonRoute((req) => {
        const body = parsers.parseInsertable(req.body);

        return users.create(body);
      })
    );

  router.route('/:id(\\d+)').get(
    jsonRoute(async (req) => {
      const id = parsers.parseId(req.params.id);
      const record = await users.findById(id);

      if (!record) {
        throw new UserNotFound();
      }

      return record;
    })
  );

  return router;
};
