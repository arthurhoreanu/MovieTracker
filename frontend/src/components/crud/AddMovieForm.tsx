import { useEffect, useState } from 'react';
import { Movie } from '@/types/Movie';

export default function AddMovieForm() {
    const [formData, setFormData] = useState<Partial<Movie>>({});
    const [titleAvailable, setTitleAvailable] = useState<boolean | null>(null);
    const [platformSearch, setPlatformSearch] = useState('');
    const [platformSuggestions, setPlatformSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const checkTitle = async () => {
            if (!formData.title || formData.title.length < 2) {
                setTitleAvailable(null);
                return;
            }

            try {
                const res = await fetch(`http://localhost:8080/movie?search=${encodeURIComponent(formData.title)}`);
                const data: Movie[] = await res.json();
                const exists = data.some((movie) => movie.title.toLowerCase() === formData.title!.toLowerCase());
                setTitleAvailable(!exists);
            } catch (err) {
                console.error('Title check error:', err);
                setTitleAvailable(null);
            }
        };

        const delay = setTimeout(checkTitle, 400);
        return () => clearTimeout(delay);
    }, [formData.title]);

    useEffect(() => {
        if (!platformSearch || platformSearch.length < 1) {
            setPlatformSuggestions([]);
            return;
        }

        fetch(`http://localhost:8080/movie`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
                return res.json();
            })
            .then((movies: Movie[]) => {
                const allPlatforms = Array.from(
                    new Set(
                        movies
                            .map(movie => movie.platform?.trim())
                            .filter(Boolean) as string[]
                    )
                );

                const filtered = allPlatforms.filter(p =>
                    p.toLowerCase().includes(platformSearch.toLowerCase())
                );

                setPlatformSuggestions(filtered);
            })
            .catch(err => {
                console.error('Platform search error:', err);
                setPlatformSuggestions([]);
            });
    }, [platformSearch]);


    const handleAdd = () => {
        if (!formData.title || !formData.year) {
            alert('Title and year are required.');
            return;
        }

        fetch('http://localhost:8080/movie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (res.ok) {
                    alert('Movie added!');
                    setFormData({});
                    setPlatformSuggestions([]);
                    setPlatformSearch('');
                    setTitleAvailable(null);
                } else {
                    alert('Failed to add movie');
                }
            })
            .catch((err) => {
                console.error('Add error:', err);
                alert('Something went wrong');
            });
    };

    return (
        <div className="bg-muted p-6 shadow-md w-full max-w-xl mx-auto">
            <div className="space-y-4">

                <div>
                    <label className="block mb-1 capitalize">Title</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => {
                                setFormData((prev) => ({ ...prev, title: e.target.value }));
                            }}
                            className="w-full p-2 border pr-10"
                        />
                        {titleAvailable === true && (
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600">✅</span>
                        )}
                        {titleAvailable === false && (
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-600">❌</span>
                        )}
                    </div>
                    {titleAvailable === true && (
                        <p className="text-sm text-green-600 mt-1">Title is available</p>
                    )}
                    {titleAvailable === false && (
                        <p className="text-sm text-red-600 mt-1">Title already exists</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 capitalize">Year</label>
                    <input
                        type="number"
                        value={formData.year || ''}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                year: isNaN(parseInt(e.target.value)) ? undefined : parseInt(e.target.value),
                            }))
                        }
                        className="w-full p-2 border"
                    />
                </div>

                <div>
                    <label className="block mb-1 capitalize">Type</label>
                    <input
                        type="text"
                        value={formData.type || ''}
                        onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                        className="w-full p-2 border"
                    />
                </div>

                <div>
                    <label className="block mb-1 capitalize">Platform</label>
                    <input
                        type="text"
                        value={formData.platform || ''}
                        onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({ ...prev, platform: val }));
                            setPlatformSearch(val);
                        }}
                        className="w-full p-2 border"
                    />

                    {(platformSuggestions.length > 0 ||
                        (platformSearch && !platformSuggestions.some(p => p.toLowerCase() === platformSearch.toLowerCase()))
                    ) && (
                        <ul className="border p-2 mt-1 max-h-40 overflow-y-auto">
                            {platformSuggestions.map((p) => (
                                <li
                                    key={p}
                                    className="cursor-pointer hover:font-bold hover:text-blue-600 px-2 py-1 flex items-center gap-2"
                                    onClick={() => {
                                        setFormData((prev) => ({ ...prev, platform: p }));
                                        setPlatformSuggestions([]);
                                        setPlatformSearch('');
                                    }}
                                >
                                    <span>📺</span> {p}
                                </li>
                            ))}


                            {platformSearch && !platformSuggestions.some(p => p.toLowerCase() === platformSearch.toLowerCase()) && (
                                <li
                                    className="cursor-pointer hover:font-bold hover:text-blue-600 px-2 py-1 flex items-center gap-2"
                                    onClick={() => {
                                        setFormData((prev) => ({ ...prev, platform: platformSearch }));
                                        setPlatformSuggestions([]);
                                        setPlatformSearch('');
                                    }}
                                >
                                    <span>🆕</span> Didn't find the platform? Add it!
                                </li>
                            )}
                        </ul>
                    )}
                </div>

                <div>
                    <label className="block mb-1 capitalize">Image URL</label>
                    <input
                        type="text"
                        value={formData.imageUrl || ''}
                        onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                        className="w-full p-2 border"
                    />
                </div>

                <div className="flex justify-center mt-10">
                    <button
                        onClick={handleAdd}
                        className="px-6 py-3 border-2 border-primary bg-primary text-white font-semibold transition-all shadow-md hover:bg-white hover:text-black hover:border-white"
                        style={{ borderRadius: '0' }}
                    >
                        Add Movie
                    </button>
                </div>
            </div>
        </div>
    );
}
