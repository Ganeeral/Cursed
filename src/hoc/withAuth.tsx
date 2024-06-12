// hoc/withAuth.tsx
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const user = localStorage.getItem("user_id");

      if (!user) {
        router.replace("/auth");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
