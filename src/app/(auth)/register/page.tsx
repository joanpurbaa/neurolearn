/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useFormik } from "formik";
import { Lock, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Cryptr from "cryptr";

export default function register() {
	const cryptr = new Cryptr(`${process.env.VALIDATION_SECRET_KEY}`);
	const searchParams = useSearchParams();

	const validate = (values: { namaLengkap: string; password: string }) => {
		const errors: Partial<{ namaLengkap: string; password: string }> = {};

		if (!values.namaLengkap) {
			errors.namaLengkap = "Yuk, isi nama lengkap kamu dulu.";
		}

		if (!values.password) {
			errors.password = "Password-nya belum diisi tuh!";
		}

		return errors;
	};

	const formik = useFormik({
		initialValues: {
			namaLengkap: "",
			password: "",
		},
		validate,
		onSubmit: (values) => {
			const formData = new FormData();

			formData.append("email", cryptr.decrypt(searchParams.get("em") as string));
			formData.append("namaLengkap", values.namaLengkap);
			formData.append("password", values.password);

			fetch("/api/register", {
				method: "POST",
				body: formData,
			});
		},
	});


	return (
		<section className="flex flex-col gap-y-7 bg-white rounded-xl p-5">
			<h3 className="text-xl font-bold text-black text-center">
				Mulai perjalanan belajarmu. <br />{" "}
				<span className="font-medium">
					Daftar sekarang dan uji seberapa jago kamu!
				</span>
			</h3>
			<form action="" onSubmit={formik.handleSubmit}>
				<ul className="space-y-5">
					<li>
						<div className="flex items-center border gap-x-3 border-[#C6C6C6] p-3 rounded-md">
							<User className="text-[#a5a5a5]" />
							<input
								className="w-full outline-none "
								type="text"
								placeholder="Masukkan nama lengkap"
								name="namaLengkap"
								onChange={formik.handleChange}
								value={formik.values.namaLengkap}
							/>
						</div>
						{formik.errors.namaLengkap ? (
							<p className="mt-2 text-red-500">{formik.errors.namaLengkap}</p>
						) : null}
					</li>
					<li>
						<div className="flex items-center border gap-x-3 border-[#C6C6C6] p-3 rounded-md">
							<Lock className="text-[#a5a5a5]" />
							<input
								className="w-full outline-none "
								type="password"
								placeholder="Masukkan password"
								name="password"
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
						</div>
						{formik.errors.password ? (
							<p className="mt-2 text-red-500">{formik.errors.password}</p>
						) : null}
					</li>
					<li>
						<button
							type="submit"
							className="w-full bg-primary text-white font-semibold rounded-full py-3">
							Lanjut
						</button>
					</li>
				</ul>
			</form>
		</section>
	);
}
