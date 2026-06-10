const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "db_fallback.json");

const getDb = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(
      dbPath,
      JSON.stringify({ users: [], restaurants: [], bookings: [], orders: [] }, null, 2)
    );
  }
  try {
    const content = fs.readFileSync(dbPath, "utf8");
    const data = JSON.parse(content);
    if (!data.bookings) data.bookings = [];
    if (!data.orders) data.orders = [];
    return data;
  } catch (e) {
    return { users: [], restaurants: [], bookings: [], orders: [] };
  }
};

const saveDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const User = {
  findOne: async (query) => {
    const db = getDb();
    if (query.email) {
      const user = db.users.find(
        (u) => u.email.toLowerCase() === query.email.toLowerCase()
      );
      return user || null;
    }
    if (query._id) {
      const user = db.users.find((u) => u._id === query._id);
      return user || null;
    }
    return null;
  },
  findById: async (id) => {
    const db = getDb();
    const user = db.users.find((u) => u._id === id);
    return user || null;
  },
  create: async (userData) => {
    const db = getDb();
    const newUser = {
      _id: "user_" + Date.now().toString(),
      ...userData,
      role: userData.role || "customer",
      phone: userData.phone || "",
      dob: userData.dob || "",
      dietaryPreferences: userData.dietaryPreferences || [],
      addresses: userData.addresses || [],
      loyaltyPoints: userData.loyaltyPoints !== undefined ? userData.loyaltyPoints : 120,
      walletBalance: userData.walletBalance !== undefined ? userData.walletBalance : 1000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    saveDb(db);
    return newUser;
  },
  findByIdAndUpdate: async (id, updateData) => {
    const db = getDb();
    const index = db.users.findIndex((u) => u._id === id);
    if (index === -1) return null;
    db.users[index] = {
      ...db.users[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    saveDb(db);
    return db.users[index];
  },
};

const Restaurant = {
  find: async () => {
    const db = getDb();
    return db.restaurants || [];
  },
  create: async (restoData) => {
    const db = getDb();
    const newResto = {
      _id: "resto_" + Date.now().toString(),
      ...restoData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.restaurants.push(newResto);
    saveDb(db);
    return newResto;
  },
};

const Booking = {
  find: async (query) => {
    const db = getDb();
    let results = db.bookings || [];
    if (query && query.userId) {
      results = results.filter((b) => b.userId === query.userId);
    }
    return results;
  },
  create: async (bookingData) => {
    const db = getDb();
    const newBooking = {
      _id: "booking_" + Date.now().toString(),
      ...bookingData,
      status: bookingData.status || "Upcoming",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.bookings.push(newBooking);
    saveDb(db);
    return newBooking;
  },
  findByIdAndUpdate: async (id, updateData) => {
    const db = getDb();
    const index = db.bookings.findIndex((b) => b._id === id);
    if (index === -1) return null;
    db.bookings[index] = {
      ...db.bookings[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    saveDb(db);
    return db.bookings[index];
  },
};

const Order = {
  find: async (query) => {
    const db = getDb();
    let results = db.orders || [];
    if (query && query.userId) {
      results = results.filter((o) => o.userId === query.userId);
    }
    return results;
  },
  create: async (orderData) => {
    const db = getDb();
    const newOrder = {
      _id: "order_" + Date.now().toString(),
      ...orderData,
      status: orderData.status || "Order Received",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.orders.push(newOrder);
    saveDb(db);
    return newOrder;
  },
  findByIdAndUpdate: async (id, updateData) => {
    const db = getDb();
    const index = db.orders.findIndex((o) => o._id === id);
    if (index === -1) return null;
    db.orders[index] = {
      ...db.orders[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    saveDb(db);
    return db.orders[index];
  },
};

module.exports = {
  User,
  Restaurant,
  Booking,
  Order,
};
