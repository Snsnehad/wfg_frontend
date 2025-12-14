import { supabase } from "../lib/supabase";
import { useState } from "react";

export default function EditModal({ close, setData }: any) {
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function save() {
    if (!email || !value) {
      alert("Email and value are required");
      return;
    }

    setLoading(true);

    const { data: existing } = await supabase
      .from("chart_updates")
      .select("value")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      const ok = confirm(
        `Your previous value was ${existing.value}. Overwrite it?`
      );
      if (!ok) {
        setLoading(false);
        return;
      }
    }

    await supabase.from("chart_updates").upsert({
      email,
      value: Number(value),
    });

    setData([{ label: "Custom", calls: Number(value) }]);
    setLoading(false);
    close();
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={close}
    >
      <div 
        className="bg-card p-6 sm:p-8 rounded-xl w-full max-w-md border border-primary/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-accent">
          Update Chart Data
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm opacity-80 mb-2">
              Your Email
            </label>
            <input
              type="email"
              className="w-full p-3 bg-bg border border-primary/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm opacity-80 mb-2">
              New Call Count
            </label>
            <input
              type="number"
              className="w-full p-3 bg-bg border border-primary/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
              placeholder="150"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={close}
            className="px-5 py-2.5 rounded-lg border border-primary/30 hover:bg-primary/10 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}