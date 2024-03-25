import { type ZodObject, z } from 'zod';

type ZodObjectShape = Parameters<typeof z.object>[0];

export default <T extends ZodObjectShape, K extends (keyof T & (string | number | symbol))[]>(schema: ZodObject<T>, keysGenerated: K) => {
  // initialize parsers once, slightly faster
  const omits = Object.fromEntries(
    keysGenerated.map((key) => [key, true] as const)
  ) as { [k in keyof T]?: true };

  const insertable = schema.omit(omits);
  const partial = insertable.partial();

  return {
    parseId: (id: unknown) => schema.shape.id.parse(id),
    parse: (record: unknown) => schema.parse(record),
    parseInsertable: (record: unknown) => insertable.parse(record),
    parsePartial: (record: unknown) => partial.parse(record),
  };
};
