import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { authcontext } from '../../Context/authcontext.js';
import { ToastContainer } from 'react-toastify';
// import { TbBrandAuth0 } from "react-icons/tb";
import { FaFileContract } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from 'axios';



export default function ShowContract() {

    let { getContract, AllContracts, DelContract, getContractInfo, ContractInfo, updateContract } = useContext(authcontext)
    let [myrender, setMyrender] = useState(false)
    let [toggle2, setToggle2] = useState(false)
    let [toggle1, setToggle1] = useState(false)
    let [Disc, setDisc] = useState("")
    let [Name, setName] = useState("")
    let [ID, setID] = useState("")


    const tableRef = useRef(null);

    useEffect(() => {
        getContract()
    }, [myrender])

    const handleDelete = (id) => {
        console.log(id);

        DelContract(id)
        setToggle2(false)
        setMyrender(!myrender)
    };

    const handleGet = async (id, stat) => {
        if (stat === "update") {

            await axios.get(`https://localhost:44365/api/Contracts/${id}`).then(res => {
                setDisc(res.data?.discount)
                setName(res.data?.name)
                
            }).catch(err => {
                console.log(err)
            })

            
        }
        else {
            getContractInfo(id)
        }
    };

    const GetDelete = (id) => {
        handleGet(id)
        setToggle2(true)
    };

    const GetUpdate = (id) => {
        setID(id)
        handleGet(id, "update")
        setToggle1(true)
    };

    const HandleDisChange = (e) => {
        setDisc(e.target.value)
    };
    const HandleUpdate = (id) => {
        console.log(id);
        
        setToggle1(false)
        updateContract(id, { name: Name, discount: Disc })
    };




    return (
        <div dir='rtl' className='font-tajawal  w-100 grow  flex flex-col gap-5' >

            <div className='flex justify-between items-center py-6 bg-white md:px-6 border-[0.1px] '>
                <h2 className='text-[#676a6c] font-bold cairo text-[30px] mx-8'>التعاقدات</h2>
                {/* <div className=' font-bold flex '>
                <ExportToExcel  tableRef ={tableRef} fileName={`تقرير الخزن _ ${formattedDate}`} />
                </div> */}
            </div>

            <div className='bg-white flex justify-start flex-col items-center py-4 w-[96.5%] m-auto gap-8'>




                <div className="w-[100%] p-4">
                    <table ref={tableRef} className="min-w-full border-collapse bg-white w-full ">
                        <thead>
                            <tr className='table-row border-b text-center '>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-sm text-wrap '> اسم التعاقد</th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-sm text-wrap '>  نسبة الخصم</th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-sm text-wrap '>  </th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-sm text-wrap '>  </th>
                            </tr>
                        </thead>

                        <>
                            <tbody className='text-[#414040]'>
                                {
                                    AllContracts.length > 0 ? <> {AllContracts.map((data, index) => (
                                        <tr className='border-b hover:bg-gray-100 text-center  '    >
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.name}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px] text-  text-sm font-bold'>{data.discount} %</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>
                                                <button onClick={() => GetUpdate(data.id)} className=' bg-[#c59025] hover:bg-[#e4af47]  text-white font-bold py-2 px-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105'>
                                                    تعديل
                                                </button>
                                            </td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>
                                                <button onClick={() => GetDelete(data.id)} className=' bg-[#af4125] hover:bg-[#d14c3b]  text-white font-bold py-2 px-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105'>
                                                    حذف
                                                </button>
                                            </td>
                                        </tr>
                                    ))}</> : <>
                                        <tr className='border-b hover:bg-gray-100 text-center'>
                                            <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'>--</td>
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




            {toggle1 && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  ${toggle1 ? '' : 'animate-swal2hide'} `} ></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle1 ? 'animate-swal2show' : 'animate-swal2hide'} `}>
                    <div className="bg-white rounded shadow-lg py-10 px-44 text-center ">
                        <form action="">
                            <div className='flex flex-col mb-6   justify-center items-center relative box-content text-center border-4 border-[#c59025] rounded-full w-20 h-20 m-auto '>
                                {/* <FontAwesomeIcon icon={faCheck} className='text-[#c59025] text-6xl' /> */}
                                <FaFileContract className='text-[#c59025] text-5xl' />
                            </div>
                            <div dir='' className=" relative mt-4  mb-4 flex justify-center items-center ">
                                <label htmlFor="" className='text-lg font-bold  text-gray-700  '>   اسم التعاقد : </label>
                                {/* <input type="text" value={pass} onChange={handleChange} name="order" id='order' required className="w-[300px] mb-4 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-2 rounded-md text-lg  outline-none  border-gray-600-200" placeholder="ادخل الباسورد الجديد" /> */}
                                <label htmlFor="" className='text-lg font-bold text-[#c59025] mx-1  '> {Name} </label>

                            </div>

                            <div dir='' className=" relative  mb-6 flex justify-center items-center gap-3 ">
                                <label htmlFor="" className='text-lg font-bold  text-gray-700 '>   نسبة الخصم  : </label>
                                {/* <input type="text" value={pass} onChange={handleChange} name="order" id='order' required className="w-[300px] mb-4 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-2 rounded-md text-lg  outline-none  border-gray-600-200" placeholder="ادخل الباسورد الجديد" /> */}
                                <input htmlFor="" value={Disc} type='number' step={0.01} className='font-bold w-[100px] mb-2 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-1 rounded-md text-lg  outline-none  border-gray-600-200  mt-2 ' onChange={HandleDisChange} />

                            </div>


                            <button type='button' className="bg-gray-400 font-bold  text-white px-4 py-2 rounded mx-4 text-xl" onClick={() => { setToggle1(false) }}>العوده</button>
                            <button type='button' className="bg-[#c59025] hover:bg-[#f0bb51] font-bold  text-white px-4 py-2 rounded mx-4 text-xl " onClick={() => HandleUpdate(ID)} >تأكيد</button>
                        </form>
                    </div>
                </div> </>}
            {toggle2 && <>
                <div className={`fixed inset-0 bg-black bg-opacity-50 z-40  ${toggle2 ? '' : 'animate-swal2hide'} `} ></div>
                <div className={`fixed inset-0 flex items-center justify-center z-50  ${toggle2 ? 'animate-swal2show' : 'animate-swal2hide'} `}>
                    <div className="bg-white rounded shadow-lg py-10 px-44 text-center ">
                        <form action="">
                            <div className='flex flex-col mb-4 justify-center items-center relative box-content text-center border-4 border-[#af4125] rounded-full w-12 h-12 m-auto '>
                                {/* <FontAwesomeIcon icon={faCheck} className='text-[#c59025] text-6xl' /> */}
                                <RiDeleteBin5Fill className='text-[#af4125] text-4xl' />
                            </div>
                            <h2 className="text-2xl font-bold mt-4 mb-4 text-gray-600">هل انت متأكد من انك تريد حذف هذا التعاقد ؟</h2>
                            <div dir='' className=" relative mt-4  mb-4 flex justify-center items-center ">
                                <label htmlFor="" className='text-lg font-medium text-gray-700  '>   اسم التعاقد : </label>
                                {/* <input type="text" value={pass} onChange={handleChange} name="order" id='order' required className="w-[300px] mb-4 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-2 rounded-md text-lg  outline-none  border-gray-600-200" placeholder="ادخل الباسورد الجديد" /> */}
                                <label htmlFor="" className='text-xl font-bold text-[#af4125] mx-1  '> {ContractInfo?.name} </label>

                            </div>

                            <div dir='' className=" relative  mb-6 flex justify-center items-center ">
                                <label htmlFor="" className='text-lg font-medium text-gray-700 '>   نسبة الخصم  : </label>
                                {/* <input type="text" value={pass} onChange={handleChange} name="order" id='order' required className="w-[300px] mb-4 text-center  px-4 appearance-none  bg-white border-[0.3px]   focus:border-[#c59025]  py-2 rounded-md text-lg  outline-none  border-gray-600-200" placeholder="ادخل الباسورد الجديد" /> */}
                                <label htmlFor="" className='text-xl font-bold text-[#af4125] mx-1  '> {ContractInfo?.discount} %</label>

                            </div>


                            <button type='button' className="bg-gray-400 text-white px-4 py-2 rounded mx-4 text-xl" onClick={() => { setToggle2(false) }}>العوده</button>
                            <button type='button' className="bg-[#af4125] hover:bg-[#d14c3b] text-white px-4 py-2 rounded mx-4 text-xl " onClick={() => handleDelete(ContractInfo?.id)} >تأكيد</button>
                        </form>
                    </div>
                </div> </>}


            <ToastContainer />
        </div>
    )
}
