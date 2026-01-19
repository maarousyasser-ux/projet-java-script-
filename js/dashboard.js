const totalProductsEl = document.getElementById("totalProducts")
const ordersMonthEl = document.getElementById("ordersMonth")
const revenueEl = document.getElementById("revenue")
const bestProductsEl = document.getElementById("bestProducts")

function loadDashboard() {

  const products = JSON.parse(localStorage.getItem("products")) || []
  const orders = JSON.parse(localStorage.getItem("orders")) || []


  totalProductsEl.textContent = products.length


  const thisMonthOrders = orders.slice(0, 8)
  ordersMonthEl.textContent = thisMonthOrders.length


  const revenue = thisMonthOrders.reduce((sum, o) => {
    return sum + (o.total || 100)
  }, 0)

  revenueEl.textContent = "$" + revenue


  const best = products.slice(0, 5)

  bestProductsEl.innerHTML = best.length
    ? best.map(p => `
        <tr>
          <td>${p.title}</td>
          <td>${Math.floor(Math.random() * 40) + 10}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="2">No products yet</td></tr>`
}

loadDashboard()
