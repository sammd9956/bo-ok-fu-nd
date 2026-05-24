import Profile from '@/components/common/Profile'
import CardSection from '@/section/dashboard/CardSection'
import DashboardHeader from '@/section/dashboard/DashboardHeader'
import DonationTable from '@/section/dashboard/DonationTable';
import React, {  useState } from 'react'

const Dashboard = () => {
  const [totalRaised, setTotalRaised] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0)
  const [campaignID, setCampaignID] = useState();
  console.log("total", totalRaised);
  
  return (
      <div className='w-full'>
        <Profile/>
    <div className='container mx-auto px-2 lg:px-4'>
      <DashboardHeader />
      <CardSection totalRaised={totalRaised} totalDonors={totalDonors}  />
      <DonationTable totalRaised={totalRaised} setTotalRaised={setTotalRaised} setTotalDonors={setTotalDonors} setCampaignID={setCampaignID} />
    </div>
      </div>
  )
}

export default Dashboard;