import { Hero, Trending, HelpCategory, Email } from "@/components/home";
import connect from "@/db/connectDB";

export default async function Home() {
	try {
		await connect();
	} catch (error) {
		console.error("error", error);
	}

	return (
		<div className= "bg-primary" >
		<Hero />
		< Trending />
		<HelpCategory />
		< Email />
		</div>
	);
}
