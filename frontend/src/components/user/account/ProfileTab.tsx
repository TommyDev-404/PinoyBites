import { useEffect, useRef, useState } from "react";
import { Camera, Edit2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAccount, useUpdateAccount } from "@/hooks/user/account.hooks";
import type { UpdateAccountInfoType } from "@/types/user/account.types";

export default function ProfileTab() {
      const { data: userAccountInfo, isLoading } = useAccount();
      const user = userAccountInfo?.user;

	const { mutate: updateAccount, isPending } = useUpdateAccount();

	const [isEditing, setIsEditing] = useState(false);
	const [previewImage, setPreviewImage] = useState<string | null>(null);

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UpdateAccountInfoType>({
		defaultValues: {
			username: user?.username ?? "",
			email: user?.email ?? "",
			contact_num: user?.contact_num ?? "",
			address: user?.address ?? "",
		},
	});

	// autofill the form 
	useEffect(() => {
		if (userAccountInfo?.user) {
			reset({
				username: user?.username,
				email: user?.email,
				contact_num: user?.contact_num,
				address: user?.address,
			});
		}
	}, [userAccountInfo, reset]);

	const onSubmit = (data: UpdateAccountInfoType) => {
		if (!user) return;

		if (previewImage) {
			updateAccount({
				user_id: user.user_id,
				updated_data: { ...data, profile_image: previewImage },
			});
		}else{
			updateAccount({
				user_id: user.user_id,
				updated_data: data
			});
		}

		setIsEditing(false);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => setPreviewImage(reader.result as string);
		reader.readAsDataURL(file);
	};

	const handleClick = () => {
		if (isEditing) fileInputRef.current?.click();
	};

	const initials =
	user?.username
		?.split(" ")
		.map((n: string) => n[0])
		.join("")
		.slice(0, 2)
		.toUpperCase() ?? "U";

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="flex items-start justify-between">
				<div>
					<h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
					<p className="text-sm text-gray-500 mt-1">Manage your personal details.</p>
				</div>

				<button
					type="button"
					onClick={() => {
						setIsEditing((prev) => !prev);
						reset();
					}}
					className="text-sm text-amber-600 font-medium hover:text-amber-700 flex items-center gap-1"
				>
					<Edit2 size={14} /> {isEditing ? "Cancel" : "Edit Profile"}
				</button>
			</div>

			{/* Avatar Section */}
			<div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
				<div
					className={`relative group ${isEditing ? "cursor-pointer" : "cursor-not-allowed opacity-70"}`}
					onClick={handleClick}
				>
				<div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center font-bold text-2xl shadow-md overflow-hidden">
					{previewImage ? (
						<img src={previewImage} alt="Avatar Preview" className="w-full h-full object-cover" />
					) : user?.profile_image && user.profile_image !== "None" ? (
						<img src={user.profile_image} alt="Avatar" className="w-full h-full object-cover" />
					) : (
						initials
					)}
				</div>

				<div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm border border-gray-200 group-hover:scale-110 transition-transform">
					<Camera size={14} className="text-gray-600" />
				</div>

				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleFileChange}
				/>
				</div>

				<div className="flex-1">
					<p className="text-sm font-medium text-gray-900">Profile Picture</p>
					<p className="text-xs text-gray-500">JPG, GIF or PNG. Max size 800K</p>
				</div>
			</div>

			{/* Form Fields */}
			<div className="grid md:grid-cols-2 gap-6">
				<div className="space-y-2">
				<label className="text-sm font-medium text-gray-700">Full Name</label>
				<input
					{...register("username", { required: "Full name is required" })}
					disabled={!isEditing}
					className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all disabled:bg-gray-100"
				/>
				{errors.username && (
					<p className="text-xs text-red-500">{errors.username.message}</p>
				)}
				</div>

				<div className="space-y-2">
				<label className="text-sm font-medium text-gray-700">Email Address</label>
				<input
					{...register("email", { required: "Email is required" })}
					disabled={!isEditing}
					className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all disabled:bg-gray-100"
				/>
				</div>

				<div className="md:col-span-2 space-y-2">
				<label className="text-sm font-medium text-gray-700">Contact</label>
				<input
					{...register("contact_num")}
					disabled={!isEditing}
					className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all disabled:bg-gray-100"
				/>
				</div>

				<div className="md:col-span-2 space-y-2">
				<label className="text-sm font-medium text-gray-700">Address</label>
				<input
					{...register("address")}
					disabled={!isEditing}
					className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all disabled:bg-gray-100"
				/>
				</div>
			</div>

			{isEditing && (
			<div className="flex justify-end gap-3">
			<button
				type="button"
				onClick={() => {
				reset();
				setIsEditing(false);
				}}
				className="px-4 py-2 rounded-lg border"
			>
				Cancel
			</button>

			<button
				type="submit"
				disabled={isPending}
				className="px-4 py-2 rounded-lg bg-amber-600 text-white"
			>
				{isPending ? "Saving..." : "Save Changes"}
			</button>
			</div>
			)}
		</form>
	);
	}
