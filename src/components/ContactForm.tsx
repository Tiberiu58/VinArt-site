import { useState } from "react";
import { submitMessage } from "../lib/api";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") || "").toString().trim() || undefined;
    const email = (formData.get("email") || "").toString().trim() || undefined;
    const message = (formData.get("message") || "").toString().trim();

    try {
      await submitMessage({ name, email, message, source: "contact-page" });
      setStatus("ok");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-3">
      <input name="name" placeholder="Nume (opțional)" className="w-full border rounded p-2" />
      <input name="email" type="email" placeholder="Email (opțional)" className="w-full border rounded p-2" />
      <textarea name="message" required placeholder="Mesajul tău" className="w-full border rounded p-2 h-32" />
      <button disabled={status === "loading"} className="rounded px-4 py-2 border">
        {status === "loading" ? "Trimit..." : "Trimite"}
      </button>
      {status === "ok" && <p className="text-green-600">Trimis! 🙌</p>}
      {status === "error" && <p className="text-red-600">Eroare: {error}</p>}
    </form>
  );
}
