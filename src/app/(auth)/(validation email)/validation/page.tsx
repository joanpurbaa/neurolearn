/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useFormik } from "formik";
import Image from "next/image";
import axios from "axios";
import { redirect } from "next/navigation";
import Cryptr from "cryptr";
import { useState } from "react";
import Loading from "@/_components/Loading";

export default function validationEmail() {
	const cryptr = new Cryptr(`${process.env.VALIDATION_SECRET_KEY}`);
	const [loading, setLoading] = useState(false);

	const validate = (values: { email: string }) => {
		const errors: Partial<{ email: string }> = {};

		if (!values.email) {
			errors.email = "Isi email kamu dulu dulu ya.";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = "Masukkan email yang valid dong!";
		}

		return errors;
	};

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validate,
		onSubmit: (values) => {
			const formData = new FormData();

			setLoading(true);

			formData.append("email", values.email);

			axios
				.post("/api/validation", formData)
				.then((result) =>
					result.data?.validation
						? redirect(`/login?em=${cryptr.encrypt(values.email)}`)
						: redirect(`/register?em=${cryptr.encrypt(values.email)}`)
				);
		},
	});

	return (
		<>
			<section className="flex flex-col gap-y-7 bg-white rounded-xl p-5">
				<h3 className="text-xl font-bold text-black text-center">
					Mulai perjalanan belajarmu. <br />{" "}
					<span className="font-medium">Daftar atau masuk hanya satu klik!</span>
				</h3>
				<div className="flex items-center gap-x-5">
					<div className="w-full flex justify-center items-center gap-x-3 bg-primary rounded-md p-3">
						<Image
							width={200}
							height={200}
							className="w-8"
							src="googleLogo.svg"
							alt=""
						/>
						<p className="text-white font-semibold text-lg">Google</p>
					</div>
					<div className="w-full flex justify-center items-center gap-x-3 bg-[#9E30FF] rounded-md p-3">
						<Image
							width={200}
							height={200}
							className="w-8"
							src="discordLogo.svg"
							alt=""
						/>
						<p className="text-white font-semibold text-lg">Discord</p>
					</div>
				</div>
				<div className="flex justify-between items-center gap-x-5">
					<div className="w-full border border-[#b1b1b1] rounded-full"></div>
					<p className="text-[#828282]">atau</p>
					<div className="w-full border border-[#b1b1b1] rounded-full"></div>
				</div>
				<form action="" onSubmit={formik.handleSubmit}>
					<ul className="space-y-5">
						<li>
							<input
								className="w-full border border-[#C6C6C6] outline-none p-3 rounded-md"
								type="email"
								placeholder="Masukkan email kamu"
								name="email"
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
							{formik.errors.email ? (
								<p className="mt-2 text-red-500">{formik.errors.email}</p>
							) : null}
						</li>
						<li>
							<button
								type="submit"
								className="w-full bg-primary text-white font-semibold rounded-full py-3 cursor-pointer">
								Lanjut
							</button>
						</li>
					</ul>
				</form>
			</section>
			{loading && <Loading />}
		</>
	);
}
