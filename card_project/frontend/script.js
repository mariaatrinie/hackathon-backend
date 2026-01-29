const form = document.getElementById("form");
const table = document.getElementById("table");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    cardName: document.getElementById("cardName").value,
    cardHolderName: document.getElementById("cardHolderName").value,
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
  };

  await fetch("/cards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  form.reset();
  loadData();
});

async function loadData() {
  const res = await fetch("/cards");
  const data = await res.json();

  table.innerHTML = "";
  data.forEach(d => {
    table.innerHTML += `
      <tr>
        <td>${d.cardName}</td>
        <td>${d.cardHolderName}</td>
        <td>${d.paymentMethod}</td>
      </tr>
    `;
  });
}

loadData();
