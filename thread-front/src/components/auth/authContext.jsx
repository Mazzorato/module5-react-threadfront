import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/me", {
      credentials: "include",
    })
      .then((res) => {
        if (location.pathname == "/register") {
          return null;
        }
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        return res.ok ? res.json() : null;
      })
      .then((data) => data && setUser(data))
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div></div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
