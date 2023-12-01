-- point userid of twwets to public.profiles.id instead of auth.users.id
alter table "public"."tweets" drop constraint "tweets_user_id_fkey";

alter table "public"."tweets" add constraint "tweets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."tweets" validate constraint "tweets_user_id_fkey";
