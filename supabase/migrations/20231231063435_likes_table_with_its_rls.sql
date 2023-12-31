create table "public"."likes" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "tweet_id" uuid not null
);


alter table "public"."likes" enable row level security;

CREATE UNIQUE INDEX likes_pkey ON public.likes USING btree (id);

alter table "public"."likes" add constraint "likes_pkey" PRIMARY KEY using index "likes_pkey";

alter table "public"."likes" add constraint "likes_tweet_id_fkey" FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE not valid;

alter table "public"."likes" validate constraint "likes_tweet_id_fkey";

alter table "public"."likes" add constraint "likes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."likes" validate constraint "likes_user_id_fkey";

grant delete on table "public"."likes" to "anon";

grant insert on table "public"."likes" to "anon";

grant references on table "public"."likes" to "anon";

grant select on table "public"."likes" to "anon";

grant trigger on table "public"."likes" to "anon";

grant truncate on table "public"."likes" to "anon";

grant update on table "public"."likes" to "anon";

grant delete on table "public"."likes" to "authenticated";

grant insert on table "public"."likes" to "authenticated";

grant references on table "public"."likes" to "authenticated";

grant select on table "public"."likes" to "authenticated";

grant trigger on table "public"."likes" to "authenticated";

grant truncate on table "public"."likes" to "authenticated";

grant update on table "public"."likes" to "authenticated";

grant delete on table "public"."likes" to "service_role";

grant insert on table "public"."likes" to "service_role";

grant references on table "public"."likes" to "service_role";

grant select on table "public"."likes" to "service_role";

grant trigger on table "public"."likes" to "service_role";

grant truncate on table "public"."likes" to "service_role";

grant update on table "public"."likes" to "service_role";

create policy "anyone can select likes"
on "public"."likes"
as permissive
for select
to public
using (true);


create policy "authenticated users can delete their own tweets"
on "public"."likes"
as permissive
for delete
to authenticated
using ((user_id = auth.uid()));


create policy "authenticated users create their own likes"
on "public"."likes"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));
