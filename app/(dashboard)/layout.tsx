import Sidebar from "@/components/dashboard/sidebar";
import TopNav from "@/components/dashboard/topnav";
import Wrapper from "@/components/dashboard/Wrapper";


const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Wrapper>

            <div className="flex ">
                <div className="fixed h-screen w-1/6 bg-primary font-dmSans">
                    <Sidebar />
                </div>

                <div className="flex-1 pl-[16.6667%] bg-[#F9FAFB]">
                    <TopNav />
                    {children}
                </div>
            </div>
        </Wrapper>
    );
};

export default Layout;