// AppLayout.tsx
import { useAuth } from "@/context/auth.context";
import GuestLayout from "@/layout/GuestLayout";
import UserLayout from "./UserLayout";

export default function AppLayout() {
      const { user } = useAuth();

      return user && user.role !== 'admin' ? (
            <UserLayout/>
      ) : (
            <GuestLayout/>
      );
}