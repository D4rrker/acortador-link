import Navbar from '@/src/components/navbar/Navbar';
import '@/src/app/globals.css';
import { createClient } from '@/src/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Toaster } from '@/src/components/ui/sonner';
import { TooltipProvider } from '@/src/components/ui/tooltip';
import { UserProvider } from '@/src/context/UserContext';
import { getUserBasicData } from '@/src/lib/queries';
import { ThemeProvider } from '@/src/components/theme-provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mis Enlaces - LinkPro',
  description: 'Panel de control del usuario',
};

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const initialUserData = await getUserBasicData();

  return (
    <UserProvider initialData={initialUserData}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="grid h-screen grid-cols-[auto_1fr]">
          <Navbar />
          <main className="overflow-y-auto px-12 pt-10">
            <TooltipProvider>{children}</TooltipProvider>
          </main>
          <Toaster />
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}
