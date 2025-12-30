import BASE_URL from "../url";

export default async function resetPassword(email: string, code: string, password: string) {
     try{
        const response = await fetch(`${BASE_URL}/auth/reset-password`, {
            method: "POST",
            headers: {
                'Content-Type' : "application/json",
            },
            body: JSON.stringify({email, code, password}),
        })

        if(!response.ok) {
            const errorData = await response.json();
            throw {
                status: response.status,
                statusText: errorData || "Reset password failed. Try again later",
            }
        }

        const data = await response.json();
        
        return data;
     } catch(err: any) {
        console.error("Reset password error:", err);
        throw {
            status: err.status || 500,
            statusText: err.statusText || 'Error occured. Try again later',
        }
     }


}