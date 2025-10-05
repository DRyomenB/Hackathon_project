import { useState } from "react";

export default function LifeSim() {
  const [character, setCharacter] = useState(null);
  const [form, setForm] = useState({
    name: "",
    gender: "",
    starting_location: "",
    nationality: "",
    ethnicity: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/generate_character", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setCharacter(data);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        {Object.keys(form).map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="border p-1"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2">Generate</button>
      </form>

      {character && (
        <div className="mt-4 border p-2">
          {Object.entries(character).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}</p>
          ))}
        </div>
      )}
    </div>
  );
}
