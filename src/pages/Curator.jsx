import { useState } from "react";
import { Form, useActionData, useLoaderData, Link } from "react-router-dom";
import { createCourse, getCourses, deleteCourse } from "../api";

export async function loader(){
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

const Curator = () => {
    const [createCourse, setCreateCourse] = useState(false);
    const loaderData = useLoaderData();
    const actionData = useActionData();
    const courseCSS = "flex items-center justify-center text-center text-white h-32 bg-indigo-500 hover:bg-indigo-400 cursor-pointer rounded-lg py-6 px-3 text-2xl";

    async function removeCourse(id) {
        try{
            const data = await deleteCourse(id);
        } catch(err) {
            console.log(err)
        }
    } 

    const courseElements = loaderData.courses.map(course => {
        return <div className="relative" key = {course.id}>
                    <div className={courseCSS}>{course.name}</div>
                    <i onClick = {() => removeCourse(course.id)} className="fa-solid fa-trash absolute right-2 bottom-2 text-red-700 text-lg cursor-pointer"></i>
               </div>
    })

    return (
        <main className="py-32 px-84">
            <button 
            onClick = {() => setCreateCourse(prev => !prev)}
            className="bg-indigo-500 w-16 rounded-md text-white font-bold hover:bg-indigo-400 py-1.5 cursor-pointer px-3 text-4xl">{createCourse ? "-" : "+"}</button>
            {createCourse && 
                <Form method = "POST" className = "mt-10 space-y-4 p-4 flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
                    <label htmlFor="name" className="block text-gray-100 font-medium text-3xl/6">Course Name</label>
                    {actionData?.err &&
                    <div className="mb-4 text-center">
                        <p className="text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 inline-block">
                        {action.err?.message || "Failed to create course"}
                        </p>
                    </div>}
                    <input id = "name" type="text" name = "name" placeholder="e.g. Course A" required 
                    className="block w-full px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 rounded-md bg-white/5"/>
                    <button type="submit" className="text-white bg-indigo-500 hover:bg-indigo-400 cursor-pointer py-1.5 w-full rounded-md text-sm/6 font-semibold text-center">Add Course</button>
                </Form>}
            <div className="grid grid-cols-4 gap-4 mt-10">
                {courseElements}
            </div>
        </main>
    )
}

export default Curator;