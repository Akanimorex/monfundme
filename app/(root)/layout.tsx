import { Nav } from "@/components/general"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Nav />
            {children}
        </>
    )
}

export default layout