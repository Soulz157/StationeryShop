"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  // Shield,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/use-profile";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/layouts";

export default function AccountPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { profile, loading, error, refetch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });

  const handleEditClick = () => {
    setFormData({
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      address: profile?.address || "",
      phone: profile?.phone || "",
    });
    setIsEditing(true);
  };

  if (loading) return <Loading />;
  if (error) {
    return <p className="p-6 text-red-500">Error: {JSON.stringify(error)}</p>;
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log(formData);
      await fetch("http://localhost:4000/api/auth/authorized/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (refetch) {
        await refetch();
      }
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      address: profile?.address || "",
      phone: profile?.phone || "",
    });
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Store</span>
          </Link>
          <h1 className="text-lg font-semibold text-slate-900">
            Account Settings
          </h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Profile Header */}
        <div className="mb-8 flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-indigo-500">
            <span className="text-2xl font-bold text-white">
              {profile?.firstName?.[0]}
              {profile?.lastName?.[0]}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-slate-500">{profile?.email}</p>
            <Badge
              variant="secondary"
              className="mt-2 bg-teal-100 text-teal-700 hover:bg-teal-100"
            >
              {profile?.role}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Form */}
          <div className="md:col-span-2">
            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">
                    Personal Information
                  </CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </div>
                {!isEditing ? (
                  <Button
                    onClick={() => handleEditClick()}
                    variant="default"
                    className="border-teal-300 text-white bg-teal-600 hover:bg-teal-700"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      onClick={handleCancel}
                      className="text-slate-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Blocked Fields */}
                <div className="rounded-lg bg-slate-100 p-4">
                  <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Account Credentials (Read Only)
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-slate-500">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <div className="relative">
                        <Input
                          value={profile?.email}
                          disabled
                          className="border-slate-300 bg-slate-200 text-slate-500 cursor-not-allowed"
                        />
                        <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-slate-500">
                        <Lock className="h-4 w-4" />
                        Password
                      </Label>
                      <Button
                        variant="outline"
                        className="w-full border-slate-300 text-slate-600"
                        onClick={() => router.push("/account/change-password")}
                      >
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-200" />

                {/* Editable Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <User className="h-4 w-4 text-teal-600" />
                      First Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                      />
                    ) : (
                      <p className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900">
                        {profile?.firstName || "-"}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <User className="h-4 w-4 text-teal-600" />
                      Last Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                      />
                    ) : (
                      <p className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900">
                        {profile?.lastName || "-"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="flex items-center gap-2 text-slate-700"
                  >
                    <Phone className="h-4 w-4 text-teal-600" />
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 8900"
                      className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  ) : (
                    <p className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900">
                      {profile?.phone || "-"}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="flex items-center gap-2 text-slate-700"
                  >
                    <MapPin className="h-4 w-4 text-teal-600" />
                    Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  ) : (
                    <p className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-900">
                      {profile?.address || "-"}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                  <Shield className="h-4 w-4 text-indigo-600" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Account ID
                  </p>
                  <p className="mt-1 truncate font-mono text-sm text-slate-700">
                    {profile?.id}
                  </p>
                </div>
                <Separator className="bg-slate-200" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Role
                  </p>
                  <Badge className="mt-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                    {profile?.role}
                  </Badge>
                </div>
              </CardContent>
            </Card> */}

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                  <Calendar className="h-4 w-4 text-teal-600" />
                  Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Member Since
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {profile?.createdAt &&
                      formatDate(new Date(profile.createdAt))}
                  </p>
                </div>
                <Separator className="bg-slate-200" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Last Updated
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {profile?.updatedAt &&
                      formatDate(new Date(profile.updatedAt))}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
