import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useCreateAdminMutation } from "@/redux/features/admin/admin.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createAdminSchema = z.object({
  phone: z
    .string({ error: "Phone Number Is Required" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be  Bangladeshi number. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),

  password: z
    .string({ error: "Password Is Required" })
    .min(6, "Password must be at least of 6 character")
    .max(20, "Password can not be more than 20 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
      "Password must be at least 6 characters long, include one uppercase letter and one special character."
    ),

  name: z
    .string({ error: "Name Is Required" })
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must be less than 25 characters"),
});

// create new admin
const CreateAdmin = () => {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const form = useForm<z.infer<typeof createAdminSchema>>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createAdminSchema>) => {
    const toastId = "create-admin-toast";

    const adminInfo = {
      name: data.name,
      phone: data.phone,
      password: data.password,
    };

    try {
      await createAdmin(adminInfo).unwrap();
      toast.success("Admin created successfully.");
      form.reset();
    } catch (err: unknown) {
      const error = err as { status?: number; data?: { message?: string } };

      if (error.status && error.status >= 400 && error.status < 500) {
        return toast.error(error.data?.message || "Something went wrong.", {
          id: toastId,
        });
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="w-full max-w-lg mx-auto">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-3 pb-2">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Create New Admin
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Add a new administrator to the system
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-600" />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter admin full name"
                          className="h-10 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
                          type="text"
                          className="h-10 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          {...field}
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
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-blue-600" />
                        Password
                      </FormLabel>
                      <FormControl>
                        <Password
                          placeholder="Enter secure password"
                          className="h-10 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-10 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
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
                      Creating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <User className="w-4 h-4" />
                      Create Admin
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateAdmin;
