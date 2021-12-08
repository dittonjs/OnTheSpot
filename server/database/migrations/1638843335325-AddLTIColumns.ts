import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLTIColumns1638843335325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_role',
      new TableColumn({
        name: 'contextId',
        type: 'text',
      }),
    );

    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'lmsUserId',
        type: 'text',
        isNullable: true,
      }),
      new TableColumn({
        name: 'lmsEmail',
        type: 'text',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_role', 'contextId');
    await queryRunner.dropColumns('user', ['lmsUserId', 'lmsEmail']);
  }
}
