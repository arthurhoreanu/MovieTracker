import { useEffect, useState } from 'react';
import { Movie } from '@/types/Movie';

export default function UpdateMovieForm() {
    const [search, setSearch] = useState('');
    const [matches, setMatches] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [formData, setFormData] = useState<Partial<Movie>>({});

    useEffect(() => {
        if (search.length < 2) {
            setMatches([]);
            return;
        }

        fetch(`http://localhost:8080/movie?search=${encodeURIComponent(search)}`)
            .then(res => res.json())
            .then((data: Movie[]) => setMatches(data))
            .catch(err => console.error('Search error', err));
    }, [search]);

    const handleSelectMovie = (movie: Movie) => {
        setSelectedMovie(movie);
        setFormData({});
        setSearch(`${movie.title} (${movie.year})`);
        setMatches([]);
    };

    const handleUpdate = () => {
        if (!selectedMovie) return;

        const updatedMovie: Movie = {
            ...selectedMovie,
            ...formData,
        };

        fetch(`http://localhost:8080/movie/update/${encodeURIComponent(selectedMovie.title)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMovie),
        })
            .then((res) => {
                if (res.ok) alert('Movie updated!');
                else alert('Update failed');
            })
            .catch((err) => {
                console.error('Update error:', err);
                alert('Something went wrong');
            });
    };

    return (
        <div className="bg-muted p-6 shadow-md w-full max-w-xl mx-auto">
            <input
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedMovie(null);
                }}
                placeholder="Search by title"
                className="w-full mb-4 p-2 border"
            />

            {matches.length > 0 && !selectedMovie && (
                <div className="mb-4">
                    <p className="mb-2 text-sm text-muted-foreground">Select the movie to update:</p>
                    <ul className="space-y-2 max-h-48 overflow-y-auto border p-2">
                        {matches.map((movie) => (
                            <li
                                key={movie.title}
                                onClick={() => handleSelectMovie(movie)}
                                className="cursor-pointer hover:font-bold hover:text-primary/80 px-2 py-1 transition"
                            >
                                🎬 {movie.title} ({movie.year})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedMovie && (
                <div className="space-y-4">
                    {['year', 'type', 'platform', 'imageUrl'].map((key) => (
                        <div key={key}>
                            <label className="block mb-1 capitalize">{key}</label>
                            <input
                                type={key === 'year' ? 'number' : 'text'}
                                placeholder={`Keep same: ${selectedMovie[key as keyof Movie]}`}
                                value={
                                    formData[key as keyof Movie] === undefined
                                        ? ''
                                        : String(formData[key as keyof Movie])
                                }
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        [key]: key === 'year' ? parseInt(e.target.value) || '' : e.target.value,
                                    }))
                                }
                                className="w-full p-2 border"
                            />
                        </div>
                    ))}

                    {/* Buton centrat, fără colțuri, hover cu contur alb */}
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleUpdate}
                            className="px-6 py-3 border-2 border-primary bg-primary text-white font-semibold transition-all shadow-md
                                       hover:bg-white hover:text-black hover:border-white"
                            style={{ borderRadius: '0' }}
                        >
                            Update Movie
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
