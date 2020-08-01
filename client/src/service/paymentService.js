export function getPaymentListFromServer() {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.API_URL}/payment`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}