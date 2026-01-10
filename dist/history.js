/*ocument.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".customerReports");
  const searchInput = document.getElementById("searchInput");
  const customers = JSON.parse(localStorage.getItem("customers")) || [];

  // Function to render customer cards
  function renderCustomers(filter = "") {
    container.innerHTML = "";

    const filtered = customers.filter(c =>
      c.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      container.innerHTML = `<p style="color: gray; text-align: center;">No matching customers found.</p>`;
      return;
    }

    filtered.forEach(cust => {
      const initials = cust.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();

      const card = document.createElement("div");
      card.classList.add("customerCard");
      card.innerHTML = `
        <div class="profile" data-total="₹${cust.price.toFixed(2)}">${initials}</div>
        <div class="detailsSection">
          <div class="fullName">${cust.name}</div>
          <div class="lastSale">Last Sale: ${cust.lastSale}</div>
        </div>
        <div class="totalSpent">₹${cust.price.toLocaleString()}</div>
      `;
      card.addEventListener("click", () => {
          localStorage.setItem("selectedCustomer", JSON.stringify(cust));
          window.location.href = "custinfo.html";
       });
      container.appendChild(card);
    });
  }

  // Initial render
  renderCustomers();

  // Listen for typing in the search box
  searchInput.addEventListener("input", (e) => {
    renderCustomers(e.target.value);
  });
});
*/

/*document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".customerReports");
  const searchInput = document.getElementById("searchInput");

  // Function to render customer cards
  function renderCustomers(filter = "") {
    // Reload customers from localStorage every time we render
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    
    container.innerHTML = "";

    const filtered = customers.filter(c =>
      c.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      container.innerHTML = `<p style="color: gray; text-align: center;">No matching customers found.</p>`;
      return;
    }

    filtered.forEach(cust => {
      const initials = cust.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();

      const card = document.createElement("div");
      card.classList.add("customerCard");
      card.innerHTML = `
        <div class="profile" data-total="₹${cust.price.toFixed(2)}">${initials}</div>
        <div class="detailsSection">
          <div class="fullName">${cust.name}</div>
          <div class="lastSale">Last Sale: ${cust.lastSale}</div>
        </div>
        <div class="totalSpent">₹${cust.price.toLocaleString()}</div>
      `;
      card.addEventListener("click", () => {
          localStorage.setItem("selectedCustomer", JSON.stringify(cust));
          window.location.href = "custinfo.html";
       });
      container.appendChild(card);
    });
  }

  // Initial render
  renderCustomers();

  // Listen for typing in the search box
  searchInput.addEventListener("input", (e) => {
    renderCustomers(e.target.value);
  });
});

// Refresh customer list when page becomes visible (user navigates back)
window.addEventListener('pageshow', (event) => {
  const container = document.querySelector(".customerReports");
  const searchInput = document.getElementById("searchInput");
  
  if (container) {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    
    // Function to render (inline version for pageshow)
    function renderCustomers(filter = "") {
      const customers = JSON.parse(localStorage.getItem("customers")) || [];
      container.innerHTML = "";

      const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(filter.toLowerCase())
      );

      if (filtered.length === 0) {
        container.innerHTML = `<p style="color: gray; text-align: center;">No matching customers found.</p>`;
        return;
      }

      filtered.forEach(cust => {
        const initials = cust.name
          .split(" ")
          .map(n => n[0])
          .join("")
          .toUpperCase();

        const card = document.createElement("div");
        card.classList.add("customerCard");
        card.innerHTML = `
          <div class="profile" data-total="₹${cust.price.toFixed(2)}">${initials}</div>
          <div class="detailsSection">
            <div class="fullName">${cust.name}</div>
            <div class="lastSale">Last Sale: ${cust.lastSale}</div>
          </div>
          <div class="totalSpent">₹${cust.price.toLocaleString()}</div>
        `;
        card.addEventListener("click", () => {
            localStorage.setItem("selectedCustomer", JSON.stringify(cust));
            window.location.href = "custinfo.html";
         });
        container.appendChild(card);
      });
    }
    
    renderCustomers(searchInput ? searchInput.value : "");
  }
});*/

// new

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".customerReports");
  const searchInput = document.getElementById("searchInput");

  // Function to render customer cards
  function renderCustomers(filter = "") {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    container.innerHTML = "";

    const filtered = customers.filter((c) =>
      c.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      container.innerHTML = `<p style="color: gray; text-align: center;">No matching customers found.</p>`;
      return;
    }

    filtered.forEach((cust) => {
      const initials = cust.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      const card = document.createElement("div");
      card.classList.add("customerCard");
      card.innerHTML = `
        <div class="profile" data-total="₹${cust.price.toFixed(
          2
        )}">${initials}</div>
        <div class="detailsSection">
          <div class="fullName">${cust.name}</div>
          <div class="lastSale">Last Sale: ${cust.lastSale}</div>
        </div>
        <div class="totalSpent">₹${cust.price.toLocaleString()}</div>
        <button class="invoiceBtn" title="Generate Invoice">
          <i class="fa-solid fa-file-invoice"></i>
        </button>
        <button class="deleteBtn" title="Delete Customer">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;

      // Click on card to view details (except buttons)
      card.addEventListener("click", (e) => {
        if (e.target.closest(".deleteBtn") || e.target.closest(".invoiceBtn"))
          return;
        localStorage.setItem("selectedCustomer", JSON.stringify(cust));
        window.location.href = "custinfo.html";
      });

      // Invoice button functionality - ADD THIS!
      const invoiceBtn = card.querySelector(".invoiceBtn");
      invoiceBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        generateInvoiceForCustomer(cust);
      });

      // Delete button functionality
      const deleteBtn = card.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteCustomer(cust);
      });

      container.appendChild(card);
    });
  }

  // Delete customer function
  function deleteCustomer(customer) {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${customer.name}?\n\nThis will permanently remove:\n• Customer record\n• All purchase history\n\nThis action cannot be undone.`
    );

    if (!confirmDelete) return;

    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

    customers = customers.filter((c) => c.number !== customer.number);
    purchases = purchases.filter((p) => p.customerNumber !== customer.number);

    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("purchases", JSON.stringify(purchases));

    showNotification(`${customer.name} deleted successfully!`);
    renderCustomers(searchInput.value);
  }

  // Show notification
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "deleteNotification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Initial render
  renderCustomers();

  // Listen for typing in the search box
  searchInput.addEventListener("input", (e) => {
    renderCustomers(e.target.value);
  });
});

// Refresh customer list when page becomes visible
window.addEventListener("pageshow", (event) => {
  const container = document.querySelector(".customerReports");
  const searchInput = document.getElementById("searchInput");

  if (container) {
    function renderCustomers(filter = "") {
      const customers = JSON.parse(localStorage.getItem("customers")) || [];
      container.innerHTML = "";

      const filtered = customers.filter((c) =>
        c.name.toLowerCase().includes(filter.toLowerCase())
      );

      if (filtered.length === 0) {
        container.innerHTML = `<p style="color: gray; text-align: center;">No matching customers found.</p>`;
        return;
      }

      filtered.forEach((cust) => {
        const initials = cust.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        const card = document.createElement("div");
        card.classList.add("customerCard");
        card.innerHTML = `
          <div class="profile" data-total="₹${cust.price.toFixed(
            2
          )}">${initials}</div>
          <div class="detailsSection">
            <div class="fullName">${cust.name}</div>
            <div class="lastSale">Last Sale: ${cust.lastSale}</div>
          </div>
          <div class="totalSpent">₹${cust.price.toLocaleString()}</div>
          <button class="invoiceBtn" title="Generate Invoice">
            <i class="fa-solid fa-file-invoice"></i>
          </button>
          <button class="deleteBtn" title="Delete Customer">
            <i class="fa-solid fa-trash"></i>
          </button>
        `;

        card.addEventListener("click", (e) => {
          if (e.target.closest(".deleteBtn") || e.target.closest(".invoiceBtn"))
            return;
          localStorage.setItem("selectedCustomer", JSON.stringify(cust));
          window.location.href = "custinfo.html";
        });

        // Invoice button - FIXED PLACEMENT!
        const invoiceBtn = card.querySelector(".invoiceBtn");
        invoiceBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          generateInvoiceForCustomer(cust);
        });

        // Delete button
        const deleteBtn = card.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();

          const confirmDelete = confirm(
            `Are you sure you want to delete ${cust.name}?\n\nThis will permanently remove:\n• Customer record\n• All purchase history\n\nThis action cannot be undone.`
          );

          if (!confirmDelete) return;

          let customers = JSON.parse(localStorage.getItem("customers")) || [];
          let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

          customers = customers.filter((c) => c.number !== cust.number);
          purchases = purchases.filter((p) => p.customerNumber !== cust.number);

          localStorage.setItem("customers", JSON.stringify(customers));
          localStorage.setItem("purchases", JSON.stringify(purchases));

          renderCustomers(searchInput ? searchInput.value : "");
        });

        container.appendChild(card);
      });
    }

    renderCustomers(searchInput ? searchInput.value : "");
  }
});

// Generate invoice for customer
function generateInvoiceForCustomer(customer) {
  const allPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
  const customerPurchases = allPurchases.filter(
    (p) => p.customerNumber === customer.number
  );

  if (customerPurchases.length === 0) {
    alert("No purchases found for this customer!");
    return;
  }

  const totalAmount = customerPurchases.reduce((sum, p) => sum + p.price, 0);
  const pendingAmount = customerPurchases
    .filter(
      (p) =>
        p.payment === "unpaid" ||
        p.payment === "pending" ||
        p.payment === "Pending"
    )
    .reduce((sum, p) => sum + p.price, 0);
  const paidAmount = totalAmount - pendingAmount;

  const date = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  let message = `
━━━━━━━━━━━━━━━━━━━━
    *STATEMENT* 
━━━━━━━━━━━━━━━━━━━━

*Customer:* ${customer.name}
*Date:* ${date}
*Total Purchases:* ${customerPurchases.length}

━━━━━━━━━━━━━━━━━━━━
*PURCHASE HISTORY*
━━━━━━━━━━━━━━━━━━━━
`;

  customerPurchases.forEach((purchase, index) => {
    const status =
      purchase.payment === "paid" || purchase.payment === "Paid"
        ? " Paid"
        : " Pending";

    let itemsText = "";
    if (purchase.itemsText) {
      itemsText = purchase.itemsText;
    } else if (Array.isArray(purchase.items)) {
      itemsText = purchase.items
        .map((item) => `${item.name} (x${item.quantity})`)
        .join(", ");
    } else {
      itemsText = purchase.items || "No items";
    }

    message += `\n${index + 1}. *${purchase.date}*\n`;
    message += `   ${itemsText}\n`;
    message += `   ₹${purchase.price.toLocaleString()} - ${status}\n`;
  });

  message += `
━━━━━━━━━━━━━━━━━━━━
*SUMMARY*
━━━━━━━━━━━━━━━━━━━━

 *Total Amount:* ₹${totalAmount.toLocaleString()}
 *Paid:* ₹${paidAmount.toLocaleString()}
 *Pending:* ₹${pendingAmount.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━

Thank you for your business! 

_This is an auto-generated statement._
`;

  sendWhatsAppInvoice(customer.number, message.trim());
}

// Send invoice via WhatsApp
function sendWhatsAppInvoice(phoneNumber, message) {
  let cleanNumber = phoneNumber.replace(/\D/g, "");

  if (cleanNumber.length === 10) {
    cleanNumber = "91" + cleanNumber;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}
