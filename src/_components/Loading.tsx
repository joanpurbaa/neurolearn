import PacmanLoader from "react-spinners/PacmanLoader";

export default function Loading() {
	return (
		<section className="z-50 fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-xs flex justify-center items-center">
			<PacmanLoader color="#fff" />
		</section>
	);
}
