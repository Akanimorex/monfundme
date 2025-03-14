import { Footer, Nav } from "@/components/general";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Nav />
			{children}
			<Footer />
		</div>
	);
};

export default layout;
