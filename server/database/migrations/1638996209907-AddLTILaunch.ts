import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddLTILaunch1638996209907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lti_launch',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'token',
            type: 'text',
            isUnique: true,
          },
          {
            name: 'config',
            type: 'jsonb',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lti_launch');
  }
}
