import { Migration } from '@mikro-orm/migrations';

export class Migration20230928213556 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "cart_product_data_model" drop constraint "cart_product_data_model_item_id_foreign";');

    this.addSql('alter table "cart_product_data_model" drop column "item_id";');
    this.addSql('alter table "cart_product_data_model" add constraint "cart_product_data_model_cart_id_foreign" foreign key ("cart_id") references "cart_data_model" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart_product_data_model" drop constraint "cart_product_data_model_cart_id_foreign";');

    this.addSql('alter table "cart_product_data_model" add column "item_id" varchar(255) not null;');
    this.addSql('alter table "cart_product_data_model" add constraint "cart_product_data_model_item_id_foreign" foreign key ("item_id") references "cart_data_model" ("id") on update cascade;');
  }

}
