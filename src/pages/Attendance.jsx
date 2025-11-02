import {QRCodeSVG} from "qrcode.react"
import { useLocation } from "react-router-dom"
import { useRef, useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const baseUrl = import.meta.env.VITE_BASE_URL
const token = localStorage.getItem("token")

const Attendance = () => {
    const [students, setStudents] = useState([]);
    const qrcodeRef = useRef(null);
    const location = useLocation();
    const {courseId, createdAt, qrCode: {attendanceId, code}} = location.state;

    const studentElements = students.map(student => (
        <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700" key={student.id}>
            <td className="px-6 py-3 text-ellipsis">
                {student.firstName}
            </td>
            <td className="px-6 py-3">
                {student.lastName}
            </td>
            <td className="px-6 py-3">
                {student.uniqueIdentifier}
            </td>
            <td className="px-6 py-3">
                <i className="fa-solid fa-square-check text-green-500"></i>
            </td>
        </tr>
    ))
     

    function downloadQrcode() {
        const svg = qrcodeRef.current.querySelector("svg");
        if(!svg) return;

        const string = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([string], { type: "image/svg+xml;charset=utf-8"});

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `attendance_${attendanceId}.svg`
        link.click();

        URL.revokeObjectURL(url);
    }

    useEffect(() => {
        const url = `${baseUrl}/courses/${courseId}/attendances/${attendanceId}/events`;
        const controller = new AbortController();

        fetchEventSource(url, {
            method: "GET",
            headers: {
                "Accept": "text/event-stream",
                "Authorization": `Bearer ${token}`
            },
            signal: controller.signal,
            onmessage(msg) {
                if(msg.event === "attendanceUpdate"){
                    const attendance = JSON.parse(msg.data);
                    setStudents(attendance.students);
                } else if(msg.event === "connected") {
                    console.log("Connection message: ", msg.data)
                } else {
                    console.log("Error", msg.data)
                }
                
            },
            onerror(err) {
                console.error('EventSource error:', err);
                controller.abort();
            },
        }, );
        return () => controller.abort()
    }, [])

    return (
        <main className="p-4 2xl:py-32 2xl:px-84 flex flex-col items-center">
            <section className="flex flex-col items-center gap-4">
                <h1 className="text-white text-2xl/9 tracking-tight text-bold">
                    Attendance QR code
                </h1>
                <div ref={qrcodeRef}>
                    <QRCodeSVG value = {JSON.stringify({courseId, createdAt, attendanceId, code})} size = {256} className="border border-5 border-yellow-400"/>
                </div>
                <button 
                    className="rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white bg-indigo-500 cursor-pointer hover:bg-indigo-400 focus:outline-indigo-500"
                    onClick = {downloadQrcode}
                >
                    Download the QR code <i className="fa-solid fa-download"></i>
                </button>
            </section>
            <section className="sm:rounded-lg shadow-md relative overflow-x-auto w-full custom-scrollbar">
                <table className="w-full text-left text-gray-500 dark:text-gray-400 mt-8">
                    <thead className="text-lg uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th itemScope="col" className = "px-6 py-3">
                                First Name
                            </th>
                            <th itemScope="col" className = "px-6 py-3">
                                Last Name
                            </th>
                            <th itemScope="col" className = "px-6 py-3">
                                Matriculation Number
                            </th>
                            <th itemScope="col" className="px-6 py-3">
                                Present
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {studentElements}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Attendance