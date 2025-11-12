import {  useState } from "react";
import Papa from 'papaparse';
import { bulkCreateStudents } from "../api";
import Spinner from "../utils/spinner";

const StudentAccounts = () => {
    const defaultState = "File not chosen";
    const [fileName, setFileName] = useState(defaultState);
    const [file, setFile] = useState(null);
    const [students, setStudents] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);

    const studentElements = students !== null && students.map(student => (
        <tr 
            className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700"
            key = {student.uniqueIdentifier}
        >
            <td className="px-6 py-3">
                {student.firstName}
            </td>
            <td className="px-6 py-3">
                {student.lastName}
            </td>
            <td className="px-6 py-3">
                {student.uniqueIdentifier}
            </td>
            <td className="px-6 py-3">
                {student.email}
            </td>
            <td className="px-6 py-3">
                {student.password}
            </td>
            <td className="px-6 py-3">
                {student.institution}
            </td>
        </tr>
    ))

    function handleFileChange(e) {
        if(e.target.files.length === 0){
            setFile(null);
            setFileName(defaultState);
        } else {
            Papa.parse(e.target.files[0], {
                header: true,
                delimiter: ",",
                complete: (results) => {
                    setFile(results.data)
                    console.log(results.data)
                }
            })
            setFileName(e.target.files[0].name);
        }
    }

    async function handleProcessFile(){
        try{
            setError(null);
            setLoading(true);
            const students = await bulkCreateStudents(file) 
            setStudents(students.students);
            setLoading(false);
        } catch(err){
            setLoading(false)
            setError(err)
        }
    }

    async function downloadCSV() {
        const text = Papa.unparse(students, {header: true,});
        const blob = new Blob(["\uFEFF" + text], {type: "text/csv;charset=utf-8;"});

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `student_list.csv`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)

        URL.revokeObjectURL(url);
    }

    return (
        <main className="p-4 2xl:py-32 2xl:px-84">
            <div className="flex gap-x-2">
                <div className="flex flex-1 flex-col gap-2">
                <input
                    type="file"
                    id="file"
                    name="file"
                    className="hidden" // hide the default input
                    onChange={handleFileChange}
                />
                <label
                    htmlFor="file"
                    className="w-full text-lg text-white bg-indigo-500 hover:bg-indigo-400 cursor-pointer rounded-md px-3 py-1.5 font-semibold text-center block"
                >
                    Upload Student List (CSV)
                </label>
                <span className="text-gray-200 text-lg">
                    {fileName !== defaultState && <i className="fa-solid fa-file "></i>}
                    {fileName}
                </span>
                </div>
                <div className="flex-1">
                    <button 
                        className={`w-full text-lg text-white bg-indigo-500
                                    hover:bg-indigo-400 cursor-pointer rounded-md
                                    px-3 py-1.5 font-semibold text-center block
                                    disabled:bg-gray-400 disabled:cursor-not-allowed`}
                        disabled = {file === null}
                        onClick={handleProcessFile}
                    >
                        {loading === true ? <Spinner/> : "Process the Student List"}
                    </button>
                </div>
            </div>
            {
                students !== null &&
                <div className="flex justify-end mt-8">
                    <button 
                        className="ext-lg text-white bg-indigo-500 hover:bg-indigo-400 cursor-pointer rounded-md px-3 py-1.5 font-semibold text-center "
                        onClick={downloadCSV}    
                    >
                        Download CSV
                    </button>
                </div>
            }
            {
                students !== null && 
                <div className="sm:rounded-lg shadow-md relative overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left text-gray-500 mt-8">
                        <thead className="text-lg uppercase bg-gray-700 text-gray-400">
                            <tr>
                                <th itemScope="col" className="px-6 py-3">
                                    First Name
                                </th>
                                <th itemScope="col" className="px-6 py-3">
                                    Last Name
                                </th>
                                <th itemScope="col" className="px-6 py-3">
                                    Matriculation Number
                                </th>
                                <th itemScope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th itemScope="col" className="px-6 py-3">
                                    Password
                                </th>
                                <th itemScope="col" className="px-6 py-3">
                                    Institution
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentElements}
                        </tbody>
                    </table>
                </div>
            }
        </main>
    );
}

export default StudentAccounts;