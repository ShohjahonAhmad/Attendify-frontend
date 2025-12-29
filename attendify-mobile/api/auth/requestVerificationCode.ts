import BASE_URL from "../url";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default async function requestVerificationCode (email: string) {
    try {
        const response = await fetch(`${BASE_URL}/auth/verification-code`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        })

        if(!response.ok) {
            const errorData = await response.json();
            throw {
                status: response.status,
                statusText: errorData || "Verification code request failed",
            }
        }

        const data = await response.json();

        if(!data.code) {
            throw {
                status: 500,
                statusText: 'Code not provided. The operation failed',
            }
        }
        AsyncStorage.setItem("passwordCode", data.code);

        return "If the email exists, a verification code has been sent.";
    } catch(err: any){
        console.error("Verification code request error: ", err);
        throw {
            status: err.status || 500,
            statusText: err.statusText || 'Error occured. Try again later',
        }
    }
}