const myHeaders = new Headers();
myHeaders.append("Content-type", "application/json");
myHeaders.append(
  "Authorization",
  "Bearer " +
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkNVUkFUT1IiLCJpYXQiOjE3NjE1OTY2MTMsImV4cCI6MTc2MTY4MzAxM30.Y-QykXnLLdnDmUx3g5miz_ADmn7hEiViaRVvTWnLBwM"
);

const baseUrl = import.meta.env.VITE_BASE_URL;

export async function login(loginData) {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      throw {
        message: "Invalid email or password",
        statusCode: res.status,
        statusText: res.statusText,
      };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw {
      message: err.message || "Network error",
      statusCode: err.statusCode || 500,
      statusText: err.statusText || "Internal Server Error",
    };
  }
}

export async function register(registerData) {
  try {
    const res = await fetch(`${baseUrl}/auth/registration`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(registerData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: data.error || data.message || "Failed to register",
        statusCode: res.status,
        statusText: res.statusText,
      };
    }

    return data;
  } catch (err) {
    throw {
      message: err.message || "Network error",
      statusCode: err.statusCode || 500,
      statusText: err.statusText || "Internal Server Error",
    };
  }
}

export async function createCourse(name) {
  try {
    const res = await fetch(`${baseUrl}/courses`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(name),
    });

    const data = await res.json();
    if (!res.ok) {
      throw {
        message: data.error || data.message || "Failed to create course",
        statusCode: res.status,
        statusText: res.statusText,
      };
    }
    return data;
  } catch (err) {
    throw {
      message: err.message || "Network error",
      statusCode: err.statusCode || 500,
      statusText: err.statusText || "Internal Server Error",
    };
  }
}

export async function getCourses() {
  try {
    const res = await fetch(`${baseUrl}/curators/courses`, {
      method: "GET",
      headers: myHeaders,
    });

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: data.error || data.message || "Failed to get courses",
        statusCode: res.status,
        statusText: res.statusText,
      };
    }
    return data;
  } catch (err) {
    throw {
      message: err.message || "Network Error",
      statusCode: err.statusCode || 500,
      statusText: err.statusText || "Internal Server Error",
    };
  }
}

export async function deleteCourse(id) {
  try {
    const res = await fetch(`${baseUrl}/courses/${id}`, {
      method: "DELETE",
      headers: myHeaders,
    });

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: data.error || data.message || "Failed to delete course",
        statusCode: res.status || 500,
        statusText: res.statusText || "Internal Server Error",
      };
    }
    return "Success";
  } catch (err) {
    throw {
      message: err.message || "Network Error",
      statusCode: err.statusCode || 500,
      statusText: err.statusText || "Internal Server Error",
    };
  }
}
