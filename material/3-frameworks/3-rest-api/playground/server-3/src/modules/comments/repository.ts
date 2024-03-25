import type {
  ExpressionOrFactory,
  Insertable,
  Selectable,
  SqlBool,
  Updateable,
} from 'kysely';
import { keys } from './schema';
import type { Comment, Database, DB } from '@/database';
import BadRequest from '@/utils/errors/BadRequest';

const TABLE = 'comment';
type TableName = typeof TABLE;
type Row = Comment;
type RowWithoutId = Omit<Row, 'id'>;
type RowRelationshipsIds = Pick<Row, 'articleId' | 'userId'>;
type RowInsert = Insertable<RowWithoutId>;
type RowUpdate = Updateable<RowWithoutId>;
type RowSelect = Selectable<Row>;

export default (db: Database) => ({
  findAll(): Promise<RowSelect[]> {
    return db.selectFrom(TABLE).select(keys).execute();
  },

  find(
    expression: ExpressionOrFactory<DB, TableName, SqlBool>
  ): Promise<RowSelect[]> {
    return db.selectFrom(TABLE).select(keys).where(expression).execute();
  },

  findById(id: number): Promise<RowSelect | undefined> {
    return db
      .selectFrom(TABLE)
      .select(keys)
      .where('id', '=', id)
      .executeTakeFirst();
  },

  async create(record: RowInsert): Promise<RowSelect | undefined> {
    await assertRelationshipsExist(db, record);

    return db
      .insertInto(TABLE)
      .values(record)
      .returning(keys)
      .executeTakeFirst();
  },

  async update(id: number, partial: RowUpdate): Promise<RowSelect | undefined> {
    if (Object.keys(partial).length === 0) {
      return this.findById(id);
    }

    await assertRelationshipsExist(db, partial);

    return db
      .updateTable(TABLE)
      .set(partial)
      .where('id', '=', id)
      .returning(keys)
      .executeTakeFirst();
  },

  remove(id: number) {
    return db
      .deleteFrom(TABLE)
      .where('id', '=', id)
      .returning(keys)
      .executeTakeFirst();
  },
});

/**
 * Enforce that provided relationships reference existing keys.
 */
async function assertRelationshipsExist(
  db: Database,
  record: Partial<RowRelationshipsIds>
) {
  const { articleId, userId } = record;

  // we would perform both checks in a single Promise.all
  if (articleId) {
    const article = await db
      .selectFrom('article')
      .select('id')
      .where('id', '=', articleId)
      .executeTakeFirst();

    if (!article) {
      throw new BadRequest('Referenced article does not exist');
    }
  }

  if (userId) {
    const user = await db
      .selectFrom('user')
      .select('id')
      .where('id', '=', userId)
      .executeTakeFirst();

    if (!user) {
      throw new BadRequest('Referenced user does not exist');
    }
  }
}
