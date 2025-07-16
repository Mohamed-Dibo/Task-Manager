// Mock API service that simulates backend API calls
// Replace these with actual API calls to your backend

const API_BASE_URL = 'http://localhost:3001/api'; // Replace with your actual API URL

// Simulated delay for demo purposes
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Get all tasks
  async getTasks() {
    try {
      await delay(500); // Simulate network delay
      // Replace with actual API call:
      // const response = await fetch(`${API_BASE_URL}/tasks`);
      // return await response.json();
      
      // For now, return empty array (data will be managed in localStorage)
      return [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Create a new task
  async createTask(task) {
    try {
      await delay(300);
      // Replace with actual API call:
      // const response = await fetch(`${API_BASE_URL}/tasks`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(task),
      // });
      // return await response.json();
      
      // For now, return mock response
      const newTask = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update an existing task
  async updateTask(id, updates) {
    try {
      await delay(300);
      // Replace with actual API call:
      // const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updates),
      // });
      // return await response.json();
      
      // For now, return mock response
      const updatedTask = {
        id,
        title: updates.title || '',
        description: updates.description || '',
        dueDate: updates.dueDate || '',
        priority: updates.priority || 'Medium',
        completed: updates.completed || false,
        createdAt: updates.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task
  async deleteTask(id) {
    try {
      await delay(300);
      // Replace with actual API call:
      // await fetch(`${API_BASE_URL}/tasks/${id}`, {
      //   method: 'DELETE',
      // });
      
      // For now, just simulate success
      console.log(`Task ${id} deleted`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Toggle task completion
  async toggleTaskCompletion(id, completed) {
    try {
      await delay(300);
      // Replace with actual API call:
      // const response = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ completed }),
      // });
      // return await response.json();
      
      // For now, return mock response
      const updatedTask = {
        id,
        title: 'Mock Task',
        description: 'Mock Description',
        dueDate: new Date().toISOString(),
        priority: 'Medium',
        completed,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return updatedTask;
    } catch (error) {
      console.error('Error toggling task completion:', error);
      throw error;
    }
  },
};