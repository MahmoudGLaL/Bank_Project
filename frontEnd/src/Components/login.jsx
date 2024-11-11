
import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { authcontext } from '../Context/authcontext';

const Login = () => {
  let  {LoginAPi} = useContext(authcontext)
  let [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate()

  const initialValues = {
    username: '',
    password: '',
    role: ""
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    formik.handleSubmit()
  }


  let formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      setisLoading(true)
      setTimeout(()=> {
        LoginAPi(values, navigate, setisLoading)
      } ,[800])

    }
  })

  return (
    <div classNameName=''>

      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-between py-6 px-4 bg-[#5B99C2] ">

          <div className=" px-32  min-h-[95vh] border min-w-[50%] col-md-4 border-gray-300 rounded-lg  max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto bg-white ">
            <form className="space-y-4 p-12 translate-y-[50%] border border-gray-500 rounded-lg " onSubmit={handleSubmit} >
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">تسجيل الدخول</h3>
              </div>

              <div>

                <div className="relative flex items-center ">
                  <input onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="username" type="text" required className="w-full font-medium text-xl mb-2 text-gray-800 border border-gray-300 px-4 rounded-lg outline-[#5B99C2] h-100 py-5" placeholder="اسم المستخدم" />
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute left-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg> */}
                </div>
              </div>
              <div>
                <div className="relative flex items-center">
                  <input onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="password" type="password" required className="w-full font-medium text-xl text-gray-800 border border-gray-300 px-4  rounded-lg outline-[#5B99C2] py-5 h-100" placeholder="الباسورد" />
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute left-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg> */}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-[#5B99C2] focus:ring-[#5B99C2] border-gray-300 rounded p" />
                  <label for="remember-me" className="mr-2 block text-sm text-gray-800">
                    تذكرني
                  </label>
                </div>

                <div className="text-sm">
                  <a href="jajvascript:void(0);" className="text-[#5B99C2] hover:underline font-semibold">
                    هل نسيت كلمة السر ؟
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button type="submit" className="w-full text-xl  font-bold shadow-xl py-3 px-4  tracking-wide rounded-lg text-white bg-[#5B99C2] hover:bg-[#258052] focus:outline-none">
                  {isLoading ? <> <div class="flex justify-center items-center ">
                    <div class="w-8  border-4 border-white border-t-transparent border-solid rounded-full animate-spin h-8"></div>
                  </div>
                  </> : ' تسجيل الدخول'}
                </button>
              </div>

              {/* <p className="text-sm !mt-8 text-center text-gray-800">ليس لديك حساب  <a href="javascript:void(0);" className="text-[#5B99C2] font-semibold hover:underline ml-1 whitespace-nowrap"> انشئ حساب </a></p> */}
            </form>
          </div>
          <div className="  w-[45%] left-side p-0  ">
            <h1 className='text-white text-4xl'>منظومة تحصيل القوات المسلحه</h1>
          </div>

        </div>
      </div>


      <ToastContainer />
    </div>
  )
}

export default Login
