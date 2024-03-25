import { MigrationInterface, QueryRunner } from 'typeorm'

export class Latest1698670549988 implements MigrationInterface {
  name = 'Latest1698670549988'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rating" ("movie_id" integer NOT NULL, "rating" real NOT NULL, "votes" integer NOT NULL, CONSTRAINT "PK_a6341c958bc0027bfb37b0f98a4" PRIMARY KEY ("movie_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "people" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "birth" numeric NOT NULL, CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "directors" ("movie_id" integer NOT NULL, "person_id" integer NOT NULL, CONSTRAINT "PK_009d62c758985474778c731b079" PRIMARY KEY ("movie_id", "person_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "stars" ("movie_id" integer NOT NULL, "person_id" integer NOT NULL, CONSTRAINT "PK_6c9a7e70f3cef06fbe48bff9e1f" PRIMARY KEY ("movie_id", "person_id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_d56e48c26b684432b6fd2db626" ON "directors" ("person_id") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_df003feb970ed22475975348e9" ON "directors" ("movie_id") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_5f3c1fa2debd918f869872515a" ON "stars" ("person_id") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_f501694637ce1d1a9b761dfc06" ON "stars" ("movie_id") `
    )
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_a6341c958bc0027bfb37b0f98a4" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "directors" ADD CONSTRAINT "FK_df003feb970ed22475975348e9e" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "directors" ADD CONSTRAINT "FK_d56e48c26b684432b6fd2db626e" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "stars" ADD CONSTRAINT "FK_f501694637ce1d1a9b761dfc063" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "stars" ADD CONSTRAINT "FK_5f3c1fa2debd918f869872515ac" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stars" DROP CONSTRAINT "FK_5f3c1fa2debd918f869872515ac"`
    )
    await queryRunner.query(
      `ALTER TABLE "stars" DROP CONSTRAINT "FK_f501694637ce1d1a9b761dfc063"`
    )
    await queryRunner.query(
      `ALTER TABLE "directors" DROP CONSTRAINT "FK_d56e48c26b684432b6fd2db626e"`
    )
    await queryRunner.query(
      `ALTER TABLE "directors" DROP CONSTRAINT "FK_df003feb970ed22475975348e9e"`
    )
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_a6341c958bc0027bfb37b0f98a4"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f501694637ce1d1a9b761dfc06"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5f3c1fa2debd918f869872515a"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df003feb970ed22475975348e9"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d56e48c26b684432b6fd2db626"`
    )
    await queryRunner.query(`DROP TABLE "stars"`)
    await queryRunner.query(`DROP TABLE "directors"`)
    await queryRunner.query(`DROP TABLE "movies"`)
    await queryRunner.query(`DROP TABLE "people"`)
    await queryRunner.query(`DROP TABLE "rating"`)
  }
}
