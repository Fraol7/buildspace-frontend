"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
// import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { INDUSTRIES, FUNDING_STAGE_OPTIONS, countries } from "@/constants";
import { useRouter } from "next/navigation";
import { useStartupStore } from "@/store/startupStore";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useChatStore } from "@/store/chatStore";

export default function AddStartupPage() {
  const router = useRouter();
  const { createStartup, loading } = useStartupStore();
  const { uploadFiles } = useChatStore();

  const countryOptions = Object.entries(countries).map(([code, name]) => ({
    code,
    name,
  }));

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!session?.accessToken) {
      toast.error("You must be logged in to upload a logo.");
      return;
    }
    try {
      const urls = await uploadFiles([file], session.accessToken);
      if (urls.length > 0) {
        setFormData((prev) => ({ ...prev, logo_url: urls[0] }));
        toast.success("Logo uploaded!");
      } else {
        toast.error("Failed to upload logo.");
      }
    } catch {
      toast.error("Failed to upload logo.");
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    stage: "",
    badges: "",
    investedAmount: "",
    requiredInvestment: "",
    website: "",
    logo_url: "",
    industry: "",
    revenue: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Prepare payload to match backend expectations
      const payload = {
        startup_name: formData.title,
        tag_line: formData.badges,
        logo_url: formData.logo_url,
        description: formData.description,
        website: formData.website,
        industry: Number(formData.industry),
        funding_goal: Number(formData.requiredInvestment),
        funding_stage: formData.stage,
        amount_raised: Number(formData.investedAmount),
        business_model: "B2B", // You may want to collect this from the form
        revenue: Number(formData.revenue), // You may want to collect this from the form
        location: formData.location,
      };
      if (!session?.accessToken) {
        toast.error("You must be logged in to create a startup.");
        return;
      }
      const ok = await createStartup(payload, session.accessToken);

      if (ok) {
        router.push("/entrepreneur/my-startups");
      } else {
        toast.error("An error happened while creating your startup.");
      }
    } catch (err) {
      toast.error("An error happened while creating your startup.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 py-6">
      <div className="container mx-auto px-6">
        {/* <Link href="/" className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Startups
        </Link> */}

        <Card className="max-w-full mx-auto bg-white/90 shadow-none border-0 border-sky-100">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Add a New Startup
            </CardTitle>
            <CardDescription>
              Fill out the form below to add your startup to our platform.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* --- Improved Logo Upload Section --- */}
              <div className="flex flex-col items-start space-y-2">
                <Label className="mb-1">Profile Picture</Label>
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer group relative"
                    title="Upload logo"
                  >
                    <span className="sr-only">Upload logo</span>
                    <div className="w-20 h-20 rounded-full border-2 border-sky-200 group-hover:border-sky-400 flex items-center justify-center overflow-hidden bg-sky-50 transition-all">
                      {formData.logo_url ? (
                        <img
                          src={formData.logo_url}
                          alt="Startup Logo"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-sky-400 text-4xl font-bold">
                          +
                        </span>
                      )}
                    </div>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("logo-upload")?.click()
                      }
                      className="ml-2"
                    >
                      {formData.logo_url ? "Change" : "Upload"}
                    </Button>
                    <div className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, or GIF. Max 2MB.
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Startup Name</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., TechInnovate"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your startup and its mission..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, location: value }))
                    }
                    required
                  >
                    <SelectTrigger id="location" name="location">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {countryOptions.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage">Funding Stage</Label>
                  <Select
                    value={formData.stage}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, stage: value }))
                    }
                    required
                  >
                    <SelectTrigger id="stage" name="stage">
                      <SelectValue placeholder="Select funding stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {FUNDING_STAGE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="badges">Tag Line</Label>
                <Input
                  id="badges"
                  name="badges"
                  placeholder="e.g., Innovating the Future"
                  value={formData.badges}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="investedAmount">Current Investment ($)</Label>
                  <Input
                    id="investedAmount"
                    name="investedAmount"
                    type="number"
                    placeholder="e.g., 500000"
                    value={formData.investedAmount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requiredInvestment">
                    Investment Goal ($)
                  </Label>
                  <Input
                    id="requiredInvestment"
                    name="requiredInvestment"
                    type="number"
                    placeholder="e.g., 2000000"
                    value={formData.requiredInvestment}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid  gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="e.g., https://yourstartup.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 max-w-xs">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, industry: value }))
                    }
                    required
                  >
                    <SelectTrigger id="industry" name="industry">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {Object.entries(INDUSTRIES).map(([id, name]) => (
                        <SelectItem key={id} value={id}>
                          {name.charAt(0).toUpperCase() +
                            name.slice(1).replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="revenue">Revenue ($)</Label>
                  <Input
                    id="revenue"
                    name="revenue"
                    type="number"
                    placeholder="e.g., 100000"
                    value={formData.revenue}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Add Startup
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
