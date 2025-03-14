"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuLinkProps {
  item: {
    title: string;
    path: string;
    icon: JSX.Element;
  };
}

const MenuLink = ({ item }: MenuLinkProps) => {
  const Icon = item.icon;
  const isLogout = item.title === "Logout";
  const pathname = usePathname();

  const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);

  return (
    <Link
      href={item.path}
      className={`flex gap-3 items-center h-[44px] px-4  rounded transition-colors duration-300 ease-in-out ${isActive
        ? "text-[#101928]  text-[14px] font-medium bg-[#E5D2FC] border border-[#E5D2FC] "
        : isLogout
          ? "text-red-500 hover:bg-[#E5D2FC] hover:border border-[#E5D2FC] hover:text-[#101928]"
          : "text-[#101928] hover:text-[#101928] hover:bg-[#E5D2FC] hover:border border-[#E5D2FC]"
        }`}
    >
      <span
        className={`text-[20px] ${isActive ? "text-[#8E35FD] " : "text-[#667185] "
          }`}
      >
        {Icon}
      </span>

      <h5 className="text-xs">{item.title}</h5>
    </Link>
  );
};

export default MenuLink;
