"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoleGuard({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole: "startup" | "investor";
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const role = (session?.user as { role?: string })?.role;

  useEffect(() => {
    if (status === "loading") return;
    const role = (session?.user as { role?: string })?.role;
    if (!session || role !== requiredRole) {
      router.replace("/");
    }
  }, [session, status, router, requiredRole]);

  if (status === "loading" || !session || role !== requiredRole) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
