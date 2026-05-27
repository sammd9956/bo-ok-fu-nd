import MyButton from '@/components/common/MyButton'
import Navigate from '@/components/common/Navigate'
import CopyCampaign from '@/components/dashboard/CopyCampaign'
import useWhoFundValue from '@/store/useWhoFundValue'
import { SquarePen } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const camps = ["aaaaa", "bbbb", "ccccc", "xxxx"];
const DashboardHeader = ({ campaigns, setCampId, selectedCampaign, setSelectedCampaign }) => {

    const { radioBtnValue, setRadioBtnValue } = useWhoFundValue()
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    if (!user) return null;

    return (

        <div className='flex flex-col lg:flex-row items-center justify-between mb-6 lg:mb-12'>
            <div className='mb-5 lg:mb-0 w-full lg:w-fit'>
                <div className='flex items-center gap-8'>
                    <p className='text-gray-800 text-[32px] lg:text-[40px] font-poppins font-semibold mb-1.5'>Campaign Dashboard</p>
                    {
                        user?.fund_type == "Whole School" && (<MyButton variant='primary' text="Create New Campaign" style="px-4 py-2.5" onClick={() => navigate("/create-new-campaign")} />)
                    }

                </div>
                <div className='flex flex-col lg:flex-row lg:items-center gap-[7px] lg:gap-[15px]'>
                    {/* <p className='text-gray-800 text-xl font-poppins font-bold'>{user?.fund_type}: <span className='font-normal'>{user?.fund_name.toUpperCase()}</span></p> */}
                    {user?.fund_type === "My Class" ? (<p className='text-gray-800 text-xl font-poppins font-bold'> {user?.fund_type}:{" "} <span className='font-normal'> {user?.fund_name?.toUpperCase()} </span> </p>)
                        :
                        (

                            <select
                                value={selectedCampaign?.id || ""}
                                className="border px-3 py-1 rounded text-gray-800 text-xl font-poppins"
                                onChange={(e) => {

                                    const campaign = campaigns.find(
                                        (c) => c.id === Number(e.target.value)
                                    );

                                    setSelectedCampaign(campaign);
                                }}
                            >
                                {campaigns.map((campaign) => (
                                    <option key={campaign.id} value={campaign.id}>
                                        {campaign.title}
                                    </option>
                                ))}
                            </select>

                        )}

                    <p
                        onClick={() => navigate("/edit-campaign")}
                        className="group flex items-center gap-2 cursor-pointer w-fit font-poppins font-semibold text-[10px] transition-all duration-300 ease-in-out active:translate-y-0.5"
                    >
                        <span className="bg-primary-color group-hover:bg-primary-color-dark rounded-full p-1 flex items-center justify-center transition-all duration-300 ease-in-out">
                            <SquarePen color="#FFF" size={12} />
                        </span>

                        <span className="text-gray-800 group-hover:text-primary-color-dark transition-all duration-300 ease-in-out font-normal">
                            Edit campaign
                        </span>
                    </p>

                </div>
            </div>
            <div className='flex flex-col lg:flex-row lg:items-center gap-[12px] lg:gap-[30px] w-full lg:w-fit'>
                <CopyCampaign fundCode={user.fund_code} campaignId={selectedCampaign?.id} />
                <Navigate fundCode={user.fund_code} />
            </div>
        </div>
    )
}

export default DashboardHeader;