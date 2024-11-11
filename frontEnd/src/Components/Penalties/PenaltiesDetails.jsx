
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import React from 'react'

export default function PenaltiesDetails() {
  return (
    <div>
      <div className='flex  justify-end items-center py-2 bg-white md:px-6 border-[0.1px] '>

        <div>
          <h2 className='text-[#676a6c] font-bold font-[Univers] text-[30px] text-right'>تفاصيل أمر التوريد</h2>
          <Breadcrumbs
            dir='rtl'
            separator="\"
            itemClasses={{
              separator: "px-2"
            }}
          >
            <BreadcrumbItem >أوامر التوريد</BreadcrumbItem>
            <BreadcrumbItem>تفاصيل أمر التوريد</BreadcrumbItem>

          </Breadcrumbs>

        </div>


      </div>

      <div className='flex justify-center items-center'>
        <div className='bg-white w-[95%] border-[0.1px] mt-[20px]   '>

          <div dir='rtl' className='flex justify-between items-center gap-5 p-2  border-b-[0.4px]'>
            <p>تفاصيل أمر التوريد</p>
            <div className='flex items-center gap-3 mx-2 '>
              <button className='border-[0.3px] text-gray-400 p-1 text-[13px] font-bold'>طباعة</button>
              <button  className='bg-red-500  py-1 text-[13px] font-bold text-white rounded-md px-2'>الغاء الامر</button>
            </div>
          </div>

          <div dir='rtl' className='grid grid-cols-12 gap-5'>
            <div className=' ms-6 col-span-3 flex flex-col  pb-4'>

              <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-[8px]  py-2'>   طريقة الدفع:</label>


              <input disabled
                dir='rtl'
                className=' w-[300px] p-1  bg-gray-200  border-none '
                placeholder="120"
              />

            </div>
            {/* ----1---- */}
            <div className=' ms-6 col-span-3 flex flex-col  pb-4'>

              <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-[8px]  py-2'>  مؤسسة مالي، فرع مالي:</label>


              <input disabled
                dir='rtl'
                className=' w-[300px] p-1  bg-gray-200  border-none '
                placeholder="تاهيل طبيعي"
              />

            </div>
            {/* -----2---- */}
            <div className=' ms-6 col-span-3 flex flex-col  pb-4'>

              <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-[8px]  py-2'>     المبلغ المطلوب*:</label>


              <input disabled
                dir='rtl'
                className=' w-[300px] p-1  bg-gray-200  border-none '
                placeholder="50 "
              />

            </div>

            <div className=' ms-6 col-span-3 flex flex-col  pb-4'>

              <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-[8px]  py-2'>     رقم الهاتف*:</label>


              <input disabled
                dir='rtl'
                className=' w-[300px] p-1  bg-gray-200  border-none '
                placeholder="01095895972 "
              />

            </div>

            <div className=' ms-6 col-span-3 flex flex-col  pb-4'>

              <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-[8px]  py-2'> نوع المدفوعة*:</label>


              <input disabled
                dir='rtl'
                className=' w-[300px] p-1  bg-gray-200  border-none '
                placeholder="العيادات الخارجيه "
              />

            </div>

            <div className=' ms-6 col-span-3 flex flex-col  pb-4'>

              <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-[8px]  py-2'> الرقم القومي*:</label>


              <input disabled
                dir='rtl'
                className=' w-[300px] p-1  bg-gray-200  border-none '
                placeholder="30110081400871"
              />

            </div>

            <div className=' ms-6 col-span-3 flex flex-col  pb-4'>

              <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-[8px]  py-2'>  تاريخ الاستحقاق*:</label>


              <input disabled
                dir='rtl'
                className=' w-[300px] p-1  bg-gray-200  border-none '
                placeholder="30/11/2024"
              />

            </div>
            <div className=' ms-6 md:col-span-3 flex flex-col  pb-4'>



            </div>

            <div className=' ms-6 col-span-3 flex flex-col  pb-4'>

              <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-[8px]  py-2'>الإسم ثلاثي*:</label>


              <input disabled
                dir='rtl'
                className=' w-[300px] p-1  bg-gray-200  border-none '
                placeholder="Ali galal cv"
              />

            </div>
            <div className=' ms-6 col-span-3 flex flex-col  pb-4'>

              <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-[8px]  py-2'> تاريخ الانتهاء*:</label>


              <input disabled
                dir='rtl'
                className=' w-[300px] p-1  bg-gray-200  border-none '
                placeholder=""
              />

            </div>

            <div className=' ms-6 col-span-3 flex flex-col  pb-4'>

              <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-[8px]  py-2'> إسم المنشئ*:</label>


              <input disabled
                dir='rtl'
                className=' w-[300px] p-1  bg-gray-200  border-none '
                placeholder="Ahmed khalaf"
              />

            </div>
            <div className=' ms-6 col-span-3 flex flex-col  pb-4'>

              <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-[8px]  py-2'>  الحالة:</label>
              <div className='bg-[#026C48] p-1 w-[40px] text-[10px] text-white text-center'>جديده</div>

            </div>
            <div className=' ms-6 col-span-8 flex flex-col  pb-4'>

              <label dir='rtl' htmlFor="" className='text-[#676a6c] text-[16px] cairo ms-[8px]  py-2'>  تفاصيل المدفوعة:</label>

              <textarea className='w-[70%] bg-gray-200 py-2 rounded-md'></textarea>
          

            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
