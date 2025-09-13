const FUNCTION_URL = "https://ymcajwntcsraqohiuakd.functions.supabase.co/submit-message";

export async function submitMessage(payload: {
  name?: string;
  email?: string;
  message: string;
  source?: string;
}) {
  const res = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // JWT nu e necesar
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to send");
  return res.json();
}
