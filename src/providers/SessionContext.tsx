import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "./Session";

const LOCAL_STORAGE_KEY = "app-session";

const defaultSession: Session = {
  // expiresAt: Date.now() + 2 * 60 * 60 * 1000, // expira em 2 horas
  // expiresAt: Date.now() + 35 * 1000, // expira em 2 horas
  expiresAt: 0
};

export const SessionContext = createContext<{
  session: Session;
  setSession: (s: Session) => void;
  clearSession: () => void;
}>({
  session: defaultSession,
  setSession: () => { },
  clearSession: () => { },
});

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSessionState] = useState<Session>(defaultSession);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const now = Date.now();

        if (parsed.expiresAt && parsed.expiresAt < now) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        } else {
          setSessionState(parsed);
        }
      } catch (e) {
        console.error("Erro ao fazer parse da sessão:", e);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  const setSession = (newSession: Session) => {
    if (newSession) {
      const localSession = {
        ...newSession,
        expiresAt: newSession.expiresAt > 0 ? newSession.expiresAt : Date.now() + 2 * 60 * 1000 // 2 min
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localSession));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    setSessionState(newSession);
  };

  const clearSession = () => {
    setSessionState(defaultSession);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultSession));
  };

  return (
    <SessionContext.Provider value={{ session, setSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
