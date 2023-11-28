drop policy "any one can select tweets" on "public"."tweets";

create policy "authenticated users can select all tweets"
on "public"."tweets"
as permissive
for select
to authenticated
using (true);
