"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpDown,
  Search,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MyTextArea from "../common/MyTextArea";
import MyInput from "../common/MyInput";
import MyButton from "../common/MyButton";
import useDailogBox from "@/store/useDailogBox";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { server } from "@/constatnts/config";

const donationData = [
  {
    id: 1,
    donor: "Smith Family",
    date: "Oct 12",
    amount: 20,
    message: "Happy Reading!",
    status: "Sent",
  },
  {
    id: 2,
    donor: "Anonymous",
    date: "Oct 12",
    amount: 50,
    message: "For the kids!",
    status: "Send Thanks",
  },
  {
    id: 3,
    donor: "John Doe",
    date: "Oct 14",
    amount: 10,
    message: "Keep it up!",
    status: "Send Thanks",
  },
  {
    id: 4,
    donor: "Emma Watson",
    date: "Oct 15",
    amount: 100,
    message: "Love this initiative!",
    status: "Sent",
  },
  {
    id: 5,
    donor: "Emma Watson",
    date: "Oct 15",
    amount: 100,
    message: "Love this initiative!",
    status: "Sent",
  },
  {
    id: 6,
    donor: "Emma Watson",
    date: "Oct 15",
    amount: 100,
    message: "Love this initiative!",
    status: "Sent",
  },
  {
    id: 7,
    donor: "Emma Watson",
    date: "Oct 15",
    amount: 100,
    message: "Love this initiative!",
    status: "Sent",
  },
];

export default function DashboardDonationTable({setTotalRaised, setTotalDonors, setFlag}) {
  const [donation, setDonation] = useState([])
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [thankSent, setThankSent] = useState({})
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [thanksData, setThanksData] = useState();
  const fundId = useSelector((state) => state.auth);
  
   const initialState = {
              donorName: "",
              donorMail: "",
              message: ""
          }
  
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData ((prev) => ({
            ...prev,
            [name]: value
        }))
    }

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredData = donation
    .filter((item) =>
      item.donor_name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount
    );

     const { setGlobalDailogBoxOpenValue } = useDailogBox()

    useEffect(() => {
        setGlobalDailogBoxOpenValue(openDialog);
    }, [openDialog, setOpenDialog]);

    useEffect(() => {

  const fetchDonation = async () => {
    try {
      const res = await axios.get( `${server}/api/v1/don/get-donation`, { withCredentials: true } );

      // console.log("ressssponse", res.data);
      setDonation(res.data.donation);
      if (setTotalRaised) {
  setTotalRaised(res.data.totalRaised);
}
      if (setTotalRaised) {
  setTotalDonors(res.data.
totalDonors);
}

    } catch (error) {
      console.log(error);
    }
  };

  fetchDonation();

}, []);
    

    const sendThankHandle = async (id) => {
      const res = await axios.get(`http://localhost:3000/api/v1/fund/get-fund-details/${id}`, {withCredentials: true});
      
      setThanksData(res.data.data);
      setSelectedItem(id);
      setOpenDialog(true);
    }
    
    const mailConfirm = async () => {
      try {
        const payload = {
          donorName: thanksData.donor_name,
          email: thanksData.donor_email,
          amount: thanksData.goal_amount,
          bookFundID: thanksData.book_fund_id,
          message: formData.message,
        }
      
      
        const res = await axios.post("http://localhost:3000/api/v1/fund/send-email", payload, {withCredentials: true} );
        toast(res.data.message);
        setOpenDialog(false)
        setFlag(openDialog)
        // console.log(res.data);
        
      } catch (error) {
        console.log(error);
        
      }      
    }

  return (
    <div className="w-full max-w-6xl mx-auto rounded-[20px] overflow-hidden bg-card-border shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] lg:mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-[21px] pb-[18px] pr-[60px] pl-[38px] bg-outline-border border-b-[0.5px] border-solid border-b-black">
        <h2 className="text-3xl font-bold text-white">
          Donations (0)
        </h2>
        
        {/* Search */}
        <div className="relative w-full md:w-[340px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-[30px] rounded-xl border-0 bg-white text-black shadow-md focus-visible:ring-2 focus-visible:ring-white"
          />
        </div>
      </div>
      {/* Table */}
      <div className="p-6">
        <div className="max-h-[300px] overflow-y-auto rounded-md">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-card-border">
              <TableRow className="!border-b-0">
                <TableHead className="sticky top-0 z-10 bg-card-border text-black font-bold text-[15px] font-poppins">
                  Donor
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
                <TableHead className="sticky top-0 z-10 bg-card-border text-black font-bold text-[15px] font-poppins">
                  Message
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-card-border text-center text-black font-bold text-[15px] font-poppins">
                  Action
                  <div className="flex justify-center items-center gap-2">
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow
                  key={item.donation_id}
                  className="border-b-0 hover:bg-transparent"
                >
                  <TableCell className="py-6">
                    <div>
                      <h3 className="text-black font-bold text-[15px] font-poppins">
                        {item.donor_name}
                      </h3>

                      <p className="text-black text-[15px] font-poppins">
                        {item.date}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-black text-[15px] font-poppins">
                    {item.amount}
                  </TableCell>
                  <TableCell className="text-black text-[15px] font-poppins italic">
                    {item.notes}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.mail_flag == '0' ? (
                      <span className="text-spring-green font-semibold text-[15px] text-center">
                        Sent
                      </span>
                    ) : (
                      <Button
                        // onClick={() =>
                        //   setThankSent((prev) => ({
                        //     ...prev,
                        //     [item.id]: true,
                        //   }))
                        // }
                        
                        /* onClick={() => {
                          setSelectedItem(item);
                          setOpenDialog(true);
                        } */
                      onClick={() => sendThankHandle(item.donation_id)}
                        className="rounded-md px-4 py-2.5 text-lg bg-primary-color hover:bg-primary-color-dark shadow-md hover:cursor-pointer text-[13px] font-inter text-white font-semibold"
                      >
                        Send Thanks
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-card-border rounded-[20px] pt-[24px] lg:pt-[57px] px-4 lg:px-16 pb-11 lg:!max-w-[600px] w-full  [&>button]:hidden overflow-hidden top-[53%]">
          {/* <DialogHeader>
            <DialogTitle className="text-[32px] font-bold text-black font-poppins text-nowrap">
              Send A Thank You Note
            </DialogTitle>
            <X/>
          </DialogHeader> */}


          <DialogHeader className="relative lg:mb-[14px]">
            <DialogTitle className="text-[18px] lg:text-[32px] font-bold text-black font-poppins">
              Send A Thank You Note
            </DialogTitle>

            {/* Custom X */}
            <button
              onClick={() => setOpenDialog(false)}
              className="absolute right-0 -top-2 lg:top-4 text-black hover:opacity-70"
            >
              <X className="w-5 h-5 font-bold hover:cursor-pointer" />
            </button>
          </DialogHeader>

          {thanksData && (
            <div className="space-y-4">
               <div className='mb-[18px] lg:mb-[37px]'>
                        <MyInput forId="Name" type="text" placeholder="Name Here" value={thanksData.donor_name} label="To:" labelStyle="font-semibold gap-0" />
                        <MyInput forId="Email" type="email" placeholder="Email Here" value={thanksData.donor_email} label="" labelStyle="font-semibold gap-0" />
                    </div>
              <div className='mb-[18px] lg:mb-[30px]'>
                        <p className='font-poppins font-semibold text-base text-black mb-1'>Message (optional)</p>
                        <MyTextArea style="p-4 bg-white border border-solid border-black !outline-0 focus:!ring-0 focus:ring-primary-color/40 focus:border-primary-color transition-all min-h-[100px] text-base text-gray-500" placeholder="Enter Your Message" name="message" value={formData.message} onChange={handleChange} />
                    </div>


              <div className="flex flex-col lg:flex-row items-center justify-center mx-auto gap-4 w-full">
                {/* <MyButton variant="primary" text="Confirm Send" onClick={() => {
                  setThankSent((prev) => ({
                    ...prev,
                    [selectedItem.id]: true,
                  }));
                  setOpenDialog(false);
                }} style="w-full flex-1"/> */}
                
                <MyButton variant="primary" text="Confirm Send" onClick={() => mailConfirm(thanksData.donor_id)} style="w-full flex-1"/>
                <MyButton  variant="outline" text="Cancel"  onClick={() => setOpenDialog(false)} style="w-full flex-1"/>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}