const API_URL = process.env.REACT_APP_API_URL;

export async function createPayment(auctionId, token) {
  const res = await fetch(`${API_URL}/payments/${auctionId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

export async function getPaymentStatus(auctionId, token) {
  const res = await fetch(`${API_URL}/payments/${auctionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}
