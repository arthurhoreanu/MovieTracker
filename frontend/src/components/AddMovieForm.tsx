import { useState, ChangeEvent, FormEvent } from 'react';

type Movie = {
    title: string;
    year: string;
    type: string;
    platform: string;
    watched: boolean;
    imageUrl: string;
};

type AddMovieFormProps = {
    onClose: () => void;
};

export default function AddMovieForm({ onClose }: AddMovieFormProps) {
    const [movie, setMovie] = useState<Movie>({
        title: '',
        year: '',
        type: '',
        platform: '',
        watched: false,
        imageUrl: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMovie((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setMovie((prev) => ({ ...prev, year: value }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/movies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...movie,
                    year: Number(movie.year),
                    watched: false
                })
            });

            if (response.ok) {
                alert('Movie added!');
                onClose();
            } else {
                alert('Error adding movie.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Could not connect to backend.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                padding: '20px',
                border: '1px solid #333',
                background: '#fff',
                color: '#111',
                borderRadius: '8px',
                maxWidth: '400px',
                margin: '0 auto'
            }}
        >
            <h3>Add New Movie</h3>

            <label>Title:</label><br />
            <input
                name="title"
                value={movie.title}
                onChange={handleChange}
                placeholder="Title"
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px', color: '#111' }}
            /><br />

            <label>Year:</label><br />
            <input
                name="year"
                type="text"
                value={movie.year}
                onChange={handleYearChange}
                placeholder="Year"
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px', color: '#111' }}
            /><br />

            <label>Type:</label><br />
            <input
                name="type"
                value={movie.type}
                onChange={handleChange}
                placeholder="Type"
                style={{ width: '100%', padding: '8px', marginBottom: '10px', color: '#111' }}
            /><br />

            <label>Platform:</label><br />
            <input
                name="platform"
                value={movie.platform}
                onChange={handleChange}
                placeholder="Platform"
                style={{ width: '100%', padding: '8px', marginBottom: '10px', color: '#111' }}
            /><br />

            <label>Image URL:</label><br />
            <input
                name="imageUrl"
                value={movie.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                style={{ width: '100%', padding: '8px', marginBottom: '15px', color: '#111' }}
            /><br />

            <button type="submit" style={{ padding: '10px 20px', background: '#222', color: '#fff' }}>
                Submit
            </button>
        </form>
    );
}
