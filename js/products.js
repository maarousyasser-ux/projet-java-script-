/* js/products.js */
function renderTable() {
  const products = db.getAll(DB_KEYS.PRODUCTS);
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = products.map(p => `
      <tr>
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>$${parseFloat(p.price).toFixed(2)}</td>
          <td>
              <button onclick="editProduct(${p.id})" class="btn btn-sm btn-primary">Edit</button>
              <button onclick="deleteProduct(${p.id})" class="btn btn-sm btn-danger">Delete</button>
          </td>
      </tr>
  `).join('');
}

const modal = document.getElementById('productModal');
const form = document.getElementById('productForm');

function openModal() { modal.classList.add('show'); form.reset(); document.getElementById('productId').value = ''; }
function closeModal() { modal.classList.remove('show'); }

form.onsubmit = (e) => {
  e.preventDefault();
  const id = document.getElementById('productId').value;
  const data = {
      name: document.getElementById('name').value,
      category: document.getElementById('category').value,
      price: parseFloat(document.getElementById('price').value)
  };

  if (id) {
      db.update(DB_KEYS.PRODUCTS, id, data);
  } else {
      db.add(DB_KEYS.PRODUCTS, data);
  }
  closeModal();
  renderTable();
};

function editProduct(id) {
  const p = db.getById(DB_KEYS.PRODUCTS, id);
  document.getElementById('productId').value = p.id;
  document.getElementById('name').value = p.name;
  document.getElementById('category').value = p.category;
  document.getElementById('price').value = p.price;
  modal.classList.add('show');
}

function deleteProduct(id) {
  if(confirm('Delete this product?')) {
      db.delete(DB_KEYS.PRODUCTS, id);
      renderTable();
  }
}

renderTable();