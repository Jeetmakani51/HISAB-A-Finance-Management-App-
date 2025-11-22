// Add this to your home page JavaScript file (or create home.js)

/*document.addEventListener("DOMContentLoaded", () => {
  createQuickSalesOverview();
});

function createQuickSalesOverview() {
  const container = document.querySelector(".liveLineChart");
  
  if (!container) return;

  const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
  
  // Get last 7 days with proper date tracking
  const last7Days = [];
  const salesData = {};
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
    const shortDateStr = date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short'
    });
    last7Days.push({ full: dateStr, short: shortDateStr, day: date.toLocaleDateString('en-US', { weekday: 'short' }) });
    salesData[dateStr] = 0;
  }

  // Calculate sales for each day
  purchases.forEach(p => {
    if (p.date && salesData.hasOwnProperty(p.date)) {
      salesData[p.date] += p.price;
    }
  });

  // Get sales values in order
  const salesValues = last7Days.map(d => salesData[d.full]);
  const maxSale = Math.max(...salesValues, 100); // Minimum 100 for scaling
  const totalWeekSales = salesValues.reduce((sum, val) => sum + val, 0);

  // Chart dimensions
  const chartWidth = 320;
  const chartHeight = 180;
  const padding = { top: 30, right: 20, bottom: 40, left: 15 };

  // Create chart HTML
  let html = `
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 15px;">
      <div style="text-align: center; margin-bottom: 10px;">
        <div style="font-size: 13px; color: #666; margin-bottom: 5px;">Last 7 Days Sales</div>
        <div style="font-size: 28px; font-weight: bold; color: #2563eb;">₹${totalWeekSales.toLocaleString()}</div>
      </div>
      <svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}" style="max-width: 100%; margin: 0 auto;">
  `;

  // Draw grid lines
  const gridLines = 4;
  for (let i = 0; i <= gridLines; i++) {
    const y = padding.top + (i * (chartHeight - padding.top - padding.bottom) / gridLines);
    html += `<line x1="${padding.left}" y1="${y}" x2="${chartWidth - padding.right}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
  }

  // Calculate points
  const xStep = (chartWidth - padding.left - padding.right) / (last7Days.length - 1);
  let pathData = "";
  let gradientPath = "";
  const points = [];

  last7Days.forEach((dateObj, i) => {
    const x = padding.left + i * xStep;
    const value = salesValues[i];
    const y = chartHeight - padding.bottom - ((value / maxSale) * (chartHeight - padding.top - padding.bottom));

    points.push({ x, y, value });

    if (i === 0) {
      pathData = `M ${x} ${y}`;
      gradientPath = `M ${x} ${chartHeight - padding.bottom} L ${x} ${y}`;
    } else {
      pathData += ` L ${x} ${y}`;
      gradientPath += ` L ${x} ${y}`;
    }
  });

  // Close gradient path
  gradientPath += ` L ${points[points.length - 1].x} ${chartHeight - padding.bottom} Z`;

  // Define gradient
  html += `
    <defs>
      <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#2563eb;stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:#2563eb;stop-opacity:0.05" />
      </linearGradient>
    </defs>
  `;

  // Draw gradient area
  html += `<path d="${gradientPath}" fill="url(#salesGradient)"/>`;

  // Draw main line
  html += `<path d="${pathData}" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;

  // Draw points and labels
  points.forEach((point, i) => {
    // Point circles
    html += `<circle cx="${point.x}" cy="${point.y}" r="5" fill="white" stroke="#2563eb" stroke-width="2.5"/>`;
    
    // Day labels
    html += `<text x="${point.x}" y="${chartHeight - padding.bottom + 20}" text-anchor="middle" font-size="11" fill="#666" font-weight="500">${last7Days[i].day}</text>`;
    
    // Value labels (show on hover effect - simplified as text)
    if (point.value > 0) {
      html += `<text x="${point.x}" y="${point.y - 15}" text-anchor="middle" font-size="10" fill="#2563eb" font-weight="600">₹${Math.round(point.value)}</text>`;
    }
  });

  html += `</svg></div>`;

  // Handle empty state
  if (totalWeekSales === 0) {
    html = `
      <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999;">
        <i class="fa-solid fa-chart-line" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
        <div style="font-size: 16px; text-align: center;">No sales data yet</div>
        <div style="font-size: 13px; margin-top: 5px;">Start adding sales to see your trends!</div>
      </div>
    `;
  }

  container.innerHTML = html;
}

// Optional: Refresh chart when returning to home page
window.addEventListener('pageshow', () => {
  createQuickSalesOverview();
});*/

// Add this to your home page JavaScript file (or create home.js)

























/*document.addEventListener("DOMContentLoaded", () => {
  createQuickSalesOverview();
  displayRecentOrders();
});

function createQuickSalesOverview() {
  const container = document.querySelector(".liveLineChart");
  
  if (!container) return;

  const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
  
  // Get last 7 days with proper date tracking
  const last7Days = [];
  const salesData = {};
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
    const shortDateStr = date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short'
    });
    last7Days.push({ full: dateStr, short: shortDateStr, day: date.toLocaleDateString('en-US', { weekday: 'short' }) });
    salesData[dateStr] = 0;
  }

  // Calculate sales for each day
  purchases.forEach(p => {
    if (p.date && salesData.hasOwnProperty(p.date)) {
      salesData[p.date] += p.price;
    }
  });

  // Get sales values in order
  const salesValues = last7Days.map(d => salesData[d.full]);
  const maxSale = Math.max(...salesValues, 100); // Minimum 100 for scaling
  const totalWeekSales = salesValues.reduce((sum, val) => sum + val, 0);

  // Chart dimensions
  const chartWidth = 320;
  const chartHeight = 180;
  const padding = { top: 30, right: 20, bottom: 40, left: 15 };

  // Create chart HTML
  let html = `
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 15px;">
      <div style="text-align: center; margin-bottom: 10px;">
        <div style="font-size: 13px; color: #666; margin-bottom: 5px;">Last 7 Days Sales</div>
        <div style="font-size: 28px; font-weight: bold; color: #2563eb;">₹${totalWeekSales.toLocaleString()}</div>
      </div>
      <svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}" style="max-width: 100%; margin: 0 auto;">
  `;

  // Draw grid lines
  const gridLines = 4;
  for (let i = 0; i <= gridLines; i++) {
    const y = padding.top + (i * (chartHeight - padding.top - padding.bottom) / gridLines);
    html += `<line x1="${padding.left}" y1="${y}" x2="${chartWidth - padding.right}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
  }

  // Calculate points
  const xStep = (chartWidth - padding.left - padding.right) / (last7Days.length - 1);
  let pathData = "";
  let gradientPath = "";
  const points = [];

  last7Days.forEach((dateObj, i) => {
    const x = padding.left + i * xStep;
    const value = salesValues[i];
    const y = chartHeight - padding.bottom - ((value / maxSale) * (chartHeight - padding.top - padding.bottom));

    points.push({ x, y, value });

    if (i === 0) {
      pathData = `M ${x} ${y}`;
      gradientPath = `M ${x} ${chartHeight - padding.bottom} L ${x} ${y}`;
    } else {
      pathData += ` L ${x} ${y}`;
      gradientPath += ` L ${x} ${y}`;
    }
  });

  // Close gradient path
  gradientPath += ` L ${points[points.length - 1].x} ${chartHeight - padding.bottom} Z`;

  // Define gradient
  html += `
    <defs>
      <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#2563eb;stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:#2563eb;stop-opacity:0.05" />
      </linearGradient>
    </defs>
  `;

  // Draw gradient area
  html += `<path d="${gradientPath}" fill="url(#salesGradient)"/>`;

  // Draw main line
  html += `<path d="${pathData}" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;

  // Draw points and labels
  points.forEach((point, i) => {
    // Point circles
    html += `<circle cx="${point.x}" cy="${point.y}" r="5" fill="white" stroke="#2563eb" stroke-width="2.5"/>`;
    
    // Day labels
    html += `<text x="${point.x}" y="${chartHeight - padding.bottom + 20}" text-anchor="middle" font-size="11" fill="#666" font-weight="500">${last7Days[i].day}</text>`;
    
    // Value labels (show on hover effect - simplified as text)
    if (point.value > 0) {
      html += `<text x="${point.x}" y="${point.y - 15}" text-anchor="middle" font-size="10" fill="#2563eb" font-weight="600">₹${Math.round(point.value)}</text>`;
    }
  });

  html += `</svg></div>`;

  // Handle empty state
  if (totalWeekSales === 0) {
    html = `
      <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999;">
        <i class="fa-solid fa-chart-line" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
        <div style="font-size: 16px; text-align: center;">No sales data yet</div>
        <div style="font-size: 13px; margin-top: 5px;">Start adding sales to see your trends!</div>
      </div>
    `;
  }

  container.innerHTML = html;
}

// Display Recent Orders
function displayRecentOrders() {
  const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  
  // Sort purchases by timestamp (most recent first)
  const recentPurchases = purchases
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 3); // Get top 3

  const customerDivs = document.querySelectorAll(".recentOrders .customer");

  if (recentPurchases.length === 0) {
    customerDivs.forEach((div, index) => {
      div.textContent = "No orders yet";
      div.style.color = "#999";
      div.style.fontStyle = "italic";
    });
    return;
  }

  recentPurchases.forEach((purchase, index) => {
    if (customerDivs[index]) {
      const customer = customers.find(c => c.number === purchase.customerNumber);
      const customerName = customer ? customer.name : "Unknown Customer";
      const amount = purchase.price;
      const timeAgo = getTimeAgo(purchase.timestamp);
      const paymentStatus = purchase.payment === "paid" ? "✓" : "⏳";
      const statusColor = purchase.payment === "paid" ? "#16a34a" : "#f59e0b";

      customerDivs[index].innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-weight: 600; color: #333;">${customerName}</span>
            <span style="font-size: 12px; color: #999;">${timeAgo}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-weight: 600; color: #2563eb;">₹${amount.toLocaleString()}</span>
            <span style="font-size: 18px; color: ${statusColor};">${paymentStatus}</span>
          </div>
        </div>
      `;
      customerDivs[index].style.color = "inherit";
      customerDivs[index].style.fontStyle = "normal";
      customerDivs[index].style.cursor = "pointer";
      
      // Make it clickable to view customer details
      customerDivs[index].onclick = () => {
        if (customer) {
          localStorage.setItem("selectedCustomer", JSON.stringify(customer));
          window.location.href = "custinfo.html";
        }
      };
    }
  });

  // Fill remaining slots with "No more orders"
  for (let i = recentPurchases.length; i < customerDivs.length; i++) {
    customerDivs[i].textContent = "—";
    customerDivs[i].style.color = "#ddd";
    customerDivs[i].style.textAlign = "center";
    customerDivs[i].style.cursor = "default";
    customerDivs[i].onclick = null;
  }
}

// Helper function to calculate time ago
function getTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  
  return new Date(timestamp).toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short' 
  });
}

// Optional: Refresh chart when returning to home page
window.addEventListener('pageshow', () => {
  createQuickSalesOverview();
  displayRecentOrders();
});*/


document.addEventListener("DOMContentLoaded", () => {
  createQuickSalesOverview();
  displayRecentOrders();
});

// --- QUICK SALES OVERVIEW CHART ---
function createQuickSalesOverview() {
  const container = document.querySelector(".liveLineChart");
  if (!container) return;

  // Safely load and clean purchases
  const purchases = (JSON.parse(localStorage.getItem("purchases")) || []).map(p => ({
    ...p,
    price: Number(p.price) || 0
  }));

  // Prepare data for the last 7 days
  const last7Days = [];
  const salesData = {};
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const dateStr = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    const shortDateStr = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short"
    });

    last7Days.push({
      full: dateStr,
      short: shortDateStr,
      day: date.toLocaleDateString("en-US", { weekday: "short" })
    });

    salesData[dateStr] = 0;
  }

  // Calculate total sales for each day
  purchases.forEach(p => {
    if (p.date && salesData.hasOwnProperty(p.date)) {
      salesData[p.date] += p.price;
    }
  });

  const salesValues = last7Days.map(d => salesData[d.full]);
  const maxSale = Math.max(...salesValues, 100);
  const totalWeekSales = salesValues.reduce((sum, val) => sum + val, 0);

  // Chart dimensions
  const chartWidth = 320;
  const chartHeight = 180;
  const padding = { top: 30, right: 20, bottom: 40, left: 15 };

  // Chart container HTML
  let html = `
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 15px;">
      <div style="text-align: center; margin-bottom: 10px;">
        <div style="font-size: 13px; color: #666; margin-bottom: 5px;">Last 7 Days Sales</div>
        <div style="font-size: 28px; font-weight: bold; color: #2563eb;">₹${totalWeekSales.toLocaleString()}</div>
      </div>
      <svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}" style="max-width: 100%; margin: 0 auto;">
  `;

  // Grid lines
  const gridLines = 4;
  for (let i = 0; i <= gridLines; i++) {
    const y =
      padding.top +
      (i * (chartHeight - padding.top - padding.bottom)) / gridLines;
    html += `<line x1="${padding.left}" y1="${y}" x2="${
      chartWidth - padding.right
    }" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
  }

  // Calculate line points
  const xStep =
    (chartWidth - padding.left - padding.right) / (last7Days.length - 1);
  let pathData = "";
  let gradientPath = "";
  const points = [];

  last7Days.forEach((dateObj, i) => {
    const x = padding.left + i * xStep;
    const value = salesValues[i];
    const y =
      chartHeight -
      padding.bottom -
      (value / maxSale) * (chartHeight - padding.top - padding.bottom);

    points.push({ x, y, value });

    if (i === 0) {
      pathData = `M ${x} ${y}`;
      gradientPath = `M ${x} ${chartHeight - padding.bottom} L ${x} ${y}`;
    } else {
      pathData += ` L ${x} ${y}`;
      gradientPath += ` L ${x} ${y}`;
    }
  });

  // Close gradient
  gradientPath += ` L ${points[points.length - 1].x} ${
    chartHeight - padding.bottom
  } Z`;

  // Gradient definition
  html += `
    <defs>
      <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#2563eb;stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:#2563eb;stop-opacity:0.05" />
      </linearGradient>
    </defs>
  `;

  // Fill gradient
  html += `<path d="${gradientPath}" fill="url(#salesGradient)"/>`;

  // Draw line
  html += `<path d="${pathData}" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;

  // Draw points and labels
  points.forEach((point, i) => {
    html += `<circle cx="${point.x}" cy="${point.y}" r="5" fill="white" stroke="#2563eb" stroke-width="2.5"/>`;
    html += `<text x="${point.x}" y="${
      chartHeight - padding.bottom + 20
    }" text-anchor="middle" font-size="11" fill="#666" font-weight="500">${
      last7Days[i].day
    }</text>`;

    if (point.value > 0) {
      html += `<text x="${point.x}" y="${
        point.y - 15
      }" text-anchor="middle" font-size="10" fill="#2563eb" font-weight="600">₹${Math.round(
        point.value
      )}</text>`;
    }
  });

  html += `</svg></div>`;

  // Empty state fallback
  if (totalWeekSales === 0) {
    html = `
      <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999;">
        <i class="fa-solid fa-chart-line" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
        <div style="font-size: 16px; text-align: center;">No sales data yet</div>
        <div style="font-size: 13px; margin-top: 5px;">Start adding sales to see your trends!</div>
      </div>
    `;
  }

  container.innerHTML = html;
}

// --- RECENT ORDERS SECTION ---
function displayRecentOrders() {
  // Safe load
  const purchases = (JSON.parse(localStorage.getItem("purchases")) || []).map(p => ({
    ...p,
    price: Number(p.price) || 0
  }));
  const customers = JSON.parse(localStorage.getItem("customers")) || [];

  const recentPurchases = purchases
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 3);

  const customerDivs = document.querySelectorAll(".recentOrders .customer");

  if (recentPurchases.length === 0) {
    customerDivs.forEach(div => {
      div.textContent = "No orders yet";
      div.style.color = "#999";
      div.style.fontStyle = "italic";
    });
    return;
  }

  recentPurchases.forEach((purchase, index) => {
    if (customerDivs[index]) {
      const customer = customers.find(c => c.number === purchase.customerNumber);
      const customerName = customer ? customer.name : "Unknown Customer";
      const amount = Number(purchase.price) || 0;
      const timeAgo = getTimeAgo(purchase.timestamp);
      const paymentStatus = purchase.payment === "paid" ? "✓" : "⏳";
      const statusColor = purchase.payment === "paid" ? "#16a34a" : "#f59e0b";

      customerDivs[index].innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-weight: 600; color: #333;">${customerName}</span>
            <span style="font-size: 12px; color: #999;">${timeAgo}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-weight: 600; color: #2563eb;">₹${amount.toLocaleString()}</span>
            <span style="font-size: 18px; color: ${statusColor};">${paymentStatus}</span>
          </div>
        </div>
      `;

      customerDivs[index].style.color = "inherit";
      customerDivs[index].style.fontStyle = "normal";
      customerDivs[index].style.cursor = "pointer";

      // Make clickable
      customerDivs[index].onclick = () => {
        if (customer) {
          localStorage.setItem("selectedCustomer", JSON.stringify(customer));
          window.location.href = "custinfo.html";
        }
      };
    }
  });

  // Fill empty slots
  for (let i = recentPurchases.length; i < customerDivs.length; i++) {
    customerDivs[i].textContent = "—";
    customerDivs[i].style.color = "#ddd";
    customerDivs[i].style.textAlign = "center";
    customerDivs[i].style.cursor = "default";
    customerDivs[i].onclick = null;
  }
}

// --- TIME CALCULATION UTILITY ---
function getTimeAgo(timestamp) {
  if (!timestamp) return "Unknown";

  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short"
  });
}

// --- REFRESH WHEN RETURNING TO PAGE ---
window.addEventListener("pageshow", () => {
  createQuickSalesOverview();
  displayRecentOrders();
});





