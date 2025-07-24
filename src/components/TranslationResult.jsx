// TranslationResult.jsx – shows latest output + copy/fav buttons
// Props
//   • text        – translated string
//   • onCopy      – handler
//   • onFavorite  – handler
//   • isFavorite  – boolean
import React from 'react';
import CopyButton from './CopyButton';
import FavoriteButton from './FavoriteButton';

export default function TranslationResult({ text, onFavorite, isFavorite, onCopy }) {
    if (!text) return null; // render nothing until we have output

    return (
        <div className="mt-4 p-4 border rounded bg-gray-50">
            <p className="text-gray-900">{text}</p>
            <div className="mt-2 flex items-center">
                <CopyButton text={text} onCopy={onCopy} />
                <FavoriteButton isFavorite={isFavorite} onClick={onFavorite} />
            </div>
        </div>
    );
}