import { initTRPC } from '@trpc/server';
// import { OpenApiMeta } from 'trpc-openapi'
import { type Database } from '../database'

export type Context = {
  db: Database,
};

const t = initTRPC
  // .meta<OpenApiMeta>()
  // .context<Context>()
  .create();

export const { middleware, router, procedure, mergeRouters } = t;
