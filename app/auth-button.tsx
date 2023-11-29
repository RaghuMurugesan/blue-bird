'use client';

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AuthButton() {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <>
            <button onClick={handleSignIn}>Login</button>
            <button onClick={handleSignOut}>Logout</button>
        </>
    );
}