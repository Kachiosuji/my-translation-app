// CopyButton.jsx – uses Clipboard API
// Props
//   • text   – string to copy
//   • onCopy – optional callback (toast)
import React from 'react';
import { Copy } from 'lucide-react';

export default function CopyButton({ text, onCopy }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        onCopy?.();
    };

    return (
        <button
            onClick={handleCopy}
            className="ml-2 flex items-center text-sm text-gray-600 hover:text-gray-800"
            aria-label="Copy translation"
        >
            <Copy className="h-4 w-4 mr-1" /> Copy
        </button>
    );
}