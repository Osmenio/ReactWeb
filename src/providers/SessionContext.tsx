import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "./Session";

const LOCAL_STORAGE_KEY = "app-session";

const defaultSession: Session = {
  expiresAt: 0,
  loading: true,
};

export const SessionContext = createContext<{
  session: Session;
  setSession: (s: Session) => void;
  clearSession: () => void;
  loading: boolean;
}>({
  session: defaultSession,
  setSession: () => { },
  clearSession: () => { },
  loading: true,
});

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSessionState] = useState<Session>(defaultSession);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(`setInterval:`, session?.expiresAt, Date.now())
      if (session?.expiresAt && session.expiresAt < Date.now()) {
        console.log(`clearSession`)
        clearSession();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const now = Date.now();

        if (parsed.expiresAt && parsed.expiresAt < now) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          // console.log(`removeItem:`, parsed.expiresAt, now)
        } else {
          setSessionState(parsed);
          // console.log(`setSessionState:`, parsed)
        }
      } catch (e) {
        console.error("Erro ao fazer parse da sessão:", e);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const setSession = (newSession: Session) => {
    if (newSession) {
      const localSession = {
        ...newSession,
        // expiresAt: newSession.expiresAt > 0 ? newSession.expiresAt : Date.now() + 12 * 60 * 60 * 1000 // 12 horas
        expiresAt: newSession.expiresAt > 0 ? newSession.expiresAt : Date.now() + 10 * 60 * 1000 // 10 min
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localSession));
      setSessionState(localSession);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setSessionState(defaultSession);
    }
  };

  const clearSession = () => {
    setSessionState(defaultSession);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultSession));
  };

  return (
    <SessionContext.Provider value={{ session, setSession, clearSession, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
