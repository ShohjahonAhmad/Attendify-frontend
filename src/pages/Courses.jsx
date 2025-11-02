import { useEffect, useState } from "react";
import { Form, useActionData, useLoaderData, Link, useNavigation, redirect } from "react-router-dom";
import { createCourse, getCourses, deleteCourse } from "../api";
import SubmittingSpinner from "../utils/SubmittingSpinner";

export async function loader(){
    if(!localStorage.getItem("token")){
        redirect('/login')
    }
    try{
        const data = await getCourses();
        return data;
    } catch(err){
        throw err;
    }
}

export async function action({request}) {
    const formData = await request.formData();
    const name = formData.get("name");
    try{
        const data = await createCourse({name});
        return data
    } catch(err){
        return {err};
    }

}

const Courses = () => {
    const [createMode, setCreateMode] = useState(false);
    const loaderData = useLoaderData();
    const [courses, setCourses] = useState(loaderData.courses)
    const actionData = useActionData();
    const navigation = useNavigation();
    const courseCSS = "flex items-center w-full justify-center text-center text-white h-32 bg-indigo-500 hover:bg-indigo-400 cursor-pointer rounded-lg py-6 px-3 text-xl lg:text-2xl";

    useEffect(() => {
        if(actionData?.course){
        setCourses(prev => [...prev, actionData.course])
        }
    }, [actionData])

    async function removeCourse(id) {
        try{

            await deleteCourse(id);
            setCourses(prevCourses => prevCourses.filter(course => course.id != id))
        } catch(err) {
            console.log(err)
        }
    } 

    const courseElements = courses.map(course => {
        return <Link to = {`${course.id}`} className="relative" key = {course.id}>
                    <div className={courseCSS}>{course.name}</div>
                    <i onClick = {e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const isConfirmed = window.confirm("Are you sure you want to delete this course?")
                        if(!isConfirmed) return;
                        removeCourse(course.id)}} 
                       className="fa-solid fa-trash absolute right-2 bottom-2 text-red-700 text-lg cursor-pointer"></i>
               </Link>
    })

    return (
        <main className="p-4 2xl:py-32 2xl:px-84">
            <div className="flex items-center">
                <button 
                    onClick = {() => setCreateMode(prev => !prev)}
                    className="bg-indigo-500 w-16 rounded-md text-white font-bold hover:bg-indigo-400 py-1.5 cursor-pointer px-3 text-4xl"
                >
                    {createMode ? "-" : "+"}
                </button>

                {
                    courses.length === 0 && 
                    <h1 className="text-white text-lg sm:text-xl/3 md:text-2xl/4 lg:text-3xl/6 xl:text-4xl/9 font-bold tracking-tight ml-1 sm:ml-4">
                        {"\u{27F5} Add course here"}
                    </h1>
                }
            </div>
            {createMode && 
                <Form method = "POST" className = "mt-10 space-y-4 p-4 flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
                    <label htmlFor="name" className="block text-gray-100 font-medium text-3xl/6">Course Name</label>
                    {actionData?.err &&
                    <div className="mb-4 text-center">
                        <p className="text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 inline-block">
                        {actionData.err?.message || "Failed to create course"}
                        </p>
                    </div>}
                    <input id = "name" type="text" name = "name" placeholder="e.g. Course A" required 
                    className="block w-full px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 rounded-md bg-white/5"/>
                    <button type="submit" className={`flex justify-center text-white hover:bg-indigo-400 py-1.5 w-full rounded-md text-sm/6 font-semibold text-center 
                                                        ${navigation.state === "submitting" ? "bg-indigo-400 cursor-not-allowed" : 
                                                                                               "bg-indigo-500 cursor-pointer hovevisible:our:bg-indigo-400 focus:outline-indigo-500"}`}>
                        {navigation.state === "submitting" ? <SubmittingSpinner/> : "Add Course"}
                    </button>
                </Form>}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-10">
                {courseElements}
            </div>
        </main>
    )
}

export default Courses;