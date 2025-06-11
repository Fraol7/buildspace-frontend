"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
// import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddStartupPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    stage: "",
    badges: "",
    investedAmount: "",
    requiredInvestment: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // In a real app, this would save the data
    alert("Startup added successfully!")
  }

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
            <CardDescription>Fill out the form below to add your startup to our platform.</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
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
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage">Funding Stage</Label>
                  <Input
                    id="stage"
                    name="stage"
                    placeholder="e.g., Seed, Series A"
                    value={formData.stage}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="badges">Tags (comma separated)</Label>
                <Input
                  id="badges"
                  name="badges"
                  placeholder="e.g., AI, FinTech, SaaS"
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
                  <Label htmlFor="requiredInvestment">Investment Goal ($)</Label>
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
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600"
              >
                Add Startup
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
