// api.js

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Fetch users
export async function fetchUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
}

// Add a new user
export async function addUser(newUser) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error("Error adding user");
    }

    const addedUser = await response.json();
    return addedUser;
  } catch (error) {
    throw new Error(`Error adding user: ${error.message}`);
  }
}

// Update an existing user
export async function updateUser(updatedUser) {
  try {
    const response = await fetch(`${BASE_URL}/users/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error("Error updating user");
    }

    return true;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

// Delete a user
export async function deleteUser(id) {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error deleting user");
    }

    return true;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
}
