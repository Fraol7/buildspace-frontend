"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign  } from "lucide-react"

interface PaymentPopupProps {
  campaignTitle: string;
  amount: number;
  buttonLabel?: string;
  onPaymentSuccess?: () => void;
  children: React.ReactNode;
}

export default function PaymentPopup({ campaignTitle, amount: initialAmount, buttonLabel, onPaymentSuccess, children }: PaymentPopupProps) {
  const [amount, setAmount] = useState(initialAmount.toString())
  const [isOpen, setIsOpen] = useState(false)

  const handlePayWithChapa = () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    // Here you would integrate with your existing Chapa payment logic
    console.log(`Processing payment of ${amount} ETB with Chapa`)

    // Close the popup after initiating payment
    setIsOpen(false)

    // Your existing Chapa integration would go here
    // For example: redirectToChapa(amount)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-md p-2">
          <DollarSign  className="mr-2 h-4 w-4" />
          {buttonLabel || 'Contribute Now'}
        </Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contribute to {campaignTitle}</DialogTitle>
            <DialogDescription>Enter the amount you want to contribute and proceed with Chapa payment.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3 relative">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pr-12"
                  min="0"
                  step="0.01"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">ETB</span>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handlePayWithChapa} 
              className="bg-green-600 hover:bg-green-700"
            >
              <DollarSign  className="mr-2 h-4 w-4" />
              Contribute with Chapa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}
