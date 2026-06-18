import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { server } from './constatnts/config'
import About from './pages/About'
import ClassCreateBookFund from './pages/CreateBookFund'
import Dashboard from './pages/Dashboard'
import EditCampaign from './pages/EditCampaign'
import EditProfile from './pages/EditProfile'
import EGiftCard from './pages/EGiftCard'
import Homepage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import ResetPassword from './pages/Resetpassword'
import ThankForDonating from './pages/ThankForDonating'
import ViewCampaign from './pages/ViewCampaign'
import { userExist, userNotExist } from './redux/slices/authSlices'
import Layout from './section/layout/Layout'
import MainLayout from './section/layout/MainLayout'

import ForgotPassword from './pages/ForgotPassword'
import NotFound from './pages/NotFound'


function App() {
  const {user, loader} = useSelector((state) => state.auth);
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
    console.log("GET ME FAIL:", err);
    dispatch(userNotExist())
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
          
          <Route path="/forgot-pass" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />          
          <Route path="/create-bookfund" element={<ClassCreateBookFund />} />
          <Route path="/dashboard/:don_id?" element={<Dashboard />} />          
          {/* <Route path="/edit-campaign" element={<EditCampaign />} />
           */}
           <Route path="/edit-campaign/:campaignid?" element={<EditCampaign />} />
          <Route path="/create-new-campaign" element={<EditCampaign />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/e-gift-card/:redemptionId" element={<EGiftCard />} />
          <Route path="/campaign/view-campaign" element={<ViewCampaign />} />
          <Route path="/thank-you" element={<ThankForDonating />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
