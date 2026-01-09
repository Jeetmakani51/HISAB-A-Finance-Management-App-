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
*/

// new

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
    .filter((p) => p.customerNumber === selectedCustomer.number)
    .sort((a, b) => b.timestamp - a.timestamp); // Sort by date (newest first)

  // Function to calculate totals
  function calculateTotals() {
    let totalSpent = 0;
    let pendingAmount = 0;

    customerPurchases.forEach((purchase) => {
      totalSpent += purchase.price;
      if (
        purchase.payment === "unpaid" ||
        purchase.payment === "pending" ||
        purchase.payment === "Pending"
      ) {
        pendingAmount += purchase.price;
      }
    });

    return { totalSpent, pendingAmount };
  }

  // Function to update the display
  function updateDisplay() {
    const { totalSpent, pendingAmount } = calculateTotals();

    document.querySelector(
      ".custTotalSpent span"
    ).textContent = `₹${totalSpent.toLocaleString()}`;
    document.querySelector(
      ".custAmountPending span"
    ).textContent = `₹${pendingAmount.toLocaleString()}`;
  }

  // Function to toggle payment status
  function togglePaymentStatus(purchaseIndex) {
    const purchase = customerPurchases[purchaseIndex];

    // Toggle between paid and pending
    if (purchase.payment === "paid" || purchase.payment === "Paid") {
      purchase.payment = "pending";
    } else {
      purchase.payment = "paid";
    }

    // Update the purchase in the main purchases array
    const allPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
    const mainIndex = allPurchases.findIndex(
      (p) =>
        p.customerNumber === purchase.customerNumber &&
        p.timestamp === purchase.timestamp
    );

    if (mainIndex !== -1) {
      allPurchases[mainIndex].payment = purchase.payment;
      localStorage.setItem("purchases", JSON.stringify(allPurchases));
    }

    // Update the display
    updateDisplay();
    renderPurchases();
  }

  // Function to render purchases
  function renderPurchases() {
    const itemsContainer = document.querySelector(".custItemsBought");
    itemsContainer.innerHTML = ""; // Clear existing items

    if (customerPurchases.length === 0) {
      itemsContainer.innerHTML = `<p style="color: gray; text-align: center; padding: 20px;">No purchase history available.</p>`;
      return;
    }

    customerPurchases.forEach((purchase, index) => {
      const itemCard = document.createElement("div");
      itemCard.classList.add("itemCard");

      // Determine status class and text
      let statusClass = "pending";
      let statusText = "Pending";

      if (purchase.payment === "paid" || purchase.payment === "Paid") {
        statusClass = "paid";
        statusText = "Paid";
      } else if (
        purchase.payment === "unpaid" ||
        purchase.payment === "pending" ||
        purchase.payment === "Pending"
      ) {
        statusClass = "pending";
        statusText = "Pending";
      }

      // Handle both old and new item format
      let itemDisplay = "";
      if (Array.isArray(purchase.items)) {
        // New format: array of items
        itemDisplay = purchase.items
          .map((item) => `${item.name} (x${item.quantity})`)
          .join(", ");
      } else if (purchase.itemsText) {
        // Use pre-formatted text
        itemDisplay = purchase.itemsText;
      } else {
        // Old format: simple string
        const quantity = purchase.quantity > 0 ? `(x${purchase.quantity})` : "";
        itemDisplay = `${purchase.items || "No item specified"} ${quantity}`;
      }

      itemCard.innerHTML = `
        <div class="itemName">${itemDisplay}</div>
        <div class="itemAmount">₹${purchase.price.toLocaleString()}</div>
        <div class="status ${statusClass}" data-index="${index}" style="cursor: pointer;">${statusText}</div>
      `;

      // Add click event to status button
      const statusBtn = itemCard.querySelector(".status");
      statusBtn.addEventListener("click", () => {
        togglePaymentStatus(index);
      });

      itemsContainer.appendChild(itemCard);
    });
  }

  // Initial setup
  document.querySelector(".custName").textContent = selectedCustomer.name;
  document.querySelector(".custPhoneNo").textContent = selectedCustomer.number;

  if (customerPurchases.length > 0) {
    document.querySelector(
      ".custHistory .date"
    ).textContent = `Last Order: ${customerPurchases[0].date}`;
  } else {
    document.querySelector(".custHistory .date").textContent =
      "Last Order: No orders yet";
  }

  updateDisplay();
  renderPurchases();
});
