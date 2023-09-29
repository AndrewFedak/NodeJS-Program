import { Migration } from '@mikro-orm/migrations'

export class Migration20230929195713 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "order_data_model" ("id" varchar(255) not null, "cart_id" varchar(255) not null, "user_id" varchar(255) not null, "total" int not null, "status" text check ("status" in (\'created\', \'completed\')) not null, "payment" varchar(255) not null, "delivery" varchar(255) not null, "comments" varchar(255) null, constraint "order_data_model_pkey" primary key ("id"));',
    )

    this.addSql(
      'create table "order_product_data_model" ("id" varchar(255) not null, "order_id" varchar(255) not null, "product_id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, "count" int not null, constraint "order_product_data_model_pkey" primary key ("id"));',
    )
    this.addSql(
      'alter table "order_product_data_model" add constraint "order_product_data_model_order_id_product_id_unique" unique ("order_id", "product_id");',
    )

    this.addSql(
      'create table "product_data_model" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_data_model_pkey" primary key ("id"));',
    )

    this.addSql(
      'create table "user_data_model" ("id" varchar(255) not null, constraint "user_data_model_pkey" primary key ("id"));',
    )

    this.addSql(
      'create table "cart_data_model" ("id" varchar(255) not null, "user_id" varchar(255) not null, "is_deleted" boolean not null, constraint "cart_data_model_pkey" primary key ("id"));',
    )

    this.addSql(
      'create table "cart_product_data_model" ("id" varchar(255) not null, "cart_id" varchar(255) not null, "product_id" varchar(255) not null, "count" int not null, constraint "cart_product_data_model_pkey" primary key ("id"));',
    )
    this.addSql(
      'alter table "cart_product_data_model" add constraint "cart_product_data_model_cart_id_product_id_unique" unique ("cart_id", "product_id");',
    )

    this.addSql(
      'alter table "order_product_data_model" add constraint "order_product_data_model_order_id_foreign" foreign key ("order_id") references "order_data_model" ("id") on update cascade;',
    )

    this.addSql(
      'alter table "cart_data_model" add constraint "cart_data_model_user_id_foreign" foreign key ("user_id") references "user_data_model" ("id") on update cascade;',
    )

    this.addSql(
      'alter table "cart_product_data_model" add constraint "cart_product_data_model_cart_id_foreign" foreign key ("cart_id") references "cart_data_model" ("id") on update cascade;',
    )
    this.addSql(
      'alter table "cart_product_data_model" add constraint "cart_product_data_model_product_id_foreign" foreign key ("product_id") references "product_data_model" ("id") on update cascade;',
    )
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "order_product_data_model" drop constraint "order_product_data_model_order_id_foreign";',
    )

    this.addSql(
      'alter table "cart_product_data_model" drop constraint "cart_product_data_model_product_id_foreign";',
    )

    this.addSql(
      'alter table "cart_data_model" drop constraint "cart_data_model_user_id_foreign";',
    )

    this.addSql(
      'alter table "cart_product_data_model" drop constraint "cart_product_data_model_cart_id_foreign";',
    )

    this.addSql('drop table if exists "order_data_model" cascade;')

    this.addSql('drop table if exists "order_product_data_model" cascade;')

    this.addSql('drop table if exists "product_data_model" cascade;')

    this.addSql('drop table if exists "user_data_model" cascade;')

    this.addSql('drop table if exists "cart_data_model" cascade;')

    this.addSql('drop table if exists "cart_product_data_model" cascade;')
  }
}
