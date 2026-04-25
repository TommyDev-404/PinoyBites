import { useState } from "react";
import { useForm } from "react-hook-form";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/auth.context";
import { useAccount } from "@/hooks/user/account.hooks";
import type { PasswordPayload } from "@/types/user/account.types";
import OtpModal from "./OTPModal";

type PasswordForm = {
	password: string;
	confirmPassword: string;
};

export default function SecurityTab() {
	const { verifyEmail } = useAuth();

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [ otpModal, setShow ] = useState(false);
	const [ otpPayload, setPayload ] = useState<PasswordPayload | null>(null);

	const { data: accountData } = useAccount();
	const myAcc = accountData?.user;

	// react-hook-form
	const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordForm>();

	const onSubmit = async (data: PasswordForm) => {
		if (!myAcc?.email) return;

		setLoading(true);
		try {
			await verifyEmail(myAcc?.email); // send OTP

			setShow(true);
			setPayload({ password: data.confirmPassword });
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const password = watch("password");

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div>
					<h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
					<p className="text-sm text-gray-500 mt-1">
						Update your password and security preferences.
					</p>
				</div>

				<div className="space-y-4">
					<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700">New Password</label>
					<input
						type={showPassword ? "text" : "password"}
						placeholder="••••••••"
						className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
						{...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
					/>
					{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
					</div>

					<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700">Confirm New Password</label>
					<input
						type={showPassword ? "text" : "password"}
						placeholder="••••••••"
						className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
						{...register("confirmPassword", { 
						required: "Confirm your password", 
						validate: value => value === password || "Passwords do not match"
						})}
					/>
					{errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

					{/* Show password checkbox */}
					<label className="flex items-center gap-2 text-sm text-gray-600 mt-2 cursor-pointer">
						<input
						type="checkbox"
						checked={showPassword}
						onChange={() => setShowPassword((prev) => !prev)}
						className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
						/>
						Show passwords
					</label>
					</div>
				</div>

				<div className="pt-4 border-t border-gray-100">
				<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
					<ShieldCheck size={20} />
					</div>
					<div>
					<p className="font-medium text-gray-900">Two-Factor Authentication</p>
					<p className="text-xs text-gray-500">Add an extra layer of security</p>
					</div>
				</div>

				<button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
					<span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
				</button>
				</div>
				</div>

				<div className="flex justify-end pt-4">
				<button
				type="submit"
				disabled={loading}
				className={`bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm ${
					loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
				}`}
				>
				{loading ? "Sending OTP..." : "Update Password"}
				</button>
				</div>
			</form>

			{otpModal && 
				<OtpModal
					payload={otpPayload!}
					open={true} 
					onClose={() => setShow(false)}
				/>
			}
		</>
	);
}