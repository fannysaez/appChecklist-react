import { useState, useRef, useEffect } from 'react';
import './EditTask.css';

function EditTask({ initialValue, onSave, onCancel }) {
  const [value, setValue] = useState(initialValue || '');
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSave(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form className="edit-task-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="edit-task-input"
        maxLength={100}
        disabled={isSaving}
      />
      <div className="edit-task-actions">
        <button type="submit" className="edit-task-button" disabled={!value.trim() || isSaving}>
          {isSaving ? 'Enregistrement...' : 'Valider'}
        </button>
        <button type="button" className="edit-task-button edit-task-button--cancel" onClick={onCancel} disabled={isSaving}>
          Annuler
        </button>
      </div>
      <div className="character-count">
        <span className={`count ${value.length > 80 ? 'count--warning' : ''}`}>{value.length}/100</span>
      </div>
    </form>
  );
}

export default EditTask;
