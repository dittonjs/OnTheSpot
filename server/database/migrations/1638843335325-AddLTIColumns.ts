import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLTIColumns1638843335325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn(
      'user_role',
      new TableColumn({
        name: 'contextId',
        type: 'text',
      }),
    );

    // queryRunner.addColumns('user', [
    //   new TableColumn({
    //     name: 'lms_user_id',

    //   })
    // ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

  }
}
