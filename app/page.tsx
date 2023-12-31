import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../types/supabase";
import AuthButtonServer from "./auth-button-server";
import NewTweet from "@/components/new-tweet";
import { redirect } from "next/navigation";
import Likes from "./likes";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {data: {session}} = await supabase.auth.getSession();
  
  if (!session) {
    redirect("/login");
  }
  const { data } = await supabase
    .from("tweets")
    .select("*, profiles(*), likes(*)");

  const tweets = data?.map((tweet) => ({
    ...tweet,
    user_has_liked_tweet: !!tweet.likes.find(
      (like) => like.user_id==session.user.id
    ),
    likes: tweet.likes.length,
  })) ?? [];

  console.log(tweets);
  return (
  <>
    <AuthButtonServer />
    <NewTweet /> 
    <div className="tweets">
      {tweets?.map(tweet => (
        <div key={tweet.id}>
          <p>{tweet.profiles?.name} @{tweet.profiles?.username}</p>
          <p>{tweet.title}</p>
          <Likes tweet={tweet} />
        </div>
      ))}
    </div>
  </>
  );
}
