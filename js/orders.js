
const urlParams = new URLSearchParams(window.location.search);
const filterClientId = urlParams.get('client_id');

function renderTable() {
    let orders = db.getAll(DB_KEYS.ORDERS);

    if (filterClientId) {
        orders = orders.filter(o => o.clientId == filterClientId);
        document.getElementById('pageTitle').innerText = `Orders for Client #${filterClientId}`;
    }

    const clients = db.getAll(DB_KEYS.CLIENTS);
    const products = db.getAll(DB_KEYS.PRODUCTS);
    const tbody = document.getElementById('tableBody');

    tbody.innerHTML = orders.map(o => {
        const client = clients.find(c => c.id == o.clientId) || { name: 'Unknown' };
        
    
        const orderProducts = o.productIds.map(pid => {
            const p = products.find(prod => prod.id == pid);
            return p ? p.name : 'Unknown Item';
        }).join(', ');

        return `
        <tr>
            <td>#${o.id}</td>
            <td>${client.name}</td>
            <td>${orderProducts}</td>
            <td>$${parseFloat(o.total).toFixed(2)}</td>
            <td><span style="padding: 2px 6px; border-radius: 4px; background: ${o.status === 'Completed' ? '#dcfce7' : '#f1f5f9'}">${o.status}</span></td>
            <td>
                <button onclick="deleteOrder(${o.id})" class="btn btn-sm btn-danger">Delete</button>
            </td>
        </tr>
    `}).join('');
}


function populateDropdowns() {
    const clients = db.getAll(DB_KEYS.CLIENTS);
    const products = db.getAll(DB_KEYS.PRODUCTS);
    
    document.getElementById('clientSelect').innerHTML = clients.map(c => 
        `<option value="${c.id}">${c.name}</option>`
    ).join('');

    document.getElementById('productSelect').innerHTML = products.map(p => 
        `<option value="${p.id}" data-price="${p.price}">${p.name} ($${p.price})</option>`
    ).join('');
}

const modal = document.getElementById('orderModal');
const form = document.getElementById('orderForm');

function openModal() { 
    populateDropdowns();
    modal.classList.add('show'); 
    form.reset(); 
    if(filterClientId) document.getElementById('clientSelect').value = filterClientId;
}
function closeModal() { modal.classList.remove('show'); }

form.onsubmit = (e) => {
    e.preventDefault();
    
    // Get Multi-select values
    const productSelect = document.getElementById('productSelect');
    const selectedOptions = Array.from(productSelect.selectedOptions);
    const productIds = selectedOptions.map(opt => parseInt(opt.value));
    
    // Calculate Total automatically
    const total = selectedOptions.reduce((sum, opt) => sum + parseFloat(opt.dataset.price), 0);

    const data = {
        clientId: document.getElementById('clientSelect').value,
        productIds: productIds,
        status: document.getElementById('status').value,
        total: total,
        date: new Date().toISOString().split('T')[0]
    };

    db.add(DB_KEYS.ORDERS, data);
    closeModal();
    renderTable();
};

function deleteOrder(id) {
    if(confirm('Delete Order?')) {
        db.delete(DB_KEYS.ORDERS, id);
        renderTable();
    }
}

renderTable();