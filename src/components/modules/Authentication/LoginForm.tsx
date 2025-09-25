import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { cn } from "@/lib/utils";
import { authApi, useLoginMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Shield, UserCheck, Users } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

// Demo credentials for quick login from environment variables
const DEMO_CREDENTIALS = {
  admin: {
    phone: import.meta.env.VITE_DEMO_ADMIN_PHONE as string,
    password: import.meta.env.VITE_DEMO_ADMIN_PASSWORD as string,
    role: "Admin",
    icon: Shield,
    description: "Full system access",
  },
  agent: {
    phone: import.meta.env.VITE_DEMO_AGENT_PHONE as string,
    password: "Pa$$w0rd!",
    role: "Agent",
    icon: UserCheck,
    description: "Cash-in/out services",
  },
  user: {
    phone: import.meta.env.VITE_DEMO_USER_PHONE as string,
    password: import.meta.env.VITE_DEMO_USER_PASSWORD as string,
    role: "User",
    icon: Users,
    description: "Wallet transactions",
  },
} as const;

const LoginForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  // Quick login function
  const handleQuickLogin = async (role: keyof typeof DEMO_CREDENTIALS) => {
    const credentials = DEMO_CREDENTIALS[role];

    // Autofill the form
    form.setValue("phone", credentials.phone);
    form.setValue("password", credentials.password);

    // Submit the form with the credentials
    await onSubmit({
      phone: credentials.phone,
      password: credentials.password,
    });
  };

  // Handle Login
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "login-toast";

    try {
      const res = await login(data).unwrap();

      if (res.success) {
        dispatch(authApi.util.invalidateTags(["USER"]));
        toast.success("Login successful!", {
          duration: 2000,
          position: "bottom-center",
        });

        // Navigate to role-based dashboard
        const role = res.data?.user?.role?.toLowerCase();
        const validRoles = ["user", "agent", "admin"];
        const dashboardPath = validRoles.includes(role)
          ? `/${role.toLowerCase()}`
          : "/";
        navigate(dashboardPath);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Login failed
      if (err.status >= 400 && err.status < 500) {
        return toast.error(err.data?.message || "Something went wrong.", {
          id: toastId,
        });
      }
      return toast.error("Login failed. Please try again.", { id: toastId });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="01XXXXXXXXX"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>

        {/* Quick Login Section */}
        <div className="space-y-4">
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Quick Demo Login
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(DEMO_CREDENTIALS).map(([key, credential]) => {
              const Icon = credential.icon;
              return (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleQuickLogin(key as keyof typeof DEMO_CREDENTIALS)
                  }
                  disabled={isLoading}
                  className="flex flex-col h-auto p-3 space-y-1 hover:bg-accent/50 transition-colors"
                >
                  <Icon className="size-5 text-primary" />
                  <span className="font-medium text-xs">{credential.role}</span>
                  <span className="text-xs text-muted-foreground leading-tight">
                    {credential.description}
                  </span>
                </Button>
              );
            })}
          </div>

          <p className="text-xs text-center text-muted-foreground leading-relaxed px-2">
            Please keep enable third party cookies for optimal performance
          </p>
        </div>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button variant="outline" className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M21.35 11.1H12v2.8h5.35c-.23 1.25-1.4 3.67-5.35 3.67-3.22 0-5.85-2.67-5.85-5.97s2.63-5.97 5.85-5.97c1.83 0 3.06.78 3.76 1.45l2.57-2.5C17.13 3.5 14.78 2.5 12 2.5 6.73 2.5 2.5 6.73 2.5 12s4.23 9.5 9.5 9.5c5.47 0 9.09-3.84 9.09-9.25 0-.62-.07-1.09-.14-1.65z" />
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
