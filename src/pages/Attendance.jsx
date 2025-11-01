import {QRCodeSVG} from "qrcode.react"
import { useLocation } from "react-router-dom"
import { useRef } from "react";

const Attendance = () => {
    const qrcodeRef = useRef(null)
    const location = useLocation();
    const {courseId, createdAt, qrCode: {attendanceId, code}} = location.state;
    console.log(courseId);
    console.log(createdAt);
    console.log(attendanceId);
    console.log(code);

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
        </main>
    )
}

export default Attendance