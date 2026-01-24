import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function AuthMiddleware() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const publicRoutes = ["/login", "/signup"];

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && !publicRoutes.includes(location.pathname)) {
        navigate("/login", { replace: true });
      } else if (user && publicRoutes.includes(location.pathname)) {
        navigate("/home", { replace: true });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [location.pathname, navigate]);

  if (loading) return <div>Loading...</div>; // show a loader while checking auth

  return <Outlet />;
}
