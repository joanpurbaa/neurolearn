import Image from "next/image";

export default function validationEmail() {
	return (
		<section className="flex flex-col gap-y-7 bg-white rounded-xl p-5">
			<h3 className="text-xl font-bold text-black text-center">
				Mulai perjalanan belajarmu. <br />{" "}
				<span className="font-medium">Daftar atau masuk hanya satu klik!</span>
			</h3>
			<div className="flex items-center gap-x-5">
				<div className="w-full flex justify-center items-center gap-x-3 bg-primary rounded-md p-3">
					<Image width={200} height={200} className="w-8" src="googleLogo.svg" alt="" />
					<p className="text-white font-semibold text-lg">Google</p>
				</div>
				<div className="w-full flex justify-center items-center gap-x-3 bg-[#9E30FF] rounded-md p-3">
					<Image width={200} height={200} className="w-8" src="discordLogo.svg" alt="" />
					<p className="text-white font-semibold text-lg">Discord</p>
				</div>
			</div>
			<div className="flex justify-between items-center gap-x-5">
				<div className="w-full border border-[#b1b1b1] rounded-full"></div>
				<p className="text-[#828282]">atau</p>
				<div className="w-full border border-[#b1b1b1] rounded-full"></div>
			</div>
			<form action="">
				<ul className="space-y-5">
					<li>
						<input
							className="w-full border border-[#C6C6C6] outline-none p-3 rounded-md"
							type="text"
							placeholder="Masukkan email kamu"
						/>
					</li>
					<li>
						<button className="w-full bg-primary text-white font-semibold rounded-full py-3">
							Lanjut
						</button>
					</li>
				</ul>
			</form>
		</section>
	);
}
