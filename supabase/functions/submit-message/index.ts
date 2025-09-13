import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://vinart-site.vercel.app", // <- schimbă cu domeniul tău live
];

function cors(res: Response, origin: string | null) {
  const headers = new Headers(res.headers);
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }
  headers.set("Vary", "Origin");
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(res.body, { status: res.status, headers });
}

serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") return cors(new Response(null, { status: 204 }), origin);
  if (req.method !== "POST")   return cors(new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 }), origin);

  try {
    const body = await req.json().catch(() => ({}));
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const name    = typeof body?.name    === "string" ? body.name.trim()    : null;
    const email   = typeof body?.email   === "string" ? body.email.trim()   : null;
    const source  = typeof body?.source  === "string" ? body.source.trim()  : "contact-form";

    if (!message) {
      return cors(new Response(JSON.stringify({ error: "Message is required" }), { status: 400 }), origin);
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || null;
    const userAgent = req.headers.get("user-agent") || null;

    const supabaseUrl = Deno.env.get("SUPABASE_URL");     // vine din platformă
    const serviceRole = Deno.env.get("SERVICE_ROLE_KEY"); // secretul setat de tine

    if (!supabaseUrl || !serviceRole) {
      console.error("Missing envs", { hasUrl: !!supabaseUrl, hasServiceRole: !!serviceRole });
      return cors(new Response(JSON.stringify({ error: "Server not configured" }), { status: 500 }), origin);
    }

    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    const supabase = createClient(supabaseUrl, serviceRole, { auth: { persistSession: false } });

    const { error } = await supabase.from("messages").insert({
      name, email, message, source, ip, user_agent: userAgent,
    });

    if (error) {
      console.error("DB insert error:", error);
      return cors(new Response(JSON.stringify({ error: "DB insert failed" }), { status: 500 }), origin);
    }

    return cors(new Response(JSON.stringify({ ok: true }), { status: 201 }), origin);
  } catch (e) {
    console.error("Unhandled error:", e);
    return cors(new Response(JSON.stringify({ error: "Unexpected error" }), { status: 500 }), origin);
  }
});
