/*document.addEventListener("DOMContentLoaded", () => {
  // Get selected customer from localStorage
  const selectedCustomer = JSON.parse(localStorage.getItem("selectedCustomer"));
  
  if (!selectedCustomer) {
    alert("No customer selected!");
    window.location.href = "history.html";
    return;
  }

  // Get all purchases for this customer
  const allPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
  const customerPurchases = allPurchases
    .filter(p => p.customerNumber === selectedCustomer.number)
    .sort((a, b) => b.timestamp - a.timestamp); // Sort by date (newest first)

  // Calculate total spent and pending amount
  let totalSpent = 0;
  let pendingAmount = 0;

  customerPurchases.forEach(purchase => {
    totalSpent += purchase.price;
    if (purchase.payment === "pending" || purchase.payment === "Pending") {
      pendingAmount += purchase.price;
    }
  });

  // Update customer info section
  document.querySelector(".custName").textContent = selectedCustomer.name;
  document.querySelector(".custPhoneNo").textContent = selectedCustomer.number;
  document.querySelector(".custTotalSpent span").textContent = `₹${totalSpent.toLocaleString()}`;
  document.querySelector(".custAmountPending span").textContent = `₹${pendingAmount.toLocaleString()}`;

  // Update last order date
  if (customerPurchases.length > 0) {
    document.querySelector(".custHistory .date").textContent = `Last Order: ${customerPurchases[0].date}`;
  } else {
    document.querySelector(".custHistory .date").textContent = "Last Order: No orders yet";
  }

  // Render purchase history
  const itemsContainer = document.querySelector(".custItemsBought");
  itemsContainer.innerHTML = ""; // Clear existing items

  if (customerPurchases.length === 0) {
    itemsContainer.innerHTML = `<p style="color: gray; text-align: center; padding: 20px;">No purchase history available.</p>`;
    return;
  }

  customerPurchases.forEach(purchase => {
    const itemCard = document.createElement("div");
    itemCard.classList.add("itemCard");
    
    // Determine status class and text
    let statusClass = "paid";
    let statusText = "Paid";
    
    if (purchase.payment === "pending" || purchase.payment === "Pending") {
      statusClass = "pending";
      statusText = "Pending";
    } else if (purchase.payment === "paid" || purchase.payment === "Paid") {
      statusClass = "paid";
      statusText = "Paid";
    }

    itemCard.innerHTML = `
      <div class="itemName">${purchase.items || "No item specified"} ${purchase.quantity > 0 ? `(x${purchase.quantity})` : ''}</div>
      <div class="itemAmount">₹${purchase.price.toLocaleString()}</div>
      <div class="status ${statusClass}">${statusText}</div>
    `;

    itemsContainer.appendChild(itemCard);
  });
});*/



















/*document.addEventListener("DOMContentLoaded", () => {
  // Get selected customer from localStorage
  const selectedCustomer = JSON.parse(localStorage.getItem("selectedCustomer"));
  
  if (!selectedCustomer) {
    alert("No customer selected!");
    window.location.href = "history.html";
    return;
  }

  // Get all purchases for this customer
  const allPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
  const customerPurchases = allPurchases
    .filter(p => p.customerNumber === selectedCustomer.number)
    .sort((a, b) => b.timestamp - a.timestamp); // Sort by date (newest first)

  // Calculate total spent and pending amount
  let totalSpent = 0;
  let pendingAmount = 0;

  customerPurchases.forEach(purchase => {
    totalSpent += purchase.price;
    if (purchase.payment === "unpaid" || purchase.payment === "pending" || purchase.payment === "Pending") {
      pendingAmount += purchase.price;
    }
  });

  // Update customer info section
  document.querySelector(".custName").textContent = selectedCustomer.name;
  document.querySelector(".custPhoneNo").textContent = selectedCustomer.number;
  document.querySelector(".custTotalSpent span").textContent = `₹${totalSpent.toLocaleString()}`;
  document.querySelector(".custAmountPending span").textContent = `₹${pendingAmount.toLocaleString()}`;

  // Update last order date
  if (customerPurchases.length > 0) {
    document.querySelector(".custHistory .date").textContent = `Last Order: ${customerPurchases[0].date}`;
  } else {
    document.querySelector(".custHistory .date").textContent = "Last Order: No orders yet";
  }

  // Render purchase history
  const itemsContainer = document.querySelector(".custItemsBought");
  itemsContainer.innerHTML = ""; // Clear existing items

  if (customerPurchases.length === 0) {
    itemsContainer.innerHTML = `<p style="color: gray; text-align: center; padding: 20px;">No purchase history available.</p>`;
    return;
  }

  customerPurchases.forEach(purchase => {
    const itemCard = document.createElement("div");
    itemCard.classList.add("itemCard");
    
    // Determine status class and text
    let statusClass = "pending";
    let statusText = "Pending";
    
    if (purchase.payment === "paid" || purchase.payment === "Paid") {
      statusClass = "paid";
      statusText = "Paid";
    } else if (purchase.payment === "unpaid" || purchase.payment === "pending" || purchase.payment === "Pending") {
      statusClass = "pending";
      statusText = "Pending";
    }

    itemCard.innerHTML = `
      <div class="itemName">${purchase.items || "No item specified"} ${purchase.quantity > 0 ? `(x${purchase.quantity})` : ''}</div>
      <div class="itemAmount">₹${purchase.price.toLocaleString()}</div>
      <div class="status ${statusClass}">${statusText}</div>
    `;

    itemsContainer.appendChild(itemCard);
  });
});*/













document.addEventListener("DOMContentLoaded", () => {
  // Get selected customer from localStorage
  const selectedCustomer = JSON.parse(localStorage.getItem("selectedCustomer"));
  
  if (!selectedCustomer) {
    alert("No customer selected!");
    window.location.href = "history.html";
    return;
  }

  // Get all purchases for this customer
  const allPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
  const customerPurchases = allPurchases
    .filter(p => p.customerNumber === selectedCustomer.number)
    .sort((a, b) => b.timestamp - a.timestamp); // Sort by date (newest first)

  // Calculate total spent and pending amount
  let totalSpent = 0;
  let pendingAmount = 0;

  customerPurchases.forEach(purchase => {
    totalSpent += purchase.price;
    if (purchase.payment === "unpaid" || purchase.payment === "pending" || purchase.payment === "Pending") {
      pendingAmount += purchase.price;
    }
  });

  // Update customer info section
  document.querySelector(".custName").textContent = selectedCustomer.name;
  document.querySelector(".custPhoneNo").textContent = selectedCustomer.number;
  document.querySelector(".custTotalSpent span").textContent = `₹${totalSpent.toLocaleString()}`;
  document.querySelector(".custAmountPending span").textContent = `₹${pendingAmount.toLocaleString()}`;

  // Update last order date
  if (customerPurchases.length > 0) {
    document.querySelector(".custHistory .date").textContent = `Last Order: ${customerPurchases[0].date}`;
  } else {
    document.querySelector(".custHistory .date").textContent = "Last Order: No orders yet";
  }

  // Render purchase history
  const itemsContainer = document.querySelector(".custItemsBought");
  itemsContainer.innerHTML = ""; // Clear existing items

  if (customerPurchases.length === 0) {
    itemsContainer.innerHTML = `<p style="color: gray; text-align: center; padding: 20px;">No purchase history available.</p>`;
    return;
  }

  customerPurchases.forEach(purchase => {
    const itemCard = document.createElement("div");
    itemCard.classList.add("itemCard");
    
    // Determine status class and text
    let statusClass = "pending";
    let statusText = "Pending";
    
    if (purchase.payment === "paid" || purchase.payment === "Paid") {
      statusClass = "paid";
      statusText = "Paid";
    } else if (purchase.payment === "unpaid" || purchase.payment === "pending" || purchase.payment === "Pending") {
      statusClass = "pending";
      statusText = "Pending";
    }

    // Handle both old and new item format
    let itemDisplay = "";
    if (Array.isArray(purchase.items)) {
      // New format: array of items
      itemDisplay = purchase.items.map(item => `${item.name} (x${item.quantity})`).join(", ");
    } else if (purchase.itemsText) {
      // Use pre-formatted text
      itemDisplay = purchase.itemsText;
    } else {
      // Old format: simple string
      const quantity = purchase.quantity > 0 ? `(x${purchase.quantity})` : '';
      itemDisplay = `${purchase.items || "No item specified"} ${quantity}`;
    }

    itemCard.innerHTML = `
      <div class="itemName">${itemDisplay}</div>
      <div class="itemAmount">₹${purchase.price.toLocaleString()}</div>
      <div class="status ${statusClass}">${statusText}</div>
    `;

    itemsContainer.appendChild(itemCard);
  });
});



