
import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { authcontext } from '../../Context/authcontext';
import Image from '../../assests/bank-building.png'
// import Image from '../../images/logo3.jpg'

import money from '../../images/money2.jpg'
import axios from 'axios';





const Login = () => {
  let { getAllTreasuries, AllTreasuries, accessTreasury } = useContext(authcontext)
  let [isLoading, setisLoading] = useState(false)
  let [toggle, setToggle] = useState(false)
  let [User, setUser] = useState('')
  const [selectedOption, setSelectedOption] = useState('');

  const navigate = useNavigate()

  const initialValues = {
    username: '',
    password: '',
    token: "string"
  };


  useEffect(() => {
    getAllTreasuries()
  }, [])

  let filtered_tres = AllTreasuries.filter((tres) => tres.treasuryName !== 'عجوزه')

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);

  };


  async function LoginAPi(values) {

    await axios.post('https://localhost:44365/api/Users/login', values).then(res => {
      if (res.data.role === 'admin') {
        accessTreasury({
          userId: localStorage.getItem('id'),
          treasuryId: '1'
          // startBalance: startAmount
        }, navigate)
      }
      else if (res.data.role === "SuperAdmin") {
        navigate("/penalties")
      }
      else {
        setToggle(true)
        setUser(res.data.username)
      }

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("role", res.data.role)
      localStorage.setItem("id", res.data.id)
      localStorage.setItem('activeIndex', "0");

      setisLoading(false)

    }).catch(err => {
      setisLoading(false)
      toast.error("خطأ في اسم المستخدم او كلمة المرور")
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    formik.handleSubmit()
  }


  let formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      setisLoading(true)


      setTimeout(() => {
        LoginAPi(values)
      }, [800])

    }
  })
  const handleNav = () => {

    if (selectedOption !== '' ) {
      accessTreasury({
        userId: localStorage.getItem('id'),
        treasuryId: selectedOption
        // startBalance: startAmount
      }, navigate)


    }
    else {
      toast.error("من فضلك اختر الخزنه")
    }

  }


  return (
    <div className='' dir='rtl'>

      <div className="font-tajawal min-h-screen flex fle-col items-center justify-between  bg-[#0f1a1a]  ">
        <div className="  sm:min-w-[90%] sm:px-4 px-32 2xl:px-28 lg:min-w-[60%] lg:px-16 xl:min-w-[55%] xl:px-20 md:px-12 min-h-[100vh] border min-w-[50%] col-md-4 border-gray-300  md:min-w-[100%] max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto bg-white ">
          <form className="  space-y-4 p-12 translate-y-[50%] border border-gray-500 rounded-lg " onSubmit={handleSubmit} >
            {/* <div className="mb-8 text-center ">
                <h3 className="text-gray-800 text-2xl font-bold">تسجيل الدخول</h3>
              </div> */}
            <div className='w-24 h-24 flex items-center justify-center text-center m-auto mb-10'>
              <img className='' src={Image} alt="" />
            </div>
            <div>

              {/* <select
                id="treasuryId"
                name='treasuryId'
                value={selectedOption}
                onBlur={formik.handleBlur}
                onChange={handleDropdownChange}
                className="block w-full bg-white border  mb-6 border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c59025] transition duration-200 ease-in-out text-lg font-bold"
                required
              >
              <option value="" className='font-bold'> اختر الخزنه </option>
                {AllTreasuries ? AllTreasuries.map((safe) => (<>
                  <option value={safe.treasuryId} className='font-bold'>{safe.treasuryName}</option>
                </>)) : <option className='font-bold'>لايوجد</option>}
              </select> */}

              <div className="relative flex items-center ">
                <input onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="username" type="text" required className="w-full font-bold text-base mb-2 text-gray-800 border border-gray-300 px-4 rounded-lg outline-[#c59025] h-100 py-2" placeholder="المستخدم" />
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
                  name="password" type="password" required className="w-full font-bold text-base text-gray-800 border border-gray-300 px-4  rounded-lg outline-[#c59025] py-2 h-100" placeholder="كلمة السر" />
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute left-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg> */}
              </div>
            </div>



            <div className="">
              <button type="submit" className="w-full text-base  font-semibold shadow-xl py-2 px-4  tracking-wide rounded-lg text-white bg-[#c59025] mt-4 hover:bg-[#f0bb51] focus:outline-none">
                {isLoading ? <> <div class="flex justify-center items-center ">
                  <div class="w-8  border-4 border-white border-t-transparent border-solid rounded-full animate-spin h-8"></div>
                </div>
                </> : ' تسجيل الدخول'}
              </button>
            </div>
            {/* <div className="mt-2 text-center text-xs text-gray-400">
              Copyrights منظومة تحصيلات القوات المسلحه  © 2024
            </div> */}
            <div className="mt-2 text-center text-xs text-gray-400">
              Copyrights منظومة تحصيلات بنك  © 2024
            </div>

            {/* <p className="text-sm !mt-8 text-center text-gray-800">ليس لديك حساب  <a href="javascript:void(0);" className="text-[#c59025] font-semibold hover:underline ml-1 whitespace-nowrap"> انشئ حساب </a></p> */}
          </form>
        </div>




        <div className="   w-full text-center   left-side p-0 sm:hidden sm:w-0 ">
          <div className='relative flex justify-center items-center'>
            <img src={money} alt="" className='opacity-60 min-h-[100vh]' />
            {/* <h1 className='text-white md:text:xl text-3xl lg:text-xl xl:text-2xl absolute text-center top-[50%] bg-gray-500 bg-opacity-25'> 
              منظومة تحصيل القوات المسلحه </h1> */}
            <h1 className='text-white md:text:xl text-3xl lg:text-xl xl:text-2xl absolute text-center top-[50%] bg-gray-500 bg-opacity-25'> 
              منظومة تحصيل بنك </h1>
          </div>

        </div>


      </div>
      {toggle && <>
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  ${toggle ? '' : 'animate-swal2hide'} `}  ></div>
        <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle ? 'animate-swal2show' : 'animate-swal2hide'} `}>
          <form className="my-form" onSubmit={formik.handleSubmit}  >
            <div className="font-tajawal flex justify-center items-center h-[93vh]  ">

              <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg px-10 py-5  text-right min-w-[35%] flex flex-col  justify-start ">
                <div>
                  <p className="text-lg font-semibold animate-fadeInOut mb-5 ">
                    أهلا بك يا مستر "{User}"
                  </p>
                </div>


                <div className="mb-4">
                  {/* <label htmlFor="role" className="block text-lg font-semibold mb-2 text-[#285042]"> اختر الخزينه</label> */}
                  <select
                    id="treasuryId"
                    name='treasuryId'
                    value={selectedOption}
                    onChange={handleDropdownChange}
                    className="block w-full bg-white border  mb-2 border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c59025] transition duration-200 ease-in-out text-lg font-bold"
                    required
                  >
                    {/* safe.isSelected === false && */}
                    <option value="" className='font-bold'> اختر الخزنه </option>
                    {filtered_tres ? filtered_tres.map((safe) => (<>
                      
                         <option value={safe.treasuryId} className='font-bold'>{safe.treasuryName}</option>
                      
                      {/* <option value={safe.treasuryId} className='font-bold'>{safe.treasuryName}</option> */}
                    </>)) : <option className='font-bold'>لايوجد</option>}
                  </select>

                </div>
                {/*<div className=" text-right mb-4 ">

<div class="relative flex items-center  ">
  <input name="amount" id='amount' type="text"
    value={startAmount}
    required
    onChange={(e) => { setStartAmount(e.target.value) }}
    className="block w-full bg-white border  mb-2 border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c59025] transition duration-200 ease-in-out text-lg font-bold" placeholder="المبلغ الحالي " />

</div>
</div>*/}



                <button
                  type="button"
                  onClick={handleNav}
                  className="w-full bg-[#c59025] hover:bg-[#f0bb51]  text-white font-bold py-3 px-6 rounded-lg mt-1 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  تأكيد
                </button>
              </div>
            </div>
          </form>
        </div>
      </>}


      <ToastContainer />
    </div>
  )
}

export default Login
