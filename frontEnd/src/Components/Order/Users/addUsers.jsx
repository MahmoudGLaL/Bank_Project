import React, { useContext, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';
import { authcontext } from '../../../Context/authcontext';
import { FaEye } from "react-icons/fa";
import { login } from '../../Schema/ordersScema';

export default function AddUser() {

  let { addRole } = useContext(authcontext)


  const [selectedOption, setSelectedOption] = useState('');


  const [isKeyDown, setIsKeyDown] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);


  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);

  };
  // console.log(selectedOption);
  // console.log(selectedOption);

  const initialValues = {
    username: '',
    password: '',
    name: "",
    role: ""
  };



  const handleKeyDown = (pass) => {
    if (pass !== '') {
      setIsKeyDown(true);
    }
    else {
      setIsKeyDown(false);
      setPasswordVisible(false);
    }
  };

  const handleKeyUp = (pass) => {
    if (pass !== '') {
      setIsKeyDown(true);
    }
    else {
      setIsKeyDown(false);
      setPasswordVisible(false);
    }
  };

  // showPassword

  const showPassword = () => {
    setPasswordVisible(!passwordVisible)
  }
  const handleErorr = (e) => {
    e.preventDefault()
    toast.error("من فضلك تحقق من صحة البيانات")
  }

  let formik = useFormik({
    validationSchema: login,
    initialValues,
    onSubmit: (values, actions) => {
      addRole(values, selectedOption)
      actions.resetForm()
    }




  })
  return (
    <div dir='rtl' className='font-tajawal bg-[#e7e7e7]'>
      <form className="my-form" onSubmit={formik.isValid ?  formik.handleSubmit : handleErorr}  >
        <div className="flex justify-center items-center  ">
          <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-16  text-right min-w-[35%] flex flex-col  justify-start my-24">
            <h2 className="text-xl font-semibold  mb-12 text-gray-800 text-center">اضافة مستخدم</h2>

            <div className="mb-4">
              <label htmlFor="role" className="block text-lg font-semibold mb-2 text-[#c59025]">صلاحية المستخدم</label>
              <select
                id="role"
                value={selectedOption}
                onBlur={formik.handleBlur}
                onChange={handleDropdownChange}
                className="block w-full bg-gray-100 border  mb-4 border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c59025] transition duration-200 ease-in-out text-lg font-bold"
                required
              >
                <option value="" disabled>اختر الصلاحيه</option>
                <option value="SuperAdmin">مسؤول عالي</option>
                <option value="admin">مسؤول</option>
                <option value="user">مستخدم</option>
                {/* <option value="orderCreator">موظف امر توريد</option>
                <option value="payer">موظف دفع</option> */}
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-[#c59025]">اسم الموظف</label>
              <input
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c59025] transition duration-200 ease-in-out text-lg font-medium"
                type="text"
                required
              />
              <div className="text-red-700 font-bold text-xs mt-2  ">
                {formik.errors.name && formik.touched.name && <p className='form-error'>{formik.errors.name}</p>}
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="username" className="block text-sm font-semibold mb-2 text-[#c59025]">اسم المستخدم </label>
              <input
                id="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="username"
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c59025] transition duration-200 ease-in-out text-lg font-semibold"
                type="text"
                required
              />
               <div className="text-red-700 font-bold text-xs mt-2  ">
                {formik.errors.username && formik.touched.username && <p classname='form-error'>{formik.errors.username}</p>}
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="block text-sm font-semibold mb-2 text-[#c59025]">الرقم السرى</label>
              <div className="relative">
                <input
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  className="block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c59025] transition duration-200 ease-in-out font-semibold text-lg"
                  type={passwordVisible ? "text" : "password"}
                  onKeyDown={() => handleKeyDown(formik.values.password)}
                  onKeyUp={() => handleKeyUp(formik.values.password)}
                  required
                />
                <span
                  className="absolute text-left left-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 transition duration-200 ease-in-out"
                  onClick={showPassword}
                >
                  {/* <FontAwesomeIcon icon={faEye} className={`${isKeyDown ? "block" : "hidden"} text-xl mx-2 `} /> */}
                  <FaEye className={`${isKeyDown ? "block" : "hidden"} text-lg mx-1 `} />
                </span>
                <div className="text-red-700 font-bold text-xs mt-2 absolute  ">
                {formik.errors.password && formik.touched.password && <p classname='form-error'>{formik.errors.password}</p>}
              </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#c59025] hover:bg-[#f0bb51] mt-8 text-white font-bold py-3 px-6 rounded-lg  transition duration-200 ease-in-out transform hover:scale-105"
            >
              أضافة
            </button>
            <ToastContainer />
          </div>
        </div>
      </form>



    </div>
  )
}


