import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1698237088070 implements MigrationInterface {
  name = 'Initial1698237088070'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_ratings" ("movie_id" integer NOT NULL, "rating" real NOT NULL, "votes" integer NOT NULL)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_ratings"("movie_id", "rating", "votes") SELECT "movie_id", "rating", "votes" FROM "ratings"`
    )
    await queryRunner.query(`DROP TABLE "ratings"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_ratings" RENAME TO "ratings"`
    )
    await queryRunner.query(
      `CREATE TABLE "temporary_directors" ("movie_id" integer NOT NULL, "person_id" integer NOT NULL)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_directors"("movie_id", "person_id") SELECT "movie_id", "person_id" FROM "directors"`
    )
    await queryRunner.query(`DROP TABLE "directors"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_directors" RENAME TO "directors"`
    )
    await queryRunner.query(
      `CREATE TABLE "temporary_stars" ("movie_id" integer NOT NULL, "person_id" integer NOT NULL)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_stars"("movie_id", "person_id") SELECT "movie_id", "person_id" FROM "stars"`
    )
    await queryRunner.query(`DROP TABLE "stars"`)
    await queryRunner.query(`ALTER TABLE "temporary_stars" RENAME TO "stars"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_ratings" ("movieId" integer NOT NULL, "rating" real NOT NULL, "votes" integer NOT NULL)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_ratings"("movieId", "rating", "votes") SELECT "movie_id", "rating", "votes" FROM "ratings"`
    )
    await queryRunner.query(`DROP TABLE "ratings"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_ratings" RENAME TO "ratings"`
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY NOT NULL, "firstName" varchar(255) NOT NULL, "lastName" varchar(255) NOT NULL)`
    )
    await queryRunner.query(`CREATE TABLE "temporary_directors" ()`)
    await queryRunner.query(
      `INSERT INTO "temporary_directors"() SELECT  FROM "directors"`
    )
    await queryRunner.query(`DROP TABLE "directors"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_directors" RENAME TO "directors"`
    )
    await queryRunner.query(`CREATE TABLE "temporary_stars" ()`)
    await queryRunner.query(
      `INSERT INTO "temporary_stars"() SELECT  FROM "stars"`
    )
    await queryRunner.query(`DROP TABLE "stars"`)
    await queryRunner.query(`ALTER TABLE "temporary_stars" RENAME TO "stars"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_directors" ("movieId" integer NOT NULL, "personId" integer NOT NULL, PRIMARY KEY ("movieId", "personId"))`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_directors"() SELECT  FROM "directors"`
    )
    await queryRunner.query(`DROP TABLE "directors"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_directors" RENAME TO "directors"`
    )
    await queryRunner.query(
      `CREATE TABLE "temporary_stars" ("movieId" integer NOT NULL, "personId" integer NOT NULL, PRIMARY KEY ("movieId", "personId"))`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_stars"() SELECT  FROM "stars"`
    )
    await queryRunner.query(`DROP TABLE "stars"`)
    await queryRunner.query(`ALTER TABLE "temporary_stars" RENAME TO "stars"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_people" ("id" integer PRIMARY KEY NOT NULL, "name" varchar(255) NOT NULL, "birth" numeric NOT NULL)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_people"("id", "name", "birth") SELECT "id", "name", "birth" FROM "people"`
    )
    await queryRunner.query(`DROP TABLE "people"`)
    await queryRunner.query(`ALTER TABLE "temporary_people" RENAME TO "people"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_ratings" ("movieId" integer PRIMARY KEY NOT NULL, "rating" real NOT NULL, "votes" integer NOT NULL)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_ratings"("movieId", "rating", "votes") SELECT "movieId", "rating", "votes" FROM "ratings"`
    )
    await queryRunner.query(`DROP TABLE "ratings"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_ratings" RENAME TO "ratings"`
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
    await queryRunner.query(
      `ALTER TABLE "ratings" RENAME TO "temporary_ratings"`
    )
    await queryRunner.query(
      `CREATE TABLE "ratings" ("movieId" integer NOT NULL, "rating" real NOT NULL, "votes" integer NOT NULL)`
    )
    await queryRunner.query(
      `INSERT INTO "ratings"("movieId", "rating", "votes") SELECT "movieId", "rating", "votes" FROM "temporary_ratings"`
    )
    await queryRunner.query(`DROP TABLE "temporary_ratings"`)
    await queryRunner.query(`ALTER TABLE "people" RENAME TO "temporary_people"`)
    await queryRunner.query(
      `CREATE TABLE "people" ("id" integer PRIMARY KEY, "name" text NOT NULL, "birth" numeric)`
    )
    await queryRunner.query(
      `INSERT INTO "people"("id", "name", "birth") SELECT "id", "name", "birth" FROM "temporary_people"`
    )
    await queryRunner.query(`DROP TABLE "temporary_people"`)
    await queryRunner.query(`ALTER TABLE "stars" RENAME TO "temporary_stars"`)
    await queryRunner.query(`CREATE TABLE "stars" ()`)
    await queryRunner.query(
      `INSERT INTO "stars"() SELECT  FROM "temporary_stars"`
    )
    await queryRunner.query(`DROP TABLE "temporary_stars"`)
    await queryRunner.query(
      `ALTER TABLE "directors" RENAME TO "temporary_directors"`
    )
    await queryRunner.query(`CREATE TABLE "directors" ()`)
    await queryRunner.query(
      `INSERT INTO "directors"() SELECT  FROM "temporary_directors"`
    )
    await queryRunner.query(`DROP TABLE "temporary_directors"`)
    await queryRunner.query(`ALTER TABLE "stars" RENAME TO "temporary_stars"`)
    await queryRunner.query(
      `CREATE TABLE "stars" ("movie_id" integer NOT NULL, "person_id" integer NOT NULL)`
    )
    await queryRunner.query(
      `INSERT INTO "stars"() SELECT  FROM "temporary_stars"`
    )
    await queryRunner.query(`DROP TABLE "temporary_stars"`)
    await queryRunner.query(
      `ALTER TABLE "directors" RENAME TO "temporary_directors"`
    )
    await queryRunner.query(
      `CREATE TABLE "directors" ("movie_id" integer NOT NULL, "person_id" integer NOT NULL)`
    )
    await queryRunner.query(
      `INSERT INTO "directors"() SELECT  FROM "temporary_directors"`
    )
    await queryRunner.query(`DROP TABLE "temporary_directors"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(
      `ALTER TABLE "ratings" RENAME TO "temporary_ratings"`
    )
    await queryRunner.query(
      `CREATE TABLE "ratings" ("movie_id" integer NOT NULL, "rating" real NOT NULL, "votes" integer NOT NULL)`
    )
    await queryRunner.query(
      `INSERT INTO "ratings"("movie_id", "rating", "votes") SELECT "movieId", "rating", "votes" FROM "temporary_ratings"`
    )
    await queryRunner.query(`DROP TABLE "temporary_ratings"`)
    await queryRunner.query(`ALTER TABLE "stars" RENAME TO "temporary_stars"`)
    await queryRunner.query(
      `CREATE TABLE "stars" ("movie_id" integer NOT NULL, "person_id" integer NOT NULL, CONSTRAINT "FK_5f3c1fa2debd918f869872515ac" FOREIGN KEY ("person_id") REFERENCES "people" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_f501694637ce1d1a9b761dfc063" FOREIGN KEY ("movie_id") REFERENCES "movies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "stars"("movie_id", "person_id") SELECT "movie_id", "person_id" FROM "temporary_stars"`
    )
    await queryRunner.query(`DROP TABLE "temporary_stars"`)
    await queryRunner.query(
      `ALTER TABLE "directors" RENAME TO "temporary_directors"`
    )
    await queryRunner.query(
      `CREATE TABLE "directors" ("movie_id" integer NOT NULL, "person_id" integer NOT NULL, CONSTRAINT "FK_d56e48c26b684432b6fd2db626e" FOREIGN KEY ("person_id") REFERENCES "people" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_df003feb970ed22475975348e9e" FOREIGN KEY ("movie_id") REFERENCES "movies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "directors"("movie_id", "person_id") SELECT "movie_id", "person_id" FROM "temporary_directors"`
    )
    await queryRunner.query(`DROP TABLE "temporary_directors"`)
    await queryRunner.query(
      `ALTER TABLE "ratings" RENAME TO "temporary_ratings"`
    )
    await queryRunner.query(
      `CREATE TABLE "ratings" ("movie_id" integer NOT NULL, "rating" real NOT NULL, "votes" integer NOT NULL, CONSTRAINT "FK_45c7bafa4e537191add4eeed5b3" FOREIGN KEY ("movie_id") REFERENCES "movies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "ratings"("movie_id", "rating", "votes") SELECT "movie_id", "rating", "votes" FROM "temporary_ratings"`
    )
    await queryRunner.query(`DROP TABLE "temporary_ratings"`)
  }
}
