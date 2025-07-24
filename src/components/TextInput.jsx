// TextInput.jsx – source-text textarea
// Props
//   • value    – bound string
//   • onChange – callback(newText)
//
// Kept dumb; styling is via Tailwind.
import React from 'react';

export default function TextInput({ value, onChange }) {
    return (
        <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            rows={4}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter text to translate..."
        />
    );
}
