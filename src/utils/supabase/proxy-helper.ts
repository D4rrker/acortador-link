import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Este helper se encarga de actualizar la sesión de Supabase en cada request,
 * y de proteger las rutas privadas y públicas de autenticación.
 * - Si el usuario no está logueado y accede a una ruta protegida, lo redirige al login.
 * - Si el usuario está logueado y accede a una ruta pública de auth, lo redirige al dashboard.
 * @params request - El request de Next.js que se recibe en el middleware.
 * @returns Una respuesta de Next.js que puede ser una redirección o la respuesta original con las cookies actualizadas.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  const protectedPaths = ['/dashboard'];

  const isProtectedRoute = protectedPaths.some((protectedPath) =>
    path.startsWith(protectedPath)
  );

  const publicAuthPaths = ['/login', '/register', '/verify-email'];

  const isPublicAuthRoute = publicAuthPaths.some((publicPath) =>
    path.startsWith(publicPath)
  );

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (user && isPublicAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
