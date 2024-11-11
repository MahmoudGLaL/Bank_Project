import React from 'react'
import { useContext } from 'react'
import { authcontext } from '../../Context/authcontext'
import { useEffect } from 'react'
import { useState } from 'react';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ClosingData from './closingData';
import MainClosingData from './mainClosingData';
import Search from 'antd/es/input/Search';




export default function Closing() {
    const [searchCriteria, setSearchCriteria] = useState({
        day: "", month: "", safe: "", year: "",
    });
    // const [balance, setBalance] = useState('');
    const [time, setTime] = useState('');
    // const [today, setToday] = useState('');
    const [searched, setSearched] = useState(false);
    const [SearchedMon, setSearchedMon] = useState(false);
    const [SearchedDay, setSearchedDay] = useState(false);
    const [SearchedYear, setSearchedYear] = useState(false);
    const [main, setMain] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [SearchReport, setSearchReport] = useState("");
    // const patientsPerPage = 25;

    // const tableRef = useRef(null);
    


    // const [currentYear, setCurrentYear] = useState('');

    // getTreasury, TreasuryData, getTresStat, AllTresStat, All_Req, allUser, 

    let { GetAllUser, AllMon_Safe, getReqMonStat, getTresBySafe, AllTresStatSafe, GetAllReq,
        AllDay_Stats, getReqDayStat, AllYear_Stat, getReqYearStat, 
        getAllMainStat , AllMainStat , getReqYearMain , MainYear_Stat , getReqMainMonStat , MainMon_Safe , getMainDayStat , MainDay_Stats ,
         AllTreasuries, getAllTreasuries } = useContext(authcontext)
    useEffect(() => {
        GetAllUser()
        GetAllReq()
        getReqDayStat()
        getAllTreasuries()
        getReqMonStat()
        getReqYearStat()
        getAllMainStat()
        getReqYearMain()
        getReqMainMonStat()
        getMainDayStat()
        // getTreasury(localStorage.getItem('tres_id'))
        // getTresStat(localStorage.getItem('tres_id'))
        getTresBySafe()

        // const now = new Date();
        // const year = now.getFullYear();
        // const month = String(now.getMonth() + 1).padStart(2, '0');
        // const day = String(now.getDate()).padStart(2, '0');
        // setToday(`${year}-${month}-${day}`);
        // setCurrentYear(year);

    }, [])

    useEffect(() => {

        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(timer);
    }, []);
    // console.log(AllMainStat);
    

    // const months = Array.from({ length: 12 }, (v, i) => {
    //     const monthValue = String(i + 1).padStart(2, '0');
    //     const monthLabel = new Intl.DateTimeFormat('ar', { month: 'long' }).format(new Date(0, i));
    //     return { value: monthValue, label: monthLabel };
    // });

    // const handleMonthChange = (event) => {
    //     const selectedValue = event.target.value;
    //     setSelectedMonth(`${currentYear}-${selectedValue}`);
    // };


    // const startYear = 2024;
    // const years = Array.from({ length: currentYear - startYear + 1 }, (v, i) => currentYear - i);



    // const navigate = useNavigate()
    // let [toggle, setToggle] = useState(false)
    let [show, setShow] = useState(false)

    // const initialValues = {
    //     createdAt: "", emplyee: ""
    //     // other fields...
    // };

    const initialValues = {
        day: "", month: "", year: "", safe: ""
        // other fields...
    };



    // const GetDetails = (id) => {

    //     navigate(`/orderDetails/${id}`)
    // }

    const handleSearch = () => {
        setLoading(true)
        setTimeout(()=>{
            if(SearchReport === ''){
                setSearched(true)
            }
            else {
                setSearched(false)
                if(SearchReport === 'اليوم'){
                    setSearchedDay(true)
                    setSearchedMon(false)
                    setSearchedYear(false)
                }
                else if(SearchReport === 'الشهر'){
                    setSearchedDay(false)
                    setSearchedMon(true)
                    setSearchedYear(false)
                }
                else {
                    setSearchedDay(false)
                    setSearchedMon(false)
                    setSearchedYear(true)
                }
    
            }
            setLoading(false)
        },[2100])
      
 
    }


    const handleSearchChange = (e) => {
        // if(searchCriteria.day === '' )
        //     {
        //         setSearched(true)
        //     }
        setSearched(false)
        setSearchedMon(false)
        setSearchedDay(false)
        setSearchedYear(false)
        const { name, value } = e.target;
        // if (name === 'safe') {
        //     setShow(true)
        //     if(value === 'عجوزه')
        //     {
        //         setMain(true)
        //     }
        //     else {
        //         setMain(false)
        //     }
        
        // }
       
        setSearchCriteria(prevState => ({ ...prevState, [name]: value }));



    };
    // const Tres_data = All_Req.filter(e => e.treasuryId == localStorage.getItem('tres_id'));

// main



// submain
    let filteredClose = AllTresStatSafe?.filter(req => {

        
        return (
            searchCriteria.safe && req.treasuryName.includes(searchCriteria.safe ? searchCriteria.safe : "")
        )
    })
   

    const Tres_ByDay = AllDay_Stats?.filter(e => e.treasuryName === searchCriteria.safe);
    const Tres_ByMonth = AllMon_Safe?.filter(e => e.treasuryName === searchCriteria.safe);
    const Tres_ByYear = AllYear_Stat?.filter(e => e.treasuryName === searchCriteria.safe);

    // let filteredYear = Tres_ByYear?.filter(req => {
    //     return (
    //         searchCriteria.year && req.date.toString().includes(searchCriteria.year ? searchCriteria.year : "")
    //     )
    // })






    // const data = tableToJson()
    // setTabData(data)


    // const indexOfLastPatient = currentPage * patientsPerPage;
    // const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    // const currentRequests = filteredReq?.slice(indexOfFirstPatient, indexOfLastPatient);
    // const totalPages = Math.ceil(filteredReq?.length / patientsPerPage);


    // const allcurrentRequests = All_Req?.slice(indexOfFirstPatient, indexOfLastPatient);




    const { handleSubmit } = useFormik({
        initialValues,
        onSubmit: async () => {
            // values.userId = localStorage.getItem("id")
            // searchCriteria.createdAt = ""
            // searchCriteria.emplyee = ""
            searchCriteria.day = ""
            searchCriteria.month = ""
            searchCriteria.year = ""
            searchCriteria.safe = ""
            setSearchReport("")
            setShow(false)
            setSearched(false)
            setSearchedMon(false)
            setSearchedDay(false)
            setSearchedYear(false)

        }
    })



    return (
        <div className='font-tajawal' >

            <div className='flex justify-between items-center py-6 bg-white md:px-6 border-[0.1px]' dir='rtl'>

                {/* <h2 className='text-[#676a6c]  cairo text-[30px] mx-4'>تقارير الإغلاق{TreasuryData?.treasuryName ? '/' + TreasuryData?.treasuryName : ''}</h2> */}
                <h2 className='text-[#676a6c]  cairo text-[30px] mx-8'>تقارير الإغلاق</h2>

            </div>
            <form onSubmit={handleSubmit} className='bg-white my-12 flex justify-start items-center py-4 w-[96.5%] m-auto gap-8'>

                <div dir='rtl' className="grid gap-2  justify-start items-start grid-cols-4 w-full">
                    <div className=" text-right mx-6 ">
                        <label htmlFor="safe" className='text-sm font-bold text-gray-700  '>بحث إيرادات الخزنه : </label>
                        <div class="relative flex items-center  ">
                            <select name="safe" id='safe'
                                onChange={handleSearchChange}
                                value={searchCriteria.safe}
                                className="w-full font-bold text-sm box-content text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " >
                                <option value="" className='font-bold' disabled selected>   اختر الخزنه</option>
                                {AllTreasuries ? AllTreasuries.map((safe) => (<>
                                    <option value={safe.treasuryName} className='font-bold'>{safe.treasuryName}</option>
                                </>)) : <option className='font-bold'>لايوجد</option>}
                            </select>

                        </div>
                    </div>
                    {
                        show && <>
                           
                            {
                                
                                !searchCriteria.month && !searchCriteria.year &&  <div className=" text-right mx-6 ">
                                <label htmlFor="day" className='text-sm font-bold text-gray-700  '>  تقرير البحث : </label>
                                <div class="relative flex items-center  ">
                                    <select name="day" id="day"
                                        // value={selectedMonth.split('-')[1]}
                                        // onChange={handleMonthChange}
                                        onChange={(e)=>setSearchReport(e.target.value)}
                                        value={SearchReport}
                                        className="w-full font-bold text-sm box-content text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " >
                                        <option value="" className='font-bold' disabled selected>   اختر تقرير البحث</option>
                                        <option value='اليوم' className='font-bold'  >  اليوم الحالي</option>
                                        <option value='الشهر' className='font-bold'  > الشهر الحالي</option>
                                        <option value='السنه' className='font-bold'  > السنه الحاليه</option>
                                    </select>
        
                                </div>
                            </div>
                            
                            }
                             
                            
                    {/* {
                         !searchCriteria.day && !searchCriteria.year && <div className=" text-right mx-6 ">
                         <label htmlFor="monthSelect" className='text-sm font-bold text-gray-700  '> البحث بالشهر : </label>
                         <div class="relative flex items-center  ">
                             <select name="month" id="monthSelect"
                                 // value={selectedMonth.split('-')[1]}
                                 // onChange={handleMonthChange}
                                 onChange={handleSearchChange}
                                 value={searchCriteria.month}
                                 className="w-full font-bold text-sm box-content text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " >
                                 <option value="" className='font-bold' disabled selected>   اختر الشهر</option>
                                 {months.map((month) => (
                                     <option key={month.value} value={month.label}>
                                         {month.label}
                                     </option>
                                 ))}
 
                             </select>
 
                         </div>
                     </div>
                    } */}
                    
                    {/* { !searchCriteria.day && !searchCriteria.month &&    <div className=" text-right mx-6 ">
                        <label htmlFor="year" className='text-sm font-bold text-gray-700  '> البحث بالسنه : </label>
                        <div class="relative flex items-center  ">
                            <select name="year" id="year"
                                onChange={handleSearchChange}
                                value={searchCriteria.year}
                                className="w-full font-bold text-sm box-content text-gray-800 bg-white border   focus:border-[#f0bb51] px-2 py-2 rounded-md outline-none  border-gray-300" placeholder="رقم امر التوريد " >
                                <option value="" className='font-bold' disabled selected>   اختر السنه</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}

                            </select>

                        </div>
                    </div> } */}
                 

                    {searchCriteria.safe !== "" && <><div></div> <div></div> </>}

                        </>
                    }
                    {
                        !show && <>
                        <div></div>
                        <div></div>
                        <div></div>
                        </>
                    }
                   

                    <div dir='rtl' className='flex  items-center  mt-2 cairo'>
                        <div dir='rtl' className='flex gap- items-center ms-4 ps-2  '>
                            <button type='submit' className='flex items-center gap-1 border-[0.1px] py-1 px-5 text-sm font-semibold rounded-sm hover:border-[#767977] focus:border-[#747975]'>
                                <span className='text-gray-400  '> مسح التصفيه </span>
                            </button>
                        </div>
                        <div dir='rtl' className='flex gap-3 items-center ms-3  my-1 '>
                            <button onClick={handleSearch} type='button' className='flex items-center gap-1 border-[0.1px] p-1 font-semibold text-[12px] text-sm rounded-md  text-white bg-[#c59025] hover:bg-[#f0bb51]'>
                            {Loading ? <> <div class="flex justify-center items-center ">
                                    <div class="w-4 p-1 border-4 border-white border-t-transparent border-solid rounded-full animate-spin h-4"></div>
                                </div>
                                </> : <>بحث</>}
                            </button>
                        </div>
                    </div>
                    {/* <div className="flex items-center justify-start flex-wrap text-right mx-6 mt-3 w-full ">
                        <button type='submit' className='text-sm p-1 border border-gray-400 hover:bg-gray-200 rounded-lg ' >
                            مسح التصفيه
                        </button>
                        <button onClick={handleSearch} type='button' className='text-sm p-1 border font-semibold rounded-lg bg-[#f0bb51] hover:bg-[#278b6a] text-white mx-5'>
                            بحث
                        </button>
                       
                    </div> */}
                </div>
            </form>

            { main === true ? <>
            
            {
                  searched ? <> <MainClosingData filteredClose={AllMainStat} /> </>
                  : SearchedMon ? <><MainClosingData filteredClose={MainMon_Safe} /></>
                      : SearchedDay ? <><MainClosingData filteredClose={MainDay_Stats} /></>
                          : SearchedYear ? <><MainClosingData filteredClose={MainYear_Stat} /></>
                              :
                              <>
                                  {/* <div dir='rtl' className='grid grid-cols-9  mx-5 px-12'>
                          <div className='col-span-3'>
                              <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                                  <h2 className='p-2 border-b-1'>إجمالي أوامر التوريد</h2>
                                  <p className='px-5 text-[30px]'>{parseInt(AllTresStat?.totalPaid) + parseInt(AllTresStat?.totalNotPaid) + parseInt(AllTresStat?.totalCanceld)} EGP</p>
                                  <small className='px-5'>{parseInt(AllTresStat?.paidCount) + parseInt(AllTresStat?.notpaidCount) + parseInt(AllTresStat?.canceldCount)} أمر  </small>

                              </div>
                          </div>
                          <div className='col-span-3'>
                              <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                                  <div className='flex justify-between items-center p-2 border-b-1'>
                                      <h2 className=''>إجمالي تحصيلات الكاش  </h2>
                                      <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>كاش</small>
                                  </div>
                                  <p className='px-5 text-[30px]'>{AllTresStat?.totalPaid} EGP</p>
                                  <small className='px-5'>{AllTresStat?.paidCount} معاملة</small>

                              </div>
                          </div>

                          <div className='col-span-3'>
                              <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                                  <div className='flex justify-between items-center p-2 border-b-1'>
                                      <h2 className=''>إجمالي تحصيلات الغير مدفوع  </h2>
                                      <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>غير مدفوع</small>
                                  </div>
                                  <p className='px-5 text-[30px]'>{AllTresStat?.totalNotPaid} EGP</p>
                                  <small className='px-5'>{AllTresStat?.notpaidCount} معاملة</small>

                              </div>
                          </div>
                          <div className='col-span-3'>
                              <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                                  <div className='flex justify-between items-center p-2 border-b-1'>                 <h2 className=''>إجمالي الأستردادات  </h2>
                                      <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>  الأستردادات</small>
                                  </div>
                                  <p className='px-5 text-[30px]'>{AllTresStat?.totalRefund} EGP</p>
                                  <small className='px-5'> {AllTresStat?.refundCount} معاملة</small>

                              </div>
                          </div>

                          <div className='col-span-3'>
                              <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                                  <div className='flex justify-between items-center p-2 border-b-1'>                 <h2 className=''>إجمالي الإلغاء  </h2>
                                      <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>  الإلغاء</small>
                                  </div>
                                  <p className='px-5 text-[30px]'>{AllTresStat?.totalCanceld} EGP</p>
                                  <small className='px-5'> {AllTresStat?.canceldCount} معاملة</small>

                              </div>
                          </div>



                      </div> */}
                              </>
            }
            
            </> : <>
            
                {
                      searched ? <> <ClosingData filteredClose={filteredClose} /> </>
                      : SearchedMon ? <><ClosingData filteredClose={Tres_ByMonth} /></>
                          : SearchedDay ? <><ClosingData filteredClose={Tres_ByDay} /></>
                              : SearchedYear ? <><ClosingData filteredClose={Tres_ByYear} /></>
                                  :
                                  <>
                                      {/* <div dir='rtl' className='grid grid-cols-9  mx-5 px-12'>
                              <div className='col-span-3'>
                                  <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                                      <h2 className='p-2 border-b-1'>إجمالي أوامر التوريد</h2>
                                      <p className='px-5 text-[30px]'>{parseInt(AllTresStat?.totalPaid) + parseInt(AllTresStat?.totalNotPaid) + parseInt(AllTresStat?.totalCanceld)} EGP</p>
                                      <small className='px-5'>{parseInt(AllTresStat?.paidCount) + parseInt(AllTresStat?.notpaidCount) + parseInt(AllTresStat?.canceldCount)} أمر  </small>
  
                                  </div>
                              </div>
                              <div className='col-span-3'>
                                  <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                                      <div className='flex justify-between items-center p-2 border-b-1'>
                                          <h2 className=''>إجمالي تحصيلات الكاش  </h2>
                                          <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>كاش</small>
                                      </div>
                                      <p className='px-5 text-[30px]'>{AllTresStat?.totalPaid} EGP</p>
                                      <small className='px-5'>{AllTresStat?.paidCount} معاملة</small>
  
                                  </div>
                              </div>
  
                              <div className='col-span-3'>
                                  <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                                      <div className='flex justify-between items-center p-2 border-b-1'>
                                          <h2 className=''>إجمالي تحصيلات الغير مدفوع  </h2>
                                          <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>غير مدفوع</small>
                                      </div>
                                      <p className='px-5 text-[30px]'>{AllTresStat?.totalNotPaid} EGP</p>
                                      <small className='px-5'>{AllTresStat?.notpaidCount} معاملة</small>
  
                                  </div>
                              </div>
                              <div className='col-span-3'>
                                  <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                                      <div className='flex justify-between items-center p-2 border-b-1'>                 <h2 className=''>إجمالي الأستردادات  </h2>
                                          <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>  الأستردادات</small>
                                      </div>
                                      <p className='px-5 text-[30px]'>{AllTresStat?.totalRefund} EGP</p>
                                      <small className='px-5'> {AllTresStat?.refundCount} معاملة</small>
  
                                  </div>
                              </div>
  
                              <div className='col-span-3'>
                                  <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                                      <div className='flex justify-between items-center p-2 border-b-1'>                 <h2 className=''>إجمالي الإلغاء  </h2>
                                          <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>  الإلغاء</small>
                                      </div>
                                      <p className='px-5 text-[30px]'>{AllTresStat?.totalCanceld} EGP</p>
                                      <small className='px-5'> {AllTresStat?.canceldCount} معاملة</small>
  
                                  </div>
                              </div>
  
  
  
                          </div> */}
                                  </>
                }
            
            </>
              
            }





            {/* <div dir='rtl' className='grid grid-cols-9  mx-5 px-12'>
                <div className='col-span-3'>
                    <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                        <h2 className='p-2 border-b-1'>إجمالي أوامر التوريد</h2>
                        <p className='px-5 text-[30px]'>{parseInt(AllTresStat?.totalPaid) + parseInt(AllTresStat?.totalNotPaid) + parseInt(AllTresStat?.totalCanceld)} EGP</p>
                        <small className='px-5'>{parseInt(AllTresStat?.paidCount) + parseInt(AllTresStat?.notpaidCount) + parseInt(AllTresStat?.canceldCount)} أمر  </small>

                    </div>
                </div>
                <div className='col-span-3'>
                    <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                        <div className='flex justify-between items-center p-2 border-b-1'>
                            <h2 className=''>إجمالي تحصيلات الكاش  </h2>
                            <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>كاش</small>
                        </div>
                        <p className='px-5 text-[30px]'>{AllTresStat?.totalPaid} EGP</p>
                        <small className='px-5'>{AllTresStat?.paidCount} معاملة</small>

                    </div>
                </div>

                <div className='col-span-3'>
                    <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                        <div className='flex justify-between items-center p-2 border-b-1'>
                            <h2 className=''>إجمالي تحصيلات الغير مدفوع  </h2>
                            <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>غير مدفوع</small>
                        </div>
                        <p className='px-5 text-[30px]'>{AllTresStat?.totalNotPaid} EGP</p>
                        <small className='px-5'>{AllTresStat?.notpaidCount} معاملة</small>

                    </div>
                </div>
             
                <div className='col-span-3'>
                    <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                        <div className='flex justify-between items-center p-2 border-b-1'>                 <h2 className=''>إجمالي تحصيلات الفيزا </h2>
                            <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>بطاقة الائتمان </small>
                        </div>
                        <p className='px-5 text-[30px]'>EGP0.00</p>
                        <small className='px-5'>0 معاملة</small>

                    </div>
                </div>
                <div className='col-span-3'>
                    <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                        <div className='flex justify-between items-center p-2 border-b-1'>                 <h2 className=''>إجمالي الأستردادات  </h2>
                            <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>  الأستردادات</small>
                        </div>
                        <p className='px-5 text-[30px]'>{AllTresStat?.totalRefund} EGP</p>
                        <small className='px-5'> {AllTresStat?.refundCount} معاملة</small>

                    </div>
                </div>

                <div className='col-span-3'>
                    <div className='bg-white w-[80%] border-[0.1px] my-[20px] pt-1 pb-5 '>
                        <div className='flex justify-between items-center p-2 border-b-1'>                 <h2 className=''>إجمالي الإلغاء  </h2>
                            <small className='bg-[#ee820d] px-1 text-[10px] text-white rounded-sm'>  الإلغاء</small>
                        </div>
                        <p className='px-5 text-[30px]'>{AllTresStat?.totalCanceld} EGP</p>
                        <small className='px-5'> {AllTresStat?.canceldCount} معاملة</small>

                    </div>
                </div>



            </div> */}



            {/* searchin */}
            {/* <div className='flex justify-center items-center'>


                <form onSubmit={handleSubmit} className='flex justify-between items-center py-4 bg-white md:px-6 border-[0.1px]   w-[90%]' dir='rtl'>

                    <div className='flex gap-4 justify-between items-center'>
                        <div className="flex  flex-col">
                            <label dir='rtl' htmlFor="createdAt" className='text-[#676a6c] text-[16px] cairo ms-1  py-1'>   التاريخ:</label>
                            <input
                                name='createdAt'
                                onChange={handleSearchChange}
                                value={searchCriteria.createdAt}
                                type="date"
                                dir='rtl'
                                className='  font-semibold w-[300px] p-1 border border-gray-300 hover:border-[#28a745] focus:border-[#28a745] focus:outline-none transition duration-200'
                                placeholder=' التاريخ '
                            />
                        </div>
                        <div className="flex  flex-col">
                            <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-1  py-1'>   الموظف:</label>

                            <select name="emplyee" id='emplyee'

                                onChange={handleSearchChange}
                                value={searchCriteria.emplyee}
                                type="text" className="  md:w-[600px] p-1 border border-gray-300 hover:border-[#28a745] focus:border-[#28a745] focus:outline-none transition duration-200 font-semibold" placeholder='  الموظف ' >
                                <option value="" className='font-bold' disabled selected>اختر اسم الموظف</option>
                                {allUser?.map((user) => (
                                    <option value={user.username} className='font-bold'>{user.username}</option>
                                ))}

                            </select>

                        </div>

                        <div dir='rtl' className='flex  items-center  mt-8 cairo'>
                            <div dir='rtl' className='flex gap- items-center ms-12 ps-8  '>
                                <button type='submit' className='flex items-center gap-1 border-[0.1px] py-1 px-5 text-sm font-semibold rounded-sm hover:border-[#767977] focus:border-[#747975]'>
                                    <span className='text-gray-400  '> مسح التصفيه </span>
                                </button>
                            </div>
                            <div dir='rtl' className='flex gap-3 items-center ms-3  my-1 '>
                                <button onClick={handleSearch} type='button' className='flex items-center gap-1 border-[0.1px] p-1 font-semibold text-[12px] text-sm rounded-md  text-white bg-[#f0bb51]'>
                                    بحث



                                </button>
                            </div>
                        </div>
                    </div>

                </form>

            </div> */}



            {/* table */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* <div dir='rtl' className='flex justify-center items-center'>
                <div className='bg-white w-[95%] border-[0.1px] my-[20px] px-5 '>

                    <table className="min-w-full border-collapse bg-white w-full " ref={tableRef}>
                        {searched ? <>
                            <thead>

                                <tr className='table-row border-b text-center '>
                                    <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm text-wrap '>رقم أمر التوريد	</th>
                                    <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm text-wrap '>الاسم</th>
                                    <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm text-wrap '>الموظف</th>
                                    <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm text-wrap '>تاريخ الإنشاء</th>
                                    <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm text-wrap '>	الرقم القومي</th>
                                    <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm text-wrap '>المؤسسة و الفرع</th>
                                    <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm text-wrap '>المبلغ</th>
                                  
                                    <th className='border-t border-[#e7eaec] leading-[1.42857] py-2 align-top  text-sm text-wrap '>الحالة</th>
                                </tr>
                            </thead>

                            <tbody className='text-[#414040]'>
                                {
                                    currentRequests.length > 0 ? <> {currentRequests.map((data) => (
                                        <tr className='border-b hover:bg-gray-100 text-center py-12  ' onDoubleClick={() => GetDetails(data.id)}>
                                            <td className='border-b border-[#e7eaec] py-[20px]   text-sm font-bold'>{data.id}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.name}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.user.username}</td>
                                          
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'> {data.createdAt?.slice(0, 10)}	</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.nationalId}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.organization}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.amount}</td>
                                          
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-xs font-bold'>
                                                <span className={`${data.status === 0 ? 'bg-[#f0bb51]' : data.status === 1 ? 'bg-[#2199e8]' : 'bg-[#ed5565]'}  rounded-lg  py-1 px-2 text-white `}>{data.status === 0 ? 'جديد' : data.status === 1 ? 'مدفوع' : "ملغي"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}</> : <>
                                        <tr className='border-b hover:bg-gray-100 text-center py-12  '>
                                            <td className='border-b border-[#e7eaec] py-[20px]   text-sm font-bold'>لايوجد</td>

                                        </tr>

                                    </>
                                }



                            </tbody>
                        </>
                            :
                            <>
                            </>}

                    </table>
                    
                </div>

            </div> */}


            {/* {searched &&
                <nav dir='rtl'>

                    <ul className=" flex justify-end items-center  gap-3 my-5 mx-12  p-3">
                        <li className={` text-gray-400  text-sm ${currentPage === 1 ? 'hidden' : ''}`}>
                            <button className="text-sm font-semibold " onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>&laquo; السابق</button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (

                            <li key={index} className={`bg-[#2199e8] text-white py-1 px-3   ${currentPage === index + 1 ? 'text-black' : ''}`}>
                                <button className="text-sm font-semibold " onClick={() => setCurrentPage(index + 1)}> {index + 1}</button>
                            </li>
                        ))}
                        <li className={`text-gray-400  text-sm ${currentPage === totalPages ? 'hidden' : ''}`}>
                            <button className="text-sm font-semibold " onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>التالي &raquo;</button>
                        </li>
                    </ul>
                </nav>} */}



            <ToastContainer />
        </div>
    )
}
