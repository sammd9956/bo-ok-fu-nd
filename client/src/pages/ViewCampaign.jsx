import creditCard from "@/assets/credit_card.png"
import MyButton from '@/components/common/MyButton'
import MyInput from '@/components/common/MyInput'
import MyTextArea from '@/components/common/MyTextArea'
import { Progress } from '@/components/ui/progress'
import { server } from '@/constatnts/config'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

const ViewCampaign = () => {
  const [campData, setCampData] = useState(null)
  const [selectedValue,setSelectedValue] = useState("");
// const [profileDets, setProfileDets] = useState(null);
const location = useLocation();
const locationParams = new URLSearchParams(location.search);
const campaignId = locationParams.get("campaign");
const fund = locationParams.get("fund");


useEffect(() => {
  const fetchCamapaign = async () => {
    try {
      const res = await axios.get( `${server}/api/v1/camp/get-campaign/${fund}`, { withCredentials: true } );

      setCampData(res.data?.campaign);
    } catch (error) {
      console.log(error.response);
    }
  };

  if (fund) {
    fetchCamapaign();
  }
}, [fund]);



const intialState = {
  fundId: "",
  donorName: "",
  donorEmail: "",
  amount: "",
  notes: ""
}
const [formData, setformData] = useState(intialState)
const handleChange = (e) => {
  const {name, value} = e.target;
  setformData((prev) => ({
    ...prev, [name]: value
  }))
}   

  
  const navigate = useNavigate();
  
  const handleDonate = async () => {
  try {
    const payLoad = {
    campaignId: campaignId,
    fundId: campData.fund_id,
    donorName: formData.donorName,
    donorEmail: formData.donorEmail,
    amount: formData.amount,
    notes: formData.notes
  }
  
  const res = await axios.post(`${server}/api/v1/don/make-donation`, payLoad, {withCredentials: true});
  toast.success(res.data?.message)

      // navigate("/thank-for-donating");
      navigate("/thank-for-donating", {
  state: {
    donatedAmount: formData.amount,
    donorName: formData.donorName,
    campaignName: campData?.campaign_name,
    campaign: campaignId,
    uuid: fund
  },
});

  } catch (error) {
    console.log(error.response);
    
  }
    
  }
  return (
    <div className='container mx-auto px-2 lg:px-4'>
      <div className="border-[0.5px] border-solid border-black px-[12px] lg:px-[35px] rounded-[20px] bg-card-border mb-8 mt-10 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] grid grid-cols-1 lg:grid-cols-3">
        <div className='lg:pr-[55px] pt-9 lg:col-span-2'>
          <p className='text-black text-[40px] font-poppins font-bold mb-[22px]'>{campData?.campaign_name.toUpperCase()}</p>
          <p className='font-poppins text-2xl text-black font-bold mb-[11px]'>Organizer: <span className='font-normal'>{campData?.full_name.toUpperCase()}</span></p>
          <p className='font-poppins text-2xl text-black font-bold mb-[22px]'>Campaign Date: <span className='font-normal'>{new Date(campData?.start_date).toDateString()} to {new Date(campData?.end_date).toDateString()}</span></p>
          <div className='bg-soft-gray rounded-[20px] pt-[17px] pl-[22px] pr-6 pb-[19px] mb-6'>
            <div className='flex items-center justify-between mb-1.5'>
              <p className='text-purple-purple-500 font-poppins text-[15px] font-semibold'> $300 raised</p>
              <p className='text-slate-gray font-poppins text-[15px] font-semibold'>of $500 goal</p>
            </div>
            <Progress
              value={70}
              className="bg-cloud-gray h-2 rounded-full overflow-hidden [&>div]:bg-outline-border mb-[13px]"
            />
            <p className='text-gray-800 font-poppins text-[15px] font-medium'>❤️ 17 incredible people have donated</p>
          </div>
          <p className='text-gray-800 font-poppins text-[20px] font-semibold mb-2'>Message</p>
          <p className='text-gray-800 font-poppins text-base mb-11'>Bookworm Central Book Fair is coming!  I want to ensure every student can experience the joy of choosing their very own new book.</p>
          {/* <div className=''>
            <p className='text-black font-poppins text-[20px] font-bold mbl-[22px]'>Support the Fund</p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-[18px]'>
              <MyButton variant='outline' text="$10" style="text-gray-800 border-gray-800" onClick={() => setformData(p => ({...p, amount: 10}))} />
              <MyButton variant='outline' text="$20" style="text-gray-800 border-gray-800" onClick={() => setformData(p => ({...p, amount: 20}))} />
              <MyButton variant='outline' text="$30" style="text-gray-800 border-gray-800" onClick={() => setformData(p => ({...p, amount: 30}))} />
              <MyButton variant='outline' text="Enter Custom Amount" style="text-gray-800 border-gray-800 text-sm" />
            </div>
          </div> */}
          <div className=''>
            <p className='text-black font-poppins text-[20px] font-bold mb-[22px]'>Support the Fund</p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-[18px]'>
              <MyButton variant='outline' text="$10" style={`text-gray-800 border-gray-800 ${selectedValue == "$10" ? 'bg-outline-border text-white hover:bg-outline-border/80' : null}`} onClick={()=>{setSelectedValue("$10"), setformData(p => ({...p, amount: 10}))}}/>
              <MyButton variant='outline' text="$20" style={`text-gray-800 border-gray-800 ${selectedValue == "$20" ? 'bg-outline-border text-white hover:bg-outline-border/80' : null}`} onClick={()=>{setSelectedValue("$20"), setformData(p => ({...p, amount: 20}))}}/>
              <MyButton variant='outline' text="$30" style={`text-gray-800 border-gray-800 ${selectedValue == "$30" ? 'bg-outline-border text-white hover:bg-outline-border/80' : null}`} onClick={()=>{setSelectedValue("$30"), setformData(p => ({...p, amount: 30}))}}/>
              
              {
                selectedValue == "custom amount" ? (<MyInput autoFocus inputStyle="bg-white text-gray-800 text-base text-inter font-semibold border-gray-800 py-4 px-6 h-full" placeholder="Enter Your Amount..."  value={formData.amount || ""} onChange={(e) => setformData((p) => ({ ...p, amount: Number(e.target.value), })) } />) : (<MyButton variant='outline' text="Enter Custom Amount" style={`text-gray-800 border-gray-800 text-sm ${selectedValue == "custom amount" ? 'bg-outline-border text-white hover:bg-outline-border/80' : null}`} onClick={()=>{
                setSelectedValue("custom amount")
                // setConvertToInput(true)
              }}/>)
              }
            </div>
          </div>
        </div>
        <div className='lg:border-l lg:border-silver-gray pt-[45px] lg:pl-[44px] pb-[31px]'>
          <div className='flex flex-col items-start justify-center gap-4.5 mb-[33px]'>
            <MyInput forId="Name(Optional)" type="text" placeholder="e.g. The Smith Family" name="donorName" value={formData.donorName} onChange={handleChange} label="Name (Optional)" labelStyle="font-semibold  gap-0" inputStyle="bg-white" />
            <MyInput forId="Email" type="email" placeholder="Enter Your Email" name="donorEmail" value={formData.donorEmail} onChange={handleChange} label="Email" labelStyle="font-semibold  gap-0" star='yes' inputStyle="bg-white" />
            <div className='w-full'>
              <p className='font-poppins font-semibold text-base text-black mb-1'>Note</p>
              <MyTextArea style="p-4 bg-white border border-solid border-black !outline-0 focus:!ring-0 focus:ring-primary-color/40 focus:border-primary-color transition-all min-h-[100px] text-base text-gray-500" placeholder="Enter Your Message" name="notes" value={formData.notes} onChange={handleChange} />
            </div>
          </div>
          <p className='text-black font-poppins text-[20px] font-bold mb-[21px]'>Checkout</p>
          <p className='text-gray-800 font-poppins text-base mb-6'>Confirm the details and enter your billing information.</p>
          <div className='border-[0.5px] border-black bg-white rounded-[10px] pt-[10px] pb-[22px] mb-10'>
            <div className='pl-[22px] pr-8 border-b-[0.5px] border-black flex items-center gap-5'>
              <img src={creditCard} alt={creditCard} className='w-[42px] h-[42px]' />
              {/* <p className='text-gray-800 text-base font-poppins'>Card number</p> */}
              <MyInput forId="creditCardNumber" type="text" placeholder="Card number" value="xyz" inputStyle="!border-0 text-gray-800 text-base" />
            </div>
            <div className='flex items-center justify-between'>
              <MyInput forId="creditCardNumber" type="text" placeholder="MM/YY" value="xyz" inputStyle="!border-0 text-gray-800 text-base ml-2 lg:ml-0" />
              <MyInput forId="creditCardNumber" type="text" placeholder="CVV" value="xyz" inputStyle="!border-0 text-gray-800 text-base" />
            </div>
          </div>
          <div className='flex flex-col items-center gap-4'>
            {/* <MyButton variant='primary' text="Donate" style='w-full' onClick={()=>navigate("/thank-for-donating")}/> */}
            <MyButton variant='primary' text="Donate" style='w-full' onClick={handleDonate}/>
            <MyButton variant='outline' text="Cancel" style='w-full' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCampaign