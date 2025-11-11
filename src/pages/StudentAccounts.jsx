import { useState } from "react";

const StudentAccounts = () => {
    const [fileName, setFileName] = useState("File not chosen")

    function handleFileChange(e) {
        if(e.target.files.length === 0){
            setFileName("File not chosen")
        } else {
            setFileName(e.target.files[0].name)
        }
    }

    return (
        <main className="p-4 2xl:py-32 2xl:px-84">
            <div className="flex">
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
                    className="w-full text-sm text-white bg-indigo-500 hover:bg-indigo-400 cursor-pointer rounded-md px-3 py-1.5 font-semibold text-center block"
                >
                    Upload Student List (CSV)
                </label>
                <span className="text-gray-200 text-sm">
                    {fileName}
                </span>
                </div>
                <div className="flex-1">

                </div>
            </div>
        </main>
    );
}

export default StudentAccounts;