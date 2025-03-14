"use client";
import { FormInputs, ModalChildren } from "@/components/create";
import { useAccount } from "wagmi";
import { convertDate } from "@/utils/helpers";
import { useWrite, useCheckChain } from "@/utils/hooks";
import { Modal } from "@/components/general";
import { ChangeEvent, useState } from "react";
import { uploadImage } from "@/utils/firebase";
import Image from "next/image";
import { toast } from "react-toastify";
import { createCampaign } from "@/utils/createCampaign";

const Page = () => {
	const [toggle, setToggle] = useState<boolean>(false);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [file, setFile] = useState<File | null>();
	const { isPending, id } = useWrite();
	const { isConnected, address } = useAccount();
	const { checkAndSwitch } = useCheckChain();

	const submit = async (data: FormData) => {
		try {
			if (!file) {
				toast.error("Kindly upload an image.", {
					autoClose: 200,
				});
				return;
			}

			await checkAndSwitch();
			setIsUploading(true);

			const imageUrl = await uploadImage(file as File);

			const objData = Object.fromEntries(data);

			const writeData = {
				title: objData.title as string,
				description: objData.description as string,
				targetAmount: Number(objData.targetAmount),
				deadline: convertDate(objData.deadline as string),
				imageUrl: imageUrl,
				campaignOwner: address,
			};

			await createCampaign(writeData);
			setFile(null);
			toast.success("Campaign created successfully", {
				autoClose: 2000,
			});

		} catch (error) {
			console.error("Error creating campaign:", error);
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className=" py-[125px] ">
			{toggle && (
				<Modal setToggle={setToggle}>
					<ModalChildren id={id} />
				</Modal>
			)}
			<form
				action={submit}
				className="shadow-xl bg-slate-100 border-[0.5px] border-slate-200 flex flex-col gap-3 p-5 max-w-[800px] mx-auto ">
				<h2 className="text-center text-2xl font-semibold ">
					Create a campaign
				</h2>

				<div className=" grid grid-cols-2 gap-7 ">
					<FormInputs
						id="name"
						placeholder="e.g. John Wrick"
						name="Your name"
						type="text"
					/>
					<FormInputs
						id="title"
						placeholder="e.g. Get me a wife"
						name="Campaign title"
						type="text"
					/>
				</div>

				<div>
					<FormInputs
						id="description"
						name="Description"
						placeholder="Tell us more about your campaign"
						type="textarea"
					/>
				</div>

				<div className=" grid grid-cols-2 gap-7 ">
					<FormInputs
						id="targetAmount"
						placeholder="e.g. 1,000,000"
						name="Target Amount"
						type="number"
					/>
					<FormInputs
						id="deadline"
						placeholder="e.g. dd/mm/yy"
						name="Target Date"
						type="date"
					/>
				</div>

				<div className="">
					<h2 className=" mb-3">
						Upload Campaign Image{" "}
						<span className=" text-accent-default "> *</span>{" "}
					</h2>

					<div className=" flex items-center gap-3">
						<label
							htmlFor="upload"
							className="cursor-pointer">
							{file ? (
								<FileCard file={file} />
							) : (
								<div className="px-5 py-2 border bg-white w-fit ">Upload</div>
							)}
							<input
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setFile(e.target.files?.[0])
								}
								type="file"
								name="upload"
								id="upload"
								accept=".png,.jpeg,.jpg"
								className=" hidden "
							/>
						</label>
						{file && <p>{file.name}</p>}
					</div>
				</div>

				{isConnected ? (
					<button
						type="submit"
						disabled={isPending || isUploading ? true : false}
						className={` disabled:bg-accent-10 bg-accent-default hover:bg-accent-80 text-white rounded-lg w-fit mx-auto  px-5 py-3 duration-150 ease-linear transition-colors shadow-md my-3`}>
						{isUploading ? "Uploading img ..." : "Create campaign "}
					</button>
				) : (
					<button
						type="button"
						disabled
						className={` disabled:bg-accent-10 text-white rounded-lg w-fit mx-auto  px-5 py-3 duration-150 ease-linear transition-colors shadow-md my-3`}>
						Connect Wallet to creae a campaign
					</button>
				)}
			</form>
		</div>
	);
};

export default Page;

const FileCard = ({ file }: { file: File }) => {
	const url = URL.createObjectURL(file);

	return (
		<div className="relative size-[100px] ">
			<Image
				src={url}
				alt="img"
				fill
				style={{ objectFit: "contain" }}
			/>
		</div>
	);
};
