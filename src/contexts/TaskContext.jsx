import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TaskContext = createContext(undefined);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'TOGGLE_COMPLETION':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
            : task
        ),
      };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    // Load tasks from localStorage on mount
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        dispatch({ type: 'SET_TASKS', payload: parsedTasks });
      } catch (error) {
        console.error('Error parsing saved tasks:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (id, updates) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleTaskCompletion = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETION', payload: id });
  };

  const getTaskById = (id) => {
    return state.tasks.find(task => task.id === id);
  };

  const value = {
    tasks: state.tasks,
    loading: state.loading,
    error: state.error,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    getTaskById,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}