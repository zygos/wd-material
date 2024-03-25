import { MigrationInterface, QueryRunner } from 'typeorm'

export class Latest1698227283176 implements MigrationInterface {
  name = 'Latest1698227283176'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY NOT NULL, "firstName" varchar(255) NOT NULL, "lastName" varchar(255) NOT NULL)`
    )
    await queryRunner.query(
      `CREATE TABLE "temporary_movies" ("id" integer PRIMARY KEY NOT NULL, "title" varchar(255) NOT NULL, "year" integer NOT NULL)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_movies"("id", "title", "year") SELECT "id", "title", "year" FROM "movies"`
    )
    await queryRunner.query(`DROP TABLE "movies"`)
    await queryRunner.query(`ALTER TABLE "temporary_movies" RENAME TO "movies"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "movies" RENAME TO "temporary_movies"`)
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" integer PRIMARY KEY, "title" text NOT NULL, "year" numeric)`
    )
    await queryRunner.query(
      `INSERT INTO "movies"("id", "title", "year") SELECT "id", "title", "year" FROM "temporary_movies"`
    )
    await queryRunner.query(`DROP TABLE "temporary_movies"`)
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
