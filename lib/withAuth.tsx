import LoadingScreen from "@/components/loaders/loading-screen";
import useAuthStore from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState, ComponentType } from "react";

/**
 * A Higher Order Component (HOC) that provides authentication protection for routes
 * Redirects to login if user is not authenticated
 * Shows a loading screen while checking authentication status
 *
 * @param WrappedComponent - The component to wrap with authentication protection
 * @returns A new component with authentication protection
 */
const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );
    const accessToken = useAuthStore.getState().accessToken;

    useEffect(() => {
      // Check for authentication token
      if (!accessToken) {
        router.replace("/auth/login");
      } else {
        setIsAuthenticated(true);
      }
    }, [router, accessToken]);

    // Show loading screen while checking authentication
    if (isAuthenticated === null) {
      return <LoadingScreen />;
    }

    // Only render the component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  // Set display name for debugging purposes
  WithAuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthComponent;
};

export default withAuth;
