import { sliceAddress } from "@/utils/helpers";
import { User, XCircle } from "lucide-react";

export default function Votes() {
    return (
        <div>
            <table className="w-full border-separate border-spacing-0">
                <thead>
                    <tr>
                        <td className="bg-[#F0F2F5] text-left p-3 pl-6 font-nohemi text-[#344054] text-sm font-bold">
                            User
                        </td>
                        <td className="bg-[#F0F2F5] text-left px-6 py-4 font-nohemi text-[#344054] text-sm font-bold">
                            Time
                        </td>
                        <td align="center" className="bg-[#F0F2F5] px-6 py-4 font-nohemi text-[#344054] text-sm font-bold">
                            Vote
                        </td>
                    </tr>
                </thead>

                <tbody>
                    {["votes"].map((transaction, index) => (
                        <tr key={index} className="">
                            <td className="px-6 py-4 flex items-center gap-2  ">
                                <div className="bg-[#8E35FD] p-1 rounded-full ">
                                    <User className="text-white  size-[16] " />
                                </div>
                                {sliceAddress("0x1234567890123456789012345678901234567890")}
                            </td>
                            <td className="px-6 py-4 text-sm font-inter">
                                09:32 AM
                            </td>
                            <td align="center" className="">
                                <XCircle className="text-red-500" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}