import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddUserStats1639013076436 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_stat',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'timesChosen',
            type: 'int',
            default: 0,
          },
          {
            name: 'timesPresent',
            type: 'int',
            default: 0,
          },
          {
            name: 'level',
            type: 'int',
            default: 0,
          },
          {
            name: 'lmsUserId',
            type: 'text',
          },
          {
            name: 'contextId',
            type: 'text',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_stat');
  }
}
