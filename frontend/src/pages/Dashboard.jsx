import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  HomeIcon,
  BookingsIcon,
  OrdersIcon,
  TrackingIcon,
  FavoritesIcon,
  RewardsIcon,
  NotificationsIcon,
  PaymentsIcon,
  ProfileIcon,
  SupportIcon,
  SearchIcon,
  BellIcon,
  CartIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  SendIcon,
  StarIcon,
  SunIcon,
  MoonIcon,
  LogoutIcon,
  ChatIcon,
  CheckIcon,
  GiftIcon
} from "../components/Icons";

const MENU_ITEMS = [
  { id: "item_1", name: "Paneer Tikka Masala", price: 340, category: "Main Course", rating: 4.8, isVeg: true, isSpicy: true, desc: "Cottage cheese cubes cooked in a rich, spicy tomato-onion gravy.", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop&q=80" },
  { id: "item_2", name: "Chicken Biryani", price: 380, category: "Main Course", rating: 4.9, isVeg: false, isSpicy: true, desc: "Fragrant basmati rice layered with juicy spiced chicken and herbs.", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80" },
  { id: "item_3", name: "Truffle Fries", price: 180, category: "Starters", rating: 4.5, isVeg: true, isSpicy: false, desc: "Crispy golden fries tossed in truffle oil and grated parmesan.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop&q=80" },
  { id: "item_4", name: "Saffron Phirni", price: 160, category: "Desserts", rating: 4.7, isVeg: true, isSpicy: false, desc: "Traditional Kashmiri sweet pudding flavored with saffron and cardamom.", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&auto=format&fit=crop&q=80" },
  { id: "item_5", name: "Crispy Lotus Stem", price: 260, category: "Starters", rating: 4.6, isVeg: true, isSpicy: true, desc: "Stir-fried lotus stem with chili honey glaze and sesame seeds.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80" },
  { id: "item_6", name: "Sunset Oasis Mocktail", price: 190, category: "Beverages", rating: 4.4, isVeg: true, isSpicy: false, desc: "Refreshing mocktail of orange juice, cranberry syrup, and mint leaves.", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&auto=format&fit=crop&q=80" },
  { id: "item_7", name: "Spicy Paneer Bao", price: 280, category: "Starters", rating: 4.7, isVeg: true, isSpicy: true, desc: "Soft steamed buns stuffed with crispy paneer chunks and sriracha glaze.", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&auto=format&fit=crop&q=80" },
  { id: "item_8", name: "Margherita Pizza", price: 290, category: "Main Course", rating: 4.8, isVeg: true, isSpicy: false, desc: "Classic stone-baked pizza with fresh mozzarella, basil leaves, and marinara.", img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&auto=format&fit=crop&q=80" },
  { id: "item_9", name: "Fettuccine Alfredo", price: 320, category: "Main Course", rating: 4.6, isVeg: true, isSpicy: false, desc: "Pasta tossed in a rich, creamy sauce made of pure butter and parmesan.", img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&auto=format&fit=crop&q=80" },
  { id: "item_10", name: "Classic Tiramisu", price: 220, category: "Desserts", rating: 4.9, isVeg: true, isSpicy: false, desc: "Espresso-soaked ladyfingers layered with whipped mascarpone cream.", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop&q=80" },
  { id: "item_11", name: "Spicy Avocado Roll", price: 350, category: "Starters", rating: 4.7, isVeg: true, isSpicy: true, desc: "Sushi roll with creamy avocado, cucumber, and spicy wasabi-mayo drizzle.", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&auto=format&fit=crop&q=80" },
  { id: "item_12", name: "Salmon Sashimi Plate", price: 490, category: "Starters", rating: 4.9, isVeg: false, isSpicy: false, desc: "Thinly sliced premium raw salmon served chilled with soy and wasabi.", img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&auto=format&fit=crop&q=80" },
  { id: "item_13", name: "Matcha Gelato", price: 150, category: "Desserts", rating: 4.5, isVeg: true, isSpicy: false, desc: "Rich and creamy green tea flavored artisanal gelato.", img: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?w=400&auto=format&fit=crop&q=80" },
  { id: "item_14", name: "Crispy Garlic Wings", price: 280, category: "Starters", rating: 4.6, isVeg: false, isSpicy: true, desc: "Golden fried chicken wings glazed in a spicy garlic soy reduction.", img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&auto=format&fit=crop&q=80" }
];

const PROMO_CODES = [
  { code: "WELCOME50", discount: 50, minSpend: 200, desc: "Get flat ₹50 off on orders above ₹200" },
  { code: "SPECIAL30", discount: 100, minSpend: 300, desc: "Gourmet Daily Deal: Save flat ₹100 on orders above ₹300" },
  { code: "OCCASIA100", discount: 100, minSpend: 500, desc: "Grand Saving: Flat ₹100 off on order above ₹500" }
];

function Dashboard() {
  const navigate = useNavigate();
  
  // App states
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedResto, setSelectedResto] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  
  // Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // Cart & Orders State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Bookings State
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    restaurantId: "",
    restaurantName: "",
    date: "",
    timeSlot: "19:00",
    guests: 2,
    seatingPreference: "Indoor",
    specialRequests: []
  });
  const [qrCodeModal, setQrCodeModal] = useState(null);

  // Profile management State
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    addresses: [],
    dietaryPreferences: []
  });
  const [newAddressInput, setNewAddressInput] = useState("");

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, type: "system", text: "Welcome to OCCASIA DineVerse! Explore our 4 premium themed restaurants.", time: "Just now", read: false },
    { id: 2, type: "coupon", text: "New Promo Code alert: Use 'WELCOME50' to get flat ₹50 off on your first order!", time: "1 hour ago", read: false }
  ]);

  // Wallet State
  const [walletBalance, setWalletBalance] = useState(1000);
  const [loyaltyPoints, setLoyaltyPoints] = useState(120);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");

  // Search State
  const [globalSearch, setGlobalSearch] = useState("");

  // Support Tab States
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ orderId: "", category: "Late Delivery", text: "" });
  const [supportChat, setSupportChat] = useState([
    { sender: "agent", text: "Hello! Thank you for contacting Occasia Customer Support. How can I help you today?", time: "14:27" }
  ]);
  const [chatInput, setChatInput] = useState("");

  // AI Assistant States
  const [aiChat, setAiChat] = useState([
    { sender: "ai", text: "Greetings! I am your AI Chef Assistant. Ask me to recommend dishes, show spicy menu items, suggest meals under budget, or add them straight to your cart!", time: "14:27" }
  ]);
  const [aiInput, setAiInput] = useState("");
  const aiChatEndRef = useRef(null);

  // Hero Countdown timer
  const [countdown, setCountdown] = useState("02:14:45");

  // Fetch initial profile and restaurants
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      localStorage.clear();
      navigate("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setWalletBalance(parsedUser.walletBalance !== undefined ? parsedUser.walletBalance : 1000);
      setLoyaltyPoints(parsedUser.loyaltyPoints !== undefined ? parsedUser.loyaltyPoints : 120);
      setProfileForm({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        dob: parsedUser.dob || "",
        addresses: parsedUser.addresses || ["123 Luxury Suites, Jubilee Hills, Hyderabad"],
        dietaryPreferences: parsedUser.dietaryPreferences || []
      });
    } catch (e) {
      localStorage.clear();
      navigate("/");
    }

    // Fetch restaurants
    API.get("/restaurants")
      .then((res) => {
        setRestaurants(res.data);
        if (res.data.length > 0) {
          setSelectedResto(res.data[0]);
          setNewBooking(prev => ({
            ...prev,
            restaurantId: res.data[0]._id,
            restaurantName: res.data[0].name
          }));
        }
      })
      .catch((err) => {
        console.error("Failed to load restaurants", err);
      });

    // Fetch user bookings & orders
    fetchBookings();
    fetchOrders();
  }, [navigate]);

  // Synchronize dark theme class with html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Auto-scroll AI Chat
  useEffect(() => {
    aiChatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiChat]);

  // Simulated Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const parts = countdown.split(":").map(Number);
      let seconds = parts[2];
      let minutes = parts[1];
      let hours = parts[0];

      if (seconds > 0) seconds--;
      else {
        seconds = 59;
        if (minutes > 0) minutes--;
        else {
          minutes = 59;
          if (hours > 0) hours--;
          else {
            hours = 2; // Loop back
          }
        }
      }
      const pad = (n) => String(n).padStart(2, "0");
      setCountdown(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  // Active Order Tracker Status Auto-simulation
  useEffect(() => {
    if (!activeOrder) return;
    if (activeOrder.status === "Delivered" || activeOrder.status === "Cancelled") return;

    const statuses = ["Order Received", "Preparing Food", "Packed", "Out for Delivery", "Delivered"];
    const currentIndex = statuses.indexOf(activeOrder.status);

    if (currentIndex < statuses.length - 1) {
      const timer = setTimeout(() => {
        const nextStatus = statuses[currentIndex + 1];
        
        // Update local status
        setActiveOrder(prev => ({ ...prev, status: nextStatus }));

        // Send Notification
        const emojiMap = {
          "Preparing Food": "🍳",
          "Packed": "📦",
          "Out for Delivery": "🚚",
          "Delivered": "✅"
        };
        const alertMsg = `${emojiMap[nextStatus] || "🚚"} Order #${activeOrder._id.slice(-4)}: State updated to [${nextStatus}]!`;
        setNotifications(prev => [
          { id: Date.now(), type: "order", text: alertMsg, time: "Just now", read: false },
          ...prev
        ]);

        // Sync with API
        API.put(`/orders/${activeOrder._id}/status`, { status: nextStatus })
          .catch(e => console.error("Error updating mock order status", e));

      }, 15000); // Progress stage every 15 seconds

      return () => clearTimeout(timer);
    }
  }, [activeOrder]);

  const fetchBookings = () => {
    API.get("/bookings")
      .then(res => setBookings(res.data))
      .catch(e => console.error("Error fetching bookings", e));
  };

  const fetchOrders = () => {
    API.get("/orders")
      .then(res => {
        setOrderHistory(res.data);
        const ongoing = res.data.find(o => !["Delivered", "Cancelled"].includes(o.status));
        if (ongoing) {
          setActiveOrder(ongoing);
        }
      })
      .catch(e => console.error("Error fetching orders", e));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  // Cart operations
  const addToCart = (item) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === item.id);
      if (exist) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, restaurantId: selectedResto?._id }];
    });
    // Visual indicator triggers drawer open on first add
    if (cart.length === 0) {
      setIsCartOpen(true);
    }
  };

  const updateCartQuantity = (itemId, delta) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.id === itemId) {
          const newQty = i.quantity + delta;
          return newQty > 0 ? { ...i, quantity: newQty } : null;
        }
        return i;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const getTax = () => Math.round(getSubtotal() * 0.05); // 5% tax
  
  const getDiscount = () => {
    if (!appliedPromo) return 0;
    const subtotal = getSubtotal();
    if (subtotal >= appliedPromo.minSpend) {
      return appliedPromo.discount;
    }
    return 0;
  };
  
  const getTotal = () => {
    const t = getSubtotal() + getTax() - getDiscount();
    return t > 0 ? t : 0;
  };

  const applyPromoCode = (code) => {
    const found = PROMO_CODES.find(p => p.code.toUpperCase() === code.trim().toUpperCase());
    if (found) {
      if (getSubtotal() >= found.minSpend) {
        setAppliedPromo(found);
        setPromoCodeInput("");
      } else {
        alert(`Minimum spend of ₹${found.minSpend} required for this coupon.`);
      }
    } else {
      alert("Invalid Promo Code");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const total = getTotal();

    if (walletBalance < total) {
      alert("Insufficient wallet balance. Please top up your wallet in the Payments tab.");
      setIsCartOpen(false);
      setActiveTab("payments");
      return;
    }

    // Create Order
    const orderPayload = {
      restaurantId: selectedResto?._id || "resto_1",
      restaurantName: selectedResto?.name || "The Grand Occasia",
      items: cart,
      subtotal: getSubtotal(),
      discount: getDiscount(),
      tax: getTax(),
      total: total,
      deliveryAddress: profileForm.addresses[0] || "123 Luxury Suites, Jubilee Hills, Hyderabad",
      paymentMethod: "Wallet"
    };

    API.post("/orders", orderPayload)
      .then(res => {
        // Subtract from wallet
        const newBalance = walletBalance - total;
        const rewardEarned = Math.floor(total / 10); // 10% points reward
        const newPoints = loyaltyPoints + rewardEarned;
        
        setWalletBalance(newBalance);
        setLoyaltyPoints(newPoints);
        
        // Update user storage
        const updatedUser = { ...user, walletBalance: newBalance, loyaltyPoints: newPoints };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        // Sync profile to database
        API.put("/auth/profile", { walletBalance: newBalance, loyaltyPoints: newPoints });

        setActiveOrder(res.data);
        setCart([]);
        setAppliedPromo(null);
        setIsCartOpen(false);
        setActiveTab("tracking");

        // Fetch refreshed order history
        fetchOrders();

        // Notification
        setNotifications(prev => [
          { id: Date.now(), type: "order", text: `🎉 Order placed successfully! ₹${total} deducted from Wallet. Earned +${rewardEarned} points.`, time: "Just now", read: false },
          ...prev
        ]);
      })
      .catch(err => {
        console.error("Checkout failed", err);
        alert("Something went wrong during checkout. Please try again.");
      });
  };

  const repeatOrder = (order) => {
    setCart([]);
    order.items.forEach(item => {
      setCart(prev => [...prev, { ...item, quantity: item.quantity }]);
    });
    const matchResto = restaurants.find(r => r._id === order.restaurantId);
    if (matchResto) {
      setSelectedResto(matchResto);
    }
    setIsCartOpen(true);
  };

  // Booking functions
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!newBooking.date) {
      alert("Please select a date.");
      return;
    }

    API.post("/bookings", newBooking)
      .then(res => {
        setBookings(prev => [res.data, ...prev]);
        setNewBooking({
          ...newBooking,
          date: "",
          timeSlot: "19:00",
          guests: 2,
          seatingPreference: "Indoor",
          specialRequests: []
        });

        // Earn loyalty points for making a reservation
        const newPoints = loyaltyPoints + 20;
        setLoyaltyPoints(newPoints);
        const updatedUser = { ...user, loyaltyPoints: newPoints };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        API.put("/auth/profile", { loyaltyPoints: newPoints });

        alert("🎉 Table booked successfully! You earned +20 loyalty points.");
        
        setNotifications(prev => [
          { id: Date.now(), type: "booking", text: `🍽 Table Reservation confirmed at ${newBooking.restaurantName} for ${newBooking.date} at ${newBooking.timeSlot}.`, time: "Just now", read: false },
          ...prev
        ]);
      })
      .catch(err => {
        console.error("Booking failed", err);
      });
  };

  const handleCancelBooking = (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this table reservation?")) return;

    API.put(`/bookings/${bookingId}/cancel`)
      .then(() => {
        setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: "Cancelled" } : b));
        setNotifications(prev => [
          { id: Date.now(), type: "booking", text: `❌ Table Reservation cancelled.`, time: "Just now", read: false },
          ...prev
        ]);
      })
      .catch(err => console.error("Failed to cancel booking", err));
  };

  // Favorites
  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === item.id);
      if (exists) {
        return prev.filter(f => f.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  // Wallet Top Up
  const handleTopUp = (e) => {
    e.preventDefault();
    const amt = Number(topUpAmount);
    if (!amt || amt <= 0) return;

    const newBal = walletBalance + amt;
    setWalletBalance(newBal);
    setTopUpAmount("");
    setWalletModalOpen(false);

    // Save in storage & DB
    const updatedUser = { ...user, walletBalance: newBal };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    API.put("/auth/profile", { walletBalance: newBal })
      .then(() => {
        setNotifications(prev => [
          { id: Date.now(), type: "wallet", text: `💳 Added ₹${amt} to your Wallet. New balance: ₹${newBal}.`, time: "Just now", read: false },
          ...prev
        ]);
      })
      .catch(e => console.error(e));
  };

  // Profile Save
  const handleProfileSave = (e) => {
    e.preventDefault();
    API.put("/auth/profile", profileForm)
      .then(res => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("👤 Profile details updated successfully!");
      })
      .catch(err => console.error(err));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddressInput.trim()) return;
    const list = [...profileForm.addresses, newAddressInput.trim()];
    setProfileForm({ ...profileForm, addresses: list });
    setNewAddressInput("");
    API.put("/auth/profile", { addresses: list })
      .then(res => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      });
  };

  const handleRemoveAddress = (idx) => {
    const list = profileForm.addresses.filter((_, i) => i !== idx);
    setProfileForm({ ...profileForm, addresses: list });
    API.put("/auth/profile", { addresses: list })
      .then(res => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      });
  };

  const toggleDietaryPref = (pref) => {
    const current = profileForm.dietaryPreferences;
    const next = current.includes(pref) ? current.filter(p => p !== pref) : [...current, pref];
    setProfileForm({ ...profileForm, dietaryPreferences: next });
    API.put("/auth/profile", { dietaryPreferences: next })
      .then(res => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      });
  };

  // Support
  const handleRaiseTicket = (e) => {
    e.preventDefault();
    if (!newTicket.text) return;
    const ticket = {
      id: "TKT_" + Date.now().toString().slice(-6),
      orderId: newTicket.orderId || "General Inquiry",
      category: newTicket.category,
      text: newTicket.text,
      status: "Open",
      date: new Date().toLocaleDateString()
    };
    setTickets(prev => [ticket, ...prev]);
    setNewTicket({ orderId: "", category: "Late Delivery", text: "" });
    alert(`Ticket ${ticket.id} submitted! Support team will review shortly.`);
  };

  const handleSendSupportChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsgs = [...supportChat, { sender: "user", text: chatInput.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
    setSupportChat(newMsgs);
    setChatInput("");

    setTimeout(() => {
      setSupportChat(prev => [
        ...prev,
        { sender: "agent", text: "Got it. I'm checking that details with our dining supervisor. One moment please.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1500);
  };

  // AI assistant parser
  const handleSendAIChat = (e) => {
    e.preventDefault();
    const query = aiInput.trim();
    if (!query) return;

    processAIQuery(query);
  };

  const processAIQuery = (query) => {
    const userMsg = { sender: "user", text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setAiChat(prev => [...prev, userMsg]);
    setAiInput("");

    setTimeout(() => {
      let responseText = "";
      let matchedItems = [];

      const cleanQuery = query.toLowerCase();

      if (cleanQuery.includes("spicy") && cleanQuery.includes("veg")) {
        matchedItems = MENU_ITEMS.filter(i => i.isVeg && i.isSpicy);
        responseText = "I found these spicy vegetarian dishes on our menu:";
      } else if (cleanQuery.includes("veg") || cleanQuery.includes("vegetarian")) {
        matchedItems = MENU_ITEMS.filter(i => i.isVeg);
        responseText = "Here are some of our popular vegetarian choices:";
      } else if (cleanQuery.includes("spicy")) {
        matchedItems = MENU_ITEMS.filter(i => i.isSpicy);
        responseText = "Feeling adventurous? Check out these spicy culinary specialties:";
      } else if (cleanQuery.includes("under") || cleanQuery.includes("below") || cleanQuery.includes("₹") || cleanQuery.includes("budget") || /\d+/.test(cleanQuery)) {
        // Extract numbers
        const num = cleanQuery.match(/\d+/);
        const limit = num ? Number(num[0]) : 300;
        matchedItems = MENU_ITEMS.filter(i => i.price <= limit);
        responseText = `Here are items priced under ₹${limit}:`;
      } else if (cleanQuery.includes("dessert") || cleanQuery.includes("sweet")) {
        matchedItems = MENU_ITEMS.filter(i => i.category === "Desserts");
        responseText = "Satisfy your sweet tooth with these delicious desserts:";
      } else if (cleanQuery.includes("starter") || cleanQuery.includes("appetizer")) {
        matchedItems = MENU_ITEMS.filter(i => i.category === "Starters");
        responseText = "Start your meal right with these gourmet appetizers:";
      } else if (cleanQuery.includes("recommend") || cleanQuery.includes("similar") || cleanQuery.includes("suggest")) {
        matchedItems = [MENU_ITEMS[0], MENU_ITEMS[1], MENU_ITEMS[9]];
        responseText = "Based on our highest customer ratings, I highly recommend:";
      } else {
        responseText = "I'm not fully sure I understood that. You can ask: 'Suggest a spicy vegetarian dish', 'Show dishes under ₹300', or 'Show me desserts'!";
      }

      setAiChat(prev => [
        ...prev,
        {
          sender: "ai",
          text: responseText,
          items: matchedItems,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  const getUnreadNotificationsCount = () => notifications.filter(n => !n.read).length;

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Filters for items in Order section
  const filteredMenuItems = MENU_ITEMS.filter(item => {
    // Check global search or category filter
    if (globalSearch && !item.name.toLowerCase().includes(globalSearch.toLowerCase()) && !item.category.toLowerCase().includes(globalSearch.toLowerCase())) {
      return false;
    }
    // Filter by profile dietary preference if profile has preferences and order tab is viewed
    const userDietary = profileForm.dietaryPreferences;
    if (userDietary.includes("Vegetarian") && !item.isVeg) return false;
    // (Could add vegan and gluten free filters if items metadata supported it)
    return true;
  });

  return (
    <div className={`dashboard-container ${theme === "dark" ? "dark" : ""}`}>
      {/* 1. LEFT SIDEBAR */}
      <div className="sidebar">
        <div className="d-flex align-items-center justify-content-between p-4 border-bottom border-color">
          <div className="d-flex align-items-center">
            <span className="fs-3 me-2" style={{ textShadow: "0 0 10px rgba(170, 59, 255, 0.4)" }}>✨</span>
            <span className="fw-bold fs-4 text-start sidebar-logo" style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              OCCASIA
            </span>
          </div>
        </div>

        <div className="flex-grow-1 py-3 overflow-y-auto px-2">
          <button onClick={() => { setActiveTab("home"); setIsCartOpen(false); }} className={`sidebar-link w-100 border-0 bg-transparent text-start ${activeTab === "home" ? "active" : ""}`}>
            <HomeIcon className="me-3" />
            <span className="sidebar-text">Home</span>
          </button>
          <button onClick={() => { setActiveTab("bookings"); setIsCartOpen(false); }} className={`sidebar-link w-100 border-0 bg-transparent text-start ${activeTab === "bookings" ? "active" : ""}`}>
            <BookingsIcon className="me-3" />
            <span className="sidebar-text">Bookings</span>
          </button>
          <button onClick={() => { setActiveTab("orders"); setIsCartOpen(false); }} className={`sidebar-link w-100 border-0 bg-transparent text-start ${activeTab === "orders" ? "active" : ""}`}>
            <OrdersIcon className="me-3" />
            <span className="sidebar-text">Orders & Menu</span>
          </button>
          <button onClick={() => { setActiveTab("tracking"); setIsCartOpen(false); }} className={`sidebar-link w-100 border-0 bg-transparent text-start ${activeTab === "tracking" ? "active" : ""}`}>
            <TrackingIcon className="me-3" />
            <span className="sidebar-text">Live Tracking</span>
            {activeOrder && activeOrder.status !== "Delivered" && (
              <span className="badge bg-danger ms-auto badge-glow" style={{ fontSize: "0.65rem", padding: "4px 6px" }}>LIVE</span>
            )}
          </button>
          <button onClick={() => { setActiveTab("favorites"); setIsCartOpen(false); }} className={`sidebar-link w-100 border-0 bg-transparent text-start ${activeTab === "favorites" ? "active" : ""}`}>
            <FavoritesIcon className="me-3" />
            <span className="sidebar-text">Favorites</span>
          </button>
          <button onClick={() => { setActiveTab("rewards"); setIsCartOpen(false); }} className={`sidebar-link w-100 border-0 bg-transparent text-start ${activeTab === "rewards" ? "active" : ""}`}>
            <RewardsIcon className="me-3" />
            <span className="sidebar-text">Rewards & Coupons</span>
          </button>
          <button onClick={() => { setActiveTab("notifications"); setIsCartOpen(false); }} className={`sidebar-link w-100 border-0 bg-transparent text-start ${activeTab === "notifications" ? "active" : ""}`}>
            <NotificationsIcon className="me-3" />
            <span className="sidebar-text">Notifications</span>
            {getUnreadNotificationsCount() > 0 && (
              <span className="badge bg-primary ms-auto" style={{ fontSize: "0.75rem" }}>{getUnreadNotificationsCount()}</span>
            )}
          </button>
          <button onClick={() => { setActiveTab("payments"); setIsCartOpen(false); }} className={`sidebar-link w-100 border-0 bg-transparent text-start ${activeTab === "payments" ? "active" : ""}`}>
            <PaymentsIcon className="me-3" />
            <span className="sidebar-text">Payments</span>
          </button>
          <button onClick={() => { setActiveTab("profile"); setIsCartOpen(false); }} className={`sidebar-link w-100 border-0 bg-transparent text-start ${activeTab === "profile" ? "active" : ""}`}>
            <ProfileIcon className="me-3" />
            <span className="sidebar-text">My Profile</span>
          </button>
          <button onClick={() => { setActiveTab("support"); setIsCartOpen(false); }} className={`sidebar-link w-100 border-0 bg-transparent text-start ${activeTab === "support" ? "active" : ""}`}>
            <SupportIcon className="me-3" />
            <span className="sidebar-text">Support</span>
          </button>
        </div>

        {user && (
          <div className="p-3 border-top border-color d-flex align-items-center justify-content-between bg-light-subtle">
            <div className="d-flex align-items-center overflow-hidden">
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold me-2 flex-shrink-0" style={{ width: "38px", height: "38px" }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-start overflow-hidden sidebar-text">
                <p className="fw-semibold mb-0 text-truncate text-dark-emphasis" style={{ fontSize: "0.85rem" }}>{user.name}</p>
                <p className="text-muted mb-0 text-truncate" style={{ fontSize: "0.75rem" }}>{user.email}</p>
              </div>
            </div>
            <button className="btn p-1 border-0 text-danger hover-lift" onClick={handleLogout} title="Log Out">
              <LogoutIcon size={18} />
            </button>
          </div>
        )}
      </div>

      {/* 2. MAIN VIEWPORT */}
      <div className="main-content">
        {/* TOP HEADER */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom border-color g-3">
          <div className="text-start">
            <span className="text-muted fw-semibold" style={{ fontSize: "0.85rem" }}>DINEVERSE DASHBOARD</span>
            <h2 className="mb-0 fw-bold fs-3 text-capitalize" style={{ color: "var(--text-main)" }}>
              {activeTab === "home" ? "🏠 Home" : activeTab === "bookings" ? "🍽️ Reservations" : activeTab === "orders" ? "🛒 Menu & Orders" : activeTab === "tracking" ? "🚚 Live Tracking" : activeTab === "favorites" ? "❤️ Favorites" : activeTab === "rewards" ? "🎁 Rewards & Coupons" : activeTab === "notifications" ? "🔔 Notifications Center" : activeTab === "payments" ? "💳 Payments & Billing" : activeTab === "profile" ? "👤 My Profile" : "💬 Support Hub"}
            </h2>
          </div>

          <div className="d-flex align-items-center flex-wrap g-2">
            {/* Global search */}
            {activeTab === "orders" && (
              <div className="position-relative me-3" style={{ minWidth: "220px" }}>
                <input
                  type="text"
                  className="form-control-custom w-100 py-1 ps-4"
                  placeholder="Search dishes..."
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  style={{ fontSize: "0.85rem", height: "36px" }}
                />
                <SearchIcon size={14} className="position-absolute text-muted" style={{ left: "10px", top: "11px" }} />
              </div>
            )}

            {/* Quick Wallet balance */}
            <div className="d-flex align-items-center bg-body-tertiary border border-color rounded-3 px-3 py-1 me-3 hover-lift cursor-pointer" onClick={() => setWalletModalOpen(true)} style={{ height: "38px" }}>
              <span className="text-muted me-1 fw-medium" style={{ fontSize: "0.8rem" }}>Wallet:</span>
              <span className="fw-bold text-accent" style={{ fontSize: "0.9rem", color: "var(--accent)" }}>₹{walletBalance}</span>
              <span className="ms-2 text-primary fw-bold" style={{ fontSize: "0.9rem" }}>+</span>
            </div>

            {/* Cart shortcut */}
            <button className="btn border border-color bg-body-tertiary rounded-3 px-3 py-1 d-flex align-items-center me-3 hover-lift position-relative" onClick={() => setIsCartOpen(!isCartOpen)} style={{ height: "38px" }}>
              <CartIcon size={18} className="text-dark-emphasis" />
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.65rem" }}>
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>

            {/* Notifications Shortcut */}
            <button className="btn border border-color bg-body-tertiary rounded-3 p-2 d-flex align-items-center me-3 hover-lift position-relative" onClick={() => setActiveTab("notifications")} style={{ height: "38px", width: "38px" }}>
              <BellIcon size={18} className="text-dark-emphasis mx-auto" />
              {getUnreadNotificationsCount() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-primary border border-light rounded-circle" />
              )}
            </button>

            {/* Theme Toggle */}
            <button className="btn border border-color bg-body-tertiary rounded-3 p-2 d-flex align-items-center hover-lift" onClick={toggleTheme} style={{ height: "38px", width: "38px" }}>
              {theme === "light" ? <MoonIcon size={18} className="mx-auto" /> : <SunIcon size={18} className="mx-auto text-warning" />}
            </button>
          </div>
        </div>

        {/* TAB CONTENTS CONTAINER */}
        <div className="text-start">
          
          {/* ============ TAB: HOME ============ */}
          {activeTab === "home" && (
            <div className="row g-4">
              {/* Daily Special Hero Banner */}
              <div className="col-12">
                <div className="card border-0 shadow-sm text-white overflow-hidden p-4 d-flex flex-column justify-content-end position-relative" style={{ borderRadius: "20px", minHeight: "280px", background: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80') center/cover" }}>
                  <div className="position-absolute top-0 end-0 bg-danger text-white px-3 py-2 fw-bold badge-glow" style={{ borderBottomLeftRadius: "16px" }}>
                    🔥 DEAL OF THE DAY
                  </div>
                  <div className="mt-auto text-start">
                    <span className="badge bg-warning text-dark fw-bold mb-2">30% OFF CHEF'S SPECIAL</span>
                    <h3 className="fw-bold fs-2 text-white mb-2">Gourmet Ribeye Steak & Mash</h3>
                    <p className="text-light-emphasis mb-3 max-w-lg" style={{ fontSize: "0.95rem", maxWidth: "600px" }}>Experience caramelized tenderness prepared with a special thyme glaze. Order today and save ₹100 flat.</p>
                    <div className="d-flex align-items-center flex-wrap g-3">
                      <button className="btn btn-accent px-4 py-2 me-3" onClick={() => {
                        addToCart({ id: "chef_special_steak", name: "Gourmet Ribeye Steak", price: 420, category: "Main Course" });
                        applyPromoCode("SPECIAL30");
                      }}>
                        Claim Special (₹420)
                      </button>
                      <div className="bg-dark bg-opacity-70 px-3 py-2 rounded-3 text-white border border-secondary border-opacity-50">
                        Ends in: <span className="font-monospace fw-bold text-warning">{countdown}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Snapshot Widgets */}
              <div className="col-md-6 col-lg-4">
                <div className="glass-card p-4 h-100 d-flex flex-column">
                  <h4 className="fw-bold text-dark-emphasis mb-3 flex-shrink-0" style={{ fontSize: "1.1rem" }}>📅 Reservation Snapshot</h4>
                  <div className="flex-grow-1 d-flex flex-column justify-content-center text-center">
                    {bookings.filter(b => b.status === "Upcoming").length > 0 ? (
                      (() => {
                        const upcoming = bookings.filter(b => b.status === "Upcoming")[0];
                        return (
                          <div className="text-start bg-body-tertiary p-3 rounded-3 border border-color">
                            <h5 className="fw-bold mb-1 text-accent" style={{ fontSize: "0.95rem", color: "var(--accent)" }}>{upcoming.restaurantName}</h5>
                            <p className="mb-1 text-dark-emphasis" style={{ fontSize: "0.85rem" }}>📅 Date: <strong>{upcoming.date}</strong></p>
                            <p className="mb-1 text-dark-emphasis" style={{ fontSize: "0.85rem" }}>⏰ Time: <strong>{upcoming.timeSlot}</strong></p>
                            <p className="mb-0 text-dark-emphasis" style={{ fontSize: "0.85rem" }}>👥 Guests: <strong>{upcoming.guests} ({upcoming.seatingPreference})</strong></p>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="py-4">
                        <span className="fs-1 d-block mb-2">🍽</span>
                        <p className="text-muted mb-3" style={{ fontSize: "0.85rem" }}>No active table reservations booked.</p>
                        <button className="btn btn-sm btn-outline-primary py-1 px-3" onClick={() => setActiveTab("bookings")}>Book Table Now</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="glass-card p-4 h-100 d-flex flex-column">
                  <h4 className="fw-bold text-dark-emphasis mb-3 flex-shrink-0" style={{ fontSize: "1.1rem" }}>🚚 Active Order Tracker</h4>
                  <div className="flex-grow-1 d-flex flex-column justify-content-center text-center">
                    {activeOrder && activeOrder.status !== "Delivered" ? (
                      <div className="text-start bg-body-tertiary p-3 rounded-3 border border-color">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="badge bg-warning text-dark fw-bold">{activeOrder.status}</span>
                          <span className="text-muted font-monospace" style={{ fontSize: "0.75rem" }}>#{activeOrder._id?.slice(-4)}</span>
                        </div>
                        <p className="mb-2 text-dark-emphasis" style={{ fontSize: "0.85rem" }}>From: <strong>{activeOrder.restaurantName}</strong></p>
                        <div className="progress mb-2" style={{ height: "6px" }}>
                          <div 
                            className="progress-bar progress-bar-striped progress-bar-animated bg-success" 
                            role="progressbar" 
                            style={{ 
                              width: 
                                activeOrder.status === "Order Received" ? "20%" :
                                activeOrder.status === "Preparing Food" ? "40%" :
                                activeOrder.status === "Packed" ? "60%" :
                                activeOrder.status === "Out for Delivery" ? "85%" : "100%"
                            }} 
                          />
                        </div>
                        <button className="btn btn-sm btn-accent w-100 py-1" onClick={() => setActiveTab("tracking")}>Live Track</button>
                      </div>
                    ) : (
                      <div className="py-4">
                        <span className="fs-1 d-block mb-2">🛒</span>
                        <p className="text-muted mb-3" style={{ fontSize: "0.85rem" }}>No active delivery order currently processing.</p>
                        <button className="btn btn-sm btn-outline-primary py-1 px-3" onClick={() => setActiveTab("orders")}>Browse Food Menu</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Food Carousel */}
              <div className="col-lg-4">
                <div className="glass-card p-4 h-100 d-flex flex-column">
                  <h4 className="fw-bold text-dark-emphasis mb-3 flex-shrink-0" style={{ fontSize: "1.1rem" }}>📸 Culinary Food Gallery</h4>
                  <div id="foodGalleryCarousel" className="carousel slide carousel-fade flex-grow-1 rounded-3 overflow-hidden shadow-sm" data-bs-ride="carousel" style={{ minHeight: "150px" }}>
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#foodGalleryCarousel" data-bs-slide-to="0" className="active"></button>
                      <button type="button" data-bs-target="#foodGalleryCarousel" data-bs-slide-to="1"></button>
                      <button type="button" data-bs-target="#foodGalleryCarousel" data-bs-slide-to="2"></button>
                    </div>
                    <div className="carousel-inner h-100">
                      <div className="carousel-item active h-100" data-bs-interval="4000">
                        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80" className="d-block w-100 h-100 object-fit-cover" alt="Bella Pasta" style={{ minHeight: "150px", height: "150px" }} />
                        <div className="carousel-caption p-2 bg-dark bg-opacity-50 start-0 end-0 bottom-0 text-start ps-3">
                          <h6 className="fw-bold text-white mb-0">Handmade Tagliatelle</h6>
                        </div>
                      </div>
                      <div className="carousel-item h-100" data-bs-interval="4000">
                        <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=80" className="d-block w-100 h-100 object-fit-cover" alt="Sushi Zen" style={{ minHeight: "150px", height: "150px" }} />
                        <div className="carousel-caption p-2 bg-dark bg-opacity-50 start-0 end-0 bottom-0 text-start ps-3">
                          <h6 className="fw-bold text-white mb-0">Gourmet Sushi Bar</h6>
                        </div>
                      </div>
                      <div className="carousel-item h-100" data-bs-interval="4000">
                        <img src="https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&auto=format&fit=crop&q=80" className="d-block w-100 h-100 object-fit-cover" alt="Cocktails" style={{ minHeight: "150px", height: "150px" }} />
                        <div className="carousel-caption p-2 bg-dark bg-opacity-50 start-0 end-0 bottom-0 text-start ps-3">
                          <h6 className="fw-bold text-white mb-0">Signature Mixology</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newly Added & Popular Items */}
              <div className="col-lg-8">
                <div className="glass-card p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="fw-bold text-dark-emphasis mb-0" style={{ fontSize: "1.1rem" }}>⭐ Most Popular Dishes</h4>
                    <button className="btn btn-sm text-accent py-0 px-2 fw-semibold" onClick={() => setActiveTab("orders")}>See Menu</button>
                  </div>
                  <div className="row g-3">
                    {MENU_ITEMS.slice(0, 3).map(item => (
                      <div className="col-md-4" key={item.id}>
                        <div className="card border-0 bg-body-tertiary rounded-3 overflow-hidden h-100 shadow-sm d-flex flex-column hover-lift">
                          <img src={item.img} className="card-img-top object-fit-cover" alt={item.name} style={{ height: "120px" }} />
                          <div className="card-body p-3 text-start d-flex flex-column flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <span className={`badge ${item.isVeg ? "bg-success" : "bg-danger"}`} style={{ fontSize: "0.6rem" }}>{item.isVeg ? "Veg" : "Non-Veg"}</span>
                              <div className="d-flex align-items-center text-warning" style={{ fontSize: "0.8rem" }}>
                                <StarIcon size={12} className="me-1 fill-warning" /> {item.rating}
                              </div>
                            </div>
                            <h6 className="fw-bold text-dark-emphasis text-truncate mb-1">{item.name}</h6>
                            <p className="text-muted mb-2 text-truncate-2 flex-grow-1" style={{ fontSize: "0.75rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.desc}</p>
                            <div className="d-flex justify-content-between align-items-center mt-2 flex-shrink-0">
                              <span className="fw-bold text-dark" style={{ fontSize: "0.9rem" }}>₹{item.price}</span>
                              <button className="btn btn-sm btn-accent py-0 px-2 fw-semibold" style={{ fontSize: "0.75rem", minHeight: "24px" }} onClick={() => addToCart(item)}>+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Food Assistant Widget */}
              <div className="col-lg-4">
                <div className="glass-card p-4 d-flex flex-column h-100" style={{ minHeight: "350px" }}>
                  <div className="d-flex align-items-center mb-3">
                    <span className="fs-4 me-2">🤖</span>
                    <h4 className="fw-bold text-dark-emphasis mb-0" style={{ fontSize: "1.1rem" }}>AI Food Assistant</h4>
                  </div>
                  
                  {/* Chat message viewport */}
                  <div className="flex-grow-1 overflow-y-auto mb-3 bg-body-tertiary rounded-3 p-3 border border-color" style={{ maxHeight: "200px", minHeight: "150px" }}>
                    {aiChat.map((msg, idx) => (
                      <div className={`mb-3 text-start ${msg.sender === "user" ? "ps-5" : "pe-5"}`} key={idx}>
                        <div className={`rounded-3 p-2 d-inline-block shadow-sm ${msg.sender === "user" ? "bg-accent text-white float-end" : "bg-body border border-color text-dark-emphasis"}`} style={{ fontSize: "0.85rem", maxWidth: "90%", borderRadius: msg.sender === "user" ? "12px 12px 0 12px" : "12px 12px 12px 0" }}>
                          <p className="mb-0">{msg.text}</p>
                          {msg.items && msg.items.length > 0 && (
                            <div className="mt-2 bg-light-subtle rounded-3 p-2 border border-color">
                              {msg.items.map(item => (
                                <div className="d-flex justify-content-between align-items-center mb-1 pb-1 border-bottom border-color-light" key={item.id}>
                                  <span className="fw-semibold text-truncate text-dark" style={{ fontSize: "0.75rem", maxWidth: "120px" }}>{item.name}</span>
                                  <div className="d-flex align-items-center">
                                    <span className="fw-bold text-accent me-2" style={{ fontSize: "0.75rem" }}>₹{item.price}</span>
                                    <button className="btn btn-sm btn-accent py-0 px-1" style={{ fontSize: "0.65rem", padding: "1px 4px" }} onClick={() => addToCart(item)}>Add</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="clearfix" />
                      </div>
                    ))}
                    <div ref={aiChatEndRef} />
                  </div>

                  {/* Suggestion Chips */}
                  <div className="d-flex flex-wrap g-1 mb-2">
                    <button className="btn btn-sm btn-outline-secondary py-0 px-2 mb-1 me-1 text-truncate" style={{ fontSize: "0.7rem", maxWidth: "100%" }} onClick={() => processAIQuery("Suggest a spicy vegetarian dish")}>🌶 Veg & Spicy</button>
                    <button className="btn btn-sm btn-outline-secondary py-0 px-2 mb-1 me-1 text-truncate" style={{ fontSize: "0.7rem", maxWidth: "100%" }} onClick={() => processAIQuery("Show dishes under ₹300")}>💰 Under ₹300</button>
                    <button className="btn btn-sm btn-outline-secondary py-0 px-2 mb-1 me-1 text-truncate" style={{ fontSize: "0.7rem", maxWidth: "100%" }} onClick={() => processAIQuery("Show me desserts")}>🍰 Desserts</button>
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendAIChat} className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control-custom py-1 flex-grow-1"
                      placeholder="Ask the AI chef..."
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      style={{ fontSize: "0.85rem", height: "36px" }}
                    />
                    <button type="submit" className="btn btn-accent p-0 d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
                      <SendIcon size={14} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ============ TAB: BOOKINGS ============ */}
          {activeTab === "bookings" && (
            <div className="row g-4">
              {/* Seating Preference Visual Panel */}
              <div className="col-12">
                <div className="glass-card p-4">
                  <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>🗺 Seating Layout & Zones</h4>
                  <div className="row g-3">
                    {[
                      { key: "Indoor", name: "Indoor Fine Dining", capacity: "40 seats", icon: "🏢", desc: "Elegant quiet interior, temperature controlled classic lounge.", bg: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400')" },
                      { key: "Outdoor", name: "Terrace Skyline Lounge", capacity: "25 seats", icon: "🌅", desc: "Enjoy open air breeze with sunset views and glowing warm deck lights.", bg: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400')" },
                      { key: "Family Area", name: "Spacious Family Zone", capacity: "30 seats", icon: "👨‍👩‍👧", desc: "Comfortable long tables, child-friendly highchairs, and soft play corner.", bg: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400')" },
                      { key: "VIP Table", name: "Exclusive VIP Lounges", capacity: "12 seats", icon: "👑", desc: "Premium butler service, private dining partition, and custom light schemes.", bg: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400')" }
                    ].map(zone => (
                      <div className="col-md-6 col-lg-3" key={zone.key}>
                        <div 
                          onClick={() => setNewBooking({ ...newBooking, seatingPreference: zone.key })}
                          className={`card border-0 text-white p-3 h-100 cursor-pointer hover-lift d-flex flex-column justify-content-end overflow-hidden position-relative ${newBooking.seatingPreference === zone.key ? "border-accent border-2 shadow" : ""}`} 
                          style={{ 
                            borderRadius: "12px", 
                            minHeight: "130px", 
                            background: `${zone.bg} center/cover`,
                            border: newBooking.seatingPreference === zone.key ? "3px solid var(--accent) !important" : "none"
                          }}
                        >
                          <div className="position-absolute top-0 start-0 p-2 bg-dark bg-opacity-60 rounded-bottom-end" style={{ borderBottomRightRadius: "8px" }}>
                            <span style={{ fontSize: "1.2rem" }}>{zone.icon}</span>
                          </div>
                          <div className="mt-auto">
                            <h6 className="fw-bold mb-0 text-white">{zone.name}</h6>
                            <p className="text-white-50 mb-1" style={{ fontSize: "0.75rem" }}>Capacity: {zone.capacity}</p>
                            <p className="text-white-50 mb-0 font-light text-truncate" style={{ fontSize: "0.7rem" }}>{zone.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reservation Form */}
              <div className="col-lg-5">
                <div className="glass-card p-4">
                  <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>🍽 Reserve a Table</h4>
                  <form onSubmit={handleBookingSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold text-secondary" style={{ fontSize: "0.85rem" }}>Select Restaurant</label>
                      <select 
                        className="form-select form-control-custom py-2"
                        value={newBooking.restaurantId}
                        onChange={(e) => {
                          const r = restaurants.find(res => res._id === e.target.value);
                          if (r) {
                            setNewBooking({ ...newBooking, restaurantId: r._id, restaurantName: r.name });
                          }
                        }}
                      >
                        {restaurants.map(r => (
                          <option key={r._id} value={r._id}>{r.name} ({r.location})</option>
                        ))}
                      </select>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold text-secondary" style={{ fontSize: "0.85rem" }}>Date</label>
                        <input
                          type="date"
                          className="form-control form-control-custom"
                          value={newBooking.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold text-secondary" style={{ fontSize: "0.85rem" }}>Time Slot</label>
                        <select
                          className="form-select form-control-custom"
                          value={newBooking.timeSlot}
                          onChange={(e) => setNewBooking({ ...newBooking, timeSlot: e.target.value })}
                        >
                          <option value="12:00">12:00 PM (Lunch)</option>
                          <option value="13:00">01:00 PM (Lunch)</option>
                          <option value="14:00">02:00 PM (Lunch)</option>
                          <option value="19:00">07:00 PM (Dinner)</option>
                          <option value="20:00">08:00 PM (Dinner)</option>
                          <option value="21:00">09:00 PM (Dinner)</option>
                          <option value="22:00">10:00 PM (Dinner)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold text-secondary d-flex justify-content-between" style={{ fontSize: "0.85rem" }}>
                        <span>Number of Guests</span>
                        <span className="text-accent fw-bold">{newBooking.guests} Guests</span>
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        min="1"
                        max="10"
                        value={newBooking.guests}
                        onChange={(e) => setNewBooking({ ...newBooking, guests: e.target.value })}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold text-secondary" style={{ fontSize: "0.85rem" }}>Special Requests</label>
                      <div className="d-flex flex-wrap gap-2">
                        {[
                          { key: "Birthday", label: "🎂 Birthday Celebration" },
                          { key: "Anniversary", label: "💖 Anniversary Dinner" },
                          { key: "Wheelchair", label: "♿ Wheelchair Access" },
                          { key: "High Chair", label: "👶 Infant High Chair" }
                        ].map(req => {
                          const isSelected = newBooking.specialRequests.includes(req.key);
                          return (
                            <button
                              type="button"
                              key={req.key}
                              className={`btn btn-sm rounded-pill border py-1 px-3 ${isSelected ? "btn-accent border-transparent" : "btn-light border-color text-muted"}`}
                              onClick={() => {
                                const list = isSelected ? newBooking.specialRequests.filter(k => k !== req.key) : [...newBooking.specialRequests, req.key];
                                setNewBooking({ ...newBooking, specialRequests: list });
                              }}
                              style={{ fontSize: "0.8rem" }}
                            >
                              {req.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button type="submit" className="btn btn-accent w-100 py-3 shadow">Confirm Table Reservation</button>
                  </form>
                </div>
              </div>

              {/* Bookings List */}
              <div className="col-lg-7">
                <div className="glass-card p-4 h-100">
                  <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>📅 Reservation History</h4>
                  
                  {bookings.length === 0 ? (
                    <div className="text-center py-5">
                      <span className="fs-1 d-block mb-2">📅</span>
                      <p className="text-muted">No reservations booked yet.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table align-middle">
                        <thead>
                          <tr className="text-muted" style={{ fontSize: "0.85rem" }}>
                            <th>Restaurant</th>
                            <th>Date / Slot</th>
                            <th>Details</th>
                            <th>Status</th>
                            <th className="text-end">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map(b => (
                            <tr key={b._id} className="border-bottom border-color">
                              <td>
                                <span className="fw-bold text-dark-emphasis d-block" style={{ fontSize: "0.9rem" }}>{b.restaurantName}</span>
                                <span className="text-muted" style={{ fontSize: "0.75rem" }}>#{b._id.slice(-6)}</span>
                              </td>
                              <td>
                                <span className="d-block fw-semibold text-dark-emphasis" style={{ fontSize: "0.85rem" }}>{b.date}</span>
                                <span className="text-muted" style={{ fontSize: "0.75rem" }}>{b.timeSlot}</span>
                              </td>
                              <td>
                                <span className="badge bg-secondary-subtle text-secondary-emphasis" style={{ fontSize: "0.75rem" }}>{b.guests} Guests</span>
                                <span className="badge bg-light text-dark border ms-1" style={{ fontSize: "0.75rem" }}>{b.seatingPreference}</span>
                              </td>
                              <td>
                                <span className={`badge ${b.status === "Upcoming" ? "bg-success-light text-success" : "bg-secondary text-white-50"}`} style={{ fontSize: "0.8rem" }}>
                                  {b.status}
                                </span>
                              </td>
                              <td className="text-end">
                                {b.status === "Upcoming" && (
                                  <div className="d-flex justify-content-end gap-1">
                                    <button 
                                      className="btn btn-sm btn-outline-primary p-1 border-0" 
                                      onClick={() => setQrCodeModal(b)} 
                                      title="Show QR Code Check-in"
                                    >
                                      🎫 QR
                                    </button>
                                    <button 
                                      className="btn btn-sm btn-outline-danger p-1 border-0" 
                                      onClick={() => handleCancelBooking(b._id)}
                                      title="Cancel Booking"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============ TAB: ORDERS (MENU) ============ */}
          {activeTab === "orders" && (
            <div className="row g-4">
              {/* Restaurants Discovery Menu selection */}
              <div className="col-12">
                <div className="glass-card p-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div className="d-flex align-items-center">
                    <span className="fs-4 me-2">🏢</span>
                    <span className="fw-semibold text-dark-emphasis" style={{ fontSize: "0.95rem" }}>Select Diner:</span>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {restaurants.map(r => (
                      <button
                        key={r._id}
                        onClick={() => setSelectedResto(r)}
                        className={`btn btn-sm rounded-3 py-2 px-3 fw-semibold border ${selectedResto?._id === r._id ? "btn-accent border-transparent" : "btn-light border-color text-muted"}`}
                        style={{ fontSize: "0.85rem" }}
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Menu Explorer Sidebar Filters & Items Grid */}
              <div className="col-12">
                <div className="row g-4">
                  {/* Category filters */}
                  <div className="col-md-3">
                    <div className="glass-card p-4">
                      <h5 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1rem" }}>Filters & Preferences</h5>
                      
                      {profileForm.dietaryPreferences.includes("Vegetarian") && (
                        <div className="alert alert-success d-flex align-items-center py-2 px-3 mb-3 border-0" style={{ borderRadius: "8px", fontSize: "0.8rem" }}>
                          <span>🥗 Veg-only Filter active based on profile dietary preferences.</span>
                        </div>
                      )}

                      <div className="mb-4">
                        <label className="form-label text-muted fw-semibold mb-2" style={{ fontSize: "0.8rem" }}>DIETARY PREFERENCES</label>
                        <div className="d-flex flex-column gap-2 text-start">
                          <label className="d-flex align-items-center cursor-pointer text-dark-emphasis" style={{ fontSize: "0.85rem" }}>
                            <input 
                              type="checkbox" 
                              className="form-check-input me-2"
                              checked={profileForm.dietaryPreferences.includes("Vegetarian")}
                              onChange={() => toggleDietaryPref("Vegetarian")}
                            />
                            Vegetarian (Veg)
                          </label>
                          <label className="d-flex align-items-center cursor-pointer text-dark-emphasis" style={{ fontSize: "0.85rem" }}>
                            <input 
                              type="checkbox" 
                              className="form-check-input me-2"
                              checked={profileForm.dietaryPreferences.includes("Vegan")}
                              onChange={() => toggleDietaryPref("Vegan")}
                            />
                            Vegan
                          </label>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-muted fw-semibold mb-2" style={{ fontSize: "0.8rem" }}>ACTIVE COUPON SCHEMES</label>
                        <div className="d-flex flex-column gap-2 text-start">
                          {PROMO_CODES.map(p => (
                            <div className="border border-color border-opacity-70 bg-body-tertiary rounded-3 p-2 cursor-pointer hover-lift" key={p.code} onClick={() => applyPromoCode(p.code)}>
                              <div className="d-flex justify-content-between mb-1">
                                <span className="font-monospace fw-bold text-accent" style={{ fontSize: "0.75rem", color: "var(--accent)" }}>{p.code}</span>
                                <span className="badge bg-primary" style={{ fontSize: "0.6rem" }}>Apply</span>
                              </div>
                              <p className="text-muted mb-0" style={{ fontSize: "0.7rem", lineHeight: "1.2" }}>{p.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items Grid */}
                  <div className="col-md-9">
                    <div className="glass-card p-4">
                      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2 border-color">
                        <h4 className="fw-bold text-dark-emphasis mb-0" style={{ fontSize: "1.1rem" }}>😋 Browse Menu Items</h4>
                        <span className="text-muted" style={{ fontSize: "0.85rem" }}>Showing {filteredMenuItems.length} dishes</span>
                      </div>

                      {filteredMenuItems.length === 0 ? (
                        <div className="text-center py-5">
                          <span className="fs-1 d-block mb-2">🍽</span>
                          <p className="text-muted">No dishes match your query or preferences.</p>
                        </div>
                      ) : (
                        <div className="row g-3">
                          {filteredMenuItems.map(item => {
                            const cartItem = cart.find(i => i.id === item.id);
                            return (
                              <div className="col-md-6 col-lg-4" key={item.id}>
                                <div className="card border-0 bg-body-tertiary rounded-3 overflow-hidden h-100 shadow-sm d-flex flex-column hover-lift">
                                  <div className="position-relative">
                                    <img src={item.img} className="card-img-top object-fit-cover" alt={item.name} style={{ height: "130px" }} />
                                    <button 
                                      className="btn btn-sm rounded-circle bg-white shadow-sm p-1 position-absolute top-0 end-0 m-2 border-0" 
                                      onClick={() => toggleFavorite(item)}
                                      style={{ width: "28px", height: "28px" }}
                                    >
                                      <span style={{ fontSize: "0.9rem", color: favorites.find(f => f.id === item.id) ? "red" : "#ccc" }}>❤️</span>
                                    </button>
                                  </div>
                                  <div className="card-body p-3 text-start d-flex flex-column flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                      <span className={`badge ${item.isVeg ? "bg-success" : "bg-danger"}`} style={{ fontSize: "0.6rem" }}>{item.isVeg ? "Veg" : "Non-Veg"}</span>
                                      <div className="d-flex align-items-center text-warning" style={{ fontSize: "0.8rem" }}>
                                        <StarIcon size={12} className="me-1 fill-warning" /> {item.rating}
                                      </div>
                                    </div>
                                    <h6 className="fw-bold text-dark-emphasis mb-1 text-truncate">{item.name}</h6>
                                    <p className="text-muted mb-3 flex-grow-1 text-truncate-2" style={{ fontSize: "0.75rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.desc}</p>
                                    <div className="d-flex justify-content-between align-items-center mt-auto flex-shrink-0">
                                      <span className="fw-bold text-dark fs-5">₹{item.price}</span>
                                      {cartItem ? (
                                        <div className="d-flex align-items-center gap-2 border border-color rounded-pill bg-white px-2 py-0">
                                          <button className="btn btn-sm p-0 border-0 text-muted" onClick={() => updateCartQuantity(item.id, -1)} style={{ width: "18px" }}><MinusIcon size={12} /></button>
                                          <span className="fw-bold text-dark-emphasis" style={{ fontSize: "0.85rem", minWidth: "12px", textAlign: "center" }}>{cartItem.quantity}</span>
                                          <button className="btn btn-sm p-0 border-0 text-muted" onClick={() => updateCartQuantity(item.id, 1)} style={{ width: "18px" }}><PlusIcon size={12} /></button>
                                        </div>
                                      ) : (
                                        <button className="btn btn-sm btn-accent py-1 px-3 fw-semibold rounded-pill" onClick={() => addToCart(item)} style={{ fontSize: "0.8rem" }}>Add</button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ TAB: LIVE TRACKING ============ */}
          {activeTab === "tracking" && (
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="glass-card p-4 h-100">
                  <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>🚚 Order Stepper</h4>
                  
                  {activeOrder ? (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3 bg-body-tertiary p-3 rounded-3 border border-color">
                        <div>
                          <span className="text-muted d-block" style={{ fontSize: "0.75rem" }}>ACTIVE ORDER ID</span>
                          <span className="fw-bold font-monospace text-dark-emphasis" style={{ fontSize: "1rem" }}>#{activeOrder._id}</span>
                        </div>
                        <div className="text-end">
                          <span className="text-muted d-block" style={{ fontSize: "0.75rem" }}>RESTAURANT</span>
                          <span className="fw-bold text-accent" style={{ fontSize: "0.95rem", color: "var(--accent)" }}>{activeOrder.restaurantName}</span>
                        </div>
                      </div>

                      {/* Timeline Stepper */}
                      <div className="tracking-stepper mt-4">
                        <div className="stepper-progress" style={{ 
                          width: 
                            activeOrder.status === "Order Received" ? "0%" :
                            activeOrder.status === "Preparing Food" ? "25%" :
                            activeOrder.status === "Packed" ? "50%" :
                            activeOrder.status === "Out for Delivery" ? "75%" : "100%"
                        }} />
                        {[
                          { key: "Order Received", label: "Received", icon: "🧾" },
                          { key: "Preparing Food", label: "Preparing", icon: "🍳" },
                          { key: "Packed", label: "Packed", icon: "📦" },
                          { key: "Out for Delivery", label: "Out for Delivery", icon: "🚚" },
                          { key: "Delivered", label: "Delivered", icon: "✅" }
                        ].map((step, index) => {
                          const orderStatuses = ["Order Received", "Preparing Food", "Packed", "Out for Delivery", "Delivered"];
                          const curIdx = orderStatuses.indexOf(activeOrder.status);
                          const isCompleted = curIdx > index;
                          const isActive = curIdx === index;
                          
                          return (
                            <div className={`step-node ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`} key={step.key}>
                              <div className="step-circle">
                                {isCompleted ? <CheckIcon size={20} /> : step.icon}
                              </div>
                              <span className="step-label">{step.label}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Tracker info */}
                      <div className="mt-4 p-3 bg-light-subtle rounded-3 border border-color">
                        <h5 className="fw-bold mb-2 text-dark-emphasis" style={{ fontSize: "0.95rem" }}>Status Detail</h5>
                        <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                          {activeOrder.status === "Order Received" && "We have received your order and are validating details."}
                          {activeOrder.status === "Preparing Food" && "Chef Sanjay and culinary crew are preparing your gourmet items!"}
                          {activeOrder.status === "Packed" && "Your order is freshly packed in eco-friendly wraps and sealed."}
                          {activeOrder.status === "Out for Delivery" && "Delivery Executive Rohan Sharma is on his way to your address!"}
                          {activeOrder.status === "Delivered" && "Enjoy your delicious hot meal! Leave us a review on Support."}
                        </p>
                      </div>

                      {/* Delivery Partner */}
                      {["Out for Delivery", "Delivered"].includes(activeOrder.status) && (
                        <div className="mt-3 p-3 bg-body-tertiary rounded-3 border border-color d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary text-white d-flex align-items-center justify-content-center fw-bold rounded-circle me-3" style={{ width: "42px", height: "42px" }}>
                              RS
                            </div>
                            <div className="text-start">
                              <span className="text-muted d-block" style={{ fontSize: "0.75rem" }}>DELIVERY PARTNER</span>
                              <span className="fw-bold text-dark-emphasis" style={{ fontSize: "0.9rem" }}>{activeOrder.deliveryDetails.name}</span>
                              <span className="text-muted ms-2" style={{ fontSize: "0.75rem" }}>⭐ 4.9</span>
                            </div>
                          </div>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => alert(`Dialing Rohan Sharma at ${activeOrder.deliveryDetails.phone}...`)}>
                            Call Agent
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <span className="fs-1 d-block mb-2">🚚</span>
                      <p className="text-muted">No active orders currently running. Go to the menu and place a food order.</p>
                      <button className="btn btn-accent px-4 mt-2" onClick={() => setActiveTab("orders")}>Browse Menu</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Visual Map Simulator */}
              <div className="col-lg-6">
                <div className="glass-card p-4 h-100 d-flex flex-column">
                  <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>🗺 Live Map Simulator</h4>
                  <div className="flex-grow-1 bg-body-tertiary border border-color rounded-3 p-3 d-flex flex-column align-items-center justify-content-center text-center relative" style={{ minHeight: "220px", position: "relative" }}>
                    {activeOrder ? (
                      <div className="w-100 h-100">
                        {/* Inline SVG Map simulation */}
                        <svg className="w-100 h-100" viewBox="0 0 400 220" style={{ maxHeight: "220px" }}>
                          {/* Map Roads lines */}
                          <path d="M 30,50 L 370,50 C 370,50 370,180 370,180 L 150,180 L 150,110 L 30,110 Z" fill="none" stroke="var(--border-color)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                          
                          {/* Animated transit path */}
                          <path d="M 30,50 L 370,50 L 370,180 L 150,180 L 150,110" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="animated-path" />

                          {/* Restaurant pin */}
                          <g transform="translate(30, 50)">
                            <circle r="12" fill="var(--success)" opacity="0.3" className="badge-glow" />
                            <circle r="6" fill="var(--success)" />
                            <text y="-16" x="-10" fill="var(--text-main)" fontSize="9" fontWeight="bold">Kitchen</text>
                          </g>

                          {/* Delivery Agent Node */}
                          {(() => {
                            let transX = 30;
                            let transY = 50;

                            if (activeOrder.status === "Preparing Food") {
                              transX = 90; transY = 50;
                            } else if (activeOrder.status === "Packed") {
                              transX = 200; transY = 50;
                            } else if (activeOrder.status === "Out for Delivery") {
                              transX = 370; transY = 110;
                            } else if (activeOrder.status === "Delivered") {
                              transX = 150; transY = 110;
                            }

                            return (
                              <g transform={`translate(${transX}, ${transY})`} style={{ transition: "transform 2s ease" }}>
                                <circle r="16" fill="var(--accent)" opacity="0.3" className="badge-glow" />
                                <circle r="8" fill="var(--accent)" />
                                <text y="-20" x="-15" fill="var(--text-main)" fontSize="10" fontWeight="bold">🏍 Rider</text>
                              </g>
                            );
                          })()}

                          {/* Customer address pin */}
                          <g transform="translate(150, 110)">
                            <circle r="12" fill="var(--danger)" opacity="0.3" className="badge-glow" />
                            <circle r="6" fill="var(--danger)" />
                            <text y="-16" x="-10" fill="var(--text-main)" fontSize="9" fontWeight="bold">Home</text>
                          </g>
                        </svg>
                        <div className="mt-2 text-center text-muted" style={{ fontSize: "0.8rem" }}>
                          Estimated Delivery: <span className="fw-bold text-accent">20-30 mins</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="fs-1">🗺</span>
                        <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.85rem" }}>Map simulator is active during ongoing orders.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ TAB: FAVORITES ============ */}
          {activeTab === "favorites" && (
            <div className="glass-card p-4">
              <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>❤️ Favorite Dishes</h4>
              
              {favorites.length === 0 ? (
                <div className="text-center py-5">
                  <span className="fs-1 d-block mb-2">❤️</span>
                  <p className="text-muted">No favorite items saved yet.</p>
                  <button className="btn btn-sm btn-outline-primary py-1 px-3" onClick={() => setActiveTab("orders")}>Explore Menu</button>
                </div>
              ) : (
                <div className="row g-3">
                  {favorites.map(item => (
                    <div className="col-md-6 col-lg-3" key={item.id}>
                      <div className="card border-0 bg-body-tertiary rounded-3 overflow-hidden h-100 shadow-sm d-flex flex-column hover-lift">
                        <img src={item.img || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300"} className="card-img-top object-fit-cover" alt={item.name} style={{ height: "120px" }} />
                        <div className="card-body p-3 text-start d-flex flex-column flex-grow-1">
                          <h6 className="fw-bold text-dark-emphasis mb-1 text-truncate">{item.name}</h6>
                          <span className="text-accent fw-bold mb-3 d-block" style={{ fontSize: "0.9rem", color: "var(--accent)" }}>₹{item.price}</span>
                          <div className="d-flex gap-2 mt-auto">
                            <button className="btn btn-sm btn-accent flex-grow-1 py-1" onClick={() => addToCart(item)}>Add to Cart</button>
                            <button className="btn btn-sm btn-outline-danger p-1 border-0" onClick={() => toggleFavorite(item)}>✕</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============ TAB: REWARDS ============ */}
          {activeTab === "rewards" && (
            <div className="row g-4">
              {/* Membership Tier status */}
              <div className="col-md-5">
                <div className="card border-0 text-white p-4 h-100 d-flex flex-column justify-content-between position-relative shadow" style={{ borderRadius: "20px", background: "linear-gradient(135deg, #1e1e2f 0%, #111119 100%)" }}>
                  <div className="position-absolute top-0 end-0 p-3 text-warning fw-bold fs-4">
                    👑 GOLD
                  </div>
                  <div>
                    <span className="text-white-50 d-block" style={{ fontSize: "0.8rem" }}>OCCASIA CLUB MEMBER</span>
                    <h3 className="fw-bold text-white fs-3 mb-4">{user?.name}</h3>
                    
                    <div className="mb-4">
                      <div className="d-flex justify-content-between text-white-50 mb-1" style={{ fontSize: "0.8rem" }}>
                        <span>Loyalty points: <strong>{loyaltyPoints}</strong></span>
                        <span>Next Tier: 500 pts</span>
                      </div>
                      <div className="progress bg-secondary" style={{ height: "8px" }}>
                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${Math.min((loyaltyPoints / 500) * 100, 100)}%` }} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-top border-secondary pt-3 mt-4">
                    <span className="text-white-50 d-block mb-1" style={{ fontSize: "0.75rem" }}>Tier Perk active:</span>
                    <span className="text-warning fw-bold" style={{ fontSize: "0.85rem" }}>🌟 10% Extra Cashback points on food order checkout.</span>
                  </div>
                </div>
              </div>

              {/* Coupons list */}
              <div className="col-md-7">
                <div className="glass-card p-4 h-100">
                  <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>🎁 Available Coupons</h4>
                  <div className="row g-3">
                    {PROMO_CODES.map(p => (
                      <div className="col-12" key={p.code}>
                        <div className="border border-color rounded-3 p-3 bg-body-tertiary d-flex flex-wrap align-items-center justify-content-between gap-3 hover-lift">
                          <div>
                            <span className="badge bg-primary-subtle text-primary font-monospace fw-bold py-1 px-3 fs-6 mb-2 d-inline-block">{p.code}</span>
                            <h6 className="fw-bold text-dark-emphasis mb-1" style={{ fontSize: "0.9rem" }}>{p.desc}</h6>
                            <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>Min spend: ₹{p.minSpend}</p>
                          </div>
                          <button className="btn btn-sm btn-accent py-2 px-3 fw-bold" onClick={() => {
                            applyPromoCode(p.code);
                            alert(`Promo code '${p.code}' applied to cart!`);
                          }}>
                            Apply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Referral Sharing Panel */}
              <div className="col-12">
                <div className="glass-card p-4">
                  <h4 className="fw-bold text-dark-emphasis mb-2" style={{ fontSize: "1.1rem" }}>🔗 Referral Program</h4>
                  <p className="text-muted mb-3" style={{ fontSize: "0.85rem" }}>Invite your gourmet friends to Occasia! They get ₹100 starter wallet credit, and you earn 100 Loyalty Points when they make their first booking.</p>
                  
                  <div className="input-group" style={{ maxWidth: "500px" }}>
                    <input 
                      type="text" 
                      className="form-control form-control-custom border-end-0" 
                      value={`https://dineverse.occasia.com/invite?ref=OCC_${user?._id?.slice(-5)}`}
                      readOnly 
                      style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
                    />
                    <button className="btn btn-accent px-4" onClick={() => {
                      navigator.clipboard.writeText(`https://dineverse.occasia.com/invite?ref=OCC_${user?._id?.slice(-5)}`);
                      alert("Referral link copied to clipboard!");
                    }} style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
                      Copy Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ TAB: NOTIFICATIONS ============ */}
          {activeTab === "notifications" && (
            <div className="glass-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2 border-color">
                <h4 className="fw-bold text-dark-emphasis mb-0" style={{ fontSize: "1.1rem" }}>🔔 Notifications Center</h4>
                {getUnreadNotificationsCount() > 0 && (
                  <button className="btn btn-sm btn-outline-secondary py-1 px-3" onClick={markAllNotificationsAsRead}>
                    Mark all as read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-5">
                  <span className="fs-1 d-block mb-2">🔔</span>
                  <p className="text-muted">No notifications received.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {notifications.map(n => (
                    <div className={`p-3 rounded-3 border ${n.read ? "bg-body border-color" : "bg-primary-subtle border-primary-subtle"}`} key={n.id}>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="fw-bold text-dark-emphasis" style={{ fontSize: "0.85rem" }}>
                          {n.type === "order" ? "🚚 Order Update" : n.type === "booking" ? "🍽 Table Reservation" : n.type === "wallet" ? "💳 Wallet Transaction" : "📢 System Announcement"}
                        </span>
                        <span className="text-muted" style={{ fontSize: "0.75rem" }}>{n.time}</span>
                      </div>
                      <p className="text-dark-emphasis mb-0" style={{ fontSize: "0.85rem" }}>{n.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============ TAB: PAYMENTS ============ */}
          {activeTab === "payments" && (
            <div className="row g-4">
              {/* Wallet Card display */}
              <div className="col-md-6">
                <div className="card border-0 text-white p-4 h-100 d-flex flex-column justify-content-between shadow" style={{ borderRadius: "20px", background: "linear-gradient(135deg, #aa3bff 0%, #6366f1 100%)" }}>
                  <div>
                    <span className="text-white-50 d-block" style={{ fontSize: "0.8rem" }}>OCCASIA SECURE WALLET</span>
                    <h3 className="fw-bold text-white fs-1 mb-2 mt-1">₹{walletBalance}</h3>
                    <p className="text-white-50 mb-0" style={{ fontSize: "0.85rem" }}>Linked account: {user?.email}</p>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mt-5">
                    <span className="font-monospace text-white-50" style={{ fontSize: "0.9rem" }}>•••• •••• •••• 9812</span>
                    <button className="btn btn-light text-primary fw-bold px-4 py-2" onClick={() => setWalletModalOpen(true)}>
                      Top Up Wallet
                    </button>
                  </div>
                </div>
              </div>

              {/* Saved Credit/Debit cards */}
              <div className="col-md-6">
                <div className="glass-card p-4 h-100">
                  <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>💳 Saved Cards</h4>
                  
                  <div className="d-flex flex-column gap-3">
                    {[
                      { brand: "Visa", number: "•••• •••• •••• 4421", expiry: "12/28", holder: "John Doe", color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" },
                      { brand: "Mastercard", number: "•••• •••• •••• 7712", expiry: "06/29", holder: "John Doe", color: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)" }
                    ].map(card => (
                      <div className="card text-white border-0 p-3 shadow-sm" style={{ background: card.color, borderRadius: "12px", minHeight: "100px" }} key={card.number}>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="fw-bold fs-5">{card.brand}</span>
                          <span className="font-monospace text-white-50">{card.expiry}</span>
                        </div>
                        <h6 className="font-monospace text-white fs-6 mb-2">{card.number}</h6>
                        <span className="text-white-50" style={{ fontSize: "0.75rem" }}>{card.holder}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transactions List */}
              <div className="col-12">
                <div className="glass-card p-4">
                  <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>🧾 Billing & Invoice History</h4>
                  
                  {orderHistory.length === 0 ? (
                    <div className="text-center py-4 text-muted">No transactions recorded yet.</div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table align-middle">
                        <thead>
                          <tr className="text-muted" style={{ fontSize: "0.85rem" }}>
                            <th>Order ID</th>
                            <th>Restaurant</th>
                            <th>Date placed</th>
                            <th>Total Amount</th>
                            <th>Payment</th>
                            <th className="text-end">Receipt</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderHistory.map(order => (
                            <tr key={order._id} className="border-bottom border-color">
                              <td className="font-monospace fw-semibold" style={{ fontSize: "0.85rem" }}>#{order._id.slice(-6)}</td>
                              <td className="fw-bold text-dark-emphasis" style={{ fontSize: "0.85rem" }}>{order.restaurantName}</td>
                              <td className="text-muted" style={{ fontSize: "0.8rem" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                              <td className="fw-bold text-dark-emphasis" style={{ fontSize: "0.85rem" }}>₹{order.total}</td>
                              <td>
                                <span className="badge bg-success-light text-success" style={{ fontSize: "0.75rem" }}>Paid via Wallet</span>
                              </td>
                              <td className="text-end">
                                <button className="btn btn-sm btn-outline-primary py-1 px-3" onClick={() => {
                                  // Mock Receipt View
                                  alert(`Invoice #${order._id.slice(-6)}\n---------------------\nSubtotal: ₹${order.subtotal}\nDiscount: ₹${order.discount}\nTax: ₹${order.tax}\nTotal Charged: ₹${order.total}\n\nThank you for dining at ${order.restaurantName}!`);
                                }}>
                                  View Invoice
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============ TAB: PROFILE ============ */}
          {activeTab === "profile" && (
            <div className="row g-4">
              {/* Profile Details Edit Form */}
              <div className="col-lg-6">
                <div className="glass-card p-4 h-100">
                  <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>👤 Personal Information</h4>
                  <form onSubmit={handleProfileSave}>
                    <div className="mb-3">
                      <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.85rem" }}>Full Name</label>
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.85rem" }}>Email Address</label>
                      <input
                        type="email"
                        className="form-control form-control-custom"
                        value={profileForm.email}
                        disabled
                        style={{ opacity: "0.7" }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.85rem" }}>Mobile Number</label>
                      <input
                        type="tel"
                        className="form-control form-control-custom"
                        value={profileForm.phone}
                        placeholder="+91 XXXXX XXXXX"
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.85rem" }}>Date of Birth</label>
                      <input
                        type="date"
                        className="form-control form-control-custom"
                        value={profileForm.dob}
                        onChange={(e) => setProfileForm({ ...profileForm, dob: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn btn-accent px-4 py-2 w-100 shadow-sm">Save Changes</button>
                  </form>
                </div>
              </div>

              {/* Delivery Address & Dietary Preferences Manager */}
              <div className="col-lg-6">
                <div className="d-flex flex-column gap-4 h-100">
                  {/* Addresses */}
                  <div className="glass-card p-4">
                    <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>🚚 Saved Shipping Addresses</h4>
                    <div className="d-flex flex-column gap-2 mb-3">
                      {profileForm.addresses.map((addr, index) => (
                        <div className="d-flex align-items-center justify-content-between p-2 rounded bg-body border border-color" key={index}>
                          <div className="d-flex align-items-center overflow-hidden">
                            <span className="me-2 text-muted">📍</span>
                            <span className="text-dark-emphasis text-truncate" style={{ fontSize: "0.85rem" }}>{addr}</span>
                          </div>
                          <button className="btn btn-sm btn-outline-danger border-0 p-1" onClick={() => handleRemoveAddress(index)}>
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleAddAddress} className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control form-control-custom py-2 flex-grow-1"
                        placeholder="Add new address..."
                        value={newAddressInput}
                        onChange={(e) => setNewAddressInput(e.target.value)}
                        style={{ fontSize: "0.85rem" }}
                      />
                      <button type="submit" className="btn btn-accent px-3 py-2">Add</button>
                    </form>
                  </div>

                  {/* Dietary settings */}
                  <div className="glass-card p-4">
                    <h4 className="fw-bold text-dark-emphasis mb-2" style={{ fontSize: "1.1rem" }}>🥗 Dietary Preferences</h4>
                    <p className="text-muted mb-3" style={{ fontSize: "0.8rem" }}>Configure filters that customize menu options by default.</p>
                    <div className="d-flex flex-column gap-2">
                      {[
                        { key: "Vegetarian", label: "Vegetarian (Veg)" },
                        { key: "Vegan", label: "Vegan" },
                        { key: "Gluten-Free", label: "Gluten-Free" }
                      ].map(item => {
                        const isChecked = profileForm.dietaryPreferences.includes(item.key);
                        return (
                          <label className="d-flex align-items-center cursor-pointer text-dark-emphasis font-medium" key={item.key} style={{ fontSize: "0.9rem" }}>
                            <input
                              type="checkbox"
                              className="form-check-input me-2"
                              checked={isChecked}
                              onChange={() => toggleDietaryPref(item.key)}
                            />
                            {item.label}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stats summary */}
                  <div className="glass-card p-4">
                    <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>📊 Account Statistics</h4>
                    <div className="row g-2 text-center">
                      <div className="col-4">
                        <div className="bg-body-tertiary border border-color rounded p-3">
                          <span className="fw-bold text-dark d-block fs-4">{orderHistory.length}</span>
                          <span className="text-muted" style={{ fontSize: "0.7rem" }}>Total Orders</span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="bg-body-tertiary border border-color rounded p-3">
                          <span className="fw-bold text-success d-block fs-4">₹{orderHistory.reduce((s,o) => s + (o.discount || 0), 0) + 150}</span>
                          <span className="text-muted" style={{ fontSize: "0.7rem" }}>Total Savings</span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="bg-body-tertiary border border-color rounded p-3">
                          <span className="fw-bold text-accent d-block fs-4" style={{ color: "var(--accent)" }}>{loyaltyPoints}</span>
                          <span className="text-muted" style={{ fontSize: "0.7rem" }}>Loyalty Points</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ TAB: SUPPORT ============ */}
          {activeTab === "support" && (
            <div className="row g-4">
              {/* Collapsible FAQ */}
              <div className="col-md-6">
                <div className="glass-card p-4 h-100">
                  <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>💬 Collapsible FAQs</h4>
                  
                  <div className="accordion" id="supportFaqAccordion">
                    {[
                      { id: "faq1", q: "How do I cancel my table reservation?", a: "Go to Bookings tab. Locate the active booking under Reservation History list, then click the Cancel icon next to it." },
                      { id: "faq2", q: "How long does refunds take?", a: "Wallet refunds process instantly. Credit or debit cards refunds take 3-5 business days to clear back to your banking institution." },
                      { id: "faq3", q: "How are Loyalty Points calculated?", a: "You earn 1 point for every ₹10 spent on food checkouts, and 20 points for every table booking made on Occasia." },
                      { id: "faq4", q: "What is Stealth Booking Mode?", a: "Stealth Booking offers high-privacy table layouts, VIP entrances, and confidential booking registries for high-profile client gatherings." }
                    ].map((faq, idx) => (
                      <div className="accordion-item border border-color bg-body-tertiary rounded-3 mb-2" key={faq.id}>
                        <h2 className="accordion-header">
                          <button className="accordion-button collapsed bg-transparent fw-semibold text-dark-emphasis py-3" type="button" data-bs-toggle="collapse" data-bs-target={`#${faq.id}`} aria-expanded="false" style={{ fontSize: "0.85rem" }}>
                            {faq.q}
                          </button>
                        </h2>
                        <div id={faq.id} className="accordion-collapse collapse" data-bs-parent="#supportFaqAccordion">
                          <div className="accordion-body text-muted border-top border-color-light bg-body" style={{ fontSize: "0.8rem" }}>
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat panel with simulated support agent */}
              <div className="col-md-6">
                <div className="glass-card p-4 h-100 d-flex flex-column" style={{ minHeight: "320px" }}>
                  <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>💬 Live Support Chat</h4>
                  
                  <div className="flex-grow-1 overflow-y-auto mb-3 bg-body-tertiary rounded-3 p-3 border border-color" style={{ minHeight: "150px", maxHeight: "250px" }}>
                    {supportChat.map((msg, index) => (
                      <div className={`mb-3 text-start ${msg.sender === "user" ? "ps-5 text-end" : "pe-5"}`} key={index}>
                        <div className={`rounded-3 p-2 d-inline-block shadow-sm ${msg.sender === "user" ? "bg-accent text-white" : "bg-body border border-color text-dark-emphasis"}`} style={{ fontSize: "0.85rem", maxWidth: "90%", borderRadius: msg.sender === "user" ? "12px 12px 0 12px" : "12px 12px 12px 0" }}>
                          <p className="mb-0">{msg.text}</p>
                          <span className="text-muted d-block text-end mt-1" style={{ fontSize: "0.65rem" }}>{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendSupportChat} className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control-custom flex-grow-1 py-1"
                      placeholder="Ask customer representative..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      style={{ fontSize: "0.85rem" }}
                    />
                    <button type="submit" className="btn btn-accent px-4">Send</button>
                  </form>
                </div>
              </div>

              {/* Raise Complaint form */}
              <div className="col-12">
                <div className="glass-card p-4">
                  <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontSize: "1.1rem" }}>Raise a Complaint Ticket</h4>
                  <form onSubmit={handleRaiseTicket} className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.8rem" }}>Related Order</label>
                      <select 
                        className="form-select form-control-custom"
                        value={newTicket.orderId}
                        onChange={(e) => setNewTicket({ ...newTicket, orderId: e.target.value })}
                      >
                        <option value="">General Inquiry (No Order)</option>
                        {orderHistory.map(o => (
                          <option key={o._id} value={o._id}>Order #{o._id.slice(-6)} (₹{o.total})</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.8rem" }}>Category</label>
                      <select 
                        className="form-select form-control-custom"
                        value={newTicket.category}
                        onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                      >
                        <option value="Late Delivery">Late Delivery</option>
                        <option value="Incorrect Items">Incorrect Items</option>
                        <option value="Quality Issues">Quality Issues</option>
                        <option value="Billing Dispute">Billing Dispute</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.8rem" }}>Simulate File Upload</label>
                      <input type="file" className="form-control form-control-custom" style={{ fontSize: "0.8rem" }} disabled />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.8rem" }}>Details / Complaint Description</label>
                      <textarea
                        className="form-control form-control-custom"
                        rows="3"
                        placeholder="Detail the issue encountered..."
                        value={newTicket.text}
                        onChange={(e) => setNewTicket({ ...newTicket, text: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-12 text-end">
                      <button type="submit" className="btn btn-accent px-5">Submit Ticket</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 3. CART SLIDE DRAWER PANEL */}
      {isCartOpen && (
        <div className="position-fixed top-0 end-0 h-100 shadow-lg d-flex flex-column" style={{ width: "350px", backgroundColor: "var(--bg-sidebar)", borderLeft: "1px solid var(--border-color)", zIndex: 1000, transition: "transform 0.3s ease" }}>
          <div className="p-3 border-bottom border-color d-flex justify-content-between align-items-center bg-light-subtle">
            <div className="d-flex align-items-center">
              <CartIcon size={18} className="me-2 text-accent" style={{ color: "var(--accent)" }} />
              <h5 className="fw-bold mb-0 text-dark-emphasis" style={{ fontSize: "1rem" }}>My Shopping Cart</h5>
            </div>
            <button className="btn-close" onClick={() => setIsCartOpen(false)} />
          </div>

          <div className="flex-grow-1 p-3 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <span className="fs-1 d-block mb-2">🛒</span>
                <p>Your cart is empty.</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {cart.map(item => (
                  <div className="d-flex align-items-center justify-content-between border-bottom border-color pb-2" key={item.id}>
                    <div className="text-start overflow-hidden me-2" style={{ flex: 1 }}>
                      <span className="fw-bold text-dark-emphasis text-truncate d-block" style={{ fontSize: "0.85rem" }}>{item.name}</span>
                      <span className="text-muted" style={{ fontSize: "0.75rem" }}>₹{item.price} each</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 flex-shrink-0">
                      <div className="d-flex align-items-center gap-2 border border-color rounded bg-white px-2 py-0">
                        <button className="btn btn-sm p-0 border-0 text-muted" onClick={() => updateCartQuantity(item.id, -1)} style={{ width: "16px" }}><MinusIcon size={12}/></button>
                        <span className="fw-bold text-dark-emphasis" style={{ fontSize: "0.8rem", minWidth: "12px", textAlign: "center" }}>{item.quantity}</span>
                        <button className="btn btn-sm p-0 border-0 text-muted" onClick={() => updateCartQuantity(item.id, 1)} style={{ width: "16px" }}><PlusIcon size={12}/></button>
                      </div>
                      <button className="btn btn-sm text-danger p-0 border-0" onClick={() => removeFromCart(item.id)}>
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-3 border-top border-color bg-light-subtle">
              {/* Promo input */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-custom py-1"
                  placeholder="Promo code..."
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  style={{ fontSize: "0.8rem", borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
                />
                <button className="btn btn-accent px-3" onClick={() => applyPromoCode(promoCodeInput)} style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0", fontSize: "0.8rem" }}>
                  Apply
                </button>
              </div>

              {appliedPromo && (
                <div className="d-flex justify-content-between align-items-center bg-success-light text-success rounded p-2 mb-3" style={{ fontSize: "0.8rem" }}>
                  <span>Applied Promo: <strong>{appliedPromo.code}</strong></span>
                  <button className="btn btn-sm text-danger p-0 border-0 fw-bold" onClick={() => setAppliedPromo(null)}>✕</button>
                </div>
              )}

              {/* Bill breakdown */}
              <div className="d-flex flex-column gap-2 mb-3 text-start" style={{ fontSize: "0.85rem" }}>
                <div className="d-flex justify-content-between text-muted">
                  <span>Subtotal:</span>
                  <span>₹{getSubtotal()}</span>
                </div>
                {getDiscount() > 0 && (
                  <div className="d-flex justify-content-between text-success">
                    <span>Discount:</span>
                    <span>-₹{getDiscount()}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between text-muted">
                  <span>Tax (5%):</span>
                  <span>₹{getTax()}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold text-dark-emphasis fs-5 border-top border-color pt-2">
                  <span>Total:</span>
                  <span>₹{getTotal()}</span>
                </div>
              </div>

              <button className="btn btn-accent w-100 py-3 shadow" onClick={handleCheckout}>
                Place Order (Pay with Wallet)
              </button>
            </div>
          )}
        </div>
      )}

      {/* 4. MODAL: WALLET TOP UP */}
      {walletModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 2000 }}>
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "380px" }}>
            <div className="modal-content border-0 glass-card" style={{ borderRadius: "16px" }}>
              <div className="modal-header border-bottom border-color p-3 bg-light-subtle" style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                <h5 className="modal-title fw-bold text-dark-emphasis" style={{ fontSize: "1rem" }}>💳 Top Up Wallet</h5>
                <button type="button" className="btn-close" onClick={() => setWalletModalOpen(false)} />
              </div>
              <div className="modal-body p-4 text-start">
                <form onSubmit={handleTopUp}>
                  <div className="mb-3">
                    <label className="form-label text-muted fw-semibold" style={{ fontSize: "0.85rem" }}>Enter Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control form-control-custom"
                      placeholder="e.g. 500"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-light border border-color flex-grow-1" onClick={() => setWalletModalOpen(false)}>Cancel</button>
                    <button type="submit" className="btn btn-accent flex-grow-1">Add Balance</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL: QR CODE CHECK-IN */}
      {qrCodeModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 2000 }}>
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "320px" }}>
            <div className="modal-content border-0 glass-card" style={{ borderRadius: "16px" }}>
              <div className="modal-header border-bottom border-color p-3 bg-light-subtle" style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                <h5 className="modal-title fw-bold text-dark-emphasis" style={{ fontSize: "0.95rem" }}>🎫 Table QR Check-in</h5>
                <button type="button" className="btn-close" onClick={() => setQrCodeModal(null)} />
              </div>
              <div className="modal-body p-4 text-center">
                <p className="text-muted" style={{ fontSize: "0.8rem" }}>Present this QR code at {qrCodeModal.restaurantName} reception to check in.</p>
                {/* SVG-based QR code mockup */}
                <div className="bg-white p-3 d-inline-block rounded-3 border mb-3">
                  <svg width="150" height="150" viewBox="0 0 100 100">
                    <rect width="20" height="20" fill="black" />
                    <rect x="80" width="20" height="20" fill="black" />
                    <rect y="80" width="20" height="20" fill="black" />
                    <rect x="25" y="25" width="50" height="50" fill="none" stroke="black" strokeWidth="8" />
                    <rect x="40" y="40" width="20" height="20" fill="black" />
                    <rect x="10" y="60" width="15" height="15" fill="black" />
                    <rect x="65" y="10" width="15" height="15" fill="black" />
                  </svg>
                </div>
                <div className="text-start bg-body-tertiary p-2 rounded border" style={{ fontSize: "0.75rem" }}>
                  <p className="mb-0 text-truncate"><strong>Ref:</strong> {qrCodeModal._id}</p>
                  <p className="mb-0"><strong>Name:</strong> {user?.name}</p>
                  <p className="mb-0"><strong>Slot:</strong> {qrCodeModal.date} ({qrCodeModal.timeSlot})</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;