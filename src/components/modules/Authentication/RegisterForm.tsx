import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { User2, UserCog } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        error: "Name is too short",
      })
      .max(50),
    phone: z
      .string({ error: "Phone Number Is Required" })
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message:
          "Phone number must be  Bangladeshi number. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
      }),
    password: z
      .string()
      .min(8, { error: "Password is too short, must be 8 character long" }),
    confirmPassword: z.string().min(8, {
      error: "Confirm Password is too short, must be 8 character long",
    }),
    role: z.enum(["USER", "AGENT"], {
      message: "Please select a role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
  });

  // Handle User / Agent Registration
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const toastId = "register-toast";

    const userInfo = {
      name: data.name,
      phone: data.phone,
      password: data.password,
      role: data.role,
    };

    try {
      const res = await register(userInfo).unwrap();
      console.log(res);
      toast.success(
        "Registration successful. Please login with your credentials."
      );
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.data.message);

      if (err.status >= 400 && err.status < 500) {
        return toast.error(err.data?.message || "Something went wrong.", {
          id: toastId,
        });
      }
    }

    console.log(userInfo);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create an account
        </p>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Type Your Name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="01XXXXXXXXX" type="text" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your phone number.
                  </FormDescription>
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
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">Register as</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex gap-4"
                    >
                      <ToggleGroupItem
                        value="USER"
                        className="p-4 rounded-lg border shadow-sm data-[state=on]:bg-fuchsia-800 data-[state=on]:text-white"
                      >
                        User <User2 />
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="AGENT"
                        className="p-4 rounded-lg border shadow-sm data-[state=on]:bg-fuchsia-800 data-[state=on]:text-white"
                      >
                        Agent <UserCog />
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer mt-1"
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
                  Registering...
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button variant="outline" className="w-full cursor-pointer">
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
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
