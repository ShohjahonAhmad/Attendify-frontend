import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import {useState} from 'react'
import SubmittingSpinner from "../utils/SubmittingSpinner";
import Logo from "../utils/Logo"
import { register } from "../api";

export async function action ({request}) {  
    console.log("in action")
    const formData = await request.formData();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword")
    try{
        if(password !== confirmPassword){
            return "Password and confirm password don't match"
        }
        const form = Object.fromEntries(formData.entries())
        delete form.confirmPassword
        const data = await register(form);  
        localStorage.setItem("user", data); 
        return redirect("/")
    } catch (err) {
        return err.message
    }
}

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const errorMessage = useActionData()
  const navigation = useNavigation();
  console.log(errorMessage)
  const baseInput = "mt-2 block px-3 py-1.5 outline-1 -outline-offset-1 outline-white/10 text-white rounded-md text-base bg-white/5 w-full placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"

  function handleShowPassword() {
    setShowPassword(prev => !prev)
  }

  function handleShowPassword2() {
    setShowPassword2(prev => !prev)
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-8 h-screen">
        <div className="max-w-sm w-full flex flex-col space-y-6">
            <Logo/>
            <h1 className="font-bold text-2xl/9 text-white text-center tracking-tight">Create an account</h1>
            {errorMessage && (
            <div className="text-center">
                <p className="text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 inline-block">
                {errorMessage.message}
                </p>
            </div>
            )}
            <Form method = "POST" replace className="space-y-6">
                <div>
                <label htmlFor="firstName" className="block text-gray-100 font-medium text-sm/6">First Name</label>
                    <input id="firstName" type="text" name="firstName" required autoComplete="given-name"
                        className={baseInput}/>
                </div>
                <div>
                <label htmlFor="lastName" className="block text-gray-100 font-medium text-sm/6">Last Name</label>
                    <input id="lastName" type="text" name="lastName" required autoComplete="family-name"
                        className={baseInput}/>
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-100 font-medium text-sm/6">Email address</label>
                    <input id="email" type="email" name="email" required autoComplete="email"
                        className={baseInput}/>
                </div>
                <div>
                    <label htmlFor="uniqueIdentifier" className="block text-gray-100 font-medium text-sm/6">Unique Identifier</label>
                    <input id="uniqueIdentifier" type="text" name="uniqueIdentifier" required placeholder="e.g. staffId"
                        className={baseInput}/>
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-100 font-medium text-sm/6" minLength={8}>Password</label>
                    <div className="relative">
                        <input id="password" type={showPassword ? "text" : "password"} name="password" required autoComplete="new-password"
                            className={`${baseInput} pr-10`}/>
                            <button type="button"
                                    onClick={handleShowPassword}
                                    className="absolute inset-y-0 right-2 flex items-center cursor-pointer">
                            <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-gray-400 text-sm/6 hover:text-white`}></i>
                            </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-gray-100 font-medium text-sm/6" minLength={8}>Confirm Password</label>
                    <div className="relative">
                        <input id="confirmPassword" type={showPassword2 ? "text" : "password"} name="confirmPassword" required 
                            className={`${baseInput} pr-10`}/>
                        <button type="button"
                                    onClick={handleShowPassword2}
                                    className="absolute inset-y-0 right-2 flex items-center cursor-pointer">
                            <i className={`fa-solid ${showPassword2 ? "fa-eye-slash" : "fa-eye"} text-gray-400 text-sm/6 hover:text-white`}></i>
                            </button>
                    </div>
                </div>
                <div>
                <label htmlFor="institution" className="block text-gray-100 font-medium text-sm/6">Organization</label>
                    <input id="institution" type="text" name="institution" required placeholder="e.g. university or company"
                        className={baseInput}/>
                </div>

                <button type="submit" className="text-sm/6 font-semibold w-full text-white bg-indigo-500 hover:bg-indigo-400 rounded-md py-1.5 cursor-pointer">Create account</button>
            </Form>
        </div>
    </div>
  );
};

export default Registration;
