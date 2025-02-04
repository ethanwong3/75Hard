import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authenticatedUser = await someAuthCheckFunction(); //PLACEHOLDER
        setUser(authenticatedUser);
      } catch (error) {
        console.error("Error fetching auth state:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
