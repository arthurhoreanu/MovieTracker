import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Movie } from '@/types/Movie';

export default function MoviePosterMarquee() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/movie')
            .then((res) => res.json())
            .then((data: Movie[]) => setMovies(data))
            .catch((err) => console.error('Failed to load movie posters', err));
    }, []);

    return (
        <div className="w-full mt-10 px-25">
            <Marquee speed={60} gradient={false} pauseOnHover>
                {movies.map((movie) => (
                    <img
                        key={movie.title}
                        src={movie.imageUrl}
                        alt={movie.title}
                        className="w-40 h-60 object-cover mx-6 shadow-md rounded-lg"
                    />
                ))}
            </Marquee>
        </div>
    );
}
