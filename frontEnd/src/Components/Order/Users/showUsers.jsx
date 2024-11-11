
import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { authcontext } from '../../../Context/authcontext';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import { login } from '../../Schema/ordersScema';
import { RiLockPasswordLine } from "react-icons/ri";
import { TbBrandAuth0 } from "react-icons/tb";


export default function ShowUsers() {

    let { GetAllUser, allUser, GetUserByID, UserData, UpdateUserPass, BlockUser } = useContext(authcontext)
    let [toggle, setToggle] = useState(false)
    let [toggle2, setToggle2] = useState(false)
    let [pass, setPass] = useState('')
    let [NameToggle, setNameToggle] = useState('')
    let [MailToggle, setMailToggle] = useState('')
    let [name, setName] = useState('')
    let [mail, setMail] = useState('')
    const [selectedOption, setSelectedOption] = useState('');




    const tableRef = useRef(null);

    useEffect(() => {
        GetAllUser()
    }, [])

    const GetUser = (id) => {
        setToggle(true)
        GetUserByID(id)
    };

    const GetUser2 = (id) => {
        setToggle2(true)
        GetUserByID(id)
    };
    const handleChange = (e) => {
        setPass(e.target.value)
    };
    const handleshow = (e) => {
        const { name, value } = e.target
        if (name === 'username') {
            setMail(value)
        }
        else {
            setName(value)
        }

    };

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleOk = () => {
        let values = {
            username: mail ? mail : UserData.username,
            password: pass,
            name: name ? name : UserData.name,
            role: UserData.role
        }
        if (UserData.password === pass) {
            toast.error("الباسورد هو نفس الباسورد القديم")
            return -1
        }
        if (pass === '' || (name.length < 12 && UserData.name.length < 12)) {
 
            toast.error(" تحقق من صحة البيانات ")
            return -1
        }
        else {
            UpdateUserPass(UserData.id, values,"pass")
            setToggle(false)
        }
    };

    const handleBlock = () => {
        console.log(UserData.id)
        BlockUser(UserData.id)
        setToggle2(false)
        
    };

    // const handleSelOk = () => {
    //     let values = {
    //         username: UserData.username,
    //         password: UserData.password,
    //         name: UserData.name,
    //         role: selectedOption
    //     }
    //     if (UserData.role === selectedOption) {
    //         toast.error("الصلاحيه هي نفس الصلاحيه القديمه")
    //         return -1
    //     }
    //     if (selectedOption === '') {
    //         return -1
    //     }
    //     else {
    //         console.log(selectedOption);
    //         UpdateUserPass(UserData.id, values)
    //         setToggle2(false)
    //     }
    // };


    // const handleDelete = (id) => {
    //     DelUser(id)
    // };



    return (
        <div dir='rtl' className='font-tajawal  w-100 grow  flex flex-col gap-5' >

            <div className='flex justify-between items-center py-6 bg-white md:px-6 border-[0.1px] '>
                <h2 className='text-[#676a6c] font-bold cairo text-[26px] mx-6'>عرض المستخدمين</h2>
                {/* <div className=' font-bold flex '>
                <ExportToExcel  tableRef ={tableRef} fileName={`تقرير الخزن _ ${formattedDate}`} />
                </div> */}
            </div>

            <div className='bg-white flex justify-start flex-col items-center py-4 w-[96.5%] m-auto gap-8'>




                <div className="w-[100%] p-4">
                    <table ref={tableRef} className="min-w-full border-collapse bg-white w-full ">
                        <thead>
                            <tr className='table-row border-b text-center '>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-base text-wrap '> اسم المستخدم</th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-base text-wrap '> الصلاحيه</th>



                                {/* <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-sm text-wrap '>  </th> */}
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-sm text-wrap '>  </th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-sm text-wrap '>  </th>



                            </tr>
                        </thead>

                        <>
                            <tbody className='text-[#414040]'>
                                {
                                    allUser?.length > 0 ? <> {allUser.map((data, index) => (
                                        <tr className={`border-b  text-center ${localStorage.getItem("id") == data.id ? 'bg-[#c59025] text-white hover:bg-[#f0bb51] duration-500 hover:text-black' : 'hover:bg-gray-100'} `}    >
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-base font-bold'>{data.username}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-base font-bold'>{data.role}</td>
                                            {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.mainTreasuryName === "No Main Treasury" ? 'رئيسيه' : ` فرعيه ل ${data.mainTreasuryName} `}</td> */}
                                            {/* <td className={`border-b border-[#e7eaec] py-[20px]   ${data.treasuryName === 'خزنة الدولار' ? 'tex w-10 h-2 rounded-lg  py-1 px-2 text-[#24a35d] ' : 'text-[#0c0c0c]'}   text-sm font-bold`}>{data.treasuryName === 'خزنة الدولار' ? data.balance + '$' : data.balance}</td> */}

                                            <>
                                            {/* <td className='border-b border-[#e7eaec] py-[20px]  text-xs font-bold'>
                                                {localStorage.getItem("id") != data.id && <button onClick={()=>GetUser2(data.id)} className=' bg-[#2561af] hover:bg-[#336cb6]  text-white font-bold py-2 px-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105'>
                                                    تغيير الصلاحيه
                                                </button>}

                                            </td> */}
                                                <td className='border-b border-[#e7eaec] py-[20px]  text-xs font-bold'>
                                                    {localStorage.getItem("id") != data.id &&
                                                        <button onClick={() => GetUser(data.id)} className=' bg-[#bba736] hover:bg-[#c9b33a]  text-white font-bold py-2 px-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105'>
                                                            تغيير الباسورد
                                                        </button>
                                                    }
                                                </td>
                                                <td className='border-b border-[#e7eaec] py-[20px]  text-xs font-bold'>
                                                    {localStorage.getItem("id") != data.id &&
                                                        <button onClick={() => GetUser2(data.id)} className={` ${data.isBlocked === true ? 'bg-[#25af47] hover:bg-[#3bd168]' : 'bg-[#af4125] hover:bg-[#d14c3b]'}   text-white font-bold py-2 px-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105`}>
                                                           {data.isBlocked === true ? 'فك الحظر' : 'حظر' } 
                                                        </button>
                                                    }
                                                </td>
                                                
                                                </>


                                        </tr>
                                    ))}</> : <>
                                        <tr className='border-b hover:bg-gray-100 text-center'>
                                            <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'>--</td>
                                            <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'>--</td>
                                            <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'>--</td>
                                        </tr>

                                    </>
                                }



                            </tbody>
                        </>

                    </table>





                </div>



            </div>



            {toggle && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  ${toggle ? '' : 'animate-swal2hide'} `} ></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle ? 'animate-swal2show' : 'animate-swal2hide'} `}>
                    <div className="bg-white rounded shadow-lg py-10 px-44 text-center ">

                            <div className='flex flex-col mb-4 justify-center items-center relative box-content text-center border-4 border-[#1b3a30] rounded-full w-12 h-12 m-auto '>
                                {/* <FontAwesomeIcon icon={faCheck} className='text-[#c59025] text-6xl' /> */}
                                <RiLockPasswordLine className='text-[#1b3a30] text-4xl' />
                            </div>
                            <h2 className="text-2xl font-bold mt-4 mb-4 text-gray-600"> تغيير الباسورد </h2>
                            <div dir='' className=" relative  mb-4 flex justify-center items-center ">
                                <label htmlFor="" className='text-lg font-medium text-gray-700  '>   اسم الموظف : </label>
                                {/* <input type="text" value={pass} onChange={handleChange} name="order" id='order' required className="w-[300px] mb-4 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-2 rounded-md text-lg  outline-none  border-gray-600-200" placeholder="ادخل الباسورد الجديد" /> */}
                                <label htmlFor="" className='text-xl font-bold text-[#c59025] mx-1  '> {UserData.name} </label>
                                {/* <button type='button' onClick={() => { setNameToggle(!NameToggle) }} htmlFor="" className='bg-[#bba736] hover:bg-[#c9b33a]  text-xs text-white font-semibold py-1 px-1 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 mx-5 '> تغيير </button> */}

                            </div>
                            {
                                NameToggle && <div >
                                    <input type="text" value={name} onChange={handleshow} name="name" id='name' required className="w-[300px] mb-2 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-1 rounded-md text-lg  outline-none  border-gray-600-200" placeholder=" ادخل الأسم الجديد ثلاثي" />
                                    <div className="text-red-700 font-bold text-xs mb-4 ">
                                { name.length < 12 && name.length !== 0 && <p className='form-error'>من فضلك ادخل الأسم ثلاثي</p>}
                            </div>
                                </div>

                            }

                            <div dir='' className=" relative  mb-4 flex justify-center items-center ">


                                <label htmlFor="" className='text-lg font-medium text-gray-700  '>   الإيميل  : </label>
                                <label htmlFor="" className='text-xl font-bold text-[#c59025] mx-1 '> {UserData.username} </label>
                                {/* <button type='button' onClick={() => { setMailToggle(!MailToggle) }} htmlFor="" className='bg-[#bba736] hover:bg-[#c9b33a]  text-xs text-white font-semibold py-1 px-1 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 mx-5 '> تغيير </button> */}

                                {/* <input type="text" value={pass} onChange={handleshow} name="order" id='order' required className="w-[300px] mb-4 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-2 rounded-md text-lg  outline-none  border-gray-600-200" placeholder="ادخل الباسورد الجديد" /> */}
                            </div>
                            {
                                MailToggle && <div className='text-center flex justify-center items-center flex-col mb-4'>
                                    <input type="text" value={mail} onChange={handleshow} name="username" id='username' required className="w-[300px] mb-4 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-1 rounded-md text-lg  outline-none  border-gray-600-200" placeholder="ادخل الإيميل الجديد" />
                                    
                                    <div className='w-[300px] border-b border-gray-300 border-dashed'></div>
                                </div>

                            }
                            <div dir='' className=" relative   flex justify-center items-center mb-4 ">
                                <input type="password" value={pass} onChange={handleChange} name="order" id='order' required className="w-[300px] mb-4 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-2 rounded-md text-lg  outline-none  border-gray-600-200" placeholder="ادخل الباسورد الجديد" />
                            </div>
                            <button type='button' className="bg-gray-400 text-white px-4 py-2 rounded mx-4 text-xl" onClick={() => { setToggle(false) }}>العوده</button>
                            <button type='submit' className="bg-[#c59025] hover:bg-[#f0bb51] text-white px-4 py-2 rounded mx-4 text-xl " onClick={handleOk} >تأكيد</button>

                    </div>
                </div> </>}



            {toggle2 && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  ${toggle2 ? '' : 'animate-swal2hide'} `} ></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle2 ? 'animate-swal2show' : 'animate-swal2hide'} `}>
                    <div className="bg-white rounded shadow-lg py-10 px-44 text-center ">
                        <form action="">
                            <div className='flex flex-col mb-4 justify-center items-center relative box-content text-center border-4 border-[#1b3a30] rounded-full w-12 h-12 m-auto '>
                                {/* <FontAwesomeIcon icon={faCheck} className='text-[#c59025] text-6xl' /> */}
                                <TbBrandAuth0 className='text-[#1b3a30] text-4xl' />
                            </div>
                            <h2 className="text-2xl font-bold mt-4 mb-4 text-gray-600">{UserData.isBlocked === true ? 'هل انت متأكد من انك تريد فك حظر هذا المستخدم ؟' : 'هل انت متأكد من انك تريد حظر هذا المستخدم ؟'}</h2>
                            <div dir='' className=" relative mt-4  mb-4 flex justify-center items-center ">
                                <label htmlFor="" className='text-lg font-medium text-gray-700  '>   اسم المستخدم : </label>
                                {/* <input type="text" value={pass} onChange={handleChange} name="order" id='order' required className="w-[300px] mb-4 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-2 rounded-md text-lg  outline-none  border-gray-600-200" placeholder="ادخل الباسورد الجديد" /> */}
                                <label htmlFor="" className='text-xl font-bold text-[#c59025] mx-1  '> {UserData.username} </label>

                            </div>

                            <div dir='' className=" relative  mb-6 flex justify-center items-center ">
                                <label htmlFor="" className='text-lg font-medium text-gray-700 '>   الأسم  : </label>
                                {/* <input type="text" value={pass} onChange={handleChange} name="order" id='order' required className="w-[300px] mb-4 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-2 rounded-md text-lg  outline-none  border-gray-600-200" placeholder="ادخل الباسورد الجديد" /> */}
                                <label htmlFor="" className='text-xl font-bold text-[#c59025] mx-1  '> {UserData.name} </label>

                            </div>

                        
                            <button type='button' className="bg-gray-400 text-white px-4 py-2 rounded mx-4 text-xl" onClick={() => { setToggle2(false) }}>العوده</button>
                            <button type='button' className="bg-[#c59025] hover:bg-[#f0bb51] text-white px-4 py-2 rounded mx-4 text-xl " onClick={handleBlock} >تأكيد</button>
                        </form>
                    </div>
                </div> </>}


            <ToastContainer />
        </div>
    )
}

// {toggle2 && <>
//     <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  ${toggle2 ? '' : 'animate-swal2hide'} `} ></div>
//     <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle2 ? 'animate-swal2show' : 'animate-swal2hide'} `}>
//         <div className="bg-white rounded shadow-lg py-10 px-44 text-center ">
//             <form action="">
//                 <div className='flex flex-col mb-4 justify-center items-center relative box-content text-center border-4 border-[#1b3a30] rounded-full w-12 h-12 m-auto '>
//                     {/* <FontAwesomeIcon icon={faCheck} className='text-[#c59025] text-6xl' /> */}
//                     <TbBrandAuth0 className='text-[#1b3a30] text-4xl' />
//                 </div>
//                 <h2 className="text-2xl font-bold mt-4 mb-4 text-gray-600"> تغيير الصلاحيه </h2>
//                 <div dir='' className=" relative  mb-4 flex justify-center items-center ">
//                     <label htmlFor="" className='text-lg font-medium text-gray-700  '>   اسم الموظف : </label>
//                     {/* <input type="text" value={pass} onChange={handleChange} name="order" id='order' required className="w-[300px] mb-4 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-2 rounded-md text-lg  outline-none  border-gray-600-200" placeholder="ادخل الباسورد الجديد" /> */}
//                     <label htmlFor="" className='text-xl font-bold text-[#c59025] mx-1  '> {UserData.name} </label>

//                 </div>

//                 <div dir='' className=" relative   flex justify-center items-center mb-4 ">
//                     <select
//                         id="role"
//                         name='role'
//                         value={selectedOption}
//                         onChange={handleDropdownChange}
//                         className="block w-full bg-gray-100 border  mb-4 border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c59025] transition duration-200 ease-in-out text-lg font-bold"
//                         required
//                     >
//                         <option value="" disabled>اختر الصلاحيه</option>
//                         <option value="highAdmin">مسؤول عالي</option>
//                         <option value="admin">مسؤول</option>
//                         <option value="user">مستخدم</option>
//                     </select>
//                 </div>
//                 <button type='button' className="bg-gray-400 text-white px-4 py-2 rounded mx-4 text-xl" onClick={() => { setToggle2(false) }}>العوده</button>
//                 <button type='button' className="bg-[#c59025] hover:bg-[#f0bb51] text-white px-4 py-2 rounded mx-4 text-xl " onClick={handleSelOk} >تأكيد</button>
//             </form>
//         </div>
//     </div> </>}
