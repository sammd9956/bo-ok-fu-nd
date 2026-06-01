import { useEffect, useState } from 'react'
import './App.css'
import Layout from './section/layout/Layout'
import Homepage from './pages/Homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import LoginPage from './pages/LoginPage'
import ClassCreateBookFund from './pages/CreateBookFund'
import Dashboard from './pages/Dashboard'
import EditCampaign from './pages/EditCampaign'
import EditProfile from './pages/EditProfile'
import EGiftCard from './pages/EGiftCard'
import ViewCampaign from './pages/ViewCampaign'
import ThankForDonating from './pages/ThankForDonating'
import MainLayout from './section/layout/MainLayout'
import axios from 'axios'
import { server } from './constatnts/config'
import { useDispatch } from 'react-redux'
import { userExist, userNotExist } from './redux/slices/authSlices'

function App() {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
  // console.log(" GET ME RUN");

  axios.get(`${server}/api/v1/user/get-me`, {
    withCredentials: true
  })
  .then(({ data }) => {
    console.log("GET ME SUCCESS:", data);

    if (data?.user) {
      dispatch(userExist(data.user));
    }
  })
  .catch((err) => {
    console.log("GET ME FAIL:", err.message);
  });

}, [dispatch]);
  return (
    <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/log-in" element={<LoginPage />} />
          <Route path="/create-bookfund" element={<ClassCreateBookFund />} />
          <Route path="/dashboard/:don_id?" element={<Dashboard />} />
          {/* <Route path="/edit-campaign" element={<EditCampaign />} />
           */}
           <Route path="/edit-campaign/:campaignid?" element={<EditCampaign />} />
          <Route path="/create-new-campaign" element={<EditCampaign />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/e-gift-card" element={<EGiftCard />} />
          <Route path="/campaign/view-campaign" element={<ViewCampaign />} />
          <Route path="/thank-for-donating" element={<ThankForDonating />} />
        </Route>
      </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
