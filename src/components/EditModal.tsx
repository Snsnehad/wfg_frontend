import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function EditModal({ close, setData }: any) {
  const [email, setEmail] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [previousData, setPreviousData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  useEffect(() => {
    if (!email) {
      setPreviousData(null);
      setValues({});
      return;
    }

    localStorage.setItem("user_email", email);

    async function fetchPrevious() {
      setFetching(true);
      const { data } = await supabase
        .from("chart_updates")
        .select("data")
        .eq("email", email)
        .maybeSingle();

      if (data?.data) {
        setPreviousData(data.data);

        const mapped: Record<string, string> = {};
        data.data.forEach((item: any) => {
          mapped[item.label] = String(item.calls);
        });
        setValues(mapped);
      } else {
        setPreviousData(null);
        setValues({});
      }
      setFetching(false);
    }

    const timer = setTimeout(fetchPrevious, 500);
    return () => clearTimeout(timer);
  }, [email]);

  function handleChange(day: string, value: string) {
    setValues((prev) => ({
      ...prev,
      [day]: value,
    }));
  }

  async function save() {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);

    if (previousData) {
      const ok = confirm(
        "Previous values found for this email. Do you want to overwrite them?"
      );
      if (!ok) {
        setLoading(false);
        return;
      }
    }

    const updatedData = days.map((day) => ({
      label: day,
      calls: Number(values[day] || 0),
    }));

    await supabase.from("chart_updates").upsert({
      email,
      data: updatedData,
    });

    setData(updatedData);
    setLoading(false);
    close();
  }

  const hasValues = days.some(day => values[day]);
  const canSave = email && hasValues && !fetching;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={close}
    >
      <div
        className="bg-card p-6 sm:p-8 rounded-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4 text-accent">
          Update Weekly Call Volume
        </h3>

        {/* Email input */}
        <div className="mb-4">
          <label className="block text-sm mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 bg-bg border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          {fetching && (
            <p className="text-xs text-blue-400 mt-1.5 flex items-center gap-1">
              <span className="animate-pulse">⏳</span> Loading your data...
            </p>
          )}
          {previousData && !fetching && (
            <p className="text-xs text-green-400 mt-1.5 flex items-center gap-1">
              <span>✓</span> Previous values loaded - edit as needed
            </p>
          )}
          {!email && (
            <p className="text-xs text-gray-400 mt-1.5">
              Enter your email to load previous data
            </p>
          )}
        </div>

        <div className="space-y-3">
          {days.map((day) => (
            <div key={day} className="flex items-center justify-between">
              <label className="w-12 text-sm">{day}</label>
              <input
                type="number"
                className="flex-1 ml-3 p-2 bg-bg border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="0"
                value={values[day] ?? ""}
                onChange={(e) => handleChange(day, e.target.value)}
                disabled={!email || fetching || loading}
                min="0"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={close} 
            className="px-4 py-2 rounded hover:bg-bg transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={!canSave || loading}
            className="bg-primary px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}