import MenuLink from "./menuLinks/menuLink";
import { GoHome } from "react-icons/go";
import { IoIosPaper } from "react-icons/io";
import { TbLogout } from "react-icons/tb"
import MonfundmeLogo from "@/components/general/MonfundmeLogo";
import { BookOpenCheck, PackagePlus, } from "lucide-react";
import UserDisplay from "@/components/general/UserDisplay";

const menuItems = [
  {
    title: "Main",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <GoHome />,
      },
      {
        title: "Campaigns Created",
        path: "/campaigns-created",
        icon: <PackagePlus className="size-5 " />,
      },
      {
        title: "Donations",
        path: "/donations",
        icon: <IoIosPaper />,
      },
      {
        title: "Campaign Proposals",
        path: "/proposals",
        icon: <BookOpenCheck className="size-5 " />,
      },
    ],
  },
];

const Sidebar = () => {

  return (
    <aside className=" w-full flex flex-1 h-full flex-col justify-between py-6 bg-white shadow-lg">
      <div className="">
        <div className="w-full border-green-500  ">
          <nav className="px-4">
            <div className="pl-4 ">
              <MonfundmeLogo />
            </div>
            <ul className="w-full flex flex-col mt-6">
              <li className="flex gap-1 flex-col">
                {menuItems
                  .find((menu) => menu.title === "Main")
                  ?.list.map((item) => (
                    <MenuLink item={item} key={item.title} />
                  ))}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex flex-col ">

        <div className="py-2">
          <div className="py-3">
            <div className="w-full px-6  h-[40px] flex items-center justify-between  ">
              <UserDisplay isForSide />

              <TbLogout size={20} className="text-black" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
