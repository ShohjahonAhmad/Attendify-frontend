import { Link, useLoaderData, useNavigation, useParams } from "react-router-dom";
import { createAttendance, deleteAttendance, getAttendances } from "../api";
import { useState } from "react";
import formatDate from "../utils/formatDate";
import Spinner from "../utils/spinner";

export async function loader({params}){
    if(!localStorage.getItem("token")){
        redirect('/login')
    }
    try{
        const data = await getAttendances(params.id);
        return data;
    }catch(err){
        return {
            message: err.message
        }
    }
}


const Course = () => {
    const params = useParams();
    const loaderData = useLoaderData();
    const [attendances, setAttendances] = useState(loaderData?.attendances || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const courseCSS = "flex items-center justify-center text-center text-white h-32 bg-indigo-500 hover:bg-indigo-400 cursor-pointer rounded-lg py-6 px-3 text-xl lg:text-2xl";

    function addAttendance(){
            setLoading(true);
            setError(null);
            createAttendance(params.id)
            .then(data => setAttendances(prev => [...prev, data.attendance]))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }

    async function removeAttendance(id) {
        try {
            const result = await deleteAttendance(params.id, id);
            if(result){
                setAttendances(prev => prev.filter(attendance => attendance.id !== id));
            }
        } catch(err) {
            loaderData.message = err.message
        }
    }
    
    const attendanceElements = attendances.map(attendance => {
        return <Link to = {`attendances/${attendance.id}`} className="relative" key = {attendance.id} state = {attendance} >
                    <div className={courseCSS}>{formatDate(new Date(attendance.createdAt))}</div>
                    <i onClick = {e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const isConfirmed = window.confirm("Are you sure you want to delete this attendance?")
                        if(!isConfirmed) return
                        removeAttendance(attendance.id);
                    }} 
                    className="fa-solid fa-trash absolute right-2 bottom-2 text-red-700 text-lg cursor-pointer"></i>
                </Link> 
    })
    
   return <main className="p-4 2xl:py-32 2xl:px-84">
            <div className="flex items-center">
                <button 
                    onClick = {addAttendance}
                    className="bg-indigo-500 w-16 rounded-md text-white font-bold hover:bg-indigo-400 py-1.5 cursor-pointer px-3 text-4xl"
                >
                    {loading ? <Spinner/> : "+"}
                </button>
                {
                    attendances.length === 0 && 
                    <h1 className="text-white text-lg sm:text-xl/3 md:text-2xl/4 lg:text-3xl/6 xl:text-4xl/9 font-bold tracking-tight ml-1 sm:ml-4">
                        {"\u{27F5} Add attendance here"}
                    </h1>
                }
            </div>


            {
                loaderData.message && 
                <div className="mb-4 text-center">
                    <p className="text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 inline-block">
                    {loaderData?.message || "Failed to get attendances"}
                    </p>
                </div>
            }

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-10">
                {attendanceElements}
            </div>
          </main>
}

export default Course;