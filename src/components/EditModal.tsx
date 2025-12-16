import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function EditModal({ close, setData }: any) {
  const [email, setEmail] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [previousData, setPreviousData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      setPreviousData(null);
      setValues({});
      return;
    }

    async function fetchPrevious() {
      const { data } = await supabase
        .from("chart_updates")
        .select("data")
        .eq("email", email)
        .maybeSingle();

      if (data?.data) {
        setPreviousData(data.data);

        // Prefill inputs
        const mapped: Record<string, string> = {};
        data.data.forEach((item: any) => {
          mapped[item.label] = String(item.calls);
        });
        setValues(mapped);
      } else {
        setPreviousData(null);
        setValues({});
      }
    }

    fetchPrevious();
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
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 mb-4 bg-bg border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {previousData && (
          <p className="text-sm text-accent mb-3">
            Previous values loaded for this email
          </p>
        )}

        {/* Day-wise inputs */}
        <div className="space-y-3">
          {days.map((day) => (
            <div key={day} className="flex items-center justify-between">
              <label className="w-12">{day}</label>
              <input
                type="number"
                className="flex-1 ml-3 p-2 bg-bg border rounded"
                placeholder="Calls"
                value={values[day] ?? ""}
                onChange={(e) => handleChange(day, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={close}>Cancel</button>
          <button
            onClick={save}
            disabled={loading}
            className="bg-primary px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
