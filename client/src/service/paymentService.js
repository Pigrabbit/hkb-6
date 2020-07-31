export function getPaymentListFromServer() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/payment", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}
