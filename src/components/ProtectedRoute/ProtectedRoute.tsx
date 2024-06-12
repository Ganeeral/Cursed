import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  role?: string;
}> = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useAuth();
  const { push } = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      push("/auth");
    } else if (role && userRole !== role) {
      push("/auth");
    }
  }, [isAuthenticated, userRole, role, push]);

  if (!isAuthenticated || (role && userRole !== role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
