import { Migration } from '@mikro-orm/migrations';

export class Migration20230928223414 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "cart_product_data_model" drop constraint "cart_product_data_model_cart_id_id_foreign";');

    this.addSql('alter table "cart_product_data_model" drop constraint "cart_product_data_model_cart_id_id_product_id_unique";');
    this.addSql('alter table "cart_product_data_model" drop constraint "cart_product_data_model_pkey";');
    this.addSql('alter table "cart_product_data_model" rename column "cart_id_id" to "cart_id";');
    this.addSql('alter table "cart_product_data_model" add constraint "cart_product_data_model_cart_id_foreign" foreign key ("cart_id") references "cart_data_model" ("id") on update cascade;');
    this.addSql('alter table "cart_product_data_model" add constraint "cart_product_data_model_cart_id_product_id_unique" unique ("cart_id", "product_id");');
    this.addSql('alter table "cart_product_data_model" add constraint "cart_product_data_model_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart_product_data_model" drop constraint "cart_product_data_model_cart_id_foreign";');

    this.addSql('alter table "cart_product_data_model" drop constraint "cart_product_data_model_cart_id_product_id_unique";');
    this.addSql('alter table "cart_product_data_model" drop constraint "cart_product_data_model_pkey";');
    this.addSql('alter table "cart_product_data_model" rename column "cart_id" to "cart_id_id";');
    this.addSql('alter table "cart_product_data_model" add constraint "cart_product_data_model_cart_id_id_foreign" foreign key ("cart_id_id") references "cart_data_model" ("id") on update cascade;');
    this.addSql('alter table "cart_product_data_model" add constraint "cart_product_data_model_cart_id_id_product_id_unique" unique ("cart_id_id", "product_id");');
    this.addSql('alter table "cart_product_data_model" add constraint "cart_product_data_model_pkey" primary key ("id", "product_id");');
  }

}
