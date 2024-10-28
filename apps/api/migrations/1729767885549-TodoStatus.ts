import { MigrationInterface, QueryRunner } from 'typeorm';

export class TodoStatus1729767885549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1 - create new enum type for todo status
    await queryRunner.query(`
        CREATE TYPE todo_status_enum AS ENUM ('pending', 'in_progress', 'done'); 
        `);

    // 2 - add new column to todo table
    await queryRunner.query(`
        ALTER TABLE "todo"
        ADD COLUMN "status" todo_status_enum NOT NULL DEFAULT 'pending';
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1 - drop the status column
    await queryRunner.query(`
        ALTER TABLE "todo"
        DROP COLUMN "status";`);

    // 2 - drop the enum type
    await queryRunner.query(`
        DROP TYPE todo_status_enum;`);
  }
}
