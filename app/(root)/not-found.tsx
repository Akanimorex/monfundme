import { TriangleAlert } from "lucide-react";
import Link from "next/link";

const Notfound = () => {
	return (
		<div className="h-dvh w-dvw grid place-content-center">
			<main>
				<TriangleAlert
					className=" text-red-500 font-extrabold"
					size={100}
				/>
				<p>Page not found</p>
				<Link
					href={"/"}
					className="underline  hover:text-accent-default ">
					Return to Home
				</Link>
			</main>
		</div>
	);
};

export default Notfound;
