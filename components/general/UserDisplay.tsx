"use client"
import Image from "next/image"
import { useAccount } from "wagmi"

const UserDisplay = ({ isForSide }: { isForSide?: boolean }) => {
    const { address } = useAccount()
    return (
        <div className="flex items-center gap-3">
            <Image src="/images/avatar.jpg" width={40} height={40} alt="avatar" className="rounded-full " />
            {
                isForSide && <div className="flex flex-col">
                    <h5 className="text-[14px] font-semibold  text-[#101928]">
                        User
                    </h5>
                    <h6 className="text-[14px] text-[#475367] truncate">{address?.slice(0, 4)}...{address?.slice(-4)}</h6>
                </div>
            }

        </div >
    )
}

export default UserDisplay