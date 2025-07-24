const API_URL = process.env.REACT_APP_API_URL;

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
}

export async function registerUser(
  username,
  email,
  password,
  mobile,
  address,
  upiId,
  bankAccountNumber,
  ifscCode
) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
      mobile,
      address,
      upiId,
      bankAccountNumber,
      ifscCode,
    }),
  });
  return await res.json();
}

export async function getProfile(token) {
  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Not authenticated");
  return await res.json();
}
