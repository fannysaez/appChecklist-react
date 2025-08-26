import { useEffect, useRef } from 'react';
import './DeleteTask.css';

function DeleteTask({ task, onConfirm, onCancel }) {
  const confirmButtonRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      } else if (e.key === 'Enter') {
        onConfirm(task.id);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [task.id, onConfirm, onCancel]);

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) {
      onCancel();
    }
  };

  const handleConfirm = () => {
    onConfirm(task.id);
  };

  return (
    <div 
      ref={modalRef}
      className="delete-modal"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
      aria-describedby="delete-description"
    >
      <div className="delete-content">
        <div className="delete-icon">
          <span className="warning-icon">⚠️</span>
        </div>
        <div className="delete-text">
          <h3 id="delete-title" className="delete-title">
            Supprimer la tâche ?
          </h3>
          <p id="delete-description" className="delete-description">
            Voulez-vous vraiment supprimer{' '}
            <strong className="task-name">"{task.label}"</strong> ?
          </p>
          <p className="delete-warning">
            Cette action ne peut pas être annulée.
          </p>
        </div>
        <div className="delete-actions">
          <button
            ref={confirmButtonRef}
            onClick={handleConfirm}
            className="delete-button delete-button--confirm"
          >
            <span className="button-icon">🗑️</span>
            <span className="button-text">Supprimer</span>
          </button>
          <button
            onClick={onCancel}
            className="delete-button delete-button--cancel"
          >
            <span className="button-text">Annuler</span>
          </button>
        </div>
        <div className="keyboard-hint">
          <span className="hint-text">
            <kbd>Entrée</kbd> pour confirmer • <kbd>Échap</kbd> pour annuler
          </span>
        </div>
      </div>
    </div>
  );
}

export default DeleteTask;
