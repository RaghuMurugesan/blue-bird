'use client';

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthButton() {
    const supabase = createClientComponentClient<Database>();

    const handleSignIn = async () => {
        console.log("Login button click");
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            }
        });
    };

    const handleSignOut = async () => {
        console.log("Login button click");
        await supabase.auth.signOut({

        });
    };

    return (
        <>
            <button onClick={handleSignIn}>Login</button>
            <button onClick={handleSignOut}>Logout</button>
        </>
    );
}