/*document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.querySelector(".lowerDetails button:nth-child(1)");
  const cancelBtn = document.querySelector(".lowerDetails button:nth-child(2)");
  
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("fname").value.trim();
    const number = document.getElementById("Number").value.trim();
    const items = document.getElementById("itemsBought").value.trim();
    const quantity = parseInt(document.getElementById("Quantity").value) || 0;
    const price = parseFloat(document.getElementById("Price").value) || 0;
    const payment = document.querySelector('input[name="payment"]:checked')?.value || "unknown";
    const dueDate = document.getElementById("DueDate").value;
    const returnDate = document.getElementById("ReturnDate").value;

    if (!name || !number || !price) {
      alert("Please fill out name, number, and price.");
      return;
    }

    const newCustomer = {
      name,
      number,
      items,
      quantity,
      price,
      payment,
      dueDate,
      returnDate,
      lastSale: new Date().toLocaleDateString(),
    };

    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Check if customer already exists
    const existing = customers.find(c => c.number === number);

    if (existing) {
      existing.price += price; // add to total spent
      existing.lastSale = newCustomer.lastSale;
    } else {
      customers.push(newCustomer);
    }

    localStorage.setItem("customers", JSON.stringify(customers));

    alert("Customer details saved successfully!");
    document.querySelector("form").reset();
  });

  cancelBtn.addEventListener("click", () => {
    document.querySelector("form").reset();
  });
});*/
/*document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.querySelector(".lowerDetails button:nth-child(1)");
  const cancelBtn = document.querySelector(".lowerDetails button:nth-child(2)");

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("fname").value.trim();
    const number = document.getElementById("Number").value.trim();
    const items = document.getElementById("itemsBought").value.trim();
    const quantity = parseInt(document.getElementById("Quantity").value) || 0;
    const price = parseFloat(document.getElementById("Price").value) || 0;
    const payment = document.querySelector('input[name="payment"]:checked')?.value || "unknown";
    const dueDate = document.getElementById("DueDate").value;
    const returnDate = document.getElementById("ReturnDate").value;

    if (!name || !number || !price) {
      alert("Please fill out name, number, and price.");
      return;
    }

    // Create new purchase record
    const newPurchase = {
      id: Date.now(), // Unique ID for each purchase
      items,
      quantity,
      price,
      payment,
      dueDate,
      returnDate,
      date: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }), // Format: 12 Oct 2025
      timestamp: new Date().getTime()
    };

    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

    // Check if customer already exists
    const existingIndex = customers.findIndex(c => c.number === number);

    if (existingIndex !== -1) {
      // Update existing customer
      customers[existingIndex].price += price; // Add to total spent
      customers[existingIndex].lastSale = newPurchase.date;
      
      // Add purchase to this customer's history
      purchases.push({
        ...newPurchase,
        customerNumber: number
      });
    } else {
      // Create new customer
      const newCustomer = {
        name,
        number,
        price, // Total spent
        lastSale: newPurchase.date,
      };
      customers.push(newCustomer);
      
      // Add first purchase for this customer
      purchases.push({
        ...newPurchase,
        customerNumber: number
      });
    }

    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("purchases", JSON.stringify(purchases));

    alert("Customer details saved successfully!");
    document.querySelector("form").reset();
  });

  cancelBtn.addEventListener("click", () => {
    document.querySelector("form").reset();
  });
});*/





/*
document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.querySelector(".lowerDetails button:nth-child(1)");
  const cancelBtn = document.querySelector(".lowerDetails button:nth-child(2)");

  // Payment status toggle functionality
  let paymentStatus = "unpaid"; // Default is unpaid

  const paidBtn = document.querySelector(".paidBtn");
  const unpaidBtn = document.querySelector(".unpaidBtn");

  // Toggle button click handlers
  paidBtn.addEventListener("click", () => {
    paymentStatus = "paid";
    paidBtn.classList.add("active");
    unpaidBtn.classList.remove("active");
  });

  unpaidBtn.addEventListener("click", () => {
    paymentStatus = "unpaid";
    unpaidBtn.classList.add("active");
    paidBtn.classList.remove("active");
  });

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("fname").value.trim();
    const number = document.getElementById("Number").value.trim();
    const items = document.getElementById("itemsBought").value.trim();
    const quantity = parseInt(document.getElementById("Quantity").value) || 0;
    const price = parseFloat(document.getElementById("Price").value) || 0;
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "cash";
    const dueDate = document.getElementById("DueDate").value;
    const returnDate = document.getElementById("ReturnDate").value;

    if (!name || !number || !price) {
      alert("Please fill out name, number, and price.");
      return;
    }

    // Create new purchase record with payment status
    const newPurchase = {
      id: Date.now(),
      items,
      quantity,
      price,
      payment: paymentStatus, // "paid" or "unpaid"
      paymentMethod: paymentMethod, // "cash", "upi", "card", "bank"
      dueDate,
      returnDate,
      date: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      timestamp: new Date().getTime()
    };

    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

    // Check if customer already exists
    const existingIndex = customers.findIndex(c => c.number === number);

    if (existingIndex !== -1) {
      // Update existing customer
      customers[existingIndex].price += price;
      customers[existingIndex].lastSale = newPurchase.date;
      
      // Add purchase to this customer's history
      purchases.push({
        ...newPurchase,
        customerNumber: number
      });
    } else {
      // Create new customer
      const newCustomer = {
        name,
        number,
        price,
        lastSale: newPurchase.date,
      };
      customers.push(newCustomer);
      
      // Add first purchase for this customer
      purchases.push({
        ...newPurchase,
        customerNumber: number
      });
    }

    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("purchases", JSON.stringify(purchases));

    alert("Customer details saved successfully!");
    
    // Reset form and payment toggle
    document.querySelector("form").reset();
    paymentStatus = "unpaid";
    paidBtn.classList.remove("active");
    unpaidBtn.classList.add("active");
  });

  cancelBtn.addEventListener("click", () => {
    document.querySelector("form").reset();
    paymentStatus = "unpaid";
    paidBtn.classList.remove("active");
    unpaidBtn.classList.add("active");
  });
});*/

//================================================
/*document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.querySelector(".lowerDetails button:nth-child(1)");
  const cancelBtn = document.querySelector(".lowerDetails button:nth-child(2)");
  const billBtn = document.querySelector(".lowerDetails button:nth-child(3)");

  // Payment status toggle functionality
  let paymentStatus = "unpaid"; // Default is unpaid

  const paidBtn = document.querySelector(".paidBtn");
  const unpaidBtn = document.querySelector(".unpaidBtn");

  // Toggle button click handlers
  paidBtn.addEventListener("click", () => {
    paymentStatus = "paid";
    paidBtn.classList.add("active");
    unpaidBtn.classList.remove("active");
  });

  unpaidBtn.addEventListener("click", () => {
    paymentStatus = "unpaid";
    unpaidBtn.classList.add("active");
    paidBtn.classList.remove("active");
  });

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("fname").value.trim();
    const number = document.getElementById("Number").value.trim();
    const items = document.getElementById("itemsBought").value.trim();
    const quantity = parseInt(document.getElementById("Quantity").value) || 0;
    const price = parseFloat(document.getElementById("Price").value) || 0;
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "cash";
    const dueDate = document.getElementById("DueDate").value;
    const returnDate = document.getElementById("ReturnDate").value;

    if (!name || !number || !price) {
      alert("Please fill out name, number, and price.");
      return;
    }

    // Create new purchase record with payment status
    const newPurchase = {
      id: Date.now(),
      items,
      quantity,
      price,
      payment: paymentStatus, // "paid" or "unpaid"
      paymentMethod: paymentMethod, // "cash", "upi", "card", "bank"
      dueDate,
      returnDate,
      date: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      timestamp: new Date().getTime()
    };

    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

    // Check if customer already exists
    const existingIndex = customers.findIndex(c => c.number === number);

    if (existingIndex !== -1) {
      // Update existing customer
      customers[existingIndex].price += price;
      customers[existingIndex].lastSale = newPurchase.date;
      
      // Add purchase to this customer's history
      purchases.push({
        ...newPurchase,
        customerNumber: number
      });
    } else {
      // Create new customer
      const newCustomer = {
        name,
        number,
        price,
        lastSale: newPurchase.date,
      };
      customers.push(newCustomer);
      
      // Add first purchase for this customer
      purchases.push({
        ...newPurchase,
        customerNumber: number
      });
    }

    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("purchases", JSON.stringify(purchases));

    alert("Customer details saved successfully!");
    
    // Reset form and payment toggle
    document.querySelector("form").reset();
    paymentStatus = "unpaid";
    paidBtn.classList.remove("active");
    unpaidBtn.classList.add("active");
  });

  cancelBtn.addEventListener("click", () => {
    document.querySelector("form").reset();
    paymentStatus = "unpaid";
    paidBtn.classList.remove("active");
    unpaidBtn.classList.add("active");
  });

  // Bill PDF / WhatsApp functionality
  billBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("fname").value.trim();
    const number = document.getElementById("Number").value.trim();
    const items = document.getElementById("itemsBought").value.trim();
    const quantity = parseInt(document.getElementById("Quantity").value) || 0;
    const price = parseFloat(document.getElementById("Price").value) || 0;
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "cash";
    const dueDate = document.getElementById("DueDate").value;
    const returnDate = document.getElementById("ReturnDate").value;

    if (!name || !number || !price) {
      alert("Please fill out customer details first!");
      return;
    }

    // Generate bill message
    const billMessage = generateBillMessage({
      name,
      items,
      quantity,
      price,
      paymentStatus,
      paymentMethod,
      dueDate,
      returnDate
    });

    // Send via WhatsApp
    sendWhatsAppBill(number, billMessage);
  });
});

// Function to generate bill message
function generateBillMessage(data) {
  const date = new Date().toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
  const time = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });

  const paymentStatusText = data.paymentStatus === "paid" ? "✅ PAID" : "⏳ PENDING";
  const paymentMethodText = data.paymentMethod.toUpperCase();

  let message = `
━━━━━━━━━━━━━━━━━━━━
      📄 *INVOICE* 📄
━━━━━━━━━━━━━━━━━━━━

*Bill To:* ${data.name}
*Date:* ${date}
*Time:* ${time}

━━━━━━━━━━━━━━━━━━━━
*ITEM DETAILS*
━━━━━━━━━━━━━━━━━━━━

📦 *Item:* ${data.items || "N/A"}
🔢 *Quantity:* ${data.quantity || "N/A"}
💰 *Amount:* ₹${data.price.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━
*PAYMENT DETAILS*
━━━━━━━━━━━━━━━━━━━━

💳 *Method:* ${paymentMethodText}
📊 *Status:* ${paymentStatusText}
`;

  if (data.dueDate) {
    const formattedDueDate = new Date(data.dueDate).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    message += `📅 *Due Date:* ${formattedDueDate}\n`;
  }

  if (data.returnDate) {
    const formattedReturnDate = new Date(data.returnDate).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    message += `🔄 *Return Date:* ${formattedReturnDate}\n`;
  }

  message += `
━━━━━━━━━━━━━━━━━━━━
*TOTAL AMOUNT*
━━━━━━━━━━━━━━━━━━━━

      💵 *₹${data.price.toLocaleString()}*

━━━━━━━━━━━━━━━━━━━━

Thank you for your business! 🙏

_This is an auto-generated bill._
`;

  return message.trim();
}

// Function to send bill via WhatsApp
function sendWhatsAppBill(phoneNumber, message) {
  // Remove any non-digit characters from phone number
  let cleanNumber = phoneNumber.replace(/\D/g, '');
  
  // If number doesn't start with country code, assume India (+91)
  if (cleanNumber.length === 10) {
    cleanNumber = '91' + cleanNumber;
  }

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  // Open WhatsApp in new window/tab
  window.open(whatsappURL, '_blank');
}*/















/*document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.querySelector(".lowerDetails button:nth-child(1)");
  const cancelBtn = document.querySelector(".lowerDetails button:nth-child(2)");
  const billBtn = document.querySelector(".lowerDetails button:nth-child(3)");

  // Payment status toggle functionality
  let paymentStatus = "unpaid"; // Default is unpaid

  const paidBtn = document.querySelector(".paidBtn");
  const unpaidBtn = document.querySelector(".unpaidBtn");

  // Toggle button click handlers
  paidBtn.addEventListener("click", () => {
    paymentStatus = "paid";
    paidBtn.classList.add("active");
    unpaidBtn.classList.remove("active");
  });

  unpaidBtn.addEventListener("click", () => {
    paymentStatus = "unpaid";
    unpaidBtn.classList.add("active");
    paidBtn.classList.remove("active");
  });

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("fname").value.trim();
    const number = document.getElementById("Number").value.trim();
    const items = document.getElementById("itemsBought").value.trim();
    const quantity = parseInt(document.getElementById("Quantity").value) || 0;
    const price = parseFloat(document.getElementById("Price").value) || 0;
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "cash";
    const dueDate = document.getElementById("DueDate").value;
    const returnDate = document.getElementById("ReturnDate").value;

    if (!name || !number || !price) {
      alert("Please fill out name, number, and price.");
      return;
    }

    // Create new purchase record with payment status
    const newPurchase = {
      id: Date.now(),
      items,
      quantity,
      price,
      payment: paymentStatus, // "paid" or "unpaid"
      paymentMethod: paymentMethod, // "cash", "upi", "card", "bank"
      dueDate,
      returnDate,
      date: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      timestamp: new Date().getTime()
    };

    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

    // Check if customer already exists
    const existingIndex = customers.findIndex(c => c.number === number);

    if (existingIndex !== -1) {
      // Update existing customer
      customers[existingIndex].price += price;
      customers[existingIndex].lastSale = newPurchase.date;
      
      // Add purchase to this customer's history
      purchases.push({
        ...newPurchase,
        customerNumber: number
      });
    } else {
      // Create new customer
      const newCustomer = {
        name,
        number,
        price,
        lastSale: newPurchase.date,
      };
      customers.push(newCustomer);
      
      // Add first purchase for this customer
      purchases.push({
        ...newPurchase,
        customerNumber: number
      });
    }

    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("purchases", JSON.stringify(purchases));

    alert("Customer details saved successfully!");
    
    // Reset form and payment toggle
    document.querySelector("form").reset();
    paymentStatus = "unpaid";
    paidBtn.classList.remove("active");
    unpaidBtn.classList.add("active");
  });

  cancelBtn.addEventListener("click", () => {
    document.querySelector("form").reset();
    paymentStatus = "unpaid";
    paidBtn.classList.remove("active");
    unpaidBtn.classList.add("active");
  });

  // Bill PDF / WhatsApp functionality
  billBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("fname").value.trim();
    const number = document.getElementById("Number").value.trim();
    const items = document.getElementById("itemsBought").value.trim();
    const quantity = parseInt(document.getElementById("Quantity").value) || 0;
    const price = parseFloat(document.getElementById("Price").value) || 0;
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "cash";
    const dueDate = document.getElementById("DueDate").value;
    const returnDate = document.getElementById("ReturnDate").value;

    if (!name || !number || !price) {
      alert("Please fill out customer details first!");
      return;
    }

    // Generate bill message
    const billMessage = generateBillMessage({
      name,
      items,
      quantity,
      price,
      paymentStatus,
      paymentMethod,
      dueDate,
      returnDate
    });

    // Send via WhatsApp
    sendWhatsAppBill(number, billMessage);
  });
});

// Function to generate bill message
function generateBillMessage(data) {
  const date = new Date().toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
  const time = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });

  const paymentStatusText = data.paymentStatus === "paid" ? "✅ PAID" : "⏳ PENDING";
  const paymentMethodText = data.paymentMethod.toUpperCase();

  let message = `
━━━━━━━━━━━━━━━━━━━━
      📄 *INVOICE* 📄
━━━━━━━━━━━━━━━━━━━━

*Bill To:* ${data.name}
*Date:* ${date}
*Time:* ${time}

━━━━━━━━━━━━━━━━━━━━
*ITEM DETAILS*
━━━━━━━━━━━━━━━━━━━━

📦 *Item:* ${data.items || "N/A"}
🔢 *Quantity:* ${data.quantity || "N/A"}
💰 *Amount:* ₹${data.price.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━
*PAYMENT DETAILS*
━━━━━━━━━━━━━━━━━━━━

💳 *Method:* ${paymentMethodText}
📊 *Status:* ${paymentStatusText}
`;

  if (data.dueDate) {
    const formattedDueDate = new Date(data.dueDate).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    message += `📅 *Due Date:* ${formattedDueDate}\n`;
  }

  if (data.returnDate) {
    const formattedReturnDate = new Date(data.returnDate).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    message += `🔄 *Return Date:* ${formattedReturnDate}\n`;
  }

  message += `
━━━━━━━━━━━━━━━━━━━━
*TOTAL AMOUNT*
━━━━━━━━━━━━━━━━━━━━

      💵 *₹${data.price.toLocaleString()}*

━━━━━━━━━━━━━━━━━━━━

Thank you for your business! 🙏

_This is an auto-generated bill._
`;

  return message.trim();
}

// Function to send bill via WhatsApp
function sendWhatsAppBill(phoneNumber, message) {
  // Remove any non-digit characters from phone number
  let cleanNumber = phoneNumber.replace(/\D/g, '');
  
  // If number doesn't start with country code, assume India (+91)
  if (cleanNumber.length === 10) {
    cleanNumber = '91' + cleanNumber;
  }

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  // Open WhatsApp in new window/tab
  window.open(whatsappURL, '_blank');
}*/














document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.querySelector(".saveBtn");
  const cancelBtn = document.querySelector(".cancelBtn");
  const billBtn = document.querySelector(".billBtn");
  const addItemBtn = document.querySelector(".addItemBtn");
  const itemsList = document.getElementById("itemsList");

  let itemIndex = 1; 

  // Payment status toggle functionality
  let paymentStatus = "unpaid";
  const paidBtn = document.querySelector(".paidBtn");
  const unpaidBtn = document.querySelector(".unpaidBtn");

  paidBtn.addEventListener("click", () => {
    paymentStatus = "paid";
    paidBtn.classList.add("active");
    unpaidBtn.classList.remove("active");
  });

  unpaidBtn.addEventListener("click", () => {
    paymentStatus = "unpaid";
    unpaidBtn.classList.add("active");
    paidBtn.classList.remove("active");
  });

  // Add new item row
  addItemBtn.addEventListener("click", () => {
    const itemRow = document.createElement("div");
    itemRow.classList.add("itemRow");
    itemRow.setAttribute("data-item-index", itemIndex);
    
    itemRow.innerHTML = `
      <div class="itemInputs">
        <input type="text" class="itemName" placeholder="Item Name" required>
        <input type="number" class="itemQuantity" placeholder="Qty" min="1" value="1" required>
        <input type="number" class="itemPrice" placeholder="Price" min="0" step="0.01" required>
        <button type="button" class="removeItemBtn" title="Remove Item">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    itemsList.appendChild(itemRow);
    itemIndex++;

    // Add event listeners for the new row
    attachItemRowListeners(itemRow);
    updateTotalPrice();
  });

  // Remove item row
  function attachItemRowListeners(row) {
    const removeBtn = row.querySelector(".removeItemBtn");
    const priceInput = row.querySelector(".itemPrice");
    const quantityInput = row.querySelector(".itemQuantity");

    removeBtn.addEventListener("click", () => {
      // Prevent removing if it's the last item
      if (itemsList.children.length > 1) {
        row.remove();
        updateTotalPrice();
      } else {
        alert("At least one item is required!");
      }
    });

    // Update total when price or quantity changes
    priceInput.addEventListener("input", updateTotalPrice);
    quantityInput.addEventListener("input", updateTotalPrice);
  }

  // Attach listeners to the default first item
  attachItemRowListeners(itemsList.querySelector(".itemRow"));

  // Update total price display
  function updateTotalPrice() {
    let total = 0;
    const allRows = itemsList.querySelectorAll(".itemRow");

    allRows.forEach(row => {
      const quantity = parseFloat(row.querySelector(".itemQuantity").value) || 0;
      const price = parseFloat(row.querySelector(".itemPrice").value) || 0;
      total += quantity * price;
    });

    document.querySelector(".totalAmount").textContent = `₹${total.toLocaleString()}`;
  }

  // Collect all items data
  function collectItemsData() {
    const items = [];
    const allRows = itemsList.querySelectorAll(".itemRow");

    allRows.forEach(row => {
      const name = row.querySelector(".itemName").value.trim();
      const quantity = parseInt(row.querySelector(".itemQuantity").value) || 0;
      const price = parseFloat(row.querySelector(".itemPrice").value) || 0;

      if (name && quantity > 0 && price > 0) {
        items.push({ name, quantity, price });
      }
    });

    return items;
  }

  // Calculate total price from items
  function calculateTotal(items) {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }

  // Save button
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("fname").value.trim();
    const number = document.getElementById("Number").value.trim();
    const items = collectItemsData();
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "cash";
    const dueDate = document.getElementById("DueDate").value;
    const returnDate = document.getElementById("ReturnDate").value;

    if (!name || !number) {
      alert("Please fill out customer name and number.");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one item with valid details.");
      return;
    }

    const totalPrice = calculateTotal(items);

    // Create new purchase record
    const newPurchase = {
      id: Date.now(),
      items: items, // Array of items
      itemsText: items.map(item => `${item.name} (x${item.quantity})`).join(", "), // For display
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      price: totalPrice,
      payment: paymentStatus,
      paymentMethod: paymentMethod,
      dueDate,
      returnDate,
      date: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      timestamp: new Date().getTime()
    };

    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

    // Check if customer already exists
    const existingIndex = customers.findIndex(c => c.number === number);

    if (existingIndex !== -1) {
      // Update existing customer
      customers[existingIndex].price += totalPrice;
      customers[existingIndex].lastSale = newPurchase.date;
      
      purchases.push({
        ...newPurchase,
        customerNumber: number
      });
    } else {
      // Create new customer
      const newCustomer = {
        name,
        number,
        price: totalPrice,
        lastSale: newPurchase.date,
      };
      customers.push(newCustomer);
      
      purchases.push({
        ...newPurchase,
        customerNumber: number
      });
    }

    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("purchases", JSON.stringify(purchases));

    alert("Customer details saved successfully!");
    
    // Reset form
    resetForm();
  });

  // Cancel button
  cancelBtn.addEventListener("click", () => {
    resetForm();
  });

  // Reset form function
  function resetForm() {
    document.querySelector("form").reset();
    
    // Remove all item rows except the first one
    while (itemsList.children.length > 1) {
      itemsList.lastChild.remove();
    }
    
    // Clear the first row
    const firstRow = itemsList.querySelector(".itemRow");
    firstRow.querySelector(".itemName").value = "";
    firstRow.querySelector(".itemQuantity").value = "1";
    firstRow.querySelector(".itemPrice").value = "";
    
    // Reset payment status
    paymentStatus = "unpaid";
    paidBtn.classList.remove("active");
    unpaidBtn.classList.add("active");
    
    updateTotalPrice();
  }

  // Bill button - WhatsApp functionality
  billBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("fname").value.trim();
    const number = document.getElementById("Number").value.trim();
    const items = collectItemsData();
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "cash";
    const dueDate = document.getElementById("DueDate").value;
    const returnDate = document.getElementById("ReturnDate").value;

    if (!name || !number) {
      alert("Please fill out customer name and number!");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one item!");
      return;
    }

    const totalPrice = calculateTotal(items);

    const billMessage = generateBillMessage({
      name,
      items,
      totalPrice,
      paymentStatus,
      paymentMethod,
      dueDate,
      returnDate
    });

    sendWhatsAppBill(number, billMessage);
  });
});

// Generate bill message with multiple items
function generateBillMessage(data) {
  const date = new Date().toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
  const time = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });

  const paymentStatusText = data.paymentStatus === "paid" ? "✅ PAID" : "⏳ PENDING";
  const paymentMethodText = data.paymentMethod.toUpperCase();

  let message = `
━━━━━━━━━━━━━━━━━━━━
      📄 *INVOICE* 📄
━━━━━━━━━━━━━━━━━━━━

*Bill To:* ${data.name}
*Date:* ${date}
*Time:* ${time}

━━━━━━━━━━━━━━━━━━━━
*ITEM DETAILS*
━━━━━━━━━━━━━━━━━━━━
`;

  // Add each item
  data.items.forEach((item, index) => {
    const itemTotal = item.quantity * item.price;
    message += `\n${index + 1}. *${item.name}*\n`;
    message += `   Qty: ${item.quantity} × ₹${item.price.toLocaleString()} = ₹${itemTotal.toLocaleString()}\n`;
  });

  message += `
━━━━━━━━━━━━━━━━━━━━
*PAYMENT DETAILS*
━━━━━━━━━━━━━━━━━━━━

💳 *Method:* ${paymentMethodText}
📊 *Status:* ${paymentStatusText}
`;

  if (data.dueDate) {
    const formattedDueDate = new Date(data.dueDate).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    message += `📅 *Due Date:* ${formattedDueDate}\n`;
  }

  if (data.returnDate) {
    const formattedReturnDate = new Date(data.returnDate).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    message += `🔄 *Return Date:* ${formattedReturnDate}\n`;
  }

  message += `
━━━━━━━━━━━━━━━━━━━━
*TOTAL AMOUNT*
━━━━━━━━━━━━━━━━━━━━

      💵 *₹${data.totalPrice.toLocaleString()}*

━━━━━━━━━━━━━━━━━━━━

Thank you for your business! 🙏

_This is an auto-generated bill._
`;

  return message.trim();
}

// Send bill via WhatsApp
function sendWhatsAppBill(phoneNumber, message) {
  let cleanNumber = phoneNumber.replace(/\D/g, '');
  
  if (cleanNumber.length === 10) {
    cleanNumber = '91' + cleanNumber;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, '_blank');
}



