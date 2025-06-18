"use client";
import React from "react";
import { ChatInterface } from "@/components/Common/chat/chat-interface";
import { useParams } from "next/navigation";

const page = () => {
  const searchParams = useParams();
  const contact = searchParams?.contact;
  const contactId = Array.isArray(contact) ? contact[0] : contact;

  return <ChatInterface initialContactId={contactId} />;
};

export default page;
