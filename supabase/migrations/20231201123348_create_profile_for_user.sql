-- create a public.profiles table and a function to copy data from auth.users
create table "public"."profiles" (
    "id" uuid not null,
    "name" text not null,
    "username" text not null,
    "avatar_url" text not null
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_profile_for_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profiles (id, name, username, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'user_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;$function$
;
