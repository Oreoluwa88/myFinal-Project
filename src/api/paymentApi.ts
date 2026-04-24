const BASE_URL = "https://propms-api.fly.dev/api/v1";

const getToken = () => localStorage.getItem("token");

// 1. Get lease schedules (tenant + landlord)
export const getLeaseSchedules = async (leaseId: string) => {
  const res = await fetch(
    `${BASE_URL}/Payments/schedules/lease/${leaseId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res.json();
};

// 2. Make payment (tenant)
export const makePayment = async (payload: any) => {
  const res = await fetch(`${BASE_URL}/Payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};

// 3. Payment history (tenant)
export const getMyPaymentHistory = async () => {
  const res = await fetch(`${BASE_URL}/Payments/history/my`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
};

// 4. Pending confirmations (landlord)
export const getPendingPayments = async () => {
  const res = await fetch(`${BASE_URL}/Payments/pending-confirmation`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
};

// 5. Confirm payment
export const confirmPayment = async (id: string) => {
  const res = await fetch(`${BASE_URL}/Payments/${id}/confirm`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
};

// 6. Reject payment
export const rejectPayment = async (id: string, reason: string) => {
  const res = await fetch(`${BASE_URL}/Payments/${id}/reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ reason }),
  });

  return res.json();
};