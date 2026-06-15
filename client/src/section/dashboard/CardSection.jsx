import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { server } from '@/constatnts/config'
import useDailogBox from '@/store/useDailogBox'
import axios from 'axios'
import { format } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MyButton from '../../components/common/MyButton'
import MySwitch from '../../components/common/MySwitch'
import toast from "react-hot-toast"


const CardSection = ({totalRaised, totalDonors, campaigns=[], selectedCampaign}) => {
   
    
    const [donations, setDonations] = useState([]);
    const [sortedData, setSortedData] = useState()
    const [checked, setChecked] = useState("active")
    const [openDialog, setOpenDialog] = useState(false);
    const [sortOrder, setSortOrder] = useState("asc");
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const handleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    /* const sortedData = [...donationData].sort((a, b) =>
        sortOrder === "asc"
            ? a.amount - b.amount
            : b.amount - a.amount
    ); */

    const { setGlobalDailogBoxOpenValue } = useDailogBox()

    useEffect(() => {
        setGlobalDailogBoxOpenValue(openDialog);
    }, [openDialog, setOpenDialog]);

    useEffect(() => {

      const fetchData = async() => {
        if(!selectedCampaign?.campaign_id) return;
  try {
            const res = await axios.get( `${server}/api/v1/don/get-donation/${selectedCampaign?.campaign_id}`, { withCredentials: true } );
            setSortedData(res.data.donation);
          
            
        } catch (error) {
            console.log(error.response);
            
        }
      }
      fetchData()
     
    }, [selectedCampaign]);
    const fetchDonation = async () => {
       
        const res = await axios.get( `${server}/api/v1/don/get-donation/${selectedCampaign?.campaign_id}`, { withCredentials: true } );
         
          setSortedData(res.data?.donation);
            setOpenDialog(true)
    }
    const isWholeSchool = user?.role === "school";

/* const currentGoal = isWholeSchool
    ? selectedCampaign?.goal_amount
    : user?.goal; */
    const currentGoal = selectedCampaign?.goal_amount;

const currentTitle = isWholeSchool
    ? selectedCampaign?.campaign_name
    : user?.fund_name;

const currentDescription = isWholeSchool
    ? selectedCampaign?.description
    : user?.message;
    
    // const percentage = user?.goal > 0 ? (totalRaised / user.goal) * 100 : 0;
    const percentage = currentGoal > 0 ? (totalRaised / currentGoal) * 100 : 0;
      
      const handleRedeem = async () => {
       try {
        const idempotencyKey = crypto.randomUUID();

        const res = await axios.post( `${server}/api/v1/red/create-redemption`, { amount: totalRaised, campaignId: selectedCampaign?.campaign_id }, { withCredentials: true, headers: { "idempotency-key": idempotencyKey } } );
        if (res.data.success) {
  navigate(`/e-gift-card/${res.data.redemptionId}`);
}
        
        // checked ? navigate('/e-gift-card') : ""
       } catch (error) {
        console.log(error.response);
        toast(error.response.data.message)
        
       }
      }
    
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-[26px]'>
            <div className='bg-outline-border rounded-[20px] pt-9 pl-[38px] pr-[42px] pb-[54px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]'>
                <p className='text-xl font-poppins font-medium mb-[13px] text-white'>$ Total Raised</p>
                <p className='text-[50px] font-poppins font-bold mb-[22px] text-white'>${totalRaised}</p>
                <p className='text-[15px] font-poppins font-light mb-[11px] text-white'>{percentage.toFixed(2)}% of ${currentGoal || 0} GOAL</p>
                <Progress
                    value={percentage}
                    className="bg-soft-lavender h-2 rounded-full overflow-hidden [&>div]:bg-white"
                />
            </div>

            <div className='bg-white rounded-[20px] pt-9 pl-[38px] pr-[42px] pb-[54px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]'>
                <p className='text-xl font-poppins font-medium mb-[13px] text-black'>$ Total Raised</p>
                <p className='text-[50px] font-poppins font-bold mb-[22px] text-black'>{totalDonors}</p>
                <p className='text-[15px] font-poppins font-light mb-[11px] text-black'>Community members</p>
            </div>

            <div className='bg-white rounded-[20px] pt-9 pl-[38px] pr-[42px] pb-[54px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]'>
                <div className='flex items-start justify-between mb-[9px]'>
                    <p className='text-xl font-poppins font-medium text-black'>Status</p>
                    <div className='flex flex-col gap-[7px] items-end justify-end'>
                        <MySwitch setChecked={setChecked} checked={checked} campId={selectedCampaign?.campaign_id} />
                        <span className={`text-xs font-medium ${checked === "active" ? 'text-yellow-500' : 'text-gray-500'}`}>
                            {checked === "active" ? "Activate" : "Completed"}
                        </span>
                    </div>
                </div>
                <div className='flex items-center justify-between mb-[22px]'>
                    <p className='text-xl font-poppins font-medium text-black'>Current Balance</p>
                    <p className='text-xl font-poppins font-extrabold text-bright-green'>${totalRaised.toFixed(2)}</p>
                </div>

                {/* <p onClick={() => setOpenDialog(true)} className='text-[15px] font-poppins text-electric-blue underline hover:cursor-pointer mb-[17px]'>Click to view transaction history</p> */}

                <p onClick={() => fetchDonation()} className='text-[15px] font-poppins text-electric-blue underline hover:cursor-pointer mb-[17px]'>Click to view transaction history</p>

                <MyButton variant="outline" text="Click Here to Redeem Funds" style="w-full" onClick={handleRedeem} disabled={checked} />
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="p-0 border-0 lg:min-w-[650px] w-full rounded-[20px] overflow-auto bg-card-border shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] [&>button]:hidden">

                    <div className="w-full">
                        {/* Header */}
                        <DialogHeader>
                            <DialogTitle className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-[21px] pb-[18px] pr-[60px] pl-[38px] bg-outline-border border-b-[0.5px] border-solid border-b-black text-[20px] font-semibold font-poppins text-white">
                                Transaction History
                            </DialogTitle>
                        </DialogHeader>
                        {/* Table */}
                        <div className="p-6">
                            <div className="max-h-[300px] overflow-y-auto rounded-md">
                                <Table>
                                    <TableHeader className="sticky top-0 z-10 bg-card-border">
                                        <TableRow className="!border-b-0">
                                            <TableHead className="sticky top-0 z-10 bg-card-border text-black font-bold text-[15px] font-poppins">
                                                Date
                                                <div className="flex items-center gap-2">
                                                </div>
                                            </TableHead>
                                            <TableHead className="sticky top-0 z-10 bg-card-border text-black font-bold text-[15px] font-poppins">
                                                Item
                                                <div className="flex items-center gap-2">
                                                </div>
                                            </TableHead>
                                            <TableHead className="sticky top-0 z-10 bg-card-border text-black font-bold text-[15px] font-poppins">
                                                Status
                                                <div className="flex items-center gap-2">
                                                </div>
                                            </TableHead>
                                            <TableHead className="sticky top-0 z-10 bg-card-border text-black font-bold text-[15px] font-poppins">
                                                <button
                                                    onClick={handleSort}
                                                    className="flex items-center gap-2"
                                                >
                                                    Amount
                                                    <ArrowUpDown className="h-4 w-4 text-gray-500" />
                                                </button>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedData && sortedData.map((item) => (
                                            <TableRow
                                                key={item.donation_id}
                                                className="border-b-0 hover:bg-transparent"
                                            >
                                                <TableCell className="py-6">
                                                    <div>
                                                        {/* <h3 className="text-black font-bold text-[15px] font-poppins">
                                                            {item.donor}
                                                        </h3> */}

                                                        <p className="text-black text-[15px] font-poppins">
                                                            {format(new Date(item?.donated_at), "dd-MMM-yyyy")}
                                                        </p>
                                                    </div>
                                                  
                                                </TableCell>
                                                <TableCell className="text-black text-[15px] font-poppins font-bold">
                                                    {item?.message}
                                                </TableCell>
                                                <TableCell className="text-black text-[15px] font-poppins font-bold">
                                                    {item?.transaction_type.charAt(0).toUpperCase() + item?.transaction_type.slice(1)}
                                                  
                                                </TableCell>
                                                <TableCell className="text-bright-green text-[15px] font-poppins font-bold">
                                                    +${item?.amount}
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        <div className='flex items-center justify-between px-8 pb-4 border-t border-solid border-black'>
                            <p className='font-poppins text-[15px] font-bold text-black'>Balance</p>
                            <p className='font-poppins text-[15px] font-bold text-bright-green'>${totalRaised.toFixed(2)}</p>
                        </div>

                    </div>

                </DialogContent>
            </Dialog>



        </div>
    )
}

export default CardSection