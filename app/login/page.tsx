import { Session, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthButtonClient from "../auth-button-client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Login() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {data: {session}} = await supabase.auth.getSession();
    if (session) {
        redirect("/");
    }
    return <AuthButtonClient session={session} />;
}
