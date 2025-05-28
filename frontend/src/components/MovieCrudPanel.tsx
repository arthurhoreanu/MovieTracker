import { useState } from 'react';

type Movie = {
    title: string;
    year: number;
    type: string;
    platform: string;
    imageUrl: string;
};

export default function MovieCrudPanel() {
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [addMovie, setAddMovie] = useState<Movie>({
        title: '',
        year: 0,
        type: '',
        platform: '',
        imageUrl: '',
    });

    const [deleteTitle, setDeleteTitle] = useState('');

    const handleAdd = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/movies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...addMovie, watched: false }),
            });

            if (res.ok) {
                alert('Movie added successfully');
                setAddMovie({ title: '', year: 0, type: '', platform: '', imageUrl: '' });
            } else {
                alert('Failed to add movie');
            }
        } catch (err) {
            console.error(err);
            alert('Error connecting to backend');
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:8080/movie/${encodeURIComponent(deleteTitle)}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                alert('Movie deleted successfully');
                setDeleteTitle('');
            } else {
                alert('Movie not found');
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting movie');
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-10 space-y-6">
            {/* ADD MOVIE */}
            <div className="bg-neutral-800 p-4 rounded-xl shadow">
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="w-full text-left text-lg font-semibold text-white flex justify-between items-center"
                >
                    Add Movie
                    <span>{showAdd ? '▲' : '▼'}</span>
                </button>

                {showAdd && (
                    <div className="mt-4 space-y-3">
                        <input
                            placeholder="Title"
                            className="w-full p-2 rounded bg-neutral-700 text-white"
                            value={addMovie.title}
                            onChange={(e) => setAddMovie({ ...addMovie, title: e.target.value })}
                        />
                        <input
                            placeholder="Year"
                            className="w-full p-2 rounded bg-neutral-700 text-white"
                            value={addMovie.year}
                            onChange={(e) => setAddMovie({ ...addMovie, year: parseInt(e.target.value) || 0 })}
                        />
                        <input
                            placeholder="Type"
                            className="w-full p-2 rounded bg-neutral-700 text-white"
                            value={addMovie.type}
                            onChange={(e) => setAddMovie({ ...addMovie, type: e.target.value })}
                        />
                        <input
                            placeholder="Platform"
                            className="w-full p-2 rounded bg-neutral-700 text-white"
                            value={addMovie.platform}
                            onChange={(e) => setAddMovie({ ...addMovie, platform: e.target.value })}
                        />
                        <input
                            placeholder="Image URL"
                            className="w-full p-2 rounded bg-neutral-700 text-white"
                            value={addMovie.imageUrl}
                            onChange={(e) => setAddMovie({ ...addMovie, imageUrl: e.target.value })}
                        />

                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 mt-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>

            {/* DELETE MOVIE */}
            <div className="bg-neutral-800 p-4 rounded-xl shadow">
                <button
                    onClick={() => setShowDelete(!showDelete)}
                    className="w-full text-left text-lg font-semibold text-white flex justify-between items-center"
                >
                    Delete Movie
                    <span>{showDelete ? '▲' : '▼'}</span>
                </button>

                {showDelete && (
                    <div className="mt-4 space-y-3">
                        <input
                            placeholder="Movie Title to Delete"
                            className="w-full p-2 rounded bg-neutral-700 text-white"
                            value={deleteTitle}
                            onChange={(e) => setDeleteTitle(e.target.value)}
                        />

                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 mt-2 bg-red-600 hover:bg-red-500 text-white rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
