/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { Eye, EyeClosed, Lock } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import Cryptr from "cryptr";
import { useFormik } from "formik";
import { handleSignIn } from "@/lib/actions";
import Loading from "@/_components/Loading";
import { useState } from "react";

export default function Login() {
	const cryptr = new Cryptr(`${process.env.VALIDATION_SECRET_KEY}`);
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>();
	const [passwordTextType, setPasswordTextType] = useState(false);

	!searchParams.get("em") && redirect("/validation");

	const validate = (values: { password: string }) => {
		const errors: Partial<{ password: string }> = {};

		if (!values.password) {
			errors.password = "Password-nya belum diisi tuh!";
		}

		return errors;
	};

	const formik = useFormik({
		initialValues: {
			password: "",
		},
		validate,
		onSubmit: (values) => {
			setLoading(true);

			handleSignIn({
				email: cryptr.decrypt(searchParams.get("em") as string),
				password: values.password,
			}).then((result) => {
				setLoading(false);
				setError(result?.message);
			});
		},
	});

	return (
		<>
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
								<Lock className="text-[#a5a5a5]" />
								<input
									className="w-full outline-none"
									type={passwordTextType ? "text" : "password"}
									placeholder="Masukkan password"
									name="password"
									onChange={formik.handleChange}
									value={formik.values.password}
								/>
								{passwordTextType ? (
									<Eye
										onClick={() => setPasswordTextType(false)}
										className="text-[#a5a5a5] cursor-pointer"
									/>
								) : (
									<EyeClosed
										onClick={() => setPasswordTextType(true)}
										className="text-[#a5a5a5] cursor-pointer"
									/>
								)}
							</div>
							{(formik.errors.password || error) && (
								<p className="mt-2 text-red-500">{formik.errors.password || error}</p>
							)}
						</li>
						<li>
							<button
								type="submit"
								className="w-full bg-primary text-white font-semibold rounded-full py-3 cursor-pointer">
								Lanjut
							</button>
						</li>
						<li>
							<p className="font-semibold text-black">Lupa password?</p>
						</li>
					</ul>
				</form>
			</section>
			{loading && <Loading />}
		</>
	);
}
