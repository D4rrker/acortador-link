import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;

  const country = request.headers.get('x-vercel-ip-country') || 'XX';
  const city = request.headers.get('x-vercel-ip-city') || 'Unknown';
  const ip = request.headers.get('x-forwarded-for') || 'Unknown';
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const rawReferer =
    request.headers.get('referer') || request.headers.get('referrer');
  let referer = 'Directo';

  if (rawReferer && rawReferer !== 'null') {
    try {
      const url = new URL(rawReferer);
      referer = url.hostname.replace('www.', '');
    } catch {
      referer = rawReferer;
    }
  }

  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  const deviceType = result.device.type || 'desktop';
  const browser = result.browser.name || 'Unknown';
  const os = result.os.name || 'Unknown';

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: link, error } = await supabaseAdmin
    .from('links')
    .select('id, original_url')
    .eq('short_code', slug)
    .single();

  if (error || !link) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const { error: insertError } = await supabaseAdmin.rpc(
    'register_click_event',
    {
      p_link_id: link.id,
      p_country: country,
      p_city: decodeURIComponent(city),
      p_ip_address: ip,
      p_user_agent: userAgent,
      p_device_type: deviceType,
      p_browser: browser,
      p_os: os,
      p_referrer: referer,
    }
  );

  if (insertError) {
    console.error('❌ Error registrando el clic:', insertError);
  }

  return NextResponse.redirect(new URL(link.original_url, request.url));
}
