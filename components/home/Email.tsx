"use client";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { Footer } from "../general";
import subscribe from "@/db/subscribe";
import { toast } from "react-toastify";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400"],
});

const Email = () => {

	const submit = async (form: FormData) => {
		try {
			const formObj = Object.fromEntries(form);

			toast.promise(subscribe(formObj.email as string), {
				error: {
					render: ({ data }: any) => data.message,
				},
				success: {
					render: ({ data }: any) => data,
				},
			});
		} catch (error) {
			console.error(error);
			toast.error(error as string);
		}
	};

	return (
		<main className=" p-4 bg-gradient-to-br from-[#8a329b] to-[#2e0936] text-white grid grid-cols-[70%_30%] relative">
			<section className=" my-[50px] lg:my-[150px] pl-10">
				<p className="max-w-[750px] ">
					Monfundme is a Web3 fundraising platform built on the Monad
					blockchain, aiming to change how funds are raised and managed. Using
					blockchain&apos;s decentralized features to provide transparent,
					secure, and efficient crowdfunding; users can start or support
					fundraising campaigns with cryptocurrencies and track funds movements
					in real-time.
				</p>

				<h2 className={`text-[30px] mt-7 ${roboto.className} font-semibold `}>
					Get the newest campaigns in your inbox
				</h2>
				<form
					action={submit}
					className=" mt-2 ">
					<input
						required
						type="email"
						name="email"
						id="email"
						placeholder="your email address"
						className=" w-[300px] py-3 px-4 bg-[#b66cc4] focus:outline-none placeholder:text-white mr-5"
					/>
					<button
						type="submit"
						className=" px-5 py-3 bg-accent-default rounded-md font-semibold hover:bg-[#b66cc4] ease-linear duration-150 transition-colors ">
						get updates
					</button>
				</form>
			</section>
			<section className="relative">
				<Image
					src={"/images/chog.png"}
					alt="chog"
					fill
					style={{ objectFit: "contain" }}
				/>
			</section>

			<div className=" w-full absolute bottom-0">
				<Footer />
			</div>
		</main>
	);
};

export default Email;
