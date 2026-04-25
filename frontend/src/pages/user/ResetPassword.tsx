import { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import { useAuth } from "@/context/auth.context";
import { PlaySound } from "@/utils/PlaySound";
import toast from "react-hot-toast";

type ResetPasswordForm = {
	password: string;
	confirmPassword: string;
}

export default function ResetPassword() {
	const { changeUserPassword } = useAuth();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ResetPasswordForm>();

	const password = watch("password");

	const onSubmit = async (data: ResetPasswordForm) => {
		setIsLoading(true);
		setError("");

		await new Promise((r) => setTimeout(r, 1200));
		
		// update password
		const changePassSucces = await changeUserPassword(data.confirmPassword);

		if (!changePassSucces.success) {
			setError(changePassSucces.message);
			return toast.error('Password reset failed!');
		}

		toast.success('Password reset successfully!');
		PlaySound();

		setTimeout(() => {
			navigate("/auth/login");
		}, 200);

		setIsLoading(false);
	};

	return (
		<AuthLayout>
			<CardHeader className="text-center">
				<div className="flex justify-center mb-4">
					<div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
						<ShieldCheck className="text-white" size={30} />
					</div>
				</div>

				<CardTitle className="text-2xl font-bold">
					Reset Password
				</CardTitle>

				<CardDescription>
					Enter a new password for your admin account
				</CardDescription>
			</CardHeader>

			<CardContent>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

					{error && (
					<Alert variant="destructive">
						<AlertDescription>{error}</AlertDescription>
					</Alert>
					)}

					{/* NEW PASSWORD */}
					<div className="space-y-2">

						<Label htmlFor="password" className="text-stone-700">New Password</Label>

						<div className="relative">
							<Lock
								className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								size={18}
							/>

							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="Enter new password"
								className="pl-10 pr-10 py-5"
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 6,
										message: "Minimum 6 characters",
									},
								})}
							/>

							<button
								type="button"
								aria-label={showPassword ? "Hide password" : "Show password"}
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
							>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>

						</div>

						{errors.password && (
							<p className="text-sm text-red-600">
							{errors.password.message}
							</p>
						)}

					</div>

					{/* CONFIRM PASSWORD */}
					<div className="space-y-2">

						<Label htmlFor="confirmPassword" className="text-stone-700">Confirm Password</Label>

						<div className="relative">

							<Lock
								className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								size={18}
							/>

							<Input
								id="confirmPassword"
								type={showConfirm ? "text" : "password"}
								placeholder="Confirm password"
								className="pl-10 pr-10 py-5"
								{...register("confirmPassword", {
								required: "Confirm your password",
								validate: (value) =>
									value === password || "Passwords do not match",
								})}
							/>

							<button
							type="button"
							onClick={() => setShowConfirm(!showConfirm)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
							>
							{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>

						</div>

						{errors.confirmPassword && (
							<p className="text-sm text-red-600">
							{errors.confirmPassword.message}
							</p>
						)}

					</div>

					<Button
					type="submit"
					className="w-full bg-amber-600 hover:bg-amber-700"
					disabled={isLoading}
					>
					{isLoading ? "Resetting password..." : "Reset Password"}
					</Button>

				</form>
				
                        <div className="flex items-center gap-2 justify-center mt-4">
                              <p className="text-sm text-stone-700">Remember password?</p>
                              <span onClick={() => { navigate('/auth/login') }} className="text-sm font-medium text-amber-600 hover:underline cursor-pointer">Login</span>
                        </div>
			</CardContent>
		</AuthLayout>
	);
}