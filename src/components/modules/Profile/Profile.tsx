import userIcon from "@/assets/images/user.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IdCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
  UserCheck,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EditableField } from "./EditableField";

// Updated Zod schema
const updateUserZodSchema = z.object({
  phone: z
    .string({ error: "Phone Number Is Required" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be  Bangladesh number. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),

  password: z
    .string({ error: "Password Is Required" })
    .min(6, "Password must be at least of 6 character")
    .max(20, "Password can not be more than 20 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
      "Password must be at least 6 characters long, include one uppercase letter and one special character."
    )
    .optional(),

  name: z
    .string({ error: "Name Is Required" })
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must be less than 25 characters")
    .optional(),

  email: z.email("Invalid email format").optional(),

  userName: z
    .string({ error: "Username must be string" })
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .optional(),

  picture: z.string("Picture must be a valid URL").optional(),

  nidNumber: z
    .string()
    .regex(/^\d+$/, "NID number must contain only digits")
    .optional(),

  address: z
    .string()
    .max(200, "Address must be less than 200 characters")
    .optional(),
});

type UpdateUserFormData = z.infer<typeof updateUserZodSchema>;

const Profile = () => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({
    name: "John Doe",
    userName: "john_doe",
    email: "john.doe@example.com",
    phone: "+8801712345678",
    address: "123 Main Street, Dhaka, Bangladesh",
    nidNumber: "1234567890",
    picture: userIcon,
    password: "Password@123",
    walletId: "WLT123456",
    walletBalance: 5000,
    _id: "user123",
  });

  // Single form to handle all fields
  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserZodSchema),
    defaultValues: {
      name: userData.name,
      userName: userData.userName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      nidNumber: userData.nidNumber,
      picture: userData.picture,
      password: userData.password,
    },
  });

  // Handler for saving field data
  const handleSave = async (field: string, data: UpdateUserFormData) => {
    try {
      console.log("i go click");

      // Prepare payload for backend - send only the field being updated
      const updatePayload = {
        [field]: data[field as keyof UpdateUserFormData],
      };

      console.log("Sending update to backend:", {
        userId: userData._id || "",
        payload: updatePayload,
      });

      // const updatedUser = await updateUser(userId, updatePayload);

      // For password, don't update the display value
      if (field === "password") {
        console.log("Password updated successfully");
        setEditingField(null);
        form.reset({ password: "" });
      } else {
        // const updatedUser = await updateUser(userId, updatePayload);

        // Temporary: Update local state until real API is implemented
        setUserData((prev) => ({
          ...prev,
          [field]: data[field as keyof UpdateUserFormData],
        }));

        setEditingField(null);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      // Handle error - show toast notification
    }
  };

  const handleEdit = (field: string) => {
    setEditingField(field);
    if (field === "password") {
      form.setValue("password", "");
    } else {
      form.setValue(
        field as keyof UpdateUserFormData,
        userData[field as keyof typeof userData]
      );
    }
  };

  const handleCancel = (field: string) => {
    form.reset();
    setEditingField(null);
    if (field === "password") {
      setShowPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <Card className="mb-6 border-0 shadow-2xl overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute -bottom-12 left-8">
              <Avatar className="w-24 h-24 ring-4 ring-white shadow-2xl bg-emerald-500">
                <AvatarImage src={userData.picture} alt={userData.name} />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {userData?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <CardContent className="pt-16 pb-6 px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {userData.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm font-mono">{userData.walletId}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
                  Balance
                </p>
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${userData.walletBalance}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details Card */}
        <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Profile Information
              </h2>
              <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                Verified
              </div>
            </div>
            <div className="space-y-3">
              <EditableField
                icon={User}
                label="Full Name"
                field="name"
                value={userData.name}
                isEditing={editingField === "name"}
                form={form}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
              />
              <EditableField
                icon={UserCheck}
                label="Username"
                field="userName"
                value={userData.userName}
                isEditing={editingField === "userName"}
                form={form}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
              />
              <EditableField
                icon={Mail}
                label="Email Address"
                field="email"
                value={userData.email}
                isEditing={editingField === "email"}
                form={form}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
              />
              <EditableField
                icon={Phone}
                label="Phone Number"
                field="phone"
                value={userData.phone}
                isEditing={editingField === "phone"}
                form={form}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
              />
              <EditableField
                icon={MapPin}
                label="Address"
                field="address"
                value={userData.address}
                isEditing={editingField === "address"}
                isTextarea={true}
                form={form}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
              />
              <EditableField
                icon={IdCard}
                label="NID Number"
                field="nidNumber"
                value={userData.nidNumber}
                isEditing={editingField === "nidNumber"}
                form={form}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
              />
              <EditableField
                icon={Lock}
                label="Password"
                field="password"
                value={userData.password}
                isEditing={editingField === "password"}
                isPassword={true}
                showPassword={showPassword}
                form={form}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
            </div>
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
      </div>
    </div>
  );
};

export default Profile;
