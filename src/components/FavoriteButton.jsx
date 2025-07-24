// FavoriteButton.jsx – star toggle
// Props
//   • isFavorite – boolean
//   • onClick    – handler
import React from 'react';
import { Star, StarOff } from 'lucide-react';

export default function FavoriteButton({ isFavorite, onClick }) {
    return (
        <button
            onClick={onClick}
            className="ml-2 flex items-center text-yellow-500 hover:text-yellow-600"
            aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
        >
            {isFavorite ? <Star className="h-5 w-5" /> : <StarOff className="h-5 w-5" />}
        </button>
    );
}