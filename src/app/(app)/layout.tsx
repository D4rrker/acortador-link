import Navbar from '@/src/components/navbar/navbar';
import '@/src/app/globals.css';
import { createClient } from '@/src/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Toaster } from '@/src/components/ui/sonner';
import { TooltipProvider } from '@/src/components/ui/tooltip';
import { UserProvider } from '@/src/context/UserContext';
import { getUserBasicData } from '@/src/lib/queries';
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
      <div className="flex min-h-screen flex-col md:grid md:h-screen md:grid-cols-[auto_1fr]">
        <Navbar />
        <main className="flex min-h-screen flex-1 flex-col overflow-y-auto px-6 py-8 md:px-12 md:pt-10">
          <TooltipProvider>{children}</TooltipProvider>
        </main>
        <Toaster />
      </div>
    </UserProvider>
  );
}
