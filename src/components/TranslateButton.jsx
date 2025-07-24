import React from 'react';
import { Loader2 } from 'lucide-react';

export default function TranslateButton({ onClick, disabled, loading }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`mt-2 px-4 py-2 rounded text-white ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : disabled
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                } flex items-center justify-center`}
        >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Translate'}
        </button>
    );
}