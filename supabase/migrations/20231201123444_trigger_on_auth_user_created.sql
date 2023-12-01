-- trigger which call function that will copy user data from auth.user to public.profiles
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION create_profile_for_user();
