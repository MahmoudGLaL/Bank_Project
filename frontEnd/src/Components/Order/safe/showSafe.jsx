
import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { authcontext } from '../../../Context/authcontext.js';

export default function ShowSafe() {

    let { GetAllUser, getAllTreasuries, AllTreasuries } = useContext(authcontext)


    const tableRef = useRef(null);

    useEffect(() => {
        getAllTreasuries()
        GetAllUser()
    }, [])



    return (
        <div dir='rtl' className='font-tajawal  w-100 grow  flex flex-col gap-5' >

            <div className='flex justify-between items-center py-6 bg-white md:px-6 border-[0.1px] '>
                <h2 className='text-[#676a6c] font-bold cairo text-[30px] mx-8'>الخزن</h2>
                {/* <div className=' font-bold flex '>
                <ExportToExcel  tableRef ={tableRef} fileName={`تقرير الخزن _ ${formattedDate}`} />
                </div> */}
            </div>

            <div className='bg-white flex justify-start flex-col items-center py-4 w-[96.5%] m-auto gap-8'>




                <div className="w-[100%] p-4">
                    <table ref={tableRef} className="min-w-full border-collapse bg-white w-full ">
                        <thead>
                            <tr className='table-row border-b text-center '>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-sm text-wrap '> اسم الخزنه</th>
                                {/* <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-sm text-wrap '> نوع الخزنه</th> */}
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-sm text-wrap '> الميزانيه</th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-sm text-wrap '> اسم الموظف </th>
                                <th className='border-t border-[#e7eaec] leading-[1.42857] py-4 align-top  text-sm text-wrap '>  </th>
                            </tr>
                        </thead>

                        <>
                            <tbody className='text-[#414040]'>
                                {
                                    AllTreasuries.length > 0 ? <> {AllTreasuries.map((data, index) => (
                                        <tr className='border-b hover:bg-gray-100 text-center  '    >
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.treasuryName}</td>
                                            {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.mainTreasuryName === "No Main Treasury" ? 'رئيسيه' : ` فرعيه ل ${data.mainTreasuryName} `}</td> */}
                                            {/* ${data.treasuryName === 'الدولار' ? 'w-10 h-2 rounded-lg  py-1 px-2 text-[#24a35d] ' : 'text-[#0c0c0c]'} */}
                                            <td className={`border-b border-[#e7eaec] py-[20px]  text-[#0c0c0c]    text-sm font-bold`}>{data.treasuryName === 'خزنة الدولار' ? data.balance + '$' : data.balance}</td>
                                            <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>{data.employee === 'No Name' ? '--' : data.employee}</td>
                                            {/* <td className='border-b border-[#e7eaec] py-[20px]  text-sm font-bold'>
                                                    <button className=' bg-[#af4125] hover:bg-[#d14c3b]  text-white font-bold py-2 px-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105'>
                                                        حذف
                                                    </button>
                                                </td> */}
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







        </div>
    )
}
