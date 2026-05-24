import React, { useEffect, useState } from 'react'
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { Progress } from "@/components/ui/progress"
import MySwitch from '../../components/common/MySwitch'
import { useNavigate } from 'react-router-dom'
import MyButton from '../../components/common/MyButton'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ArrowUpDown, X } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useDailogBox from '@/store/useDailogBox'

const donationData = [
    {
        id: 1,
        donor: "Smith Family",
        date: "Oct 12",
        amount: 20,
        message: "Happy Reading!",
        status: "Donation",
    },
    {
        id: 2,
        donor: "Anonymous",
        date: "Oct 12",
        amount: 50,
        message: "For the kids!",
        status: "Purchase",
    },
    {
        id: 3,
        donor: "John Doe",
        date: "Oct 14",
        amount: 10,
        message: "Keep it up!",
        status: "Donation",
    },
    {
        id: 4,
        donor: "Emma Watson",
        date: "Oct 15",
        amount: 100,
        message: "Love this initiative!",
        status: "Purchase",
    },
    {
        id: 5,
        donor: "Emma Watson",
        date: "Oct 15",
        amount: 100,
        message: "Love this initiative!",
        status: "Donation",
    },
    {
        id: 6,
        donor: "Emma Watson",
        date: "Oct 15",
        amount: 100,
        message: "Love this initiative!",
        status: "Purchase",
    },
    {
        id: 7,
        donor: "Emma Watson",
        date: "Oct 15",
        amount: 100,
        message: "Love this initiative!",
        status: "Donation",
    },
];


const CardSection = ({totalRaised, totalDonors}) => {
    const [checked, setChecked] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    const [sortOrder, setSortOrder] = useState("asc");
    const navigate = useNavigate()

    const handleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const sortedData = [...donationData].sort((a, b) =>
        sortOrder === "asc"
            ? a.amount - b.amount
            : b.amount - a.amount
    );

    const { setGlobalDailogBoxOpenValue } = useDailogBox()

    useEffect(() => {
        setGlobalDailogBoxOpenValue(openDialog);
    }, [openDialog, setOpenDialog]);


    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-[26px]'>
            <div className='bg-outline-border rounded-[20px] pt-9 pl-[38px] pr-[42px] pb-[54px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]'>
                <p className='text-xl font-poppins font-medium mb-[13px] text-white'>$ Total Raised</p>
                <p className='text-[50px] font-poppins font-bold mb-[22px] text-white'>${totalRaised}</p>
                <p className='text-[15px] font-poppins font-light mb-[11px] text-white'>70% of $500 goal</p>
                <Progress
                    value={70}
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
                        <MySwitch setChecked={setChecked} checked={checked} />
                        <span className={`text-xs font-medium ${checked ? 'text-red-500' : 'text-gray-300'}`}>
                            {checked ? "Activate" : "Non-Activate"}
                        </span>
                    </div>
                </div>
                <div className='flex items-center justify-between mb-[22px]'>
                    <p className='text-xl font-poppins font-medium text-black'>Current Balance</p>
                    <p className='text-xl font-poppins font-extrabold text-bright-green'>$000.00</p>
                </div>

                <p onClick={() => setOpenDialog(true)} className='text-[15px] font-poppins text-electric-blue underline hover:cursor-pointer mb-[17px]'>Click to view transaction history</p>

                <MyButton variant="outline" text="Click Here to Redeem Funds" style="w-full" onClick={() => navigate('/e-gift-card')} />
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
                                        {sortedData.map((item) => (
                                            <TableRow
                                                key={item.id}
                                                className="border-b-0 hover:bg-transparent"
                                            >
                                                <TableCell className="py-6">
                                                    <div>
                                                        {/* <h3 className="text-black font-bold text-[15px] font-poppins">
                                                            {item.donor}
                                                        </h3> */}

                                                        <p className="text-black text-[15px] font-poppins">
                                                            {item.date}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-black text-[15px] font-poppins font-bold">
                                                    {item.message}
                                                </TableCell>
                                                <TableCell className="text-black text-[15px] font-poppins font-bold">
                                                    {item.status}
                                                </TableCell>
                                                <TableCell className="text-bright-green text-[15px] font-poppins font-bold">
                                                    +${item.amount.toFixed(2)}
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        <div className='flex items-center justify-between px-8 pb-4 border-t border-solid border-black'>
                            <p className='font-poppins text-[15px] font-bold text-black'>Balance</p>
                            <p className='font-poppins text-[15px] font-bold text-bright-green'>$45.00</p>
                        </div>

                    </div>

                </DialogContent>
            </Dialog>



        </div>
    )
}

export default CardSection