import { Link, Form, useActionData, redirect, useNavigation,  } from "react-router-dom";
import Logo from "../utils/Logo";
import { login } from "../api";
import SubmittingSpinner from "../utils/SubmittingSpinner";

export async function action ({request}) {
    const formData = await request.formData();
    const email = await formData.get("email")
    const password = await formData.get("password")
    try{
        const data = await login({email, password});
        localStorage.setItem("token", data.token);
        return redirect("/")
    } catch (err) {
        console.log(err)
        return err.message
    }
}

export async function loader () {
    if (localStorage.getItem("token")){
        return redirect("/");
    }
}

const Login = () => {
    const errorMessage = useActionData()
    const navigation = useNavigation()
    console.log(localStorage.getItem("token"))
    return (
        <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo/>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
          {errorMessage && (
            <div className="mt-4 text-center">
                <p className="text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 inline-block">
                {errorMessage}
                </p>
            </div>
            )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form method="POST" replace className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled = {navigation.state === "submitting"}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white
                  ${navigation.state === "submitting" 
                    ? "bg-indigo-400 cursor-not-allowed" 
                    : "bg-indigo-500 hovevisible:our:bg-indigo-400 focus:outline-indigo-500"
                  }`}
              >
                {navigation.state === "submitting" ? <SubmittingSpinner/> : "Sign in"}
              </button>
            </div>
          </Form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Don't have an account?{' '}
            <Link to="/registration" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
    )
}

export default Login