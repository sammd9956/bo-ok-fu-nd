import Profile from '@/components/common/Profile'
import { server } from '@/constatnts/config';
import CardSection from '@/section/dashboard/CardSection'
import DashboardHeader from '@/section/dashboard/DashboardHeader'
import DonationTable from '@/section/dashboard/DonationTable';
import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([])
  const [totalRaised, setTotalRaised] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0)
  const [campaignID, setCampaignID] = useState();''
  const [campId, setCampId] = useState();
  const [selectedCampaign, setSelectedCampaign] = useState();
  const user = useSelector((state) => state.auth.user);
  const fundType = user?.fund_type;
  
 useEffect(() => {

    const fetchCampaign = async () => {

        try {

            const res = await axios.get(
                `${server}/api/v1/camp/find-campaign`,
                { withCredentials: true }
            );

            const allCampaigns = res.data?.campaigns || [];


            setCampaigns(allCampaigns);
             if (allCampaigns.length > 0) {
                setSelectedCampaign(allCampaigns[0]);
            }

        } catch (error) {
            console.log(error);
        }
    };

    if (user?.fund_type === "Whole School") {

        fetchCampaign();
    }

}, [user]);
 

  
  return (
    <>
      <div className='w-full'>
        <Profile/>
    <div className='container mx-auto px-2 lg:px-4'>
      <DashboardHeader campaigns={campaigns} setCampId={setCampId} setSelectedCampaign={setSelectedCampaign} selectedCampaign={selectedCampaign} />
      <CardSection totalRaised={totalRaised} totalDonors={totalDonors} campaigns={campaigns} selectedCampaign={selectedCampaign} />
      <DonationTable totalRaised={totalRaised} setTotalRaised={setTotalRaised} setTotalDonors={setTotalDonors} setCampaignID={setCampaignID}  />
    </div>
      </div>
      </>
  )
}

export default Dashboard;