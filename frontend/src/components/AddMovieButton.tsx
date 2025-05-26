import { useState } from 'react';
import AddMovieForm from './AddMovieForm';

export default function AddMovieButton() {
    const [showForm, setShowForm] = useState<boolean>(false);

    return (
        <div style={{ position: 'fixed', bottom: '20px', width: '100%', textAlign: 'center' }}>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Close Form' : 'Add Movie'}
            </button>

            {showForm && (
                <div style={{ marginTop: '20px' }}>
                    <AddMovieForm onClose={() => setShowForm(false)} />
                </div>
            )}
        </div>
    );
}
