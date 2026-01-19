
function renderTable() {
    const clients = db.getAll(DB_KEYS.CLIENTS);
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = clients.map(c => `
        <tr>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td>
                <a href="orders.html?client_id=${c.id}" class="btn btn-sm btn-primary">View Orders</a>
                <button onclick="editClient(${c.id})" class="btn btn-sm btn-primary">Edit</button>
                <button onclick="deleteClient(${c.id})" class="btn btn-sm btn-danger">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Form Handling
const modal = document.getElementById('clientModal');
const form = document.getElementById('clientForm');

function openModal() { modal.classList.add('show'); form.reset(); document.getElementById('clientId').value = ''; }
function closeModal() { modal.classList.remove('show'); }

form.onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById('clientId').value;
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    if (id) {
        db.update(DB_KEYS.CLIENTS, id, data);
    } else {
        db.add(DB_KEYS.CLIENTS, data);
    }
    closeModal();
    renderTable();
};

function editClient(id) {
    const client = db.getById(DB_KEYS.CLIENTS, id);
    document.getElementById('clientId').value = client.id;
    document.getElementById('name').value = client.name;
    document.getElementById('email').value = client.email;
    document.getElementById('phone').value = client.phone;
    modal.classList.add('show');
}

function deleteClient(id) {
    if(confirm('Are you sure?')) {
        db.delete(DB_KEYS.CLIENTS, id);
        renderTable();
    }
}

renderTable();