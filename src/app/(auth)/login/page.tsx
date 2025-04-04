import { Lock } from "lucide-react";

export default function Login(){
  return (
			<section className="flex flex-col gap-y-7 bg-white rounded-xl p-5">
				<h3 className="text-xl font-bold text-black text-center">
					Mulai perjalanan belajarmu. <br />{" "}
					<span className="font-medium">
						Daftar sekarang dan uji seberapa jago kamu!
					</span>
				</h3>
				<form action="">
					<ul className="space-y-5">
						<li>
							<div className="flex items-center border gap-x-3 border-[#C6C6C6] p-3 rounded-md">
								<Lock className="text-[#a5a5a5]" />
								<input
									className="w-full outline-none "
									type="text"
									placeholder="Masukkan password"
								/>
							</div>
						</li>
						<li>
							<button className="w-full bg-primary text-white font-semibold rounded-full py-3">
								Lanjut
							</button>
						</li>
            <li>
              <p className="font-semibold text-black">Lupa password?</p>
            </li>
					</ul>
				</form>
			</section>
		);
}