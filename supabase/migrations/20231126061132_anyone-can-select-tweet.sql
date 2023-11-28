CREATE POLICY "any one can select tweets" ON "public"."tweets"
AS PERMISSIVE FOR SELECT
TO public
USING (true)
