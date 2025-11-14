"use client";
import { useEffect } from "react";
import { useAuth } from "../Components/AuthContext";
import { useRouter } from "next/navigation";
import MarketingDashboard from "../Components/PanelMarketing";

export default function MarketingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/login");
      else if (user.role !== "marketing") router.push("/unauthorized");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "marketing") return null;

  return <MarketingDashboard />;
}
