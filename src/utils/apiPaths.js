export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_PATHS = {
  AUTH: {
    REGISTER: `/auth/register`,
    LOGIN: `/auth/login`,
    GET_PROFILE: `/auth/profile`, // Get logged-in user details
  },

  USERS: {
    GET_ALL_USERS: `/users`, // Get all users (Admin only)
    GET_USER_BY_ID: (userId) => `/users/${userId}`,
    CREATE_USER: `/users`, // Create a new user (Admin only)
    UPDATE_USER: (userId) => `/users/${userId}`, // Update user details
    DELETE_USER: (userId) => `/users/${userId}`, // Delete a user
  },

  TASKS: {
    GET_DASHBOARD_DATA: `/tasks/dashboard-data`, // Get Dashboard data
    GET_USER_DASHBOARD_DATA: `/tasks/user-dashboard-data`, // Get User Dashboard data
    GET_ALL_TASKS: `/tasks`, // Get all tasks (Admin: all, User: only assigned tasks)
    GET_TASK_BY_ID: (taskId) => `/tasks/${taskId}`, // Get task by ID
    CREATE_TASK: `/tasks`, // Create a task (Admin only)
    UPDATE_TASK: (taskId) => `/tasks/${taskId}`, // Update task details
    DELETE_TASK: (taskId) => `/tasks/${taskId}`, // Delete a task (Admin only)

    UPDATE_TASK_STATUS: (taskId) => `/tasks/${taskId}/status`, // Update task status
    UPDATE_TODO_CHECKLIST: (taskId) => `/tasks/${taskId}/todo`, // Update task checklist
  },

  REPORTS: {
    EXPORT_TASKS: `/reports/export/tasks`, // Download all tasks as an Excel file
    EXPORT_USERS: `/reports/export/users`, // Download all users as an Excel file
  },

  IMAGE: {
    UPLOAD_IMAGE: `/auth/upload-image`,
  },
};
