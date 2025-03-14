import Link from "next/link"
import Image from "next/image"
const MonfundmeLogo = () => {
    return (
        <Link href={"/"} className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={28} height={28} />
            <p className=" font-extrabold ">Monfundme</p>
        </Link>
    )
}

export default MonfundmeLogo