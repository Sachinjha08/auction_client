const API_URL = process.env.REACT_APP_API_URL;

export async function getAuctions(query = "") {
  const res = await fetch(`${API_URL}/auctions${query}`);
  return await res.json();
}

export async function getAuctionById(id) {
  const res = await fetch(`${API_URL}/auctions/${id}`);
  return await res.json();
}

export async function createAuction(data, token) {
  const res = await fetch(`${API_URL}/auctions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateAuction(id, data, token) {
  const res = await fetch(`${API_URL}/auctions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteAuction(id, token) {
  const res = await fetch(`${API_URL}/auctions/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}
