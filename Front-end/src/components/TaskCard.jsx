import React from 'react';
import { Calendar, Clock, Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';

export function TaskCard({ task, onEdit, onDelete, onToggleCompletion }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && !task.completed;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleCompletion(task.id)}
            className={`p-1 rounded-full transition-colors duration-200 ${
              task.completed
                ? 'text-green-600 hover:text-green-700'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {task.completed ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>
          <div>
            <h3 className={`font-semibold text-lg ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className={`text-gray-600 mb-4 ${task.completed ? 'line-through' : ''}`}>
        {task.description}
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span className={isOverdue(task.dueDate) ? 'text-red-600 font-medium' : ''}>
            {formatDate(task.dueDate)}
          </span>
          {isOverdue(task.dueDate) && (
            <span className="text-red-600 font-medium ml-1">(Overdue)</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>Updated {formatDate(task.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}