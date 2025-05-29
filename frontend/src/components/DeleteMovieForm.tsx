import { useEffect, useState } from 'react';
import { Movie } from '@/types/Movie';

export default function DeleteMovieForm() {
    const [search, setSearch] = useState('');
    const [matches, setMatches] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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
        setSearch(`${movie.title} (${movie.year})`);
        setMatches([]);
    };

    const handleDelete = () => {
        if (!selectedMovie) return;

        fetch(`http://localhost:8080/movie/${encodeURIComponent(selectedMovie.title)}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (res.ok) {
                    alert(`Movie "${selectedMovie.title}" deleted!`);
                    setSelectedMovie(null);
                    setSearch('');
                } else {
                    alert('Delete failed');
                }
            })
            .catch((err) => {
                console.error('Delete error:', err);
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
                    <p className="mb-2 text-sm text-muted-foreground">Select the movie to delete:</p>
                    <ul className="space-y-2 max-h-48 overflow-y-auto border p-2">
                        {matches.map((movie) => (
                            <li
                                key={movie.title}
                                onClick={() => handleSelectMovie(movie)}
                                className="cursor-pointer hover:font-bold hover:text-red-500 px-2 py-1 transition"
                            >
                                🗑️ {movie.title} ({movie.year})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedMovie && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleDelete}
                        className="px-6 py-3 border-2 border-red-500 bg-red-500 text-white font-semibold transition-all shadow-md
                                   hover:bg-white hover:text-black hover:border-white"
                        style={{ borderRadius: '0' }}
                    >
                        Delete Movie
                    </button>
                </div>
            )}
        </div>
    );
}
