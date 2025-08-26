
import EditTask from '../EditTask/EditTask';

function TaskItem({ task, isEditing, onToggle, onEdit, onStartEdit, onCancelEdit, onDelete }) {
    return (
        <li className="TaskItem">
            <label className="TaskItem-label">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onToggle(task.id)}
                />
                {isEditing ? (
                    <EditTask
                        initialValue={task.label}
                        onSave={(newLabel) => onEdit(task.id, newLabel)}
                        onCancel={onCancelEdit}
                    />
                ) : (
                    <span className={task.done ? "TaskItem-text done" : "TaskItem-text"}>{task.label}</span>
                )}
            </label>
            <div className="TaskItem-actions">
                {!isEditing && (
                    <>
                        <button className="TaskItem-btn" onClick={() => onStartEdit(task.id)}>Éditer</button>
                        <button className="TaskItem-btn TaskItem-btn--danger" onClick={() => onDelete(task)}>Supprimer</button>
                    </>
                )}
            </div>
        </li>
    );
}

export default TaskItem;
