Time to branch out from TypeORM a bit and see how it connects to other tools.

Besides each entity add a zod validation schema. We will use it to validate our requests in upcoming exercises.

Inside each entity file, after the entity class, export two schemas and a Type:

- `${entityName}Schema`
- `${entityName}InsertSchema`
- `${EntityName}Insert`

Example:

- zod schema `bugSchema` - write it by hand, though here even generative AI help, such as Copilot, could speed up your work
- zod schema `bugInsertSchema` - derive it from `bugSchema` using `schema.omit({ id: true })`
- type `BugInsert` - derive it with `z.infer<typeof bugInsertSchema>`

## Syncing schemas with entities

We will use a handy function `validates` from our internal `shared/validation` folder.

It does its best to match the entity type with the schema. For example:

```ts
import { validates } from '@shared/validation'

// instead of z.object({ ... })
export const bugSchema = z.object({
  // ...
})

// use validates<MyEntityType>().with({ ... })
// validates().with({}) is a wrapper around zod.object({}) with some type inference
type BugModel = Omit<Bug, 'project'> // <- we create a type without relations

export const bugSchema = validates<BugModel>().with({
  id: z.string(), // <- TypeScript will immediately raise an error, because our Bug has number id!
  // ... remaining properties
})

export const bugInsertSchema = bugSchema.omit({ id: true })

export type BugInsert = z.infer<typeof bugInsertSchema>
```

This way we will quickly catch various validation issues at the place where we define the schema.

This function is a lightly modified version of a function shared on `zod` GitHub issues:

- https://github.com/colinhacks/zod/issues/372#issuecomment-1280054492

Finally, you do not need to add any new exports to `entities/index.ts`. It should only deal with entity classes. Otherwise, TypeORM would get mixed up.

## Colocation

Here we are defining entity definition and its validation nearby as these two things are closely related and they are very likely to change together. What changes together, stays together.

Do not mistake that for storing all your validation schemas with entities. When we will deal with requests and these requests will need some custom/additional properties that are not part of the entity, we will define a schema nearby the request. However, if the request is mostly about the entity, we will the request to import the entity's validation schema and extend it for that particular request.

Right now, let's focus on the entity validation and forget about possible requests.

## Tests

Schemas are also, generally, not tested unless you are testing for a particular behaviour or if you are at a point where you are not sure if the schema would do its job. In short - if you would test it manually, then write an automated test for it.
