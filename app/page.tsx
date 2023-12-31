import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./types/supabase";
import AuthButtonServer from "./auth-button-server";
import NewTweet from "@/app/components/new-tweet";
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
    .select("*, author: profiles(*), likes(user_id)");

  const tweets = data?.map((tweet) => ({
    ...tweet,
    author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
    user_has_liked_tweet: !!tweet.likes.find(
      (like) => like.user_id==session.user.id
    ),
    likes: tweet.likes.length,
  })) ?? [];

  return (
  <>
    <AuthButtonServer />
    <NewTweet /> 
    <div className="tweets">
      {tweets?.map(tweet => (
        <div key={tweet.id}>
          <p>{tweet.author.name} @{tweet.author.username}</p>
          <p>{tweet.title}</p>
          <Likes tweet={tweet} />
        </div>
      ))}
    </div>
  </>
  );
}
