import { useState } from 'react';
import './AddTask.css';

function AddTask({ onAdd }) {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedValue = value.trim();
        if (!trimmedValue) return;
        setIsLoading(true);
        setTimeout(() => {
            onAdd(trimmedValue);
            setValue('');
            setIsLoading(false);
        }, 200);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-task-form">
            <div className="input-group">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Liste des tâches"
                    className="add-task-input"
                    disabled={isLoading}
                    maxLength={100}
                />
                <button
                    type="submit"
                    className={`add-task-button ${isLoading ? 'add-task-button--loading' : ''}`}
                    disabled={!value.trim() || isLoading}
                >
                    {isLoading ? (
                        <div className="spinner" />
                    ) : (
                        <>
                            <span className="button-icon">+</span>
                            <span className="button-text button-text--white">Ajouter</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

export default AddTask;
