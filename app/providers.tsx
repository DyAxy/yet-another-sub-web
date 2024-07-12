'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect } from 'react';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class">
        <ThemeProvider />
        <ToastProvider />
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}

const ThemeProvider = () => {
  const { theme, systemTheme, setTheme } = useTheme();

  useEffect(() => {
    if (theme !== 'system' && systemTheme === theme) {
      setTheme('system');
    }
  }, [theme, systemTheme, setTheme]);

  return null;
}
const ToastProvider = () => {
  const { theme } = useTheme();
  return (
    <Toaster richColors position="top-center" theme={theme as "light" | "dark" | "system"} />
  );
}