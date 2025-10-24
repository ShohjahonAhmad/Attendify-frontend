const myHeaders = new Headers();
myHeaders.append("Content-type", "application/json");

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
  console.log("in api call");
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
