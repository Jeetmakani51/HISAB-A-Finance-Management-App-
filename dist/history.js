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
        <button class="deleteBtn" title="Delete Customer">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;
      
      // Click on card to view details (except delete button)
      card.addEventListener("click", (e) => {
        // Don't navigate if clicking delete button
        if (e.target.closest(".deleteBtn")) return;
        
        localStorage.setItem("selectedCustomer", JSON.stringify(cust));
        window.location.href = "custinfo.html";
      });

      // Delete button functionality
      const deleteBtn = card.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent card click event
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

    // Get current data
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

    // Remove customer
    customers = customers.filter(c => c.number !== customer.number);

    // Remove all purchases for this customer
    purchases = purchases.filter(p => p.customerNumber !== customer.number);

    // Save updated data
    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("purchases", JSON.stringify(purchases));

    // Show success message
    showNotification(`${customer.name} deleted successfully!`);

    // Re-render the list
    renderCustomers(searchInput.value);
  }

  // Show notification
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "deleteNotification";
    notification.textContent = message;
    document.body.appendChild(notification);

    // Fade in
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Remove after 3 seconds
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

// Refresh customer list when page becomes visible (user navigates back)
window.addEventListener('pageshow', (event) => {
  const container = document.querySelector(".customerReports");
  const searchInput = document.getElementById("searchInput");
  
  if (container) {
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
          <button class="deleteBtn" title="Delete Customer">
            <i class="fa-solid fa-trash"></i>
          </button>
        `;
        
        card.addEventListener("click", (e) => {
          if (e.target.closest(".deleteBtn")) return;
          localStorage.setItem("selectedCustomer", JSON.stringify(cust));
          window.location.href = "custinfo.html";
        });

        const deleteBtn = card.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          
          const confirmDelete = confirm(
            `Are you sure you want to delete ${cust.name}?\n\nThis will permanently remove:\n• Customer record\n• All purchase history\n\nThis action cannot be undone.`
          );

          if (!confirmDelete) return;

          let customers = JSON.parse(localStorage.getItem("customers")) || [];
          let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

          customers = customers.filter(c => c.number !== cust.number);
          purchases = purchases.filter(p => p.customerNumber !== cust.number);

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

