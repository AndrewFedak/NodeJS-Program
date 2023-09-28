import { Migration } from '@mikro-orm/migrations';

export class Migration20230928214716 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "order_product_data_model" drop column "product";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order_product_data_model" add column "product" varchar(255) not null;');
  }

}
