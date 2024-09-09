const API_URL = "http://localhost:5000/api"; 

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};



export const registerUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to register");
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};



export const fetchTasks = async (token) => {
  const response = await fetch(`${API_URL}/tasks/tasks`, {
    headers: {
      Authorization: token,
    },
  });
  return response.json();
};

export const createTask = async (task) => {
  const response = await fetch("http://localhost:5000/api/tasks/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return await response.json();
};

export const updateTask = async (
  taskId,
  newTitle,
  newDescription,
  newStatus
) => {
  const response = await fetch(
    `http://localhost:5000/api/tasks/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        status: newStatus,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return await response.json();
};


export const deleteTask = async (taskId) => {
  const response = await fetch(
    `http://localhost:5000/api/tasks/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};
