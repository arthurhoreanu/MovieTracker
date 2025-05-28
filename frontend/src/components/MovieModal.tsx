import { Movie } from '@/types/Movie';
import { useEffect, useState } from 'react';

type Props = {
    movie: Movie;
    onClose: () => void;
    onToggleWatched: (title: string) => void;
};

export default function MovieModal({ movie, onClose, onToggleWatched }: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(2px)',
            }}
        >
        <div
                className={`
          bg-neutral-900 text-white rounded-lg shadow-xl
          w-full max-w-2xl flex overflow-hidden relative
          transform transition-all duration-300
          ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-xl text-gray-400 hover:text-white transition"
                >
                    ×
                </button>

                <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-1/3 object-cover max-h-[480px]"
                />

                <div className="p-5 w-2/3 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                        <p className="text-sm text-gray-400 mb-1">Year: {movie.year}</p>
                        <p className="text-sm text-gray-400 mb-1">Type: {movie.type}</p>
                        <p className="text-sm text-gray-400 mb-4">Platform: {movie.platform}</p>
                    </div>

                    <button
                        onClick={() => onToggleWatched(movie.title)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                            movie.watched
                                ? 'bg-green-600 hover:bg-green-500 text-white'
                                : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                        }`}
                    >
                        {movie.watched ? 'Watched' : 'Mark as Watched'}
                    </button>
                </div>
            </div>
        </div>
    );
}
