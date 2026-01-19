const DB_KEYS = {
    PRODUCTS: 'db_products',
    CLIENTS: 'db_clients',
    ORDERS: 'db_orders'
};

function initData() {

    if (!localStorage.getItem(DB_KEYS.CLIENTS)) {
        const clients = [
            { id: 1, name: "Ahmed Mansour", email: "ahmed@example.com", phone: "0661-123456" },
            { id: 2, name: "Fatima Zahra", email: "fatima@example.com", phone: "0661-987654" },
            { id: 3, name: "Youssef Alami", email: "youssef@example.com", phone: "0661-001122" },
            { id: 4, name: "Sara Bakri", email: "sara@example.com", phone: "0661-445566" }
        ];
        localStorage.setItem(DB_KEYS.CLIENTS, JSON.stringify(clients));
    }


    if (!localStorage.getItem(DB_KEYS.PRODUCTS)) {
        const products = [
            { id: 101, name: "Laptop Pro 15", price: 1200.00, category: "Electronics" },
            { id: 102, name: "Wireless Mouse", price: 25.00, category: "Accessories" },
            { id: 103, name: "HD Monitor", price: 250.00, category: "Electronics" }
        ];
        localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
    }

    if (!localStorage.getItem(DB_KEYS.ORDERS)) {
        const orders = [
            { id: 5001, clientId: 1, productIds: [101], total: 1200.00, status: "Completed", date: "2024-01-10" },
            { id: 5002, clientId: 2, productIds: [102, 103], total: 275.00, status: "Pending", date: "2024-01-12" }
        ];
        localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));
    }
}


const db = {
    getAll: (key) => JSON.parse(localStorage.getItem(key) || '[]'),
    save: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    getById: (key, id) => db.getAll(key).find(item => item.id == id),
    add: (key, item) => {
        const data = db.getAll(key);
        item.id = Date.now();
        data.push(item);
        db.save(key, data);
        return item;
    },
    update: (key, id, updates) => {
        const data = db.getAll(key).map(item => item.id == id ? { ...item, ...updates } : item);
        db.save(key, data);
    },
    delete: (key, id) => {
        const data = db.getAll(key).filter(item => item.id != id);
        db.save(key, data);
    }
};

initData();