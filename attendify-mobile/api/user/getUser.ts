import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import BASE_URL from "../url";

export default async function getUser(){
    try{
        const token = await AsyncStorage.getItem('authToken');
        const response = await fetch(`${BASE_URL}/auth/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        if(!response.ok){
            const errorData = await response.json();
            throw {
                status: response.status,
                statusText: errorData.error || 'Failed to fetch user data',
            }
        }
        const data = await response.json();
        
        await AsyncStorage.setItem('userData', JSON.stringify(data.student));
        return data.student;
    } catch(err: any){
        console.error("Get user error:", err);
        throw{
            status: err.status || 500,
            statusText: err.statusText || 'Error occured. Try again later'
        }
    }
}