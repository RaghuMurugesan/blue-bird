'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

export default function Likes({tweet}: {tweet: any}) {
    const router = useRouter();

    const handleLike = async () => {
        const supabase = createClientComponentClient<Database>();
        const {data: {user}} = await supabase.auth.getUser();
        if (user) {
            if (tweet.user_has_liked_tweet) {
                await supabase.from("likes")
                .delete()
                .match({user_id:user.id, tweet_id: tweet.id})
            } else {
                await supabase.from("likes")
                .insert({user_id: user.id, tweet_id: tweet.id})
            }
            router.refresh();
        }
    };

    return (
        <button onClick={handleLike}>{tweet.likes} Likes</button>
    )
}
