const baseUrl = import.meta.env.VITE_BASE_URL;

export async function login(loginData) {
  try {
    console.log(loginData);
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseUrl}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseUrl}/curators/courses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseUrl}/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw {
        message: "Failed to delete course",
        statusCode: res.status || 500,
        statusText: res.statusText || "Internal Server Error",
      };
    }
    return res.status === 204 && "Success";
  } catch (err) {
    throw {
      message: err.message || "Network Error",
      statusCode: err.statusCode || 500,
      statusText: err.statusText || "Internal Server Error",
    };
  }
}

export async function getAttendances(id) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseUrl}/courses/${id}/attendances`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw {
        message: data.error || data.message || "Failed to fetch attendances",
        statusCode: res.status || 500,
        statusText: res.statusText || "Internal Server Error",
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

export async function createAttendance(id) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseUrl}/courses/${id}/attendances`, {
      method: "POST",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: data.error || data.message || "Failed to create attendance",
        statusCode: res.status || 500,
        statusText: res.statusText || "Internal Server Error",
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

export async function deleteAttendance(id, ID) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseUrl}/courses/${id}/attendances/${ID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw {
        message: "Failed to delete attendance",
        statusCode: res.status || 500,
        statusText: res.statusText || "Internal Server Error",
      };
    }

    return res.status === 204 && true;
  } catch (err) {
    throw {
      message: err.message || "Network Error",
      statusCode: err.statusCode || 500,
      statusText: err.statusText || "Internal Server Error",
    };
  }
}
