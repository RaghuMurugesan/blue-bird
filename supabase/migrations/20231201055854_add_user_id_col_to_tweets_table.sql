-- _add user id col to tweets table
alter table "public"."test_tenant" drop constraint "test_tenant_pkey";

drop index if exists "public"."test_tenant_pkey";

drop table "public"."test_tenant";

alter table "public"."tweets" add column "user_id" uuid not null;

drop sequence if exists "public"."test_tenant_id_seq";

alter table "public"."tweets" add constraint "tweets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."tweets" validate constraint "tweets_user_id_fkey";