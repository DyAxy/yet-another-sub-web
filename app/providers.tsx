import { ToastProvider } from '@/components/ToastProvider';
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class">
        {children}
        <ToastProvider />
      </NextThemesProvider>
    </NextUIProvider>
  )
}