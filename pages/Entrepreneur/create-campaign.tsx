"use client";

import { useEffect, useState } from "react";
import { DollarSign, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useStartupStore } from "@/store/startupStore";
import { useCampaignStore } from "@/store/campaignStore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function CreateCampaign() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const {
    createCampaign,
    // loading: campignLoading,
    error: campaignError,
  } = useCampaignStore();

  // Form data
  const [formData, setFormData] = useState({
    startupId: "",
    title: "",
    description: "",
    targetAmount: "",
    minimumFunding: "",
    duration: "",
  });

  const { data: session } = useSession();
  const myStartups = useStartupStore((state) => state.myStartups);
  const fetchMyStartups = useStartupStore((state) => state.fetchMyStartups);
  const startupsLoading = useStartupStore((state) => state.loading);

  useEffect(() => {
    if (session?.accessToken) {
      fetchMyStartups(session.accessToken);
    }
  }, [session?.accessToken, fetchMyStartups]);

  const totalSteps = 3;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!session?.accessToken) return;

    // Calculate start_date (today) and end_date (today + duration)
    const today = new Date();
    // const startDate = today.toISOString();

    // Calculate end date based on duration (in days)
    let endDate = today;
    if (formData.duration) {
      endDate = new Date(
        today.getTime() + Number(formData.duration) * 24 * 60 * 60 * 1000
      );
    }
    const endDateISO = endDate.toISOString();

    // Prepare payload for createCampaign
    const payload = {
      startup_id: formData.startupId,
      title: formData.title,
      description: formData.description,
      target_amount: Number(formData.targetAmount),
      minimum_investment: Number(formData.minimumFunding),
      end_date: endDateISO,
    };

    const created = await createCampaign(payload, session.accessToken);

    if (created) {
      router.push("/entrepreneur/my-campaigns");
    } else {
      console.error("Error creating campaign:", campaignError);
      toast({
        title: "Error creating campaign",
        description:
          "There was an issue creating your campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: string) => {
    const num = Number.parseFloat(amount);
    return isNaN(num)
      ? "$0"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(num);
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Basic Information";
      case 2:
        return "Funding Details";
      case 3:
        return "Review & Launch";
      default:
        return "";
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.title && formData.description;
      case 2:
        return (
          formData.targetAmount && formData.minimumFunding && formData.duration
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-black flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Campaign Created Successfully!
              </DialogTitle>
              <DialogDescription>
                Your campaign has been created successfully and is now live on
                the platform.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Link href="/entrepreneur/my-campaigns">
                <Button
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  Go to My Campaigns
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Campaign
            </h1>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Progress
              value={(currentStep / totalSteps) * 100}
              className="flex-1 h-2"
            />
            <span className="text-sm font-medium text-gray-700">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {getStepTitle(currentStep)}
          </h2>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader>
                  <CardTitle className="text-xl text-black flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Campaign Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Startup Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Attach to Startup *
                    </Label>
                    <Select
                      value={formData.startupId}
                      onValueChange={(value) =>
                        handleInputChange("startupId", value)
                      }
                      disabled={startupsLoading}
                    >
                      <SelectTrigger className="border-gray-300">
                        <SelectValue
                          placeholder={
                            startupsLoading ? "Loading..." : "Select a startup"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {myStartups && myStartups.length > 0 ? (
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          myStartups.map((startup: any) => (
                            <SelectItem key={startup.id} value={startup.id}>
                              {startup.startup_name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-gray-500 text-sm">
                            No startups found
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Campaign Title */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Campaign Title *
                    </Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Project title"
                      className="border-gray-300"
                    />
                  </div>

                  {/* Campaign Description */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Campaign Description *
                    </Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Describe your campaign, what you're building, and why people should invest..."
                      rows={6}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">
                      {formData.description.length}/500 characters
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Funding Details */}
            {currentStep === 2 && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader>
                  <CardTitle className="text-xl text-black flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Funding Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Target Amount */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Funding Goal *
                    </Label>
                    <Input
                      type="number"
                      value={formData.targetAmount}
                      onChange={(e) =>
                        handleInputChange("targetAmount", e.target.value)
                      }
                      placeholder="25000"
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">
                      Target: {formatCurrency(formData.targetAmount || "0")}
                    </p>
                  </div>

                  {/* Minimum Investment */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Minimum Investment *
                    </Label>
                    <Input
                      type="number"
                      value={formData.minimumFunding}
                      onChange={(e) =>
                        handleInputChange("minimumFunding", e.target.value)
                      }
                      placeholder="50"
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">
                      Minimum: {formatCurrency(formData.minimumFunding || "0")}
                    </p>
                  </div>

                  {/* Campaign Duration */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Campaign Duration *
                    </Label>
                    <Select
                      value={formData.duration}
                      onValueChange={(value) =>
                        handleInputChange("duration", value)
                      }
                    >
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select campaign duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="45">45 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Funding Summary */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Funding Summary
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target Amount:</span>
                        <span className="font-medium">
                          {formatCurrency(formData.targetAmount || "0")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Minimum Investment:
                        </span>
                        <span className="font-medium">
                          {formatCurrency(formData.minimumFunding || "0")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Campaign Duration:
                        </span>
                        <span className="font-medium">
                          {formData.duration
                            ? `${formData.duration} days`
                            : "Not set"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review & Launch */}
            {currentStep === 3 && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader>
                  <CardTitle className="text-xl text-black flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    Review Your Campaign
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Campaign Summary */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {formData.title}
                      </h3>
                      <p className="text-gray-700 mb-3">
                        {formData.description}
                      </p>
                    </div>
                  </div>

                  {/* Funding Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(formData.targetAmount)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Funding Goal
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(formData.minimumFunding)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Minimum Investment
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {formData.duration}
                        </div>
                        <div className="text-sm text-gray-600">
                          Days Duration
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Campaign Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Campaign Title:</span>
                        <span className="font-medium text-gray-900">
                          {formData.title}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target Amount:</span>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(formData.targetAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Minimum Investment:
                        </span>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(formData.minimumFunding)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium text-gray-900">
                          {formData.duration} days
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="text-lg text-black">
                  Campaign Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step < currentStep
                            ? "bg-green-500 text-white"
                            : step === currentStep
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step < currentStep ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          step
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          step <= currentStep
                            ? "text-gray-900 font-medium"
                            : "text-gray-500"
                        }`}
                      >
                        {getStepTitle(step)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader>
                <CardTitle className="text-lg text-black">
                  💡 Tips for Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-700">
                  {currentStep === 1 && (
                    <>
                      <p>
                        • Choose a clear, compelling title that explains what
                        you&apos;re building
                      </p>
                      <p>
                        • Write a description that tells your story and explains
                        the problem you&apos;re solving
                      </p>
                      <p>• Keep your description concise but informative</p>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <p>
                        • Set a realistic funding goal based on your actual
                        needs
                      </p>
                      <p>
                        • Keep minimum investment low to encourage more backers
                      </p>
                      <p>
                        • 30-60 days is typically the optimal campaign duration
                      </p>
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <p>• Review all details carefully before launching</p>
                      <p>• Make sure your campaign tells a complete story</p>
                      <p>
                        • Once launched, actively promote and engage with
                        backers
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Previous
          </Button>

          <div className="flex items-center gap-3">
            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid(currentStep)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Launch Campaign
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
