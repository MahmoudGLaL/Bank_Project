// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faDownload, faPlus } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
// import { Action } from 'history'
import { authcontext } from '../../Context/authcontext'
import { FaPlus } from "react-icons/fa";

import ExportToExcel from './exportExel'
import { useRef } from 'react'
import { ToastContainer } from 'react-toastify'


const OrderMoney = () => {
  const navigate = useNavigate()
  let { GetAllReq, All_Req, GetAllUser, allUser, TreasuryData, getTreasury, getContract, AllDay_Stats, getReqDayStat } = useContext(authcontext)
  const tableRef = useRef(null);

  const [searched, setSearched] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);


  const patientsPerPage = 10;
  const date = new Date();

  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-indexed
  const year = date.getFullYear();

  // Combine them into the desired format
  const formattedDate = `${day}_${month}_${year}`;

  const [searchCriteria, setSearchCriteria] = useState({
    id: "", name: "", createdAt: "", nationalId: "",
    paymentType: "", status: "", organization: "", emplyee: ""
  });

  const initialValues = {
    id: "", name: "", createdAt: "", nationalId: "",
    paymentType: "", status: "", organization: "", emplyee: ""
    // other fields...
  };


  useEffect(() => {
    localStorage.setItem('activeIndex', 0)
    GetAllReq()
    GetAllUser()
    getContract()
    getReqDayStat()
    getTreasury(localStorage.getItem('tres_id'))

  }, [])

  const handleNav = () => {
    navigate(`/orderCreate/${localStorage.getItem('tres_id')}`)
  }

  const handleSearch = (e) => {
    setLoading(true)
    setTimeout(() => {
      setSearched(true)
      setLoading(false)
    }, [1000]);

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

    navigate(`/orderDetails/${id}`)
  }






  const Tres_data = All_Req.filter(e => e.treasuryId == localStorage.getItem('tres_id'));
  const Tres_stats = AllDay_Stats.filter(e => e.treasuryName == TreasuryData?.treasuryName);

  // const All_stats = AllDay_Stats.filter(e => e.treasuryName == 1);





  let filteredReq = (Tres_data.length > 0 && localStorage.getItem('role') !== 'SuperAdmin') ? Tres_data.filter(req => {
    return (
      searchCriteria.id && req.id.toString().includes(searchCriteria.id ? searchCriteria.id.toLowerCase() : "") ||
      searchCriteria.name && req.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "") ||
      searchCriteria.createdAt && req.createdAt.toString().includes(searchCriteria.createdAt ? searchCriteria.createdAt.toString() : "") ||
      searchCriteria.nationalId && req.nationalId.toLowerCase().includes(searchCriteria.nationalId ? searchCriteria.nationalId.toLowerCase() : "") ||
      searchCriteria.paymentType && req.paymentType.toLowerCase().includes(searchCriteria.paymentType ? searchCriteria.paymentType.toLowerCase() : "") ||
      searchCriteria.status && req.status.toString().toLowerCase().includes(searchCriteria.status ? searchCriteria.status.toLowerCase() : "") ||
      searchCriteria.organization && req.organization.toLowerCase().includes(searchCriteria.organization ? searchCriteria.organization : "") ||
      searchCriteria.emplyee && req.user.username.toLowerCase().includes(searchCriteria.emplyee ? searchCriteria.emplyee.toLowerCase() : "")

    )

  }) : All_Req.filter(req => {
    return (
      searchCriteria.id && req.id.toString().includes(searchCriteria.id ? searchCriteria.id.toLowerCase() : "") ||
      searchCriteria.name && req.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "") ||
      searchCriteria.createdAt && req.createdAt.toString().includes(searchCriteria.createdAt ? searchCriteria.createdAt.toString() : "") ||
      searchCriteria.nationalId && req.nationalId.toLowerCase().includes(searchCriteria.nationalId ? searchCriteria.nationalId.toLowerCase() : "") ||
      searchCriteria.paymentType && req.paymentType.toLowerCase().includes(searchCriteria.paymentType ? searchCriteria.paymentType.toLowerCase() : "") ||
      searchCriteria.status && req.status.toString().includes(searchCriteria.status ? searchCriteria.status : "") ||
      searchCriteria.organization && req.organization.toLowerCase().includes(searchCriteria.organization ? searchCriteria.organization : "") ||
      searchCriteria.emplyee && req.user.username.toLowerCase().includes(searchCriteria.emplyee ? searchCriteria.emplyee.toLowerCase() : "")

    )

  })

  // const data = tableToJson()
  // setTabData(data)

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentRequests = filteredReq?.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredReq?.length / patientsPerPage);
  // setCurrentPage(totalPages)


  const allcurrentRequests = (Tres_data.length >= 0 && localStorage.getItem('role') !== 'SuperAdmin') ? [...Tres_data].reverse().slice(indexOfFirstPatient, indexOfLastPatient) : [...All_Req].reverse().slice(indexOfFirstPatient, indexOfLastPatient);
  const allSearchtotalPages = (Tres_data.length >= 0 && localStorage.getItem('role') !== 'SuperAdmin') ? Math.ceil(Tres_data?.length / patientsPerPage) : Math.ceil(All_Req?.length / patientsPerPage);
  // setCurrentSearchPage(allSearchtotalPages)
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
      setSearched(false)

    }
  })

  return (
    <div dir='rtl' className='flex justify-between items-start min-h-[100vh] bg-[#f3f3f4]'>



      <div className=' font-tajawal  w-100 grow  flex flex-col gap-5'>
        <div className=' bg-white flex justify-between items-center py-4'>
          <h2 className='px-10 xl:px-6 lg:px-4 text-[28px] lg:text-[15px] xl:text-[20px] py-2 text-[rgb(103 106 108 /1)] font-semi-bold'>أمر التوريد{TreasuryData?.treasuryName ? <> / <span className='text-[#f0bb51] font-semibold'> {TreasuryData?.treasuryName} </span></> : ''}</h2>
          <div className='mx-6 lg:mx-4 font-bold flex '>

            <ExportToExcel tableRef={tableRef} fileName={`تقرير أمر التوريد _ ${formattedDate}`} />
            {(localStorage.getItem("role") !== 'SuperAdmin' && TreasuryData.isSelected === true) && <button className='border xl:text-[15px] py-2 px-1 flex justify-center items-center text-white bg-[#c59025] hover:bg-[#f0bb51] rounded-lg ' onClick={handleNav}>
              {/* <FontAwesomeIcon icon={faPlus} className='text-white' /> */}
              <FaPlus className='text-white text-sm lg:text-[9px]  ' />
              <span className='px-1  text-xs lg:text-[11px]'>
                إنشاء امر التوريد
              </span>
            </button>}



          </div>

        </div>

        <form onSubmit={handleSubmit} className='bg-white flex justify-start items-center py-4 w-[96.5%] m-auto gap-8'>

          <div className="grid gap-2 justify-start items-start grid-cols-4 w-full">
            <div className=" text-right mx-6 ">
              <label htmlFor="id" className='text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-700  '>البحث ب رقم التوريد : </label>
              <div class="relative flex items-center  ">
                <input name="id" id='id' type="text"
                  onChange={handleSearchChange}
                  value={searchCriteria.id}
                  className="w-full text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] text-gray-800 bg-white border font-bold  focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " />

              </div>
            </div>

            <div className=" text-right mx-6 ">
              <label htmlFor="name" className='text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-700  '> البحث بالاسم : </label>
              <div class="relative flex items-center  ">
                <input name="name" id='name' type="text"
                  onChange={handleSearchChange}
                  value={searchCriteria.name}
                  className="w-full text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] text-gray-800 bg-white border font-bold  focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="الأسم" />

              </div>
            </div>

            <div className=" text-right mx-6 ">
              <label htmlFor="nationalId" className='text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-700  '> البحث بالرقم القومي : </label>
              <div class="relative flex items-center  ">
                <input name="nationalId"
                  onChange={handleSearchChange}
                  value={searchCriteria.nationalId}
                  id='nationalId' type="text" className="w-full text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="الرقم القومي" />

              </div>
            </div>

            <div className=" text-right mx-6 ">
              <label htmlFor="createdAt" className='text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-700  '> تاريخ الأنشاء: </label>
              <div class="relative flex items-center  ">
                <input name="createdAt" id='createdAt'
                  onChange={handleSearchChange}
                  value={searchCriteria.createdAt}
                  type="date" className="w-full text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] text-gray-800 font-bold bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none border-gray-500" placeholder="التاريخ" />

              </div>
            </div>
            {/* <div className=" text-right mx-6 ">
              <label htmlFor="paymentType" className='text-sm font-bold text-gray-700  '> نوع المدفوعة : </label>
              <div class="relative flex items-center  ">
                <select name="paymentType" id='paymentType'
                  onChange={handleSearchChange}
                  value={searchCriteria.paymentType}
                  type="text" className="w-full font-bold text-sm box-content text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " >
                  <option value="" className='font-bold' disabled selected> اختر نوع المدفوعه </option>
                  <option value="تأهيل طبي " className='font-bold'>تأهيل طبي </option>
                  <option value="عياده خارجيه " className='font-bold'>عياده خارجيه </option>
                </select>

              </div>
            </div> */}

            <div className=" text-right mx-6 ">
              <label htmlFor="organization" className='text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-700  '> المؤسسه والفرع : </label>
              <div class="relative flex items-center  ">
                <select name="organization" id='organization'
                  onChange={handleSearchChange}
                  value={searchCriteria.organization}
                  type="text" className="w-full font-bold text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] box-content text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " >
                  <option value="" className='font-bold' disabled selected>   اختر المؤسسه</option>
                  <option value="خاص" className='font-bold'>خاص</option>
                  <option value="تعاقد" className='font-bold'> تعاقد </option>
                </select>

              </div>
            </div>
            {/* {
            searchCriteria.organization === 'تعاقد' &&  <div className=" text-right mx-6 ">
            <label htmlFor="contract" className='text-sm font-bold text-gray-700  '>  نوع التعاقد : </label>
            <div class="relative flex items-center  ">
              <select name="contract" id='contract'
                onChange={handleSearchChange}
                value={searchCriteria.contract}
                type="text" className="w-full font-bold text-sm box-content text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " >
                <option value="" className='font-bold' disabled selected>   اختر التعاقد</option>
                {AllContracts.map((data)=>(<><option value={data.name} className='font-bold'>{data.name}</option></>))}
                
                
              </select>

        </div>
          </div>
          } */}



            <div className=" text-right mx-6 ">
              <label htmlFor="status" className='text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-700  '> الحالة : </label>
              <div class="relative flex items-center  ">
                <select name="status" id='status'
                  onChange={handleSearchChange}
                  value={searchCriteria.status}
                  type="text" className="w-full font-bold text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] box-content text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " >
                  <option value="" className='font-bold' disabled selected> اختر الحاله</option>
                  <option value="0" className='font-bold'>جديد </option>
                  <option value="1" className='font-bold'>مدفوع </option>
                  <option value="2" className='font-bold'>ملغي </option>
                  <option value="3" className='font-bold'>مسترد </option>
                </select>

              </div>
            </div>



            {
              (localStorage.getItem("role") === 'admin' || localStorage.getItem("role") === 'SuperAdmin')
              && <div className=" text-right mx-6 ">
                <label htmlFor="emplyee" className='text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold text-gray-700  '> المؤظف : </label>
                <div class="relative flex items-center  ">
                  <select name="emplyee" id='emplyee'
                    onChange={handleSearchChange}
                    value={searchCriteria.emplyee}
                    type="text" className="w-full  font-bold text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] box-content text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none border-gray-300" placeholder="رقم امر التوريد " >
                    <option value="" className='font-bold' disabled selected>اختر اسم الموظف</option>
                    {allUser?.map((user) => (
                      <option value={user.username} className='font-bold'>{user.username}</option>
                    ))}

                  </select>

                </div>
              </div>

            }
            {/* {
            searchCriteria.organization !== 'تعاقد' &&  <div className=" text-right mx-6 ">
          </div>
          } */}
            <div></div>
            {
              localStorage.getItem("role") === 'user' && <div></div>
            }

            <div className="flex items-center justify-start flex-wrap text-right mx-6 mt-6 w-full ">
              <button type='submit' className='text-sm lg:text-[12px] md:text-[7px]  xl:text-[12px] p-1 border font-semibold  border-gray-400 hover:bg-gray-200 rounded-lg ' >
                مسح التصفيه
              </button>
              <button onClick={handleSearch} type='button' className='text-sm lg:text-[12px] md:text-[7px]  xl:text-[12px] p-1 border font-semibold rounded-lg bg-[#c59025] hover:bg-[#f0bb51] text-white mx-5'>
                {Loading ? <> <div class="flex justify-center items-center ">
                  <div class="w-4 p-1 border-4 border-white border-t-transparent border-solid rounded-full animate-spin h-4"></div>
                </div>
                </> : <>بحث</>}
              </button>
              {/* <button onClick={tableToJson} type='button' className='text-sm p-1 border font-semibold rounded-lg bg-[#f0bb51] hover:bg-[#278b6a] text-white mx-5'>
                test
              </button> */}
            </div>





          </div>



        </form>

        <div className='bg-white flex  flex-col  py-6 w-[96.5%] m-auto gap-6'>
          {localStorage.getItem('role') === 'SuperAdmin' ? <div className="flex gap-16  m-auto ">
            <div className="">
              <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '>تقرير اليوم</label>
            </div>
            <div className="">
             
              <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '>عدد الأمور <span>[<span className='text-[#c98b3b]'>   {
                AllDay_Stats?.length > 0   ?   AllDay_Stats?.reduce((acc, e) => {
                  return acc + (e.paidCount > 0 ? e.paidCount : 0)
                    + (e.notpaidCount > 0 ? 1 : e.notpaidCount)
                    + (e.canceldCount > 0 ? e.canceldCount : 0);
                }, 0) : 0
              
              }  </span>]</span></label>
            </div>
            <div className="">
              <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '> إجمالي مبلغ الألغاءات <span> [EGP <span className='text-[#c98b3b]'>{
                AllDay_Stats?.length > 0 ? AllDay_Stats?.reduce((acc, e) => e.canceldCount > 0 ? acc + e.canceldCount : acc, 0)
                : 0
                
              }</span>] </span></label>
            </div>
            <div className="">
              <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '> إجمالي المبلغ الغير مدفوع <span> [EGP <span className='text-[#c98b3b]'>{
                 AllDay_Stats?.length > 0 ? AllDay_Stats.reduce((acc, e) => e.notpaidCount > 0 ? acc + e.notpaidCount : acc, 0) 
                 : 0
                
              }</span>] </span></label>
            </div>
            <div className="">
              <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '>إجمالي المبلغ المدفوع <span>[EGP <span className='text-[#c98b3b]'>{
                AllDay_Stats.reduce((acc, e) => e.totalPaid > 0 ? acc + e.totalPaid : acc, 0)
              }</span>]</span> </label>
            </div>


          </div> : <div className="flex gap-16  m-auto ">
            <div className="">
              <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '>تقرير اليوم</label>
            </div>
            <div className="">
             
             <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '>عدد الأمور <span>[<span className='text-[#c98b3b]'>  {
                Tres_stats?.length > 0   ?   Tres_stats?.reduce((acc, e) => {
                  return acc + (e.paidCount > 0 ? e.paidCount : 0)
                    + (e.notpaidCount > 0 ? e.notpaidCount : 0)
                    + (e.canceldCount > 0 ? e.canceldCount : 0);
                }, 0) : 0
              
              } </span>]</span></label>
           </div>
           <div className="">
             <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '> إجمالي مبلغ الألغاءات <span> [EGP <span className='text-[#c98b3b]'>{
               Tres_stats?.length > 0 ? Tres_stats.reduce((acc, e) => e.canceldCount > 0 ? acc + e.totalCanceld : acc, 0)
               : 0
               
             }</span>] </span></label>
           </div>
           <div className="">
             <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '> إجمالي المبلغ الغير مدفوع <span> [EGP <span className='text-[#c98b3b]'>{
                Tres_stats?.length > 0 ? Tres_stats.reduce((acc, e) => e.notpaidCount > 0 ? acc + e.notpaidCount : acc, 0) 
                : 0
               
             }</span>] </span></label>
           </div>
           <div className="">
             <label htmlFor="order" className='text-[14px] font-bold text-gray-700  '>إجمالي المبلغ المدفوع <span>[EGP <span className='text-[#c98b3b]'>{
               Tres_stats.reduce((acc, e) => e.totalPaid > 0 ? acc + e.totalPaid : acc, 0)
             }</span>]</span> </label>
           </div>


          </div>}



          <div className="w-[100%]">
            <table className="min-w-full border-collapse bg-white w-full " ref={tableRef}>
              <thead>
                {/* {
                  localStorage.getItem('tres_id') && <tr className='w-full block  border-b text-center ' colspan= {8} >
                    <div className=' text-center  '>
                      <div className='w-full py-4 mt-3 bg-gray-100 -translate-x-[170%] font-bold'>{TreasuryData?.treasuryName ? TreasuryData?.treasuryName  : '' }</div>
                    </div>
                </tr>
                } */}

                <tr className='table-row border-b text-center '>
                  <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px2 text-wrap '>رقم أمر التوريد	</th>
                  <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px2 text-wrap '>الاسم</th>
                  <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px2 text-wrap '>الموظف</th>
                  <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px2 text-wrap '>تاريخ الإنشاء</th>
                  <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px2 text-wrap '>	الرقم القومي</th>
                  <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px2 text-wrap '>المؤسسة و الفرع</th>
                  <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px2 text-wrap '>المبلغ</th>
                  {/* <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm text-wrap '>تاريخ الأنتهاء</th> */}
                  {/* <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm text-wrap '>نوع المدفوعة</th> */}
                  {/* <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm text-wrap '>أقساط</th> */}
                  <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px] lg:px-2 xl:px2 text-wrap '>الحالة</th>
                </tr>
              </thead>
              {searched ? <>
                <tbody className='text-[#414040]'>
                  {
                    currentRequests.length > 0 ? <> {currentRequests.map((data) => (
                      <tr className='border-b hover:bg-gray-100 text-center py-12  ' onDoubleClick={() => GetDetails(data.id)}>
                        <td className='border-b border-[#e7eaec] py-[20px]   text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'>{data?.id}</td>
                        <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'>{data?.name}</td>
                        <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'>{data?.user?.username}</td>
                        {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>	١٢/‏٨/‏٢٠٢٤</td> */}
                        <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'> {data?.createdAt?.slice(0, 10)}	</td>
                        <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'>{data?.nationalId}</td>
                        <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'>{data?.organization}</td>
                        <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'>{data?.discount !== 0 ? data?.amountWithDiscount : data?.amount}</td>
                        {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.maturityDate?.slice(0, 10)}</td> */}
                        {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.paymentType}</td> */}
                        {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.installment}</td> */}
                        <td className='border-b border-[#e7eaec] py-[20px]  text-xs lg:text-[9px] xl:text-[11px]  font-bold'>
                          <span className={`${data?.status === 0 ? 'bg-[#f0bb51]' : data?.status === 1 ? 'bg-[#2199e8]' : data?.status === 2 ? 'bg-[#ed5565]' : 'bg-[#36BA98]'}  rounded-lg  py-1 px-2 text-white `}>{data.status === 0 ? 'جديد' : data.status === 1 ? 'مدفوع' : data.status === 2 ? "ملغي" : "مسترد"}
                          </span>
                        </td>
                      </tr>
                    ))}</> : <>


                    </>
                  }



                </tbody>
              </>
                :
                <>
                  <tbody className='text-[#414040]'>
                    {
                      allcurrentRequests.length > 0 ? <> {allcurrentRequests.map((data) => (
                        <tr className='border-b hover:bg-gray-100 text-center py-12  ' onDoubleClick={() => GetDetails(data.id)}>
                          <td className='border-b border-[#e7eaec] py-[20px]   text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'>{data?.id}</td>
                          <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'>{data?.name}</td>
                          <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'>{data?.user?.username}</td>
                          {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>	١٢/‏٨/‏٢٠٢٤</td> */}
                          <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'> {data?.createdAt?.slice(0, 10)}	</td>
                          <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'>{data?.nationalId}</td>
                          <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'>{data?.organization}</td>
                          <td className='border-b border-[#e7eaec] py-[20px]  text-sm lg:text-[9px] md:text-[7px] xl:text-[13px]  font-bold'>{data?.discount !== 0 ? data?.amountWithDiscount : data?.amount}</td>
                          {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.maturityDate?.slice(0, 10)}</td> */}
                          {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.paymentType}</td> */}
                          {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.installment}</td> */}
                          <td className='border-b border-[#e7eaec] py-[20px]  text-xs lg:text-[9px] xl:text-[11px]  font-bold'>
                            <span className={`${data?.status === 0 ? 'bg-[#f0bb51]' : data?.status === 1 ? 'bg-[#2199e8]' : data?.status === 2 ? 'bg-[#ed5565]' : 'bg-[#36BA98]'}  rounded-lg  py-1 px-2 text-white `}>{data.status === 0 ? 'جديد' : data.status === 1 ? 'مدفوع' : data.status === 2 ? "ملغي" : "مسترد"}
                            </span>
                          </td>
                        </tr>
                      ))}</> : <>
                        <tr className='border-b hover:bg-gray-100 text-center'>
                          <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'>--</td>
                          <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'>--</td>
                          <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'>--</td>
                          <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'>--</td>
                          <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'>--</td>
                          <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'>--</td>
                          <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'>--</td>
                          <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'>--</td>
                          <td className='border-b border-[#e7eaec] py-[15px]  text-sm font-bold'></td>
                        </tr>

                      </>
                    }



                  </tbody>
                </>}

            </table>





          </div>



        </div>
        {!searched && <nav>

          <ul className=" flex justify-end items-center  gap-3 my-1 mx-12 mb-5 ">
            <li className={` text-gray-400  text-xs ${currentPage === 1 ? 'hidden' : ''}`}>
              <button className="text-sm font-semibold " onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}> &lt;&lt; </button>
            </li>
            {[...Array(allSearchtotalPages)].map((_, index) => (

              <li key={index} className={`  text-black py-1 px-3 text-sm  ${currentPage === index + 1 ? ' text-white bg-[#2199e8]' : ''}`}>
                <button className="text-sm font-semibold " onClick={() => setCurrentPage(index + 1)}> {index + 1}</button>
              </li>
            ))}
            <li className={`text-gray-400  text-xs ${currentPage === allSearchtotalPages ? 'hidden' : ''}`}>
              <button className="text-sm font-semibold " onClick={() => setCurrentPage(prev => Math.max(prev + 1, 1))}> &gt;&gt;</button>
            </li>
          </ul>
        </nav>}


        {searched &&
          <nav>

            <ul className=" flex justify-end items-center  gap-3 my-5 mx-12  p-3">
              <li className={` text-gray-400  text-sm ${currentPage === 1 ? 'hidden' : ''}`}>
                <button className="text-sm font-semibold " onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>&laquo; السابق</button>
              </li>
              {[...Array(totalPages)].map((_, index) => (

                <li key={index} className={` py-1 px-3   ${currentPage === index + 1 ? ' bg-[#2199e8] text-white' : 'text-black'}`}>
                  <button className="text-sm font-semibold " onClick={() => setCurrentPage(index + 1)}> {index + 1}</button>
                </li>
              ))}
              <li className={`text-gray-400  text-sm ${currentPage === totalPages ? 'hidden' : ''}`}>
                <button className="text-sm font-semibold " onClick={() => setCurrentPage(prev => Math.min(prev + 1, 1))}>التالي &raquo;</button>
              </li>
            </ul>
          </nav>}
      </div>
      {/* <div class="relative flex items-center">
            <input name="email" type="text"   class="w-full text-sm text-gray-800 bg-white border-2   focus:border-[#1E2772] px-2 py-3 rounded-md outline-none" placeholder="Enter email" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
              <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
              <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
            </svg>
          </div>

          <div class="relative flex items-center">
            <input name="password" type="password"   class="w-full text-sm text-gray-800 bg-white border-2   focus:border-[#1E2772] px-2 py-3 rounded-md outline-none" placeholder="Enter password" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
              <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
            </svg>
          </div> */}

      <ToastContainer />
    </div>
  )
}

export default OrderMoney