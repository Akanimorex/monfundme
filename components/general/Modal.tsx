const Modal = ({
	setToggle,
	children,
}: {
	setToggle: (arg: boolean) => void;
	children: React.ReactNode;
}) => {
	return (
		<div className="bg-black/70 h-dvh top-0 left-0 w-dvw fixed grid place-content-center z-60 ">
			<div
				className="fixed h-dvh w-dvw"
				onClick={() => setToggle(false)}></div>
			<main className=" bg-white text-black w-[400px] h-[300px] rounded-lg relative ">
				{children}
			</main>
		</div>
	);
};

export default Modal;
