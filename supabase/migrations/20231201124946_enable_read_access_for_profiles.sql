create policy "enable read access for profiles"
on "public"."profiles"
as permissive
for select
to public
using (true);
