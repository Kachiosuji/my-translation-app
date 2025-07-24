// HistoryLog.jsx – scrollable list of past translations
// Props
//   • history          – array of {input, output, timestamp, …}
//   • favorites        – array of favourite entries
//   • onToggleFavorite – handler(entry)
//   • onCopy           – handler(entry)
import React from 'react';
import CopyButton from './CopyButton';
import FavoriteButton from './FavoriteButton';

export default function HistoryLog({ history, favorites, onToggleFavorite, onCopy }) {
    if (!history.length) return null;

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">History</h2>
            <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                {history.map((entry) => {
                    const isFav = favorites.some((f) => f.timestamp === entry.timestamp);
                    return (
                        <li key={entry.timestamp} className="p-2 border rounded bg-white shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-700">{entry.input}</p>
                                    <p className="text-sm text-blue-800 mt-1">{entry.output}</p>
                                </div>
                                <div className="flex items-center">
                                    <CopyButton text={entry.output} onCopy={() => onCopy(entry)} />
                                    <FavoriteButton isFavorite={isFav} onClick={() => onToggleFavorite(entry)} />
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}