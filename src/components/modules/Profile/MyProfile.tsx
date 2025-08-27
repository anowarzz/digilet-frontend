/* eslint-disable @typescript-eslint/no-explicit-any */
import userIcon from "@/assets/images/user.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useUpdateOwnProfileMutation } from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Edit2,
    Mail,
    MapPin,
    Phone,
    Save,
    Shield,
    User,
    UserCheck,
    UserCircle,
    Wallet,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Update user zod schema
const updateUserZodSchema = z.object({
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || /^(?:\+8801\d{9}|01\d{9})$/.test(val),
      "Phone number must be a valid Bangladesh number. Format: +8801XXXXXXXXX or 01XXXXXXXXX"
    ),

  name: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || (val.length >= 3 && val.length <= 25),
      "Name must be between 3 and 25 characters"
    ),

  email: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Invalid email format"
    ),

  userName: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val === "" ||
        (val.length >= 3 && val.length <= 20 && /^[a-zA-Z0-9_]+$/.test(val)),
      "Username must be 3-20 characters and contain only letters, numbers, and underscores"
    ),

  nidNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || /^\d+$/.test(val),
      "NID number must contain only digits"
    ),

  address: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || val.length <= 200,
      "Address must be less than 200 characters"
    ),
});

const MyProfile = () => {
  const [edit, setEdit] = useState<boolean>(false);

  const { data, isLoading, error, isError } =
    useCurrentUserInfoQuery(undefined);

  const user = data?.data;


    const [updateOwnProfile] = useUpdateOwnProfileMutation()

  // update user form
  const updateUserForm = useForm<z.infer<typeof updateUserZodSchema>>({
    resolver: zodResolver(updateUserZodSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      userName: "",
      nidNumber: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user) {
      updateUserForm.reset({
        name: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
        userName: user?.userName || "",
        nidNumber: user?.nidNumber || "",
        address: user?.address || "",
      });
    }
  }, [user, updateUserForm]);

  // Update user
  const handleUpdateUser = async (
    data: z.infer<typeof updateUserZodSchema>
  ) => {
    const toastId = toast.loading("Updating...");

    // Check if user data is available
    if (!user || (!user._id && !user.id)) {
      toast.error("User data not available. Please refresh the page.", {
        id: toastId,
      });
      return;
    }

    // Ensure all data is properly defined
    const updatedData = {
      name: data?.name || "",
      phone: data?.phone || "",
      email: data?.email || "",
      userName: data?.userName || "",
      nidNumber: data?.nidNumber || "",
      address: data?.address || "",
    };

    try {
      const res = await updateOwnProfile({
        userId: user._id || user.id,
        updatePayload: updatedData,
      }).unwrap();
      if (res?.success) {
        toast.success("User updated successfully.", { id: toastId });
        setEdit(false);
      }
    } catch (error: any) {
      if (error.status && error.status >= 400 && error.status < 500) {
        return toast.error(error.data?.message || "Something went wrong.", {
          id: toastId,
        });
      }
      return toast.error("Update failed. Please try again.", { id: toastId });
    }
  };

  const userData = user || {
    name: "",
    email: "",
    phone: "",
    address: "",
    picture: userIcon,
    walletId: "",
    balance: 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Failed to Load User Data
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {error instanceof Error
                  ? error.message
                  : "Invalid user ID or user not found"}
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!isLoading && !isError && user.phone && (
          <>
            {/* Header Card */}
            <Card className="mb-4 border-0 shadow-2xl overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute -bottom-8 left-8">
                  <Avatar className="w-20 h-20 ring-4 ring-white shadow-2xl bg-emerald-500">
                    <AvatarImage src={userData.picture} alt={userData.name} />
                    <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {(userData?.name || "User")
                        ?.split(" ")
                        ?.map((name: string) => name?.[0])
                        ?.join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <CardContent className="pt-12 pb-4 px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {userData.name}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Wallet className="w-4 h-4" />
                      <span className="text-sm font-mono">
                        {userData?.wallet?.walletId}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    {userData.role === "ADMIN" ? (
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Admin Access
                        </p>
                      </div>
                    ) : userData.role === "AGENT" ? (
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-5 h-5 text-green-600" />
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Agent Access
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Balance:
                          </span>
                          <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${Number(userData?.wallet?.balance ?? 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ) : userData.role === "USER" ? (
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                          <UserCircle className="w-5 h-5 text-purple-600" />
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            User Access
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Balance:
                          </span>
                          <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${Number(userData?.wallet?.balance ?? 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Balance:
                        </span>
                        <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ${Number(userData?.wallet?.balance ?? 0).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Information Card */}
            <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Profile Information
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEdit(!edit)}
                    className="h-8 px-3"
                  >
                    {edit ? (
                      <X className="w-4 h-4 mr-2" />
                    ) : (
                      <Edit2 className="w-4 h-4 mr-2" />
                    )}
                    {edit ? "Cancel" : "Edit"}
                  </Button>
                </div>

                <Form {...updateUserForm}>
                  <form
                    onSubmit={updateUserForm.handleSubmit(handleUpdateUser)}
                    className="space-y-4"
                  >
                    {/* Name Field */}
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
                      <div className="relative flex items-center gap-3 p-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                          <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={updateUserForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium uppercase tracking-wider">
                                  Full Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled={!edit}
                                    className={`border-0 bg-transparent text-sm font-semibold text-gray-900 dark:text-gray-100 h-8 ${
                                      edit
                                        ? "bg-white dark:bg-gray-800 border shadow-sm"
                                        : ""
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
                      <div className="relative flex items-center gap-3 p-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                          <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={updateUserForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium uppercase tracking-wider">
                                  Email Address
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled={!edit}
                                    className={`border-0 bg-transparent text-sm font-semibold text-gray-900 dark:text-gray-100 h-8 ${
                                      edit
                                        ? "bg-white dark:bg-gray-800 border shadow-sm"
                                        : ""
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
                      <div className="relative flex items-center gap-3 p-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                          <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={updateUserForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium uppercase tracking-wider">
                                  Phone Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled={!edit}
                                    className={`border-0 bg-transparent text-sm font-semibold text-gray-900 dark:text-gray-100 h-8 ${
                                      edit
                                        ? "bg-white dark:bg-gray-800 border shadow-sm"
                                        : ""
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Username Field */}
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
                      <div className="relative flex items-center gap-3 p-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                          <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={updateUserForm.control}
                            name="userName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium uppercase tracking-wider">
                                  Username
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled={!edit}
                                    className={`border-0 bg-transparent text-sm font-semibold text-gray-900 dark:text-gray-100 h-8 ${
                                      edit
                                        ? "bg-white dark:bg-gray-800 border shadow-sm"
                                        : ""
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* NID Number Field */}
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
                      <div className="relative flex items-center gap-3 p-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                          <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={updateUserForm.control}
                            name="nidNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium uppercase tracking-wider">
                                  NID Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled={!edit}
                                    className={`border-0 bg-transparent text-sm font-semibold text-gray-900 dark:text-gray-100 h-8 ${
                                      edit
                                        ? "bg-white dark:bg-gray-800 border shadow-sm"
                                        : ""
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address Field */}
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
                      <div className="relative flex items-center gap-3 p-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                          <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={updateUserForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium uppercase tracking-wider">
                                  Address
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    disabled={!edit}
                                    className={`border-0 bg-transparent text-sm font-semibold text-gray-900 dark:text-gray-100 min-h-[50px] resize-none ${
                                      edit
                                        ? "bg-white dark:bg-gray-800 border shadow-sm"
                                        : ""
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    {edit && (
                      <div className="flex justify-end pt-4">
                        <Button
                          type="submit"
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">🔒</span>
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  Your personal information is encrypted and secure
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
