import React from 'react';

// Ensure we use the correct property from googleLanguages (language) for value & key
export default function LanguageSelector({ label, value, options, onChange }) {
    return (
        <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">{label}</label>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {options.map((lang) => {
                    // googleLanguages entries use 'language' as the ISO code key
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
