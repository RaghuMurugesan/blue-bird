import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../types/supabase";
import AuthButton from "./auth-button";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: tweets } = await supabase.from("tweets").select();

  const handleSignIn = () => {
    console.log("clicked login");
  };

  return (
  <>
    <AuthButton />
     <pre>{JSON.stringify(tweets, null, 2)}</pre>
  </>
  );
}
