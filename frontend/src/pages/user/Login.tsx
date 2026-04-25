import {
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
} from "@/components/ui/card";
import AuthLayout from "@/layout/AuthLayout";
import LoginForm from "@/components/user/authentication/LoginForm";

export default function Login() {
      return (
            <AuthLayout>
                  <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Login Account</CardTitle>
                        <CardDescription>
                              Welcome back! Login your account and enjoy ordering.
                        </CardDescription>
                  </CardHeader>

                  <CardContent>
                        <LoginForm
                              formUsage={"page"}
                        />
                  </CardContent>
            </AuthLayout>
      );
}