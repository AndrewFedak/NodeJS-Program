import { Migration } from '@mikro-orm/migrations'

export class Migration20230929202156 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "order_delivery_data_model" ("id" varchar(255) not null, "order_id" varchar(255) not null, "type" varchar(255) not null, "address" varchar(255) not null, constraint "order_delivery_data_model_pkey" primary key ("id"));',
    )
    this.addSql(
      'alter table "order_delivery_data_model" add constraint "order_delivery_data_model_order_id_unique" unique ("order_id");',
    )

    this.addSql(
      'create table "order_payment_data_model" ("id" varchar(255) not null, "order_id" varchar(255) not null, "type" varchar(255) not null, "address" varchar(255) null, "credit_card" varchar(255) null, constraint "order_payment_data_model_pkey" primary key ("id"));',
    )
    this.addSql(
      'alter table "order_payment_data_model" add constraint "order_payment_data_model_order_id_unique" unique ("order_id");',
    )

    this.addSql(
      'alter table "order_delivery_data_model" add constraint "order_delivery_data_model_order_id_foreign" foreign key ("order_id") references "order_data_model" ("id") on update cascade;',
    )

    this.addSql(
      'alter table "order_payment_data_model" add constraint "order_payment_data_model_order_id_foreign" foreign key ("order_id") references "order_data_model" ("id") on update cascade;',
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "order_delivery_data_model" cascade;')

    this.addSql('drop table if exists "order_payment_data_model" cascade;')
  }
}
