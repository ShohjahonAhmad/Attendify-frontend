import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../url";


type AttendanceData = {
    courseId: number,
    createdAt: string,
    attendanceId: number,
    code: string,
}
export default async function markUser(data : AttendanceData) {
    try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await fetch(`${BASE_URL}/students/attendance`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if(!response.ok){
            const errorData = await response.json();
            throw {
                status: response.status,
                statusText: errorData.error || 'Failed to mark attendance',
            }
        }

        const result = await response.json();
        return result;
    }catch (err: any){
        console.error("Mark attendance error:", err);
        throw {
            status: err.status || 500,
            statusText: err.statusText || 'Error occured. Try again later'
        }
    }
}