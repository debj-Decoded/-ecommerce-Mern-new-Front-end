import { Link, Navigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { selectError, LoginUserAsync, selectLoggedIn } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Login() {
  const error = useSelector(selectError)
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedIn)

  return (
    <>
      {user && <Navigate to='/' replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
        console.log("login data is",data)

            dispatch(LoginUserAsync({ email: data.email, password: data.password }))
            
          })}>
      
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: true, pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email invalid"
                    }
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to={'/ForgetPassword'}>
                  <div href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </div>
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", { required: true })}
                  type="password"

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                   {error && <p className="text-red-500">{error.message}</p>}  
              </div>
            </div>
 
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login in
              </button>
            </div>
          </form>
          
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/SignUp" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
