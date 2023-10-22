import { Migration } from '@mikro-orm/migrations'

export class Migration20230929202323 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "order_delivery_data_model" drop constraint "order_delivery_data_model_order_id_foreign";',
    )

    this.addSql(
      'alter table "order_payment_data_model" drop constraint "order_payment_data_model_order_id_foreign";',
    )

    this.addSql(
      'alter table "order_delivery_data_model" drop constraint "order_delivery_data_model_order_id_unique";',
    )
    this.addSql(
      'alter table "order_delivery_data_model" drop column "order_id";',
    )

    this.addSql(
      'alter table "order_payment_data_model" drop constraint "order_payment_data_model_order_id_unique";',
    )
    this.addSql(
      'alter table "order_payment_data_model" drop column "order_id";',
    )

    this.addSql(
      'alter table "order_data_model" add column "payment_id" varchar(255) not null, add column "delivery_id" varchar(255) not null;',
    )
    this.addSql(
      'alter table "order_data_model" add constraint "order_data_model_payment_id_foreign" foreign key ("payment_id") references "order_payment_data_model" ("id") on update cascade;',
    )
    this.addSql(
      'alter table "order_data_model" add constraint "order_data_model_delivery_id_foreign" foreign key ("delivery_id") references "order_delivery_data_model" ("id") on update cascade;',
    )
    this.addSql(
      'alter table "order_data_model" add constraint "order_data_model_payment_id_unique" unique ("payment_id");',
    )
    this.addSql(
      'alter table "order_data_model" add constraint "order_data_model_delivery_id_unique" unique ("delivery_id");',
    )
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "order_data_model" drop constraint "order_data_model_payment_id_foreign";',
    )
    this.addSql(
      'alter table "order_data_model" drop constraint "order_data_model_delivery_id_foreign";',
    )

    this.addSql(
      'alter table "order_data_model" drop constraint "order_data_model_payment_id_unique";',
    )
    this.addSql(
      'alter table "order_data_model" drop constraint "order_data_model_delivery_id_unique";',
    )
    this.addSql('alter table "order_data_model" drop column "payment_id";')
    this.addSql('alter table "order_data_model" drop column "delivery_id";')

    this.addSql(
      'alter table "order_delivery_data_model" add column "order_id" varchar(255) not null;',
    )
    this.addSql(
      'alter table "order_delivery_data_model" add constraint "order_delivery_data_model_order_id_foreign" foreign key ("order_id") references "order_data_model" ("id") on update cascade;',
    )
    this.addSql(
      'alter table "order_delivery_data_model" add constraint "order_delivery_data_model_order_id_unique" unique ("order_id");',
    )

    this.addSql(
      'alter table "order_payment_data_model" add column "order_id" varchar(255) not null;',
    )
    this.addSql(
      'alter table "order_payment_data_model" add constraint "order_payment_data_model_order_id_foreign" foreign key ("order_id") references "order_data_model" ("id") on update cascade;',
    )
    this.addSql(
      'alter table "order_payment_data_model" add constraint "order_payment_data_model_order_id_unique" unique ("order_id");',
    )
  }
}
