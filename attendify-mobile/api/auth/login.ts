import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../url";

export default async function login (email: string, password: string) {
    try {
        const response = await fetch(`${BASE_URL}/auth/student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
    
        
        if(!response.ok) {
            const errorData = await response.json();
            throw {
                status: response.status,
                statusText: errorData.error || 'Login failed',
            }
        }
    
        const data = await response.json();
    
        if (!data.token) {
            throw {
                status: 500,
                statusText: 'Token not provided. Login failed',
            }
        }
        
        return data.token;
    } catch (err: any){
        console.error("Login error:", err);
        throw {
            status: err.status || 500,
            statusText: err.statusText || 'Error occured. Try again later'
        }
    }
} 