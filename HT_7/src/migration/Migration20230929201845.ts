import { Migration } from '@mikro-orm/migrations'

export class Migration20230929201845 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "order_data_model" drop column "payment";')
    this.addSql('alter table "order_data_model" drop column "delivery";')
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "order_data_model" add column "payment" varchar(255) not null, add column "delivery" varchar(255) not null;',
    )
  }
}
