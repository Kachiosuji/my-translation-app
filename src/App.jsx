import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LanguageSelector from './components/LanguageSelector';
import TextInput from './components/TextInput';
import TranslateButton from './components/TranslateButton';
import TranslationResult from './components/TranslationResult';
import HistoryLog from './components/HistoryLog';
import { Toaster, toast } from 'react-hot-toast';
import googleLanguages from './constants/googleLanguages';

export default function App() {
    const [source, setSource] = useState('en');
    const [target, setTarget] = useState('yo');
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load persisted data
    useEffect(() => {
        setHistory(JSON.parse(localStorage.getItem('history') || '[]'));
        setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
    }, []);

    // Persist changes
    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history));
    }, [history]);
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Translation handler (uses GET to avoid 400s)
    const handleTranslate = async () => {
        if (!text.trim()) {
            toast.error('Please enter text to translate.');
            return;
        }
        setLoading(true);
        try {
            const res = await axios.get(
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
            const translated = res.data.data.translations[0].translatedText;
            setResult(translated);
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

    const toggleFavorite = (entry) => {
        const exists = favorites.some((f) => f.timestamp === entry.timestamp);
        setFavorites(
            exists
                ? favorites.filter((f) => f.timestamp !== entry.timestamp)
                : [entry, ...favorites]
        );
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-6 flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                        Translator
                    </h1>

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

                    <TextInput value={text} onChange={setText} />

                    <div className="flex justify-center">
                        <TranslateButton
                            onClick={handleTranslate}
                            disabled={loading}
                            loading={loading}
                        />
                    </div>

                    <TranslationResult
                        text={result}
                        onCopy={() => toast.success('Copied!')}
                        onFavorite={() => toggleFavorite(history[0])}
                        isFavorite={favorites.some(
                            (f) => f.timestamp === history[0]?.timestamp
                        )}
                    />

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