"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Smile } from "lucide-react"
import dynamic from "next/dynamic"
import type { EmojiClickData } from "emoji-picker-react"

// Dynamically import EmojiPicker to avoid SSR issues
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
  loading: () => <div className="w-[350px] h-[400px] flex items-center justify-center">Loading emojis...</div>,
})

interface EmojiPickerComponentProps {
  onEmojiSelect: (emoji: string) => void
}

export function EmojiPickerComponent({ onEmojiSelect }: EmojiPickerComponentProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleEmojiClick = useCallback(
    (emojiData: EmojiClickData) => {
      console.log("Emoji clicked:", emojiData) // Debug log
      onEmojiSelect(emojiData.emoji)
      setIsOpen(false)
    },
    [onEmojiSelect],
  )

  const handleOpenChange = useCallback((open: boolean) => {
    console.log("Popover open state changed to:", open) // Debug log
    setIsOpen(open)
  }, [])

  const handleButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      console.log("Emoji button clicked, current state:", isOpen) // Debug log
      setIsOpen(!isOpen)
    },
    [isOpen],
  )

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 shrink-0"
          onClick={handleButtonClick}
          aria-label="Open emoji picker"
        >
          <Smile className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden"
        align="start"
        side="top"
        sideOffset={8}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="emoji-picker-container">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={350}
            height={400}
            searchDisabled={false}
            skinTonesDisabled={false}
            previewConfig={{
              showPreview: false,
            }}
            lazyLoadEmojis={true}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
