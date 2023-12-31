create policy "Authenticated users can insert THEIR own tweet"
on "public"."tweets"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));
