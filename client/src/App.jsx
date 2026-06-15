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
import { useDispatch, useSelector } from 'react-redux'
import { userExist, userNotExist } from './redux/slices/authSlices'
import ResetPassword from './pages/Resetpassword'

import ForgotPassword from './pages/ForgotPassword'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/auth/ProtectedRoute'


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
