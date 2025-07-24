const API_URL = process.env.REACT_APP_API_URL;

export async function placeBid(auctionId, amount, token) {
  const res = await fetch(`${API_URL}/bids/${auctionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });
  return await res.json();
}

export async function getBidsForAuction(auctionId) {
  const res = await fetch(`${API_URL}/bids/${auctionId}`);
  return await res.json();
}
