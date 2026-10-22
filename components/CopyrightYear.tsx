import { connection } from "next/server";


export default async function CopyrightYear() {
    await connection()
    return <>{new Date().getFullYear()}</>;
}
