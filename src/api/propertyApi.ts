const BASE_URL = "https://propms-api.fly.dev/api/v1";

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