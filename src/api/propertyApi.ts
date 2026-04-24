const BASE_URL = "https://propms-api.fly.dev/api/v1";

//REGISTER
export const registerUser = async (data: any) => {
  const res = await fetch(`${BASE_URL}/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Registration failed");
  }

  return json;
};

//LOGIN
export const loginUser = async (data: any) => {
  const res = await fetch(`${BASE_URL}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Login failed");
  }

  return json;
};

export const getProperties = async () => {
  const res = await fetch(`${BASE_URL}/Properties`);
  const data = await res.json();
  return data.data || data;
};

export const createProperty = async (property: any) => {
  const res = await fetch(`${BASE_URL}/Properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(property),
  });

  return await res.json();
};

export const approvePropertyApi = async (id: number) => {
  const res = await fetch(`${BASE_URL}/Properties/${id}/approve`, {
    method: "POST",
  });

  return await res.json();
};