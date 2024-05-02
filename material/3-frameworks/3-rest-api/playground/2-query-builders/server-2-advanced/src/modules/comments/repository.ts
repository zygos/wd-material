import type {
  ExpressionOrFactory,
  Insertable,
  Selectable,
  SqlBool,
  Updateable,
} from 'kysely'
import { keys } from './schema'
import db, { DB, type Comment } from '@/database'
import BadRequest from '@/utils/errors/BadRequest'

// model-specific code
const TABLE = 'comment'
type Row = Comment
type RowWithoutId = Omit<Row, 'id'>
type RowRelationshipsIds = Pick<Row, 'articleId' | 'userId'>
type RowInsert = Insertable<RowWithoutId>
type RowUpdate = Updateable<RowWithoutId>
type RowSelect = Selectable<Row>

export function findAll(): Promise<RowSelect[]> {
  return db.selectFrom(TABLE).select(keys).execute()
}

export function find(
  expression: ExpressionOrFactory<DB, 'comment', SqlBool>
): Promise<RowSelect[]> {
  return db.selectFrom(TABLE).select(keys).where(expression).execute()
}

export function findByArticleId(articleId: number): Promise<RowSelect[]> {
  return db
    .selectFrom(TABLE)
    .select(keys)
    .where('articleId', '=', articleId)
    .execute()
}

export function findById(id: number): Promise<RowSelect | undefined> {
  return db
    .selectFrom(TABLE)
    .select(keys)
    .where('id', '=', id)
    .executeTakeFirst()
}

export async function create(
  record: RowInsert
): Promise<RowSelect | undefined> {
  // Alternatively, we could catch a SQLITE_CONSTRAINT_FOREIGNKEY
  // error and then re-throw a more user-friendly error message.
  await assertRelationshipsExist(record)

  return db.insertInto(TABLE).values(record).returning(keys).executeTakeFirst()
}

export async function update(
  id: number,
  partial: RowUpdate
): Promise<RowSelect | undefined> {
  if (Object.keys(partial).length === 0) {
    return findById(id)
  }

  await assertRelationshipsExist(partial)

  return db
    .updateTable(TABLE)
    .set(partial)
    .where('id', '=', id)
    .returning(keys)
    .executeTakeFirst()
}

/**
 * Enforce that provided relationships reference existing keys.
 */
async function assertRelationshipsExist(record: Partial<RowRelationshipsIds>) {
  const { articleId, userId } = record

  // we would perform both checks in a single Promise.all
  if (articleId) {
    const article = await db
      .selectFrom('article')
      .select('id')
      .where('id', '=', articleId)
      .executeTakeFirst()

    if (!article) {
      throw new BadRequest('Referenced article does not exist')
    }
  }

  if (userId) {
    const user = await db
      .selectFrom('user')
      .select('id')
      .where('id', '=', userId)
      .executeTakeFirst()

    if (!user) {
      throw new BadRequest('Referenced user does not exist')
    }
  }
}
