import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export let authcontext = createContext("")


let BaseUrl = `https://localhost:44365/api`


export default function AuthProvider({ children }) {

    let [loginData, setLoginData] = useState('')
    let [allUser, setAllUser] = useState([])
    let [UserData, setUserData] = useState([])
    let [Req_Data, setReq_Data] = useState([])
    let [Req_Details, setReq_Details] = useState([])
    let [Pay_Details, setPay_Details] = useState([])
    let [All_Req, setAll_Req] = useState([])
    let [All_Pay, setAll_Pay] = useState([])
    let [AllTreasuries, setAllTreasuries] = useState([])
    let [TreasuryData, setTreasuryData] = useState([])
    let [AllContracts, setAllContracts] = useState([])
    let [ContractInfo, setContractInfo] = useState([])
    let [AllTresStat, setAllTresStat] = useState([])
    let [AllTresStatSafe, setAllTresStatSafe] = useState([])
    let [AllMon_Safe, setAllMon_Safe] = useState([])
    let [AllDay_Stats, setAllDay_Stats] = useState([])
    let [AllYear_Stat, setAllYear_Stat] = useState([])
    let [MainYear_Stat, setMainYear_Stat] = useState([])
    let [MainMon_Safe, setMainMon_Safe] = useState([])
    let [MainDay_Stats, setMainDay_Stats] = useState([])
    let [AllMainStat, setAllMainStat] = useState([])
    
    


    async function addRole(values, selectedOption) {
        values.role = selectedOption
        console.log({ values });
        await axios.post(`${BaseUrl}/Users`, values).then((res) => {
            console.log(res);
            toast.success("تمت اضافة مستخدم جديد ب نجاح")

        }).catch(err => {
            // console.log(err);
        })
        // navigate("/main/showRole")
    }

    async function LoginAPi(values, navigate, setisLoading) {

        await axios.post(`${BaseUrl}/Users/login`, values).then(res => {
            console.log(res);
            setLoginData(res.data)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("role", res.data.role)
            localStorage.setItem("id", res.data.id)
            localStorage.setItem("user", res.data.username)

            if (res.data.role === "admin") {
                navigate("/penalties")
                localStorage.setItem("tres_id", '1004')
            }
            else if (res.data.role === "SuperAdmin") {
                navigate("/penalties")
            }
            else {
                navigate("/chooseSafe")
            }

            setisLoading(false)

        }).catch(err => {
            setisLoading(false)
            console.log(err)
            toast.error("خطأ في اسم المستخدم او كلمة المرور")
        })
    }





    let GetAllUser = async () => {
        await axios.get(`${BaseUrl}/Users`).then(res => {
            console.log(res);
            setAllUser(res.data)

        }).catch(err => {
            console.log(err);
        })
    }

    let GetUserByID = async (id) => {
        await axios.get(`${BaseUrl}/Users/${id}`).then(res => {

            setUserData(res.data)

        }).catch(err => {
            console.log(err);
        })
    }

    let UpdateUserPass = async (id, values, update) => {
        console.log(values);

        await axios.put(`${BaseUrl}/Users/${id}`, values).then(res => {

            GetUserByID(id)
            GetAllUser()
            if (update === 'pass') {
                toast.success("تم تغيير الباسورد بنجاح ")
            }
            else {
                toast.success("تم حظر المستخدم بنجاح ")
            }
        }).catch(err => {
            console.log(err);
        })

    }
    let BlockUser = async (id) => {
        await axios.put(`${BaseUrl}/Users/Block/${id}`).then(res => {

            
            if(res.data === false )
            {
                toast.success("تم فك حظر المستخدم بنجاح")
            }
            else {
                toast.success("تم حظر المستخدم بنجاح")
            }
            
            GetAllUser()
        }).catch(err => {
            console.log(err);
        })
    }
    let DelUser = async (id) => {
        await axios.get(`${BaseUrl}/Users/${id}`).then(res => {
            toast.success("تمت حذف المستخدم بنجاح")
            GetAllUser()
        }).catch(err => {
            console.log(err);
        })
    }



    async function addOrder(values) {
        let status = ''
        await axios.post(`${BaseUrl}/Requisitions`, values).then(res => {

            toast.success("تمت اضافة امر التوريد بنجاح")
            setReq_Data(res.data)
            status = res.status
        }).catch(err => {
            toast.error("عفوا الخزنة مغلقة حاليا")
            status = err.response.status
        })

        return status
    }
    async function GetAllReq() {

        await axios.get(`${BaseUrl}/Requisitions`).then(res => {

            setAll_Req(res.data)
            getTreasury(res.data.treasuryId)
        }).catch(err => {
            console.log(err)
            //    toast.error("خطأ في الأضافه")
        })
    }

    async function getReq(id) {

        await axios.get(`${BaseUrl}/Requisitions/${id}`).then(res => {
            console.log(res);
            setReq_Details(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    async function getPaymentDetails(id) {

        await axios.get(`${BaseUrl}/Payments/GetAll/${id}`).then(res => {
            console.log(res);
            setPay_Details(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    async function CancelReq(id) {

        await axios.put(`${BaseUrl}/Requisitions/Canceled/${id}`).then(res => {
            console.log(res);
            toast.success("تمت إلغاء امر التوريد بنجاح")
            GetAllReq()
        }).catch(err => {
            console.log(err)
        })
    }

    async function RebackMoney(id,values) {

        await axios.put(`${BaseUrl}/Payments/${id}`, values).then(res => {
            console.log(res);
            toast.success("تم إستراد المدفوعه بنجاح")
            getPaymentDetails(id)
        }).catch(err => {
            console.log(err)
            toast.error(err?.response?.data)
        })
    }
    async function addTreasury(values) {
        await axios.post(`${BaseUrl}/Treasuries`, values).then(res => {

            toast.success("تمت اضافة الخزنه بنجاح")
        }).catch(err => {
            console.log(err)
        })
    }

    async function accessTreasury(values, navigate) {

        
        await axios.post(`${BaseUrl}/Treasuries/AddUserTreasury`, values).then(res => {
            localStorage.setItem('tres_id', values.treasuryId)
            setTimeout(()=>{ toast.success("تمت فتح الخزنه بنجاح")} ,[1200])         
            navigate("/penalties")
        }).catch(err => {
            if (err.response.status === 406) {
                toast.error(`عفوا ${err.response.data}`)
            }
            else {
                toast.error(`${err.response.data}`)
            }
        })
    }

    async function getAllTreasuries() {
        await axios.get(`${BaseUrl}/Treasuries`).then(res => {
            // console.log(res.data);

            setAllTreasuries(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    async function getTreasury(id) {
        await axios.get(`${BaseUrl}/Treasuries/${id}`).then(res => {
            // console.log(res.data);

            setTreasuryData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    async function CloseTreasury(id, values, navigate) {

        await axios.post(`${BaseUrl}/Treasuries/CloseUserTreasury`, values).then(res => {
            // console.log(res.data);
            toast.success("تم غلق الخزنه بنجاح")
            // setClose(res)
            setTimeout(()=>{navigate("/penalties")},[1500])
            
        }).catch(err => {
            
            if (err.response.status === 406) {
                toast.error(`عفوا ${err.response.data}`)
            }
            else {
                console.log(err)
            }
        })
    }
    async function addContract(values) {
        await axios.post(`${BaseUrl}/Contracts`, values).then(res => {
            toast.success("تمت اضافة التعاقد بنجاح")
        }).catch(err => {
            console.log(err)
        })
    }
    async function getContract() {
        await axios.get(`${BaseUrl}/Contracts`).then(res => {
            setAllContracts(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    async function getContractInfo(id) {
        await axios.get(`${BaseUrl}/Contracts/${id}`).then(res => {
            setContractInfo(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    async function updateContract(id, values) {
        await axios.put(`${BaseUrl}/Contracts/${id}` , values ).then(res => {
            getContract()
            toast.success("تم تعديل التعاقد بنجاح")
        }).catch(err => {
            console.log(err)
        })
    }
    async function DelContract(id) {
        await axios.delete(`${BaseUrl}/Contracts/${id}`).then(res => {
            toast.success("تمت حذف التعاقد بنجاح")
            getContract()
        }).catch(err => {
            toast.error(`عفوا ${err.response.data}`)
            console.log(err)
        })
    }
    async function getPayment() {

        await axios.get(`${BaseUrl}/Payments`).then(res => {
            console.log(res);
            setAll_Pay(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    //main 
    async function getAllMainStat() {

        await axios.get(`${BaseUrl}/Requisitions/infoWithMainTreasuryAll`).then(res => {
            console.log(res);
            setAllMainStat(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    async function getReqYearMain() {

        await axios.get(`${BaseUrl}/Requisitions/infoWithMainTreasuryInYear`).then(res => {
            console.log(res);
            setMainYear_Stat(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    async function getReqMainMonStat() {

        await axios.get(`${BaseUrl}/Requisitions/infoWithMainTreasuryInMonth`).then(res => {
            setMainMon_Safe(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    async function getMainDayStat() {

        await axios.get(`${BaseUrl}/Requisitions/infoWithMainTreasuryInDay`).then(res => {
            console.log(res);
            setMainDay_Stats(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    // submain
    async function getReqYearStat() {

        await axios.get(`${BaseUrl}/Requisitions/infoWithTreasuryInYear`).then(res => {
            console.log(res);
            setAllYear_Stat(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    async function getReqMonStat() {

        await axios.get(`${BaseUrl}/Requisitions/infoWithTreasuryInMonth`).then(res => {
            setAllMon_Safe(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    async function getReqDayStat() {

        await axios.get(`${BaseUrl}/Requisitions/infoWithTreasuryInDay`).then(res => {
            console.log(res);
            setAllDay_Stats(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    async function getTresStat(id) {

        await axios.get(`${BaseUrl}/Requisitions/infoWithTreasuryId/${id}`).then(res => {
            console.log(res);
            setAllTresStat(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    async function getTresBySafe() {

        await axios.get(`${BaseUrl}/Requisitions/infoWithTreasury`).then(res => {
            console.log(res);
            setAllTresStatSafe(res.data)
        }).catch(err => {
            console.log(err)
        })
    }





    return (
        <authcontext.Provider value={{
            allUser, GetAllUser, GetUserByID, UserData, UpdateUserPass, DelUser , BlockUser
            , loginData, LoginAPi,
            addRole, addOrder, Req_Data,
            getReq, Req_Details,
            CancelReq,RebackMoney ,
            GetAllReq, All_Req,
            getPayment, All_Pay, getPaymentDetails ,Pay_Details ,
            addTreasury, getAllTreasuries, AllTreasuries, accessTreasury, TreasuryData, getTreasury,
            AllTresStat, getTresStat, CloseTreasury,
            getTresBySafe, AllTresStatSafe, AllMon_Safe, getReqMonStat, AllDay_Stats, getReqDayStat, AllYear_Stat, getReqYearStat,
            addContract, getContract, AllContracts, DelContract , getContractInfo , ContractInfo , updateContract ,
            getAllMainStat , AllMainStat , getReqYearMain , MainYear_Stat , getReqMainMonStat , MainMon_Safe ,getMainDayStat , MainDay_Stats , 

        }} >
            {children}
        </authcontext.Provider>
    )

}