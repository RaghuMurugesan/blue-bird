import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewTweet() {

    const addTweet = async (formData: FormData) => {
        /*
            Note this action runs on the serverside

            Known Issue:
            Read after wrtie is not working. One the tweet is writter the form
            wont reset and new tweet wont appear on the list of twwets.
            
            You need to reload the page manually in order to clear the form and
            see the neewly created tweets   
        */
        "use server";
        const title = String(formData.get('title'));
        console.log("Tweet Submitted " + title);

        const supabase = createServerActionClient<Database>( { cookies });
        const {data : { user }} = await supabase.auth.getUser();
        
        if (user) {
            await supabase.from('tweets').insert({title, user_id: user.id});
        }

    }

    return (
        <form action={addTweet}>
            <input name="title" className="bg-inherit"/>
        </form>
    );
}
