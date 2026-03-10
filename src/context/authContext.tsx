// "use client";

// import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import axios from "axios";
// import { BASE_URL } from "@/helper/BASE_URL";
// import toast from "react-hot-toast";

// interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: "admin" | "user";
//   avatar: { url: string };
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   loginUser: (userData: User) => void;
//   logoutUser: () => Promise<void>;
//   checkUserAuth: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const loginUser = (userData: User) => {
//     setUser(userData);
//   };

//   const checkUserAuth = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/auth/get-me`, {
//         withCredentials: true,
//       });
//       console.log("amr logged user ",response.data.data )
//       if (response.data.success) {
//         setUser(response.data.data);
//       }
//     } catch (error) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logoutUser = async () => {
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/logout`, {}, {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setUser(null);
//         toast.success("Logged out successfully!");
//         window.location.href = "/";
//       }
//     } catch (error) {
//       toast.error("Logout failed!");
//     }
//   };

//   useEffect(() => {
//     checkUserAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, checkUserAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };




"use client";
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import axios from "axios";
import { BASE_URL } from "@/helper/BASE_URL";
import toast from "react-hot-toast";
import LoadingPage from "@/components/shared/LoadingPage";

// ১. ইউজার ইন্টারফেস
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
  avatar: { url: string };
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  loginUser: (userData: User) => void;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        
        const response = await axios.get(`${BASE_URL}/auth/get-me`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (err) {
        console.log("Session not found");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedUser();
  }, []);

  const loginUser = (userData: User) => {
    setUser(userData);
  };

  const logoutUser = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/logout`, {}, {
        withCredentials: true,
      });
      
      if (res.data.success) {
        toast.success(res.data.message || "Logged out successfully");
        setUser(null);
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      }
    } catch (err) {
      setUser(null);
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, loginUser, logoutUser }}>
      {/* ৩. এটিই মূল ট্রিক: লোডিং শেষ না হওয়া পর্যন্ত অ্যাপ রেন্ডার হবে না */}
      {!loading ? (
        children
      ) : (
        <LoadingPage />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};