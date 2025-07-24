// ----------------------------------------------------------
// LanguageSelector.jsx   (stateless “lego brick” component)
// ----------------------------------------------------------
// Props
//   • label     – text shown above the <select>
//   • value     – current ISO code (e.g. "en")
//   • options   – [{ code:"en", name:"English" }, …]
//   • onChange  – callback(newCode)
//
// NOTE: We keep this component totally dumb—no local state.
//       Parent (App.jsx) owns the selected value.
// ----------------------------------------------------------
import React from 'react';

export default function LanguageSelector({ label, value, options, onChange }) {
    return (
        <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">{label}</label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {options.map((lang) => {
                    // Our script normalised the key to `code`, but handle
                    // Google’s default `language` field just in case.
                    const code = lang.code || lang.language;
                    const name = lang.name;
                    return (
                        <option key={code} value={code}>
                            {name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
