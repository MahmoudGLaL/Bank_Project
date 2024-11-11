import React, { useState } from 'react'
import { FaDownload } from "react-icons/fa6";
import Dropdown from '../../utils/Dropdown.jsx';
import Table from '../../utils/Table/Table.jsx';
import { FaCaretDown } from "react-icons/fa6";
import { FaTimes, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { authcontext } from '../../Context/authcontext.js';
import { useEffect } from 'react';
import ExportToExcel from '../Order/exportExel.jsx';
import { useRef } from 'react';
import { ToastContainer } from 'react-toastify';
export default function Transactions() {

    let { GetAllUser, allUser, getPayment, All_Pay, TreasuryData, getTreasury, AllDay_Stats, getReqDayStat } = useContext(authcontext)
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 10;
    const [searched, setSearched] = useState(false);
    const [Loading, setLoading] = useState(false);

    const date = new Date();

    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-indexed
    const year = date.getFullYear();

    // Combine them into the desired format
    const formattedDate = `${day}_${month}_${year}`;
    const tableRef = useRef(null);

    useEffect(() => {
        getPayment()
        GetAllUser()
        getTreasury(localStorage.getItem('tres_id'))
        getReqDayStat()
    }, [])

    const [searchCriteria, setSearchCriteria] = useState({
        id: "", name: "", createdAt: "", nationalId: "",
        paymentType: "", status: "", organization: "", emplyee: ""
    });

    const initialValues = {
        id: "", name: "", createdAt: "", nationalId: "",
        paymentType: "", status: "", organization: "", emplyee: ""
        // other fields...
    };

    const handleSearch = (e) => {
        setLoading(true)
        setTimeout(() => {
            setSearched(true)
            setLoading(false)
        }, [1200]);
    }

    const handleSearchChange = (e) => {

        setSearched(false)
        const { name, value } = e.target;


        setSearchCriteria(prevState => ({ ...prevState, [name]: value }));
        setCurrentPage(1);

        if (value === '') {
            setSearched(false)
        }

    };

    const GetDetails = (id) => {

        navigate(`/paymentDetails/${id}`)
    }

    const Tres_data = All_Pay.filter(e => e.treasuryId == localStorage.getItem('tres_id'));
    const Tres_stats = AllDay_Stats.filter(e => e.treasuryName == TreasuryData?.treasuryName);
    // const All_stats = AllDay_Stats.filter(e => e.treasuryName == 'عجوزه');

    let filteredReq = (Tres_data.length > 0 && localStorage.getItem('role') !== 'SuperAdmin') ? Tres_data?.filter(req => {
        return (
            searchCriteria.id && req.paymentReceiptNumber.toString().includes(searchCriteria.id ? searchCriteria.id.toLowerCase() : "") ||
            searchCriteria.name && req.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "") ||
            searchCriteria.createdAt && req.createdAt.toString().includes(searchCriteria.createdAt ? searchCriteria.createdAt.toString() : "") ||
            searchCriteria.nationalId && req.nationalId.toLowerCase().includes(searchCriteria.nationalId ? searchCriteria.nationalId.toLowerCase() : "") ||
            searchCriteria.paymentType && req.paymentType.toLowerCase().includes(searchCriteria.paymentType ? searchCriteria.paymentType.toLowerCase() : "") ||
            searchCriteria.posCode && req.referenceNumber.toString().includes(searchCriteria.posCode ? searchCriteria.posCode.toLowerCase() : "") ||
            searchCriteria.organization && req.organization.toLowerCase().includes(searchCriteria.organization ? searchCriteria.organization : "") ||
            searchCriteria.emplyee && req.userName.toLowerCase().includes(searchCriteria.emplyee ? searchCriteria.emplyee.toLowerCase() : "")

        )

    })



        : All_Pay?.filter(req => {
            return (
                searchCriteria.id && req.paymentReceiptNumber.toString().includes(searchCriteria.id ? searchCriteria.id.toLowerCase() : "") ||
                searchCriteria.name && req.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "") ||
                searchCriteria.createdAt && req.createdAt.toString().includes(searchCriteria.createdAt ? searchCriteria.createdAt.toString() : "") ||
                searchCriteria.nationalId && req.nationalId.toLowerCase().includes(searchCriteria.nationalId ? searchCriteria.nationalId.toLowerCase() : "") ||
                searchCriteria.paymentType && req.paymentType.toLowerCase().includes(searchCriteria.paymentType ? searchCriteria.paymentType.toLowerCase() : "") ||
                searchCriteria.posCode && req.referenceNumber.toString().includes(searchCriteria.posCode ? searchCriteria.posCode.toLowerCase() : "") ||
                searchCriteria.organization && req.organization.toLowerCase().includes(searchCriteria.organization ? searchCriteria.organization : "") ||
                searchCriteria.emplyee && req.userName.toLowerCase().includes(searchCriteria.emplyee ? searchCriteria.emplyee.toLowerCase() : "")

            )

        })



    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentRequests = filteredReq?.reverse().slice(indexOfFirstPatient, indexOfLastPatient);
    const totalPages = Math.ceil(filteredReq?.length / patientsPerPage);

    const allcurrentRequests = (Tres_data.length >= 0 && localStorage.getItem('role') !== 'SuperAdmin') ? [...Tres_data].reverse().slice(indexOfFirstPatient, indexOfLastPatient) : [...All_Pay].reverse().slice(indexOfFirstPatient, indexOfLastPatient);
    const allSearchtotalPages = (Tres_data.length >= 0 && localStorage.getItem('role') !== 'SuperAdmin') ? Math.ceil(Tres_data?.length / patientsPerPage) : Math.ceil(All_Pay?.length / patientsPerPage);

    const { handleSubmit } = useFormik({
        initialValues,
        onSubmit: async () => {
            // values.userId = localStorage.getItem("id")
            searchCriteria.id = ""
            searchCriteria.name = ""
            searchCriteria.createdAt = ""
            searchCriteria.nationalId = ""
            searchCriteria.organization = ""
            searchCriteria.paymentType = ""
            searchCriteria.status = ""
            searchCriteria.emplyee = ""
            searchCriteria.posCode = ""
            setSearched(false)


        }
    })

    return (
        <div dir='rtl' className='font-tajawal  w-100 grow  flex flex-col gap-5' >

            <div className='flex justify-between items-center py-4 bg-white md:px-6 border-[0.1px] px-2 lg:px-1 xl-px-2 '>
                <h2 className='px-8 xl:px-6 lg:px-4 text-[28px] lg:text-[15px] xl:text-[20px] md:text-[12px] py-2 text-[rgb(103 106 108 /1)] font-semi-bold'> المدفوعات {TreasuryData?.treasuryName ? <> / <span className='text-[#f0bb51] font-semibold'> {TreasuryData?.treasuryName} </span></> : ''}</h2>
                <div className=' font-bold flex mx-4  '>
                    <ExportToExcel tableRef={tableRef} fileName={`تقرير أمر المدفوعات _ ${formattedDate}`} />
                </div>
            </div>

            <form onSubmit={handleSubmit} className='bg-white flex justify-start items-center py-4 w-[96.5%] m-auto gap-8'>

                <div className="grid gap-2 justify-start items-start grid-cols-4 w-full">
                    <div className=" text-right mx-6 ">
                        <label htmlFor="id" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-bold text-gray-700  '>البحث ب امر الدفع : </label>
                        <div class="relative flex items-center  ">
                            <input name="id" id='id' type="text"
                                onChange={handleSearchChange}
                                value={searchCriteria.id}
                                className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-bold text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder=" رقم الإيصال " />

                        </div>
                    </div>

                    <div className=" text-right mx-6 ">
                        <label htmlFor="name" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-bold text-gray-700  '> الاسم : </label>
                        <div class="relative flex items-center  ">
                            <input name="name" id='name'
                                onChange={handleSearchChange}
                                value={searchCriteria.name}
                                type="text" className="w-full font-bold text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] box-content text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="الأسم" />



                        </div>
                    </div>

                    <div className=" text-right mx-6 ">
                        <label htmlFor="nationalId" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-bold text-gray-700  '> البحث بالرقم القومي : </label>
                        <div class="relative flex items-center  ">
                            <input name="nationalId"
                                onChange={handleSearchChange}
                                value={searchCriteria.nationalId}
                                id='nationalId' type="text" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-bold text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="الرقم القومي" />

                        </div>
                    </div>

                    <div className=" text-right mx-6 ">
                        <label htmlFor="createdAt" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-bold text-gray-700  '> تاريخ الأنشاء :  </label>
                        <div class="relative flex items-center  ">
                            <input name="createdAt" id='createdAt'
                                onChange={handleSearchChange}
                                value={searchCriteria.createdAt}
                                type="date" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px]  text-gray-800 font-bold bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none border-gray-300" placeholder="التاريخ" />

                        </div>
                    </div>
                    <div className=" text-right mx-6 ">
                        <label htmlFor="paymentType" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-bold text-gray-700  '> طريقة الدفع : </label>
                        <div class="relative flex items-center  ">
                            <select name="paymentType" id='paymentType'
                                onChange={handleSearchChange}
                                value={searchCriteria.paymentType}
                                type="text" className="w-full font-bold text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] box-content text-gray-700 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="  طريقة الدفع " >
                                <option value="" className='font-bold text-gray-400' disabled selected> طريقة الدفع </option>
                                <option value="كاش" className='font-bold '>كاش</option>
                                <option value="فيزا" className='font-bold '> فيزا </option>
                            </select>

                        </div>
                    </div>


                    <div className=" text-right mx-6 ">
                        <label htmlFor="organization" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-bold text-gray-700  '> المؤسسه والفرع : </label>
                        <div class="relative flex items-center  ">
                            <select name="organization" id='organization'
                                onChange={handleSearchChange}
                                value={searchCriteria.organization}
                                type="text" className="w-full font-bold text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] box-content text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " >
                                <option value="" className='font-bold' disabled selected>   اختر المؤسسه</option>
                                <option value="خاص" className='font-bold'> خاص </option>
                                <option value="تعاقد" className='font-bold'>  تعاقد </option>
                                {/* <option value="بنك التوحيد و النور " className='font-bold'>   بنك التوحيد و النور </option> */}
                            </select>

                        </div>
                    </div>
                    <div className=" text-right mx-6 ">
                        <label htmlFor="emplyee" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-bold text-gray-700  '> المؤظف : </label>
                        <div class="relative flex items-center  ">
                            <select name="emplyee" id='emplyee'
                                onChange={handleSearchChange}
                                value={searchCriteria.emplyee}
                                type="text" className="w-full font-bold text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] box-content text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none border-gray-300" placeholder="رقم امر التوريد " >
                                <option value="" className='font-bold' disabled selected>اختر اسم الموظف</option>
                                {allUser?.map((user) => (
                                    <option value={user.username} className='font-bold'>{user.username}</option>
                                ))}

                            </select>

                        </div>
                    </div>
                    <div className=" text-right mx-6 ">
                        <label htmlFor="posCode" className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-bold text-gray-700  '>  البحث بالرقم المرجعي  : </label>
                        <div class="relative flex items-center  ">
                            <input name="posCode" id='posCode'
                                onChange={handleSearchChange}
                                value={searchCriteria.posCode}
                                type="text" className="w-full text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px]  text-gray-800 font-bold bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none border-gray-300" placeholder="الرقم المرجعي " />

                        </div>
                    </div>

                    <div className="flex items-center justify-start flex-wrap text-right mx-6 mt-6 w-full ">
                        <button type='submit' className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] p-1 border font-semibold  border-gray-400 hover:bg-gray-200 rounded-lg ' >
                            مسح التصفيه
                        </button>
                        <button onClick={handleSearch} type='button' className='text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] p-1 border font-semibold rounded-lg bg-[#c59025] hover:bg-[#f0bb51] text-white mx-5'>
                            {Loading ? <> <div class="flex justify-center items-center ">
                                <div class="w-4 p-1  border-4 border-white border-t-transparent border-solid rounded-full animate-spin h-4"></div>
                            </div>
                            </> : <>بحث</>}
                        </button>
                    </div>





                </div>



            </form>

            <div className='bg-white flex justify-start flex-col items-center py-4 w-[96.5%] m-auto gap-6'>
                {localStorage.getItem('role') === 'SuperAdmin' ? <div className="flex gap-24 justify-center items-center mx-3 ">
                    <div className="">
                        <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '>  تقرير اليوم </label>
                    </div>
                    {/* {AllDay_Stats.map((e)=>(e.))} */}
                    <div className="">
                        <label htmlFor="order" className="text-[14px] font-bold text-gray-700">
                            عدد المدفوعات <span>[<span className="text-[#c98b3b]">
                                {
                                      AllDay_Stats?.reduce((acc, e) => e.paidCount > 0 ? acc + parseInt(e.paidCount)  : acc, 0)
                                }
                            </span>]</span>
                        </label>
                    </div>
                    <div className="">
                        <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '> إجمالي المدفوعات <span> [EGP <span className='text-[#c98b3b]'>{
                            AllDay_Stats.reduce((acc, e) => e.totalPaid > 0 ? acc + e.totalPaid : acc, 0)
                        }</span> ] </span></label>
                    </div>
                    <div className="">
                        <label htmlFor="order" className='text-[14px] font-bold text-gray-700 flex   '> إجمالي المبلغ المسترد  <span className='mx-1'> [EGP <span className='text-[#c98b3b] '>{
                            AllDay_Stats.reduce((acc, e) => e.totalRefund > 0 ? acc + e.totalRefund : acc, 0)
                        }</span> ] </span> </label>
                    </div>
                    {/* localStorage.getItem('role') !== 'orderCreator' && */}

                    <div className="">
                        <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '>  الميزانيه <span> [EGP <span className='text-[#c98b3b]'>{
                            AllDay_Stats.reduce((acc, e) => e.balance > 0 ? acc + e.balance : acc, 0)
                        }</span> ] </span></label>
                    </div>


                </div> :

                    <div className="flex gap-24 justify-center items-center mx-3 ">
                        <div className="">
                            <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '>  تقرير اليوم </label>
                        </div>
                        <div className="">
                            <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '>عدد المدفوعات <span>[<span className='text-[#c98b3b]'>{Tres_stats[0]?.paidCount}</span>]</span></label>
                        </div>
                        <div className="">
                            <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '> إجمالي المدفوعات <span> [EGP <span className='text-[#c98b3b]'>{Tres_stats[0]?.totalPaid}</span> ] </span></label>
                        </div>
                        <div className="">
                            <label htmlFor="order" className='text-[14px] font-bold text-gray-700 flex   '> إجمالي المبلغ المسترد  <span className='mx-1'> [EGP <span className='text-[#c98b3b] '>{Tres_stats[0]?.totalRefund}</span> ] </span> </label>
                        </div>
                        {/* localStorage.getItem('role') !== 'orderCreator' && */}

                        <div className="">
                            <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '>  الميزانيه <span> [EGP <span className='text-[#c98b3b]'>{Tres_stats[0]?.balance}</span> ] </span></label>
                        </div>


                    </div>}



                <div className="w-[100%] ">
                    <table ref={tableRef} className="min-w-full border-collapse bg-white w-full ">
                        <thead>
                            <tr className='table-row border-b text-center '>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 text-wrap '> رقم ايصال السداد</th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 text-wrap '> كود أمر التوريد</th>
                                {/* <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 text-wrap '></th> */}
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 text-wrap '>الرقم المرجعي </th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 text-wrap '>اسم العميل</th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 text-wrap '>الرقم القومي</th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 text-wrap '>الموظف </th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 text-wrap '> تاريخ الإنشاء	</th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 text-wrap '>المؤسسة و الفرع</th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 text-wrap '>طريقة الدفع</th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 text-wrap '> القيمة </th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2  text-wrap '>  الحالة</th>
                            </tr>
                        </thead>
                        {searched ? <>
                            <tbody className='text-[#414040]'>
                                {
                                    currentRequests.length > 0 ? <> {currentRequests.map((data) => (
                                        <tr className='border-b hover:bg-gray-100 text-center  ' onDoubleClick={() => GetDetails(data.requisitionId)}>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 font-bold'>{data.paymentReceiptNumber}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 font-bold'>{data.requisitionId}</td>
                                            {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 font-bold'>	١٢/‏٨/‏٢٠٢٤</td> */}
                                            {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 font-bold'> 	</td> */}
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 font-bold'>{data.referenceNumber ? data.referenceNumber : "--"}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 font-bold'>{data.name}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 font-bold'>{data.nationalId}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 font-bold'>{data.userName}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 font-bold'> {data.createdAt?.slice(0, 10)}	</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 font-bold'>{data.organization}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]   text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 font-bold'>  <span className={` bg-gray-300  rounded-lg  py-1 px-2 text-black `}>
                                                {data.paymentType}
                                            </span></td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 xl:px2 font-bold'>{data.amountWithDiscount !== data.amount ? data.amountWithDiscount : data.amount}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-xs lg:text-[9px] md:text-[7px]  xl:text-[11px]   font-bold'>
                                                <span className={` ${data.status === 1 ? 'bg-[#2199e8]' : 'bg-[#36BA98]'}    rounded-lg  py-1 px-2 lg:text-[9px] md:text-[7px]  xl:text-[11px] text-white `}>{data.status === 1 ? 'مدفوع' : 'مسترد'}
                                                </span>
                                            </td>


                                        </tr>
                                    ))}</> : <>
                                        <tr className='flex justify-center items-center mt-2 '>
                                            <td className='text-center'>
                                                لا يوجد
                                            </td>
                                        </tr>

                                    </>
                                }



                            </tbody>
                        </>
                            :
                            <>
                                <tbody className='text-[#414040]'>
                                    {
                                        allcurrentRequests.length > 0 ? <> {allcurrentRequests.map((data, index) => (
                                            <tr className='border-b hover:bg-gray-100 text-center  ' onDoubleClick={() => GetDetails(data.requisitionId)}>
                                                <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>{data.paymentReceiptNumber}</td>
                                                <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>{data.requisitionId}</td>
                                                {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>	١٢/‏٨/‏٢٠٢٤</td> */}
                                                {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'> 	</td> */}
                                                <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>{data.referenceNumber ? data.referenceNumber : "--"}</td>
                                                <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>{data.name}</td>
                                                <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>{data.nationalId}</td>
                                                <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>{data.userName}</td>
                                                <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'> {data.createdAt?.slice(0, 10)}	</td>
                                                <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>{data.organization}</td>
                                                <td className='border-b border-[#e7eaec] py-[20px]   text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>  <span className={` bg-gray-300  rounded-lg  py-1 px-2 text-black `}>
                                                    {data.paymentType}
                                                </span></td>
                                                <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>{data.amountWithDiscount !== data.amount ? data.amountWithDiscount : data.amount}</td>
                                                <td className='border-b border-[#e7eaec] py-[20px]  text-xs lg:text-[9px] md:text-[7px]  xl:text-[11px]   font-bold'>
                                                    <span className={` ${data.status === 1 ? 'bg-[#2199e8]' : 'bg-[#36BA98]'}    rounded-lg  py-1 px-2 lg:text-[9px] md:text-[7px]  xl:text-[11px] text-white `}>{data.status === 1 ? 'مدفوع' : 'مسترد'}
                                                    </span>
                                                </td>


                                            </tr>
                                        ))}</> : <>
                                            <tr className='border-b hover:bg-gray-100 text-center'>
                                                <td className='border-b border-[#e7eaec] py-[15px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>--</td>
                                                <td className='border-b border-[#e7eaec] py-[15px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>--</td>
                                                <td className='border-b border-[#e7eaec] py-[15px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>--</td>
                                                <td className='border-b border-[#e7eaec] py-[15px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>--</td>
                                                <td className='border-b border-[#e7eaec] py-[15px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>--</td>
                                                <td className='border-b border-[#e7eaec] py-[15px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>--</td>
                                                <td className='border-b border-[#e7eaec] py-[15px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>--</td>
                                                <td className='border-b border-[#e7eaec] py-[15px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>--</td>
                                                <td className='border-b border-[#e7eaec] py-[15px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>--</td>
                                                <td className='border-b border-[#e7eaec] py-[15px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'>--</td>
                                                <td className='border-b border-[#e7eaec] py-[15px]  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] lg:px-2 font-bold'></td>
                                            </tr>

                                        </>
                                    }



                                </tbody>
                            </>}

                    </table>





                </div>



            </div>
            {!searched && <nav>

                <ul className=" flex justify-end items-center  gap-3 my-1 mx-12 ">
                    <li className={` text-gray-400  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] ${currentPage === 1 ? 'hidden' : ''}`}>
                        <button className="text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-semibold " onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}> &lt;&lt; </button>
                    </li>
                    {[...Array(allSearchtotalPages)].map((_, index) => (

                        <li key={index} className={`text-black py-1 px-3 text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px]  ${currentPage === index + 1 ? ' text-white bg-[#2199e8]' : ''}`}>
                            <button className="text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-semibold " onClick={() => setCurrentPage(index + 1)}> {index + 1}</button>
                        </li>
                    ))}
                    <li className={`text-gray-400  text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] ${currentPage === allSearchtotalPages ? 'hidden' : ''}`}>
                        <button className="text-sm lg:text-[12px] md:text-[9px]  xl:text-[12px] font-semibold " onClick={() => setCurrentPage(prev => Math.max(prev + 1, 1))}> &gt;&gt;</button>
                    </li>
                </ul>
            </nav>}


            {searched &&
                <nav>


                    <ul className=" flex justify-end items-center  gap-3 my-1 mx-12 mb-5 ">
                        <li className={` text-gray-400  text-xs ${currentPage === 1 ? 'hidden' : ''}`}>
                            <button className="text-sm font-semibold " onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}> &lt;&lt; </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (

                            <li key={index} className={`  text-black py-1 px-3 text-sm  ${currentPage === index + 1 ? ' text-white bg-[#2199e8]' : ''}`}>
                                <button className="text-sm font-semibold " onClick={() => setCurrentPage(index + 1)}> {index + 1}</button>
                            </li>
                        ))}
                        <li className={`text-gray-400  text-xs ${currentPage === totalPages ? 'hidden' : ''}`}>
                            <button className="text-sm font-semibold " onClick={() => setCurrentPage(prev => Math.max(prev + 1, 1))}> &gt;&gt;</button>
                        </li>
                    </ul>
                </nav>}
            {/* table */}
            {/* ------------------------------------------------------------------------------------------------- */}





            <ToastContainer />
        </div>
    )
}
