// =====================
// src/App.jsx – brains of the app
// =====================
//  * Owns all state (text, history, favourites, loading)
//  * Talks to Google Translation API
//  * Persists history/favourites in localStorage
//  * Delegates UI rendering to child components in /src/components
// ---------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LanguageSelector from './components/LanguageSelector';
import TextInput from './components/TextInput';
import TranslateButton from './components/TranslateButton';
import TranslationResult from './components/TranslationResult';
import HistoryLog from './components/HistoryLog';
import { Toaster, toast } from 'react-hot-toast';
import googleLanguages from './constants/googleLanguages';

// Helper — localStorage read with fallback
const readLS = (key, fallback) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
        return fallback;
    }
};

export default function App() {
    // ------------------------ State hooks ------------------------
    const [source, setSource] = useState('en');     // from‑language (ISO‑639‑1)
    const [target, setTarget] = useState('yo');     // to‑language
    const [text, setText] = useState('');     // textarea input
    const [result, setResult] = useState('');     // translation output
    const [history, setHistory] = useState(() => readLS('history', []));
    const [favorites, setFavorites] = useState(() => readLS('favorites', []));
    const [loading, setLoading] = useState(false);

    // Persist history / favourites on every change
    useEffect(() => localStorage.setItem('history', JSON.stringify(history)), [history]);
    useEffect(() => localStorage.setItem('favorites', JSON.stringify(favorites)), [favorites]);

    // ------------------------ Handlers -------------------------
    const handleTranslate = async () => {
        if (!text.trim()) {
            toast.error('Please enter text to translate.');
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.get(
                'https://translation.googleapis.com/language/translate/v2',
                {
                    params: {
                        key: import.meta.env.VITE_GOOGLE_API_KEY,
                        q: text,
                        source,
                        target,
                    },
                }
            );

            const translated = data.data.translations[0].translatedText;
            setResult(translated);

            // Create a history entry & prepend to array
            const entry = {
                source,
                target,
                input: text,
                output: translated,
                timestamp: Date.now(),
            };
            setHistory([entry, ...history]);
        } catch (err) {
            console.error(err);
            toast.error('Translation failed. Check your API key & parameters.');
        } finally {
            setLoading(false);
        }
    };

    // Toggle star in favourites list
    const toggleFavorite = (entry) => {
        const exists = favorites.some((f) => f.timestamp === entry.timestamp);
        setFavorites(
            exists
                ? favorites.filter((f) => f.timestamp !== entry.timestamp)
                : [entry, ...favorites]
        );
    };

    // ------------------------ Render ---------------------------
    return (
        <>
            {/* Toast portal */}
            <Toaster position="top-right" />

            {/* Gradient page background */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-6 flex items-center justify-center">
                {/* Card wrapper */}
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                        Translator
                    </h1>

                    {/* Language pickers – responsive 2‑column on md+ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <LanguageSelector
                            label="From"
                            value={source}
                            onChange={setSource}
                            options={googleLanguages}
                        />
                        <LanguageSelector
                            label="To"
                            value={target}
                            onChange={setTarget}
                            options={googleLanguages}
                        />
                    </div>

                    {/* Textarea */}
                    <TextInput value={text} onChange={setText} />

                    {/* Translate button */}
                    <div className="flex justify-center">
                        <TranslateButton
                            onClick={handleTranslate}
                            disabled={loading}
                            loading={loading}
                        />
                    </div>

                    {/* Latest result */}
                    <TranslationResult
                        text={result}
                        onCopy={() => toast.success('Copied!')}
                        onFavorite={() => result && toggleFavorite(history[0])}
                        isFavorite={result && favorites.some((f) => f.timestamp === history[0]?.timestamp)}
                    />

                    {/* Scrollable history list */}
                    <HistoryLog
                        history={history}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                        onCopy={() => toast.success('Copied!')}
                    />
                </div>
            </div>
        </>
    );
}
