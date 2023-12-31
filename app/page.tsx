import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../types/supabase";
import AuthButtonServer from "./auth-button-server";
import NewTweet from "@/components/new-tweet";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {data: {session}} = await supabase.auth.getSession();
  
  if (!session) {
    redirect("/login");
  }
  const { data: tweets } = await supabase
    .from("tweets")
    .select("*, profiles(*)");

  return (
  <>
    <AuthButtonServer />
    <NewTweet />
    <pre>{JSON.stringify(tweets, null, 2)}</pre>
  </>
  );
}
