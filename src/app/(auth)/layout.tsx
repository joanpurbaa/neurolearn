import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="authBackground w-full h-screen flex justify-center items-center bg-no-repeat bg-cover px-64">
			<section className="w-full grid grid-cols-12 items-center">
				<div className="col-span-7 text-white space-y-5">
					<h1 className="nunito-font text-7xl font-black">Neuro Learn</h1>
					<h2 className="text-2xl">
						Gak cuma nonton, tapi juga paham! <br /> AI bantu ringkas, kamu tinggal
						gas quiznya!
					</h2>
				</div>
				<div className="z-10 col-span-5">{children}</div>
			</section>
			<Image
				width={300}
				height={300}
				className="absolute z-0 right-0 bottom-0"
				src="/authBackgroundTrophy.svg"
				alt=""
			/>
		</main>
	);
}
