import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  loginAt: Date | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginAt, setLoginAt] = useState<Date | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        if (session) {
          const stored = localStorage.getItem('loginAt');
          if (stored) {
            setLoginAt(new Date(stored));
          } else {
            const fromSupabase = (session.user as any)?.last_sign_in_at as string | undefined;
            const ts = fromSupabase ? new Date(fromSupabase) : new Date();
            setLoginAt(ts);
            localStorage.setItem('loginAt', ts.toISOString());
          }
        } else {
          setLoginAt(null);
          localStorage.removeItem('loginAt');
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session) {
        const stored = localStorage.getItem('loginAt');
        if (stored) {
          setLoginAt(new Date(stored));
        } else {
          const fromSupabase = (session.user as any)?.last_sign_in_at as string | undefined;
          const ts = fromSupabase ? new Date(fromSupabase) : new Date();
          setLoginAt(ts);
          localStorage.setItem('loginAt', ts.toISOString());
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: name,
        }
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      const now = new Date();
      setLoginAt(now);
      localStorage.setItem('loginAt', now.toISOString());
    }
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setLoginAt(null);
    localStorage.removeItem('loginAt');
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading,
    loginAt,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}