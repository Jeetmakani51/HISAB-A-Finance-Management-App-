/*document.addEventListener("DOMContentLoaded", () => {
  const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
  const customers = JSON.parse(localStorage.getItem("customers")) || [];

  // Get today's date
  const today = new Date();
  const todayStr = today.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });

  // Filter today's purchases
  const todayPurchases = purchases.filter(p => p.date === todayStr);

  // ========== UPDATE METRICS CARDS ==========
  
  // 1. Today's Revenue
  const todayRevenue = todayPurchases.reduce((sum, p) => sum + p.price, 0);
  document.getElementById("todayRevenue").textContent = `₹${todayRevenue.toLocaleString()}`;

  // 2. Orders Today
  document.getElementById("ordersToday").textContent = todayPurchases.length;

  // 3. Average Order Value
  const avgOrderValue = todayPurchases.length > 0 ? todayRevenue / todayPurchases.length : 0;
  document.getElementById("avgOrderValue").textContent = `₹${Math.round(avgOrderValue).toLocaleString()}`;

  // 4. Top Customer Today
  const customerSales = {};
  todayPurchases.forEach(p => {
    customerSales[p.customerNumber] = (customerSales[p.customerNumber] || 0) + p.price;
  });

  let topCustomerNumber = null;
  let maxSpent = 0;
  for (const [number, amount] of Object.entries(customerSales)) {
    if (amount > maxSpent) {
      maxSpent = amount;
      topCustomerNumber = number;
    }
  }

  if (topCustomerNumber) {
    const topCust = customers.find(c => c.number === topCustomerNumber);
    document.getElementById("topCustomer").textContent = topCust ? topCust.name : "Unknown";
  } else {
    document.getElementById("topCustomer").textContent = "No sales yet";
  }

  // ========== HOURLY SALES CHART ==========
  createHourlySalesChart(todayPurchases);

  // ========== PAYMENT METHODS CHART ==========
  createPaymentMethodsChart(todayPurchases);

  // ========== PRODUCT PERFORMANCE ==========
  createProductPerformance(todayPurchases);

  // ========== TODAY'S ORDERS LIST ==========
  createOrdersList(todayPurchases, customers);

  // ========== COMPARISON WIDGET ==========
  createComparison(purchases, todayStr, todayRevenue);
});

// Function to create Hourly Sales Chart
function createHourlySalesChart(todayPurchases) {
  const container = document.getElementById("hourlySalesChart");

  if (todayPurchases.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: #999; padding: 20px;">No sales data for today</p>`;
    return;
  }

  // Group by hour (assuming timestamps exist)
  const hourlySales = {};
  for (let i = 9; i <= 21; i++) {
    hourlySales[i] = 0;
  }

  todayPurchases.forEach(p => {
    if (p.timestamp) {
      const hour = new Date(p.timestamp).getHours();
      if (hour >= 9 && hour <= 21) {
        hourlySales[hour] += p.price;
      }
    }
  });

  const maxSale = Math.max(...Object.values(hourlySales), 1);
  const chartHeight = 250;
  const chartWidth = 800;
  const padding = { top: 20, right: 20, bottom: 50, left: 60 };

  let svg = `<svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}" style="max-width: 100%;">`;

  // Draw axes
  svg += `<line x1="${padding.left}" y1="${chartHeight - padding.bottom}" x2="${chartWidth - padding.right}" y2="${chartHeight - padding.bottom}" stroke="#ddd" stroke-width="2"/>`;
  svg += `<line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${chartHeight - padding.bottom}" stroke="#ddd" stroke-width="2"/>`;

  // Y-axis labels
  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const value = (maxSale / ySteps) * i;
    const y = chartHeight - padding.bottom - ((value / maxSale) * (chartHeight - padding.top - padding.bottom));
    svg += `<text x="${padding.left - 10}" y="${y + 5}" text-anchor="end" font-size="11" fill="#666">₹${Math.round(value)}</text>`;
    svg += `<line x1="${padding.left}" y1="${y}" x2="${chartWidth - padding.right}" y2="${y}" stroke="#f0f0f0" stroke-width="1"/>`;
  }

  // Draw bars
  const hours = Object.keys(hourlySales);
  const barWidth = (chartWidth - padding.left - padding.right) / hours.length - 10;

  hours.forEach((hour, i) => {
    const x = padding.left + (i * (chartWidth - padding.left - padding.right) / hours.length) + 5;
    const barHeight = (hourlySales[hour] / maxSale) * (chartHeight - padding.top - padding.bottom);
    const y = chartHeight - padding.bottom - barHeight;

    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="#2563eb" rx="4"/>`;
    
    // Hour label
    const hourLabel = hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
    svg += `<text x="${x + barWidth / 2}" y="${chartHeight - padding.bottom + 20}" text-anchor="middle" font-size="11" fill="#666">${hourLabel}</text>`;
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

// Function to create Payment Methods Chart
function createPaymentMethodsChart(todayPurchases) {
  const container = document.getElementById("paymentMethodsChart");

  if (todayPurchases.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: #999; padding: 20px;">No payment data for today</p>`;
    return;
  }

  const paymentMethods = {};
  todayPurchases.forEach(p => {
    const method = p.payment || "Unknown";
    paymentMethods[method] = (paymentMethods[method] || 0) + 1;
  });

  const colors = {
    "paid": "#16a34a",
    "Paid": "#16a34a",
    "pending": "#f59e0b",
    "Pending": "#f59e0b",
    "cash": "#3b82f6",
    "Cash": "#3b82f6",
    "unknown": "#6b7280"
  };

  const total = todayPurchases.length;
  const radius = 100;
  const centerX = 130;
  const centerY = 130;
  let currentAngle = 0;

  let html = `<div style="display: flex; align-items: center; justify-content: space-around; gap: 30px; flex-wrap: wrap; padding: 10px;">`;
  html += `<svg width="260" height="260" viewBox="0 0 260 260" style="flex-shrink: 0;">`;

  Object.entries(paymentMethods).forEach(([method, count]) => {
    const percentage = (count / total) * 100;
    const sliceAngle = (percentage / 100) * 360;
    
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    
    const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
    const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
    const x2 = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
    const y2 = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);
    
    const largeArc = sliceAngle > 180 ? 1 : 0;
    const color = colors[method] || colors["unknown"];
    
    html += `<path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${color}" stroke="white" stroke-width="3"/>`;
    
    currentAngle = endAngle;
  });

  html += `</svg><div style="display: flex; flex-direction: column; gap: 12px; min-width: 180px;">`;

  Object.entries(paymentMethods).forEach(([method, count]) => {
    const percentage = ((count / total) * 100).toFixed(1);
    const color = colors[method] || colors["unknown"];
    
    html += `
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 24px; height: 24px; background: ${color}; border-radius: 4px; flex-shrink: 0;"></div>
        <span style="font-size: 15px; color: #333; font-weight: 500;">${method}: ${count} (${percentage}%)</span>
      </div>
    `;
  });

  html += `</div></div>`;
  container.innerHTML = html;
}

// Function to create Product Performance
function createProductPerformance(todayPurchases) {
  const container = document.getElementById("productPerformance");

  if (todayPurchases.length === 0) {
    container.innerHTML = `<p class="noProducts">No products sold today</p>`;
    return;
  }

  const productStats = {};
  todayPurchases.forEach(p => {
    const item = p.items || "Unknown";
    if (!productStats[item]) {
      productStats[item] = { quantity: 0, revenue: 0 };
    }
    productStats[item].quantity += p.quantity;
    productStats[item].revenue += p.price;
  });

  // Sort by revenue
  const sorted = Object.entries(productStats).sort((a, b) => b[1].revenue - a[1].revenue);

  let html = "";
  sorted.forEach(([product, stats]) => {
    html += `
      <div class="productItem">
        <div class="productName">${product}</div>
        <div class="productStats">
          <div class="quantity">${stats.quantity} units</div>
          <div class="revenue">₹${stats.revenue.toLocaleString()}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Function to create Orders List
function createOrdersList(todayPurchases, customers) {
  const container = document.getElementById("ordersList");

  if (todayPurchases.length === 0) {
    container.innerHTML = `<div class="noOrders">No orders placed today</div>`;
    return;
  }

  // Sort by timestamp (newest first)
  const sorted = [...todayPurchases].sort((a, b) => b.timestamp - a.timestamp);

  let html = "";
  sorted.forEach(p => {
    const customer = customers.find(c => c.number === p.customerNumber);
    const customerName = customer ? customer.name : "Unknown";
    const time = p.timestamp ? new Date(p.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "-";
    const statusClass = (p.payment === "paid" || p.payment === "Paid") ? "paid" : "pending";
    const statusText = statusClass === "paid" ? "Paid" : "Pending";

    html += `
      <div class="orderCard">
        <div class="orderTime">${time}</div>
        <div class="orderCustomer">${customerName} - ${p.items || "Unknown"}</div>
        <div class="orderAmount">₹${p.price.toLocaleString()}</div>
        <div class="orderStatus ${statusClass}">${statusText}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Function to create Comparison
function createComparison(allPurchases, todayStr, todayRevenue) {
  // Today
  document.getElementById("todayComp").textContent = `₹${todayRevenue.toLocaleString()}`;

  // Yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });

  const yesterdayPurchases = allPurchases.filter(p => p.date === yesterdayStr);
  const yesterdayRevenue = yesterdayPurchases.reduce((sum, p) => sum + p.price, 0);
  document.getElementById("yesterdayComp").textContent = `₹${yesterdayRevenue.toLocaleString()}`;

  if (yesterdayRevenue > 0) {
    const yesterdayChange = ((todayRevenue - yesterdayRevenue) / yesterdayRevenue * 100).toFixed(1);
    const changeEl = document.getElementById("yesterdayChange");
    changeEl.textContent = `${yesterdayChange >= 0 ? '↑' : '↓'} ${Math.abs(yesterdayChange)}%`;
    changeEl.className = `compChange ${yesterdayChange >= 0 ? 'positive' : 'negative'}`;
  }

  // Last Week Same Day
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const lastWeekStr = lastWeek.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });

  const lastWeekPurchases = allPurchases.filter(p => p.date === lastWeekStr);
  const lastWeekRevenue = lastWeekPurchases.reduce((sum, p) => sum + p.price, 0);
  document.getElementById("lastWeekComp").textContent = `₹${lastWeekRevenue.toLocaleString()}`;

  if (lastWeekRevenue > 0) {
    const lastWeekChange = ((todayRevenue - lastWeekRevenue) / lastWeekRevenue * 100).toFixed(1);
    const changeEl = document.getElementById("lastWeekChange");
    changeEl.textContent = `${lastWeekChange >= 0 ? '↑' : '↓'} ${Math.abs(lastWeekChange)}%`;
    changeEl.className = `compChange ${lastWeekChange >= 0 ? 'positive' : 'negative'}`;
  }
}*/
























/*document.addEventListener("DOMContentLoaded", () => {
  const purchases = Array.isArray(JSON.parse(localStorage.getItem("purchases")))
    ? JSON.parse(localStorage.getItem("purchases"))
    : [];
  const customers = Array.isArray(JSON.parse(localStorage.getItem("customers")))
    ? JSON.parse(localStorage.getItem("customers"))
    : [];

  // Get today's date
  const today = new Date();
  const todayStr = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Filter today's purchases
  const todayPurchases = purchases.filter((p) => p.date === todayStr);

  // ========== UPDATE METRICS CARDS ==========

  // 1. Today's Revenue
  const todayRevenue = todayPurchases.reduce(
    (sum, p) => sum + (parseFloat(p.price) || 0),
    0
  );
  document.getElementById("todayRevenue").textContent = `₹${Number(
    todayRevenue
  ).toLocaleString()}`;

  // 2. Orders Today
  document.getElementById("ordersToday").textContent = todayPurchases.length;

  // 3. Average Order Value
  const avgOrderValue =
    todayPurchases.length > 0 ? todayRevenue / todayPurchases.length : 0;
  document.getElementById("avgOrderValue").textContent = `₹${Math.round(
    avgOrderValue
  ).toLocaleString()}`;

  // 4. Top Customer Today
  const customerSales = {};
  todayPurchases.forEach((p) => {
    const num = p.customerNumber || "unknown";
    customerSales[num] = (customerSales[num] || 0) + (parseFloat(p.price) || 0);
  });

  let topCustomerNumber = null;
  let maxSpent = 0;
  for (const [number, amount] of Object.entries(customerSales)) {
    if (amount > maxSpent) {
      maxSpent = amount;
      topCustomerNumber = number;
    }
  }

  const topCust = customers.find((c) => c.number === topCustomerNumber);
  document.getElementById("topCustomer").textContent = topCust
    ? topCust.name
    : "No sales yet";

  // ========== CHARTS & WIDGETS ==========
  createHourlySalesChart(todayPurchases);
  createPaymentMethodsChart(todayPurchases);
  createProductPerformance(todayPurchases);
  createOrdersList(todayPurchases, customers);
  createComparison(purchases, todayStr, todayRevenue);
});

// ======================== HOURLY SALES ========================
function createHourlySalesChart(todayPurchases) {
  const container = document.getElementById("hourlySalesChart");
  if (!todayPurchases || todayPurchases.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: #999; padding: 20px;">No sales data for today</p>`;
    return;
  }

  const hourlySales = {};
  for (let i = 9; i <= 21; i++) hourlySales[i] = 0;

  todayPurchases.forEach((p) => {
    if (p.timestamp) {
      const hour = new Date(p.timestamp).getHours();
      if (hour >= 9 && hour <= 21) {
        hourlySales[hour] += parseFloat(p.price) || 0;
      }
    }
  });

  const maxSale = Math.max(...Object.values(hourlySales), 1);
  const chartHeight = 250,
    chartWidth = 800,
    padding = { top: 20, right: 20, bottom: 50, left: 60 };

  let svg = `<svg width="${chartWidth}" height="${chartHeight}" style="max-width:100%;">`;
  svg += `<line x1="${padding.left}" y1="${chartHeight - padding.bottom}" x2="${
    chartWidth - padding.right
  }" y2="${chartHeight - padding.bottom}" stroke="#ddd"/>`;
  svg += `<line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${
    chartHeight - padding.bottom
  }" stroke="#ddd"/>`;

  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const value = (maxSale / ySteps) * i;
    const y =
      chartHeight -
      padding.bottom -
      (value / maxSale) * (chartHeight - padding.top - padding.bottom);
    svg += `<text x="${padding.left - 10}" y="${
      y + 5
    }" text-anchor="end" font-size="11" fill="#666">₹${Math.round(
      value
    )}</text>`;
    svg += `<line x1="${padding.left}" y1="${y}" x2="${
      chartWidth - padding.right
    }" y2="${y}" stroke="#f0f0f0"/>`;
  }

  const hours = Object.keys(hourlySales);
  const barWidth =
    (chartWidth - padding.left - padding.right) / hours.length - 10;

  hours.forEach((hour, i) => {
    const x =
      padding.left +
      i * ((chartWidth - padding.left - padding.right) / hours.length) +
      5;
    const barHeight =
      (hourlySales[hour] / maxSale) *
      (chartHeight - padding.top - padding.bottom);
    const y = chartHeight - padding.bottom - barHeight;
    const hourLabel = hour > 12 ? `${hour - 12} PM` : `${hour} AM`;

    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="#2563eb" rx="4"/>`;
    svg += `<text x="${x + barWidth / 2}" y="${
      chartHeight - padding.bottom + 20
    }" text-anchor="middle" font-size="11" fill="#666">${hourLabel}</text>`;
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

// ======================== PAYMENT METHODS ========================
function createPaymentMethodsChart(todayPurchases) {
  const container = document.getElementById("paymentMethodsChart");
  if (!todayPurchases || todayPurchases.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:#999;padding:20px;">No payment data for today</p>`;
    return;
  }

  const paymentMethods = {};
  todayPurchases.forEach((p) => {
    const method = p.payment || "Unknown";
    paymentMethods[method] = (paymentMethods[method] || 0) + 1;
  });

  const colors = {
    paid: "#16a34a",
    Paid: "#16a34a",
    pending: "#f59e0b",
    Pending: "#f59e0b",
    cash: "#3b82f6",
    Cash: "#3b82f6",
    unknown: "#6b7280",
  };

  const total = todayPurchases.length;
  const radius = 100,
    centerX = 130,
    centerY = 130;
  let currentAngle = 0;

  let html = `<div style="display:flex;align-items:center;justify-content:space-around;gap:30px;flex-wrap:wrap;padding:10px;">`;
  html += `<svg width="260" height="260">`;

  Object.entries(paymentMethods).forEach(([method, count]) => {
    const percentage = (count / total) * 100;
    const sliceAngle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
    const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
    const x2 = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
    const y2 = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);
    const largeArc = sliceAngle > 180 ? 1 : 0;
    const color = colors[method] || colors["unknown"];

    html += `<path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${color}" stroke="white" stroke-width="3"/>`;
    currentAngle = endAngle;
  });

  html += `</svg><div style="display:flex;flex-direction:column;gap:12px;">`;
  Object.entries(paymentMethods).forEach(([method, count]) => {
    const percentage = ((count / total) * 100).toFixed(1);
    const color = colors[method] || colors["unknown"];
    html += `
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:24px;height:24px;background:${color};border-radius:4px;"></div>
        <span style="font-size:15px;color:#333;">${method}: ${count} (${percentage}%)</span>
      </div>
    `;
  });
  html += `</div></div>`;
  container.innerHTML = html;
}

// ======================== PRODUCT PERFORMANCE ========================
function createProductPerformance(todayPurchases) {
  const container = document.getElementById("productPerformance");
  if (!todayPurchases || todayPurchases.length === 0) {
    container.innerHTML = `<p class="noProducts">No products sold today</p>`;
    return;
  }

  const productStats = {};
  todayPurchases.forEach((p) => {
    const item = p.items || "Unknown";
    if (!productStats[item]) {
      productStats[item] = { quantity: 0, revenue: 0 };
    }
    productStats[item].quantity += parseFloat(p.quantity) || 1;
    productStats[item].revenue += parseFloat(p.price) || 0;
  });

  const sorted = Object.entries(productStats).sort(
    (a, b) => b[1].revenue - a[1].revenue
  );

  let html = "";
  sorted.forEach(([product, stats]) => {
    html += `
      <div class="productItem">
        <div class="productName">${product}</div>
        <div class="productStats">
          <div class="quantity">${stats.quantity} units</div>
          <div class="revenue">₹${Number(stats.revenue).toLocaleString()}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ======================== ORDERS LIST ========================
function createOrdersList(todayPurchases, customers) {
  const container = document.getElementById("ordersList");
  if (!todayPurchases || todayPurchases.length === 0) {
    container.innerHTML = `<div class="noOrders">No orders placed today</div>`;
    return;
  }

  const sorted = [...todayPurchases].sort((a, b) => b.timestamp - a.timestamp);

  let html = "";
  sorted.forEach((p) => {
    const customer = customers.find((c) => c.number === p.customerNumber);
    const customerName = customer ? customer.name : "Unknown";
    const time = p.timestamp
      ? new Date(p.timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";
    const statusClass =
      p.payment && p.payment.toLowerCase() === "paid" ? "paid" : "pending";
    const statusText = statusClass === "paid" ? "Paid" : "Pending";

    html += `
      <div class="orderCard">
        <div class="orderTime">${time}</div>
        <div class="orderCustomer">${customerName} - ${p.items || "Unknown"}</div>
        <div class="orderAmount">₹${Number(p.price || 0).toLocaleString()}</div>
        <div class="orderStatus ${statusClass}">${statusText}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ======================== COMPARISON WIDGET ========================
function createComparison(allPurchases, todayStr, todayRevenue) {
  const todayComp = document.getElementById("todayComp");
  const yesterdayComp = document.getElementById("yesterdayComp");
  const yesterdayChange = document.getElementById("yesterdayChange");
  const lastWeekComp = document.getElementById("lastWeekComp");
  const lastWeekChange = document.getElementById("lastWeekChange");

  todayComp.textContent = `₹${Number(todayRevenue).toLocaleString()}`;

  const getDateStr = (offsetDays) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const yesterdayStr = getDateStr(-1);
  const lastWeekStr = getDateStr(-7);

  const yesterdayRevenue = allPurchases
    .filter((p) => p.date === yesterdayStr)
    .reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
  yesterdayComp.textContent = `₹${Number(yesterdayRevenue).toLocaleString()}`;

  if (yesterdayRevenue > 0) {
    const diff = ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;
    yesterdayChange.textContent = `${diff >= 0 ? "↑" : "↓"} ${Math.abs(
      diff
    ).toFixed(1)}%`;
    yesterdayChange.className = `compChange ${diff >= 0 ? "positive" : "negative"}`;
  }

  const lastWeekRevenue = allPurchases
    .filter((p) => p.date === lastWeekStr)
    .reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
  lastWeekComp.textContent = `₹${Number(lastWeekRevenue).toLocaleString()}`;

  if (lastWeekRevenue > 0) {
    const diff = ((todayRevenue - lastWeekRevenue) / lastWeekRevenue) * 100;
    lastWeekChange.textContent = `${diff >= 0 ? "↑" : "↓"} ${Math.abs(
      diff
    ).toFixed(1)}%`;
    lastWeekChange.className = `compChange ${diff >= 0 ? "positive" : "negative"}`;
  }
}*/














document.addEventListener("DOMContentLoaded", () => {
  const purchases = Array.isArray(JSON.parse(localStorage.getItem("purchases")))
    ? JSON.parse(localStorage.getItem("purchases"))
    : [];
  const customers = Array.isArray(JSON.parse(localStorage.getItem("customers")))
    ? JSON.parse(localStorage.getItem("customers"))
    : [];

  // Get today's date
  const today = new Date();
  const todayStr = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Filter today's purchases
  const todayPurchases = purchases.filter((p) => p.date === todayStr);

  // ========== UPDATE METRICS CARDS ==========

  // 1. Today's Revenue
  const todayRevenue = todayPurchases.reduce(
    (sum, p) => sum + (parseFloat(p.price) || 0),
    0
  );
  document.getElementById("todayRevenue").textContent = `₹${Number(
    todayRevenue
  ).toLocaleString()}`;

  // 2. Orders Today
  document.getElementById("ordersToday").textContent = todayPurchases.length;

  // 3. Average Order Value
  const avgOrderValue =
    todayPurchases.length > 0 ? todayRevenue / todayPurchases.length : 0;
  document.getElementById("avgOrderValue").textContent = `₹${Math.round(
    avgOrderValue
  ).toLocaleString()}`;

  // 4. Top Customer Today
  const customerSales = {};
  todayPurchases.forEach((p) => {
    const num = p.customerNumber || "unknown";
    customerSales[num] = (customerSales[num] || 0) + (parseFloat(p.price) || 0);
  });

  let topCustomerNumber = null;
  let maxSpent = 0;
  for (const [number, amount] of Object.entries(customerSales)) {
    if (amount > maxSpent) {
      maxSpent = amount;
      topCustomerNumber = number;
    }
  }

  const topCust = customers.find((c) => c.number === topCustomerNumber);
  document.getElementById("topCustomer").textContent = topCust
    ? topCust.name
    : "No sales yet";

  // ========== CHARTS & WIDGETS ==========
  createHourlySalesChart(todayPurchases);
  createPaymentMethodsChart(todayPurchases);
  createProductPerformance(todayPurchases);
  createOrdersList(todayPurchases, customers);
  createComparison(purchases, todayStr, todayRevenue);
});

// ======================== HOURLY SALES ========================
function createHourlySalesChart(todayPurchases) {
  const container = document.getElementById("hourlySalesChart");
  if (!todayPurchases || todayPurchases.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: #999; padding: 20px;">No sales data for today</p>`;
    return;
  }

  const hourlySales = {};
  for (let i = 9; i <= 21; i++) hourlySales[i] = 0;

  todayPurchases.forEach((p) => {
    if (p.timestamp) {
      const hour = new Date(p.timestamp).getHours();
      if (hour >= 9 && hour <= 21) {
        hourlySales[hour] += parseFloat(p.price) || 0;
      }
    }
  });

  const maxSale = Math.max(...Object.values(hourlySales), 1);
  const chartHeight = 250,
    chartWidth = 800,
    padding = { top: 20, right: 20, bottom: 50, left: 60 };

  let svg = `<svg width="${chartWidth}" height="${chartHeight}" style="max-width:100%;">`;
  svg += `<line x1="${padding.left}" y1="${chartHeight - padding.bottom}" x2="${
    chartWidth - padding.right
  }" y2="${chartHeight - padding.bottom}" stroke="#ddd"/>`;
  svg += `<line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${
    chartHeight - padding.bottom
  }" stroke="#ddd"/>`;

  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const value = (maxSale / ySteps) * i;
    const y =
      chartHeight -
      padding.bottom -
      (value / maxSale) * (chartHeight - padding.top - padding.bottom);
    svg += `<text x="${padding.left - 10}" y="${
      y + 5
    }" text-anchor="end" font-size="11" fill="#666">₹${Math.round(
      value
    )}</text>`;
    svg += `<line x1="${padding.left}" y1="${y}" x2="${
      chartWidth - padding.right
    }" y2="${y}" stroke="#f0f0f0"/>`;
  }

  const hours = Object.keys(hourlySales);
  const barWidth =
    (chartWidth - padding.left - padding.right) / hours.length - 10;

  hours.forEach((hour, i) => {
    const x =
      padding.left +
      i * ((chartWidth - padding.left - padding.right) / hours.length) +
      5;
    const barHeight =
      (hourlySales[hour] / maxSale) *
      (chartHeight - padding.top - padding.bottom);
    const y = chartHeight - padding.bottom - barHeight;
    const hourLabel = hour > 12 ? `${hour - 12} PM` : `${hour} AM`;

    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="#2563eb" rx="4"/>`;
    svg += `<text x="${x + barWidth / 2}" y="${
      chartHeight - padding.bottom + 20
    }" text-anchor="middle" font-size="11" fill="#666">${hourLabel}</text>`;
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

// ======================== PAYMENT METHODS ========================
function createPaymentMethodsChart(todayPurchases) {
  const container = document.getElementById("paymentMethodsChart");
  if (!todayPurchases || todayPurchases.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:#999;padding:20px;">No payment data for today</p>`;
    return;
  }

  const paymentMethods = {};
  todayPurchases.forEach((p) => {
    const method = p.payment || "Unknown";
    paymentMethods[method] = (paymentMethods[method] || 0) + 1;
  });

  const colors = {
    paid: "#16a34a",
    Paid: "#16a34a",
    pending: "#f59e0b",
    Pending: "#f59e0b",
    cash: "#3b82f6",
    Cash: "#3b82f6",
    unknown: "#6b7280",
  };

  const total = todayPurchases.length;
  const radius = 100,
    centerX = 130,
    centerY = 130;
  let currentAngle = 0;

  let html = `<div style="display:flex;align-items:center;justify-content:space-around;gap:30px;flex-wrap:wrap;padding:10px;">`;
  html += `<svg width="260" height="260">`;

  Object.entries(paymentMethods).forEach(([method, count]) => {
    const percentage = (count / total) * 100;
    const sliceAngle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
    const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
    const x2 = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
    const y2 = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);
    const largeArc = sliceAngle > 180 ? 1 : 0;
    const color = colors[method] || colors["unknown"];

    html += `<path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${color}" stroke="white" stroke-width="3"/>`;
    currentAngle = endAngle;
  });

  html += `</svg><div style="display:flex;flex-direction:column;gap:12px;">`;
  Object.entries(paymentMethods).forEach(([method, count]) => {
    const percentage = ((count / total) * 100).toFixed(1);
    const color = colors[method] || colors["unknown"];
    html += `
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:24px;height:24px;background:${color};border-radius:4px;"></div>
        <span style="font-size:15px;color:#333;">${method}: ${count} (${percentage}%)</span>
      </div>
    `;
  });
  html += `</div></div>`;
  container.innerHTML = html;
}

// ======================== PRODUCT PERFORMANCE ========================
function createProductPerformance(todayPurchases) {
  const container = document.getElementById("productPerformance");
  if (!todayPurchases || todayPurchases.length === 0) {
    container.innerHTML = `<p class="noProducts">No products sold today</p>`;
    return;
  }

  const productStats = {};
  
  todayPurchases.forEach((p) => {
    // Handle both old and new item format
    if (Array.isArray(p.items)) {
      // New format: array of items
      p.items.forEach(item => {
        const itemName = item.name || "Unknown";
        if (!productStats[itemName]) {
          productStats[itemName] = { quantity: 0, revenue: 0 };
        }
        productStats[itemName].quantity += item.quantity || 0;
        productStats[itemName].revenue += (item.quantity * item.price) || 0;
      });
    } else {
      // Old format: simple string
      const item = p.items || "Unknown";
      if (!productStats[item]) {
        productStats[item] = { quantity: 0, revenue: 0 };
      }
      productStats[item].quantity += parseFloat(p.quantity) || 1;
      productStats[item].revenue += parseFloat(p.price) || 0;
    }
  });

  const sorted = Object.entries(productStats).sort(
    (a, b) => b[1].revenue - a[1].revenue
  );

  let html = "";
  sorted.forEach(([product, stats]) => {
    html += `
      <div class="productItem">
        <div class="productName">${product}</div>
        <div class="productStats">
          <div class="quantity">${stats.quantity} units</div>
          <div class="revenue">₹${Number(stats.revenue).toLocaleString()}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ======================== ORDERS LIST ========================
function createOrdersList(todayPurchases, customers) {
  const container = document.getElementById("ordersList");
  if (!todayPurchases || todayPurchases.length === 0) {
    container.innerHTML = `<div class="noOrders">No orders placed today</div>`;
    return;
  }

  const sorted = [...todayPurchases].sort((a, b) => b.timestamp - a.timestamp);

  let html = "";
  sorted.forEach((p) => {
    const customer = customers.find((c) => c.number === p.customerNumber);
    const customerName = customer ? customer.name : "Unknown";
    const time = p.timestamp
      ? new Date(p.timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";
    const statusClass =
      p.payment && p.payment.toLowerCase() === "paid" ? "paid" : "pending";
    const statusText = statusClass === "paid" ? "Paid" : "Pending";

    // Handle both old and new item format
    let itemsText = "";
    if (Array.isArray(p.items)) {
      // New format: array of items
      itemsText = p.items.map(item => item.name).join(", ");
    } else if (p.itemsText) {
      // Use pre-formatted text
      itemsText = p.itemsText;
    } else {
      // Old format: simple string
      itemsText = p.items || "Unknown";
    }

    html += `
      <div class="orderCard">
        <div class="orderTime">${time}</div>
        <div class="orderCustomer">${customerName} - ${itemsText}</div>
        <div class="orderAmount">₹${Number(p.price || 0).toLocaleString()}</div>
        <div class="orderStatus ${statusClass}">${statusText}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ======================== COMPARISON WIDGET ========================
function createComparison(allPurchases, todayStr, todayRevenue) {
  const todayComp = document.getElementById("todayComp");
  const yesterdayComp = document.getElementById("yesterdayComp");
  const yesterdayChange = document.getElementById("yesterdayChange");
  const lastWeekComp = document.getElementById("lastWeekComp");
  const lastWeekChange = document.getElementById("lastWeekChange");

  todayComp.textContent = `₹${Number(todayRevenue).toLocaleString()}`;

  const getDateStr = (offsetDays) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const yesterdayStr = getDateStr(-1);
  const lastWeekStr = getDateStr(-7);

  const yesterdayRevenue = allPurchases
    .filter((p) => p.date === yesterdayStr)
    .reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
  yesterdayComp.textContent = `₹${Number(yesterdayRevenue).toLocaleString()}`;

  if (yesterdayRevenue > 0) {
    const diff = ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;
    yesterdayChange.textContent = `${diff >= 0 ? "↑" : "↓"} ${Math.abs(
      diff
    ).toFixed(1)}%`;
    yesterdayChange.className = `compChange ${diff >= 0 ? "positive" : "negative"}`;
  }

  const lastWeekRevenue = allPurchases
    .filter((p) => p.date === lastWeekStr)
    .reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
  lastWeekComp.textContent = `₹${Number(lastWeekRevenue).toLocaleString()}`;

  if (lastWeekRevenue > 0) {
    const diff = ((todayRevenue - lastWeekRevenue) / lastWeekRevenue) * 100;
    lastWeekChange.textContent = `${diff >= 0 ? "↑" : "↓"} ${Math.abs(
      diff
    ).toFixed(1)}%`;
    lastWeekChange.className = `compChange ${diff >= 0 ? "positive" : "negative"}`;
  }
}






