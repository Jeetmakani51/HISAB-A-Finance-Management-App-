/*document.addEventListener("DOMContentLoaded", () => {
  const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
  const customers = JSON.parse(localStorage.getItem("customers")) || [];

  // Get current month info
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Filter this month's purchases
  const thisMonthPurchases = purchases.filter(p => {
    if (!p.timestamp) return false;
    const purchaseDate = new Date(p.timestamp);
    return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
  });

  // Filter last month's purchases for comparison
  const lastMonth = new Date(currentYear, currentMonth - 1, 1);
  const lastMonthPurchases = purchases.filter(p => {
    if (!p.timestamp) return false;
    const purchaseDate = new Date(p.timestamp);
    return purchaseDate.getMonth() === lastMonth.getMonth() && purchaseDate.getFullYear() === lastMonth.getFullYear();
  });

  // ========== UPDATE METRICS CARDS ==========
  
  // 1. This Month's Revenue
  const monthRevenue = thisMonthPurchases.reduce((sum, p) => sum + p.price, 0);
  document.getElementById("monthRevenue").textContent = `₹${monthRevenue.toLocaleString()}`;

  // 2. Total Orders
  document.getElementById("totalOrders").textContent = thisMonthPurchases.length;

  // 3. New Customers This Month
  const firstOfMonth = new Date(currentYear, currentMonth, 1).getTime();
  const newCustomersCount = customers.filter(c => {
    const customerPurchases = purchases.filter(p => p.customerNumber === c.number);
    if (customerPurchases.length === 0) return false;
    const firstPurchase = Math.min(...customerPurchases.map(p => p.timestamp));
    return firstPurchase >= firstOfMonth;
  }).length;
  document.getElementById("newCustomers").textContent = newCustomersCount;

  // 4. Growth Rate vs Last Month
  const lastMonthRevenue = lastMonthPurchases.reduce((sum, p) => sum + p.price, 0);
  let growthRate = 0;
  if (lastMonthRevenue > 0) {
    growthRate = ((monthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1);
  } else if (monthRevenue > 0) {
    growthRate = 100;
  }
  const growthEl = document.getElementById("growthRate");
  growthEl.textContent = `${growthRate >= 0 ? '↑' : '↓'} ${Math.abs(growthRate)}%`;
  growthEl.style.color = growthRate >= 0 ? '#16a34a' : '#dc2626';

  // ========== CHARTS ==========
  createDailySalesChart(thisMonthPurchases, currentMonth, currentYear);
  createWeeklyBreakdown(thisMonthPurchases);
  createPaymentDistribution(thisMonthPurchases);
  createTopCustomers(thisMonthPurchases, customers);
  createBestProducts(thisMonthPurchases);
  createSalesByDay(thisMonthPurchases);
  createPendingPayments(thisMonthPurchases, customers);
  createTargetProgress(monthRevenue, currentMonth);
});

// Daily Sales Line Chart
function createDailySalesChart(purchases, month, year) {
  const container = document.getElementById("dailySalesChart");
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dailySales = {};
  
  for (let day = 1; day <= daysInMonth; day++) {
    dailySales[day] = 0;
  }

  purchases.forEach(p => {
    if (p.timestamp) {
      const day = new Date(p.timestamp).getDate();
      dailySales[day] += p.price;
    }
  });

  const maxSale = Math.max(...Object.values(dailySales), 1);
  const chartHeight = 300;
  const chartWidth = Math.max(daysInMonth * 25, 600);
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };

  let svg = `<div style="overflow-x: auto;"><svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}">`;

  // Axes
  svg += `<line x1="${padding.left}" y1="${chartHeight - padding.bottom}" x2="${chartWidth - padding.right}" y2="${chartHeight - padding.bottom}" stroke="#ddd" stroke-width="2"/>`;
  svg += `<line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${chartHeight - padding.bottom}" stroke="#ddd" stroke-width="2"/>`;

  // Y-axis labels
  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const value = (maxSale / ySteps) * i;
    const y = chartHeight - padding.bottom - ((value / maxSale) * (chartHeight - padding.top - padding.bottom));
    svg += `<text x="${padding.left - 10}" y="${y + 5}" text-anchor="end" font-size="10" fill="#666">₹${Math.round(value)}</text>`;
    svg += `<line x1="${padding.left}" y1="${y}" x2="${chartWidth - padding.right}" y2="${y}" stroke="#f0f0f0" stroke-width="1"/>`;
  }

  // Plot line
  const days = Object.keys(dailySales);
  const xStep = (chartWidth - padding.left - padding.right) / (days.length - 1);
  let pathData = "";

  days.forEach((day, i) => {
    const x = padding.left + i * xStep;
    const y = chartHeight - padding.bottom - ((dailySales[day] / maxSale) * (chartHeight - padding.top - padding.bottom));

    if (i === 0) {
      pathData = `M ${x} ${y}`;
    } else {
      pathData += ` L ${x} ${y}`;
    }

    svg += `<circle cx="${x}" cy="${y}" r="3" fill="#2563eb"/>`;
    
    if (i % 5 === 0) {
      svg += `<text x="${x}" y="${chartHeight - padding.bottom + 15}" text-anchor="middle" font-size="10" fill="#666">${day}</text>`;
    }
  });

  svg += `<path d="${pathData}" fill="none" stroke="#2563eb" stroke-width="2.5"/>`;
  svg += `</svg></div>`;
  container.innerHTML = svg;
}

// Weekly Breakdown
function createWeeklyBreakdown(purchases) {
  const container = document.getElementById("weeklyBreakdown");
  
  const weeks = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  purchases.forEach(p => {
    if (p.timestamp) {
      const day = new Date(p.timestamp).getDate();
      const week = Math.ceil(day / 7);
      weeks[week] += p.price;
    }
  });

  const maxWeek = Math.max(...Object.values(weeks), 1);
  const chartHeight = 250;
  const chartWidth = 400;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };

  let svg = `<svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}">`;

  const barWidth = (chartWidth - padding.left - padding.right) / 5 - 20;

  Object.entries(weeks).forEach(([week, amount], i) => {
    const x = padding.left + (i * (chartWidth - padding.left - padding.right) / 5) + 10;
    const barHeight = (amount / maxWeek) * (chartHeight - padding.top - padding.bottom);
    const y = chartHeight - padding.bottom - barHeight;

    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="#9333ea" rx="6"/>`;
    svg += `<text x="${x + barWidth/2}" y="${chartHeight - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="#666">Week ${week}</text>`;
    svg += `<text x="${x + barWidth/2}" y="${y - 10}" text-anchor="middle" font-size="11" fill="#333" font-weight="600">₹${Math.round(amount).toLocaleString()}</text>`;
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

// Payment Distribution
function createPaymentDistribution(purchases) {
  const container = document.getElementById("paymentDistribution");
  
  const paymentMethods = {};
  purchases.forEach(p => {
    const method = p.paymentMethod || "Unknown";
    paymentMethods[method] = (paymentMethods[method] || 0) + 1;
  });

  const colors = {
    "cash": "#3b82f6",
    "upi": "#8b5cf6",
    "card": "#ec4899",
    "bank": "#06b6d4",
    "Unknown": "#6b7280"
  };

  const total = purchases.length;
  const radius = 100;
  const centerX = 130;
  const centerY = 130;
  let currentAngle = 0;

  let html = `<div style="display: flex; align-items: center; justify-content: space-around; gap: 30px; flex-wrap: wrap; padding: 10px;">`;
  html += `<svg width="260" height="260" viewBox="0 0 260 260" style="flex-shrink: 0; background: white; border-radius: 8px;">`;

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
    const color = colors[method] || colors["Unknown"];
    
    html += `<path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${color}" stroke="white" stroke-width="3"/>`;
    
    currentAngle = endAngle;
  });

  html += `</svg><div style="display: flex; flex-direction: column; gap: 12px; min-width: 180px;">`;

  Object.entries(paymentMethods).forEach(([method, count]) => {
    const percentage = ((count / total) * 100).toFixed(1);
    const color = colors[method] || colors["Unknown"];
    
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

// Top Customers Leaderboard
function createTopCustomers(purchases, customers) {
  const container = document.getElementById("topCustomers");
  
  const customerSpending = {};
  purchases.forEach(p => {
    customerSpending[p.customerNumber] = (customerSpending[p.customerNumber] || 0) + p.price;
  });

  const sorted = Object.entries(customerSpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (sorted.length === 0) {
    container.innerHTML = `<div class="noCustomers">No customers this month</div>`;
    return;
  }

  let html = "";
  sorted.forEach(([number, amount], index) => {
    const customer = customers.find(c => c.number === number);
    const customerName = customer ? customer.name : "Unknown";
    const orderCount = purchases.filter(p => p.customerNumber === number).length;
    
    let rankClass = "rankOther";
    if (index === 0) rankClass = "rank1";
    else if (index === 1) rankClass = "rank2";
    else if (index === 2) rankClass = "rank3";

    html += `
      <div class="customerRank">
        <div class="rankBadge ${rankClass}">${index + 1}</div>
        <div class="customerInfo">
          <div class="customerName">${customerName}</div>
          <div class="orderCount">${orderCount} orders</div>
        </div>
        <div class="customerSpent">₹${amount.toLocaleString()}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Best Selling Products
function createBestProducts(purchases) {
  const container = document.getElementById("bestProducts");
  
  const productStats = {};
  purchases.forEach(p => {
    const item = p.items || "Unknown";
    if (!productStats[item]) {
      productStats[item] = { revenue: 0, quantity: 0 };
    }
    productStats[item].revenue += p.price;
    productStats[item].quantity += p.quantity;
  });

  const sorted = Object.entries(productStats)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5);

  if (sorted.length === 0) {
    container.innerHTML = `<div class="noProducts">No products sold this month</div>`;
    return;
  }

  const maxRevenue = sorted[0][1].revenue;

  let html = "";
  sorted.forEach(([product, stats]) => {
    const percentage = (stats.revenue / maxRevenue) * 100;
    
    html += `
      <div class="productBar">
        <div class="productHeader">
          <div class="productName">${product} (${stats.quantity} units)</div>
          <div class="productRevenue">₹${stats.revenue.toLocaleString()}</div>
        </div>
        <div class="barContainer">
          <div class="barFill" style="width: ${percentage}%;">
            <div class="barText">${percentage.toFixed(0)}%</div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Sales by Day of Week
function createSalesByDay(purchases) {
  const container = document.getElementById("salesByDay");
  
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const daySales = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  purchases.forEach(p => {
    if (p.timestamp) {
      const day = new Date(p.timestamp).getDay();
      daySales[day] += p.price;
    }
  });

  const maxDay = Math.max(...Object.values(daySales), 1);

  let html = "";
  Object.entries(daySales).forEach(([day, amount]) => {
    const percentage = (amount / maxDay) * 100;
    
    html += `
      <div class="dayItem">
        <div class="dayName">${dayNames[day]}</div>
        <div class="dayBar">
          <div class="dayFill" style="width: ${percentage}%;"></div>
        </div>
        <div class="dayAmount">₹${amount.toLocaleString()}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Pending Payments Tracker
function createPendingPayments(purchases, customers) {
  const pendingPurchases = purchases.filter(p => p.payment === "unpaid");
  
  const totalPending = pendingPurchases.reduce((sum, p) => sum + p.price, 0);
  document.getElementById("totalPending").textContent = `₹${totalPending.toLocaleString()}`;

  const customersPending = {};
  pendingPurchases.forEach(p => {
    customersPending[p.customerNumber] = (customersPending[p.customerNumber] || 0) + p.price;
  });

  const pendingCount = Object.keys(customersPending).length;
  document.getElementById("pendingCount").textContent = `${pendingCount} customer${pendingCount !== 1 ? 's' : ''}`;

  const container = document.getElementById("pendingList");

  if (pendingCount === 0) {
    container.innerHTML = `<div class="noPending">No pending payments! 🎉</div>`;
    return;
  }

  const sorted = Object.entries(customersPending).sort((a, b) => b[1] - a[1]);

  let html = "";
  sorted.forEach(([number, amount]) => {
    const customer = customers.find(c => c.number === number);
    const customerName = customer ? customer.name : "Unknown";

    html += `
      <div class="pendingCard">
        <div class="pendingCustomer">${customerName}</div>
        <div class="pendingAmount">₹${amount.toLocaleString()}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Monthly Target Progress
function createTargetProgress(achieved, currentMonth) {
  const target = 150000; // ₹1,50,000 target
  
  document.getElementById("targetAmount").textContent = `₹${target.toLocaleString()}`;
  document.getElementById("achievedAmount").textContent = `₹${achieved.toLocaleString()}`;

  const percentage = Math.min((achieved / target) * 100, 100);
  
  document.getElementById("progressFill").style.width = `${percentage}%`;
  document.getElementById("progressText").textContent = `${percentage.toFixed(1)}%`;

  // Calculate remaining days in month
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), currentMonth + 1, 0).getDate();
  const remainingDays = lastDay - now.getDate();
  document.getElementById("remainingDays").textContent = `${remainingDays} days`;
}*/

/*document.addEventListener("DOMContentLoaded", () => {
  const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
  const customers = JSON.parse(localStorage.getItem("customers")) || [];

  // Get current month info
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Filter this month's purchases
  const thisMonthPurchases = purchases.filter(p => {
    if (!p.timestamp) return false;
    const purchaseDate = new Date(p.timestamp);
    return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
  });

  // Filter last month's purchases for comparison
  const lastMonth = new Date(currentYear, currentMonth - 1, 1);
  const lastMonthPurchases = purchases.filter(p => {
    if (!p.timestamp) return false;
    const purchaseDate = new Date(p.timestamp);
    return purchaseDate.getMonth() === lastMonth.getMonth() && purchaseDate.getFullYear() === lastMonth.getFullYear();
  });

  // ========== UPDATE METRICS CARDS ==========
  
  // 1. This Month's Revenue
  const monthRevenue = thisMonthPurchases.reduce((sum, p) => sum + p.price, 0);
  document.getElementById("monthRevenue").textContent = `₹${monthRevenue.toLocaleString()}`;

  // 2. Total Orders
  document.getElementById("totalOrders").textContent = thisMonthPurchases.length;

  // 3. New Customers This Month
  const firstOfMonth = new Date(currentYear, currentMonth, 1).getTime();
  const newCustomersCount = customers.filter(c => {
    const customerPurchases = purchases.filter(p => p.customerNumber === c.number);
    if (customerPurchases.length === 0) return false;
    const firstPurchase = Math.min(...customerPurchases.map(p => p.timestamp));
    return firstPurchase >= firstOfMonth;
  }).length;
  document.getElementById("newCustomers").textContent = newCustomersCount;

  // 4. Growth Rate vs Last Month
  const lastMonthRevenue = lastMonthPurchases.reduce((sum, p) => sum + p.price, 0);
  let growthRate = 0;
  if (lastMonthRevenue > 0) {
    growthRate = ((monthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1);
  } else if (monthRevenue > 0) {
    growthRate = 100;
  }
  const growthEl = document.getElementById("growthRate");
  growthEl.textContent = `${growthRate >= 0 ? '↑' : '↓'} ${Math.abs(growthRate)}%`;
  growthEl.style.color = growthRate >= 0 ? '#16a34a' : '#dc2626';

  // ========== CHARTS ==========
  createDailySalesChart(thisMonthPurchases, currentMonth, currentYear);
  createWeeklyBreakdown(thisMonthPurchases);
  createPaymentDistribution(thisMonthPurchases);
  createTopCustomers(thisMonthPurchases, customers);
  createBestProducts(thisMonthPurchases);
  createSalesByDay(thisMonthPurchases);
  createPendingPayments(thisMonthPurchases, customers);
  createTargetProgress(monthRevenue, currentMonth);
});

// Daily Sales Line Chart
function createDailySalesChart(purchases, month, year) {
  const container = document.getElementById("dailySalesChart");
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dailySales = {};
  
  for (let day = 1; day <= daysInMonth; day++) {
    dailySales[day] = 0;
  }

  purchases.forEach(p => {
    if (p.timestamp) {
      const day = new Date(p.timestamp).getDate();
      dailySales[day] += p.price;
    }
  });

  const maxSale = Math.max(...Object.values(dailySales), 1);
  const chartHeight = 300;
  const chartWidth = Math.max(daysInMonth * 25, 600);
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };

  let svg = `<div style="overflow-x: auto;"><svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}">`;

  // Axes
  svg += `<line x1="${padding.left}" y1="${chartHeight - padding.bottom}" x2="${chartWidth - padding.right}" y2="${chartHeight - padding.bottom}" stroke="#ddd" stroke-width="2"/>`;
  svg += `<line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${chartHeight - padding.bottom}" stroke="#ddd" stroke-width="2"/>`;

  // Y-axis labels
  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const value = (maxSale / ySteps) * i;
    const y = chartHeight - padding.bottom - ((value / maxSale) * (chartHeight - padding.top - padding.bottom));
    svg += `<text x="${padding.left - 10}" y="${y + 5}" text-anchor="end" font-size="10" fill="#666">₹${Math.round(value)}</text>`;
    svg += `<line x1="${padding.left}" y1="${y}" x2="${chartWidth - padding.right}" y2="${y}" stroke="#f0f0f0" stroke-width="1"/>`;
  }

  // Plot line
  const days = Object.keys(dailySales);
  const xStep = (chartWidth - padding.left - padding.right) / (days.length - 1);
  let pathData = "";

  days.forEach((day, i) => {
    const x = padding.left + i * xStep;
    const y = chartHeight - padding.bottom - ((dailySales[day] / maxSale) * (chartHeight - padding.top - padding.bottom));

    if (i === 0) {
      pathData = `M ${x} ${y}`;
    } else {
      pathData += ` L ${x} ${y}`;
    }

    svg += `<circle cx="${x}" cy="${y}" r="3" fill="#2563eb"/>`;
    
    if (i % 5 === 0) {
      svg += `<text x="${x}" y="${chartHeight - padding.bottom + 15}" text-anchor="middle" font-size="10" fill="#666">${day}</text>`;
    }
  });

  svg += `<path d="${pathData}" fill="none" stroke="#2563eb" stroke-width="2.5"/>`;
  svg += `</svg></div>`;
  container.innerHTML = svg;
}

// Weekly Breakdown
function createWeeklyBreakdown(purchases) {
  const container = document.getElementById("weeklyBreakdown");
  
  const weeks = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  purchases.forEach(p => {
    if (p.timestamp) {
      const day = new Date(p.timestamp).getDate();
      const week = Math.ceil(day / 7);
      weeks[week] += p.price;
    }
  });

  const maxWeek = Math.max(...Object.values(weeks), 1);
  const isMobile = window.innerWidth <= 480;
  const chartWidth = isMobile ? 300 : 400;
  const chartHeight = 250;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };

  let svg = `<svg width="100%" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}" preserveAspectRatio="xMidYMid meet" style="max-width: 100%;">`;

  const barWidth = (chartWidth - padding.left - padding.right) / 5 - 20;

  Object.entries(weeks).forEach(([week, amount], i) => {
    const x = padding.left + (i * (chartWidth - padding.left - padding.right) / 5) + 10;
    const barHeight = (amount / maxWeek) * (chartHeight - padding.top - padding.bottom);
    const y = chartHeight - padding.bottom - barHeight;

    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="#9333ea" rx="6"/>`;
    svg += `<text x="${x + barWidth/2}" y="${chartHeight - padding.bottom + 20}" text-anchor="middle" font-size="${isMobile ? '10' : '12'}" fill="#666">Week ${week}</text>`;
    svg += `<text x="${x + barWidth/2}" y="${y - 10}" text-anchor="middle" font-size="${isMobile ? '9' : '11'}" fill="#333" font-weight="600">₹${Math.round(amount).toLocaleString()}</text>`;
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

// Payment Distribution
function createPaymentDistribution(purchases) {
  const container = document.getElementById("paymentDistribution");
  
  const paymentMethods = {};
  purchases.forEach(p => {
    const method = p.paymentMethod || "Unknown";
    paymentMethods[method] = (paymentMethods[method] || 0) + 1;
  });

  const colors = {
    "cash": "#3b82f6",
    "upi": "#8b5cf6",
    "card": "#ec4899",
    "bank": "#06b6d4",
    "Unknown": "#6b7280"
  };

  const total = purchases.length;
  const isMobile = window.innerWidth <= 768;
  const radius = isMobile ? 80 : 100;
  const svgSize = isMobile ? 220 : 260;
  const centerX = svgSize / 2;
  const centerY = svgSize / 2;
  let currentAngle = 0;

  let html = `<div style="display: flex; align-items: center; justify-content: space-around; gap: 30px; flex-wrap: wrap; padding: 10px;">`;
  html += `<svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}" style="flex-shrink: 0; background: white; border-radius: 8px;">`;

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
    const color = colors[method] || colors["Unknown"];
    
    html += `<path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${color}" stroke="white" stroke-width="3"/>`;
    
    currentAngle = endAngle;
  });

  html += `</svg><div style="display: flex; flex-direction: column; gap: 12px; min-width: 180px;">`;

  Object.entries(paymentMethods).forEach(([method, count]) => {
    const percentage = ((count / total) * 100).toFixed(1);
    const color = colors[method] || colors["Unknown"];
    
    html += `
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 24px; height: 24px; background: ${color}; border-radius: 4px; flex-shrink: 0;"></div>
        <span style="font-size: ${isMobile ? '14px' : '15px'}; color: #333; font-weight: 500;">${method}: ${count} (${percentage}%)</span>
      </div>
    `;
  });

  html += `</div></div>`;
  container.innerHTML = html;
}

// Top Customers Leaderboard
function createTopCustomers(purchases, customers) {
  const container = document.getElementById("topCustomers");
  
  const customerSpending = {};
  purchases.forEach(p => {
    customerSpending[p.customerNumber] = (customerSpending[p.customerNumber] || 0) + p.price;
  });

  const sorted = Object.entries(customerSpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (sorted.length === 0) {
    container.innerHTML = `<div class="noCustomers">No customers this month</div>`;
    return;
  }

  let html = "";
  sorted.forEach(([number, amount], index) => {
    const customer = customers.find(c => c.number === number);
    const customerName = customer ? customer.name : "Unknown";
    const orderCount = purchases.filter(p => p.customerNumber === number).length;
    
    let rankClass = "rankOther";
    if (index === 0) rankClass = "rank1";
    else if (index === 1) rankClass = "rank2";
    else if (index === 2) rankClass = "rank3";

    html += `
      <div class="customerRank">
        <div class="rankBadge ${rankClass}">${index + 1}</div>
        <div class="customerInfo">
          <div class="customerName">${customerName}</div>
          <div class="orderCount">${orderCount} orders</div>
        </div>
        <div class="customerSpent">₹${amount.toLocaleString()}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Best Selling Products
function createBestProducts(purchases) {
  const container = document.getElementById("bestProducts");
  
  const productStats = {};
  purchases.forEach(p => {
    const item = p.items || "Unknown";
    if (!productStats[item]) {
      productStats[item] = { revenue: 0, quantity: 0 };
    }
    productStats[item].revenue += p.price;
    productStats[item].quantity += p.quantity;
  });

  const sorted = Object.entries(productStats)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5);

  if (sorted.length === 0) {
    container.innerHTML = `<div class="noProducts">No products sold this month</div>`;
    return;
  }

  const maxRevenue = sorted[0][1].revenue;

  let html = "";
  sorted.forEach(([product, stats]) => {
    const percentage = (stats.revenue / maxRevenue) * 100;
    
    html += `
      <div class="productBar">
        <div class="productHeader">
          <div class="productName">${product} (${stats.quantity} units)</div>
          <div class="productRevenue">₹${stats.revenue.toLocaleString()}</div>
        </div>
        <div class="barContainer">
          <div class="barFill" style="width: ${percentage}%;">
            <div class="barText">${percentage.toFixed(0)}%</div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Sales by Day of Week
function createSalesByDay(purchases) {
  const container = document.getElementById("salesByDay");
  
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const daySales = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  purchases.forEach(p => {
    if (p.timestamp) {
      const day = new Date(p.timestamp).getDay();
      daySales[day] += p.price;
    }
  });

  const maxDay = Math.max(...Object.values(daySales), 1);

  let html = "";
  Object.entries(daySales).forEach(([day, amount]) => {
    const percentage = (amount / maxDay) * 100;
    
    html += `
      <div class="dayItem">
        <div class="dayName">${dayNames[day]}</div>
        <div class="dayBar">
          <div class="dayFill" style="width: ${percentage}%;"></div>
        </div>
        <div class="dayAmount">₹${amount.toLocaleString()}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Pending Payments Tracker
function createPendingPayments(purchases, customers) {
  const pendingPurchases = purchases.filter(p => p.payment === "unpaid");
  
  const totalPending = pendingPurchases.reduce((sum, p) => sum + p.price, 0);
  document.getElementById("totalPending").textContent = `₹${totalPending.toLocaleString()}`;

  const customersPending = {};
  pendingPurchases.forEach(p => {
    customersPending[p.customerNumber] = (customersPending[p.customerNumber] || 0) + p.price;
  });

  const pendingCount = Object.keys(customersPending).length;
  document.getElementById("pendingCount").textContent = `${pendingCount} customer${pendingCount !== 1 ? 's' : ''}`;

  const container = document.getElementById("pendingList");

  if (pendingCount === 0) {
    container.innerHTML = `<div class="noPending">No pending payments! 🎉</div>`;
    return;
  }

  const sorted = Object.entries(customersPending).sort((a, b) => b[1] - a[1]);

  let html = "";
  sorted.forEach(([number, amount]) => {
    const customer = customers.find(c => c.number === number);
    const customerName = customer ? customer.name : "Unknown";

    html += `
      <div class="pendingCard">
        <div class="pendingCustomer">${customerName}</div>
        <div class="pendingAmount">₹${amount.toLocaleString()}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Monthly Target Progress
function createTargetProgress(achieved, currentMonth) {
  const target = 150000; // ₹1,50,000 target
  
  document.getElementById("targetAmount").textContent = `₹${target.toLocaleString()}`;
  document.getElementById("achievedAmount").textContent = `₹${achieved.toLocaleString()}`;

  const percentage = Math.min((achieved / target) * 100, 100);
  
  document.getElementById("progressFill").style.width = `${percentage}%`;
  document.getElementById("progressText").textContent = `${percentage.toFixed(1)}%`;

  // Calculate remaining days in month
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), currentMonth + 1, 0).getDate();
  const remainingDays = lastDay - now.getDate();
  document.getElementById("remainingDays").textContent = `${remainingDays} days`;
}*/

document.addEventListener("DOMContentLoaded", () => {
  const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
  const customers = JSON.parse(localStorage.getItem("customers")) || [];

  // Get current month info
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Filter this month's purchases
  const thisMonthPurchases = purchases.filter((p) => {
    if (!p.timestamp) return false;
    const purchaseDate = new Date(p.timestamp);
    return (
      purchaseDate.getMonth() === currentMonth &&
      purchaseDate.getFullYear() === currentYear
    );
  });

  // Filter last month's purchases for comparison
  const lastMonth = new Date(currentYear, currentMonth - 1, 1);
  const lastMonthPurchases = purchases.filter((p) => {
    if (!p.timestamp) return false;
    const purchaseDate = new Date(p.timestamp);
    return (
      purchaseDate.getMonth() === lastMonth.getMonth() &&
      purchaseDate.getFullYear() === lastMonth.getFullYear()
    );
  });

  // ========== UPDATE METRICS CARDS ==========

  // 1. This Month's Revenue
  const monthRevenue = thisMonthPurchases.reduce((sum, p) => sum + p.price, 0);
  document.getElementById(
    "monthRevenue"
  ).textContent = `₹${monthRevenue.toLocaleString()}`;

  //Total Customers Count
  const totalCustomersCount = customers.length;
  document.getElementById("totalCustomers").textContent = totalCustomersCount;

  const totalInvoices = purchases.length;
  document.getElementById("totalInvoices").textContent = totalInvoices;

  // 2. Total Orders
  document.getElementById("totalOrders").textContent =
    thisMonthPurchases.length;

  // 3. New Customers This Month
  const firstOfMonth = new Date(currentYear, currentMonth, 1).getTime();
  const newCustomersCount = customers.filter((c) => {
    const customerPurchases = purchases.filter(
      (p) => p.customerNumber === c.number
    );
    if (customerPurchases.length === 0) return false;
    const firstPurchase = Math.min(
      ...customerPurchases.map((p) => p.timestamp)
    );
    return firstPurchase >= firstOfMonth;
  }).length;
  document.getElementById("newCustomers").textContent = newCustomersCount;

  // 4. Growth Rate vs Last Month
  const lastMonthRevenue = lastMonthPurchases.reduce(
    (sum, p) => sum + p.price,
    0
  );
  let growthRate = 0;
  if (lastMonthRevenue > 0) {
    growthRate = (
      ((monthRevenue - lastMonthRevenue) / lastMonthRevenue) *
      100
    ).toFixed(1);
  } else if (monthRevenue > 0) {
    growthRate = 100;
  }
  const growthEl = document.getElementById("growthRate");
  growthEl.textContent = `${growthRate >= 0 ? "↑" : "↓"} ${Math.abs(
    growthRate
  )}%`;
  growthEl.style.color = growthRate >= 0 ? "#16a34a" : "#dc2626";

  // ========== CHARTS ==========
  createDailySalesChart(thisMonthPurchases, currentMonth, currentYear);
  createWeeklyBreakdown(thisMonthPurchases);
  createPaymentDistribution(thisMonthPurchases);
  createTopCustomers(thisMonthPurchases, customers);
  createBestProducts(thisMonthPurchases);
  createSalesByDay(thisMonthPurchases);
  createPendingPayments(thisMonthPurchases, customers);
  createTargetProgress(monthRevenue, currentMonth);
});

// Daily Sales Line Chart
function createDailySalesChart(purchases, month, year) {
  const container = document.getElementById("dailySalesChart");

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dailySales = {};

  for (let day = 1; day <= daysInMonth; day++) {
    dailySales[day] = 0;
  }

  purchases.forEach((p) => {
    if (p.timestamp) {
      const day = new Date(p.timestamp).getDate();
      dailySales[day] += p.price;
    }
  });

  const maxSale = Math.max(...Object.values(dailySales), 1);
  const chartHeight = 300;
  const chartWidth = Math.max(daysInMonth * 25, 600);
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };

  let svg = `<div style="overflow-x: auto;"><svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}">`;

  // Axes
  svg += `<line x1="${padding.left}" y1="${chartHeight - padding.bottom}" x2="${
    chartWidth - padding.right
  }" y2="${chartHeight - padding.bottom}" stroke="#ddd" stroke-width="2"/>`;
  svg += `<line x1="${padding.left}" y1="${padding.top}" x2="${
    padding.left
  }" y2="${chartHeight - padding.bottom}" stroke="#ddd" stroke-width="2"/>`;

  // Y-axis labels
  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const value = (maxSale / ySteps) * i;
    const y =
      chartHeight -
      padding.bottom -
      (value / maxSale) * (chartHeight - padding.top - padding.bottom);
    svg += `<text x="${padding.left - 10}" y="${
      y + 5
    }" text-anchor="end" font-size="10" fill="#666">₹${Math.round(
      value
    )}</text>`;
    svg += `<line x1="${padding.left}" y1="${y}" x2="${
      chartWidth - padding.right
    }" y2="${y}" stroke="#f0f0f0" stroke-width="1"/>`;
  }

  // Plot line
  const days = Object.keys(dailySales);
  const xStep = (chartWidth - padding.left - padding.right) / (days.length - 1);
  let pathData = "";

  days.forEach((day, i) => {
    const x = padding.left + i * xStep;
    const y =
      chartHeight -
      padding.bottom -
      (dailySales[day] / maxSale) *
        (chartHeight - padding.top - padding.bottom);

    if (i === 0) {
      pathData = `M ${x} ${y}`;
    } else {
      pathData += ` L ${x} ${y}`;
    }

    svg += `<circle cx="${x}" cy="${y}" r="3" fill="#2563eb"/>`;

    if (i % 5 === 0) {
      svg += `<text x="${x}" y="${
        chartHeight - padding.bottom + 15
      }" text-anchor="middle" font-size="10" fill="#666">${day}</text>`;
    }
  });

  svg += `<path d="${pathData}" fill="none" stroke="#2563eb" stroke-width="2.5"/>`;
  svg += `</svg></div>`;
  container.innerHTML = svg;
}

// Weekly Breakdown
function createWeeklyBreakdown(purchases) {
  const container = document.getElementById("weeklyBreakdown");

  const weeks = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  purchases.forEach((p) => {
    if (p.timestamp) {
      const day = new Date(p.timestamp).getDate();
      const week = Math.ceil(day / 7);
      weeks[week] += p.price;
    }
  });

  const maxWeek = Math.max(...Object.values(weeks), 1);
  const isMobile = window.innerWidth <= 480;
  const chartWidth = isMobile ? 300 : 400;
  const chartHeight = 250;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };

  let svg = `<svg width="100%" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}" preserveAspectRatio="xMidYMid meet" style="max-width: 100%;">`;

  const barWidth = (chartWidth - padding.left - padding.right) / 5 - 20;

  Object.entries(weeks).forEach(([week, amount], i) => {
    const x =
      padding.left + (i * (chartWidth - padding.left - padding.right)) / 5 + 10;
    const barHeight =
      (amount / maxWeek) * (chartHeight - padding.top - padding.bottom);
    const y = chartHeight - padding.bottom - barHeight;

    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="#9333ea" rx="6"/>`;
    svg += `<text x="${x + barWidth / 2}" y="${
      chartHeight - padding.bottom + 20
    }" text-anchor="middle" font-size="${
      isMobile ? "10" : "12"
    }" fill="#666">Week ${week}</text>`;
    svg += `<text x="${x + barWidth / 2}" y="${
      y - 10
    }" text-anchor="middle" font-size="${
      isMobile ? "9" : "11"
    }" fill="#333" font-weight="600">₹${Math.round(
      amount
    ).toLocaleString()}</text>`;
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

// Payment Distribution
function createPaymentDistribution(purchases) {
  const container = document.getElementById("paymentDistribution");

  const paymentMethods = {};
  purchases.forEach((p) => {
    const method = p.paymentMethod || "Unknown";
    paymentMethods[method] = (paymentMethods[method] || 0) + 1;
  });

  const colors = {
    cash: "#3b82f6",
    upi: "#8b5cf6",
    card: "#ec4899",
    bank: "#06b6d4",
    Unknown: "#6b7280",
  };

  const total = purchases.length;
  const isMobile = window.innerWidth <= 768;
  const radius = isMobile ? 80 : 100;
  const svgSize = isMobile ? 220 : 260;
  const centerX = svgSize / 2;
  const centerY = svgSize / 2;
  let currentAngle = 0;

  let html = `<div style="display: flex; align-items: center; justify-content: space-around; gap: 30px; flex-wrap: wrap; padding: 10px;">`;
  html += `<svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}" style="flex-shrink: 0; background: white; border-radius: 8px;">`;

  Object.entries(paymentMethods).forEach(([method, count]) => {
    const percentage = (count / total) * 100;
    const sliceAngle = (percentage / 100) * 360;

    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const x1 = centerX + radius * Math.cos(((startAngle - 90) * Math.PI) / 180);
    const y1 = centerY + radius * Math.sin(((startAngle - 90) * Math.PI) / 180);
    const x2 = centerX + radius * Math.cos(((endAngle - 90) * Math.PI) / 180);
    const y2 = centerY + radius * Math.sin(((endAngle - 90) * Math.PI) / 180);

    const largeArc = sliceAngle > 180 ? 1 : 0;
    const color = colors[method] || colors["Unknown"];

    html += `<path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${color}" stroke="white" stroke-width="3"/>`;

    currentAngle = endAngle;
  });

  html += `</svg><div style="display: flex; flex-direction: column; gap: 12px; min-width: 180px;">`;

  Object.entries(paymentMethods).forEach(([method, count]) => {
    const percentage = ((count / total) * 100).toFixed(1);
    const color = colors[method] || colors["Unknown"];

    html += `
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 24px; height: 24px; background: ${color}; border-radius: 4px; flex-shrink: 0;"></div>
        <span style="font-size: ${
          isMobile ? "14px" : "15px"
        }; color: #333; font-weight: 500;">${method}: ${count} (${percentage}%)</span>
      </div>
    `;
  });

  html += `</div></div>`;
  container.innerHTML = html;
}

// Top Customers Leaderboard
function createTopCustomers(purchases, customers) {
  const container = document.getElementById("topCustomers");

  const customerSpending = {};
  purchases.forEach((p) => {
    customerSpending[p.customerNumber] =
      (customerSpending[p.customerNumber] || 0) + p.price;
  });

  const sorted = Object.entries(customerSpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (sorted.length === 0) {
    container.innerHTML = `<div class="noCustomers">No customers this month</div>`;
    return;
  }

  let html = "";
  sorted.forEach(([number, amount], index) => {
    const customer = customers.find((c) => c.number === number);
    const customerName = customer ? customer.name : "Unknown";
    const orderCount = purchases.filter(
      (p) => p.customerNumber === number
    ).length;

    let rankClass = "rankOther";
    if (index === 0) rankClass = "rank1";
    else if (index === 1) rankClass = "rank2";
    else if (index === 2) rankClass = "rank3";

    html += `
      <div class="customerRank">
        <div class="rankBadge ${rankClass}">${index + 1}</div>
        <div class="customerInfo">
          <div class="customerName">${customerName}</div>
          <div class="orderCount">${orderCount} orders</div>
        </div>
        <div class="customerSpent">₹${amount.toLocaleString()}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Best Selling Products
function createBestProducts(purchases) {
  const container = document.getElementById("bestProducts");

  const productStats = {};

  purchases.forEach((p) => {
    // Handle both old and new item format
    if (Array.isArray(p.items)) {
      // New format: array of items
      p.items.forEach((item) => {
        const itemName = item.name || "Unknown";
        if (!productStats[itemName]) {
          productStats[itemName] = { revenue: 0, quantity: 0 };
        }
        productStats[itemName].revenue += item.quantity * item.price || 0;
        productStats[itemName].quantity += item.quantity || 0;
      });
    } else {
      // Old format: simple string
      const item = p.items || "Unknown";
      if (!productStats[item]) {
        productStats[item] = { revenue: 0, quantity: 0 };
      }
      productStats[item].revenue += p.price;
      productStats[item].quantity += p.quantity || 0;
    }
  });

  const sorted = Object.entries(productStats)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5);

  if (sorted.length === 0) {
    container.innerHTML = `<div class="noProducts">No products sold this month</div>`;
    return;
  }

  const maxRevenue = sorted[0][1].revenue;

  let html = "";
  sorted.forEach(([product, stats]) => {
    const percentage = (stats.revenue / maxRevenue) * 100;

    html += `
      <div class="productBar">
        <div class="productHeader">
          <div class="productName">${product} (${stats.quantity} units)</div>
          <div class="productRevenue">₹${stats.revenue.toLocaleString()}</div>
        </div>
        <div class="barContainer">
          <div class="barFill" style="width: ${percentage}%;">
            <div class="barText">${percentage.toFixed(0)}%</div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Sales by Day of Week
function createSalesByDay(purchases) {
  const container = document.getElementById("salesByDay");

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const daySales = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  purchases.forEach((p) => {
    if (p.timestamp) {
      const day = new Date(p.timestamp).getDay();
      daySales[day] += p.price;
    }
  });

  const maxDay = Math.max(...Object.values(daySales), 1);

  let html = "";
  Object.entries(daySales).forEach(([day, amount]) => {
    const percentage = (amount / maxDay) * 100;

    html += `
      <div class="dayItem">
        <div class="dayName">${dayNames[day]}</div>
        <div class="dayBar">
          <div class="dayFill" style="width: ${percentage}%;"></div>
        </div>
        <div class="dayAmount">₹${amount.toLocaleString()}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Pending Payments Tracker
function createPendingPayments(purchases, customers) {
  const pendingPurchases = purchases.filter((p) => p.payment === "unpaid");

  const totalPending = pendingPurchases.reduce((sum, p) => sum + p.price, 0);
  document.getElementById(
    "totalPending"
  ).textContent = `₹${totalPending.toLocaleString()}`;

  const customersPending = {};
  pendingPurchases.forEach((p) => {
    customersPending[p.customerNumber] =
      (customersPending[p.customerNumber] || 0) + p.price;
  });

  const pendingCount = Object.keys(customersPending).length;
  document.getElementById(
    "pendingCount"
  ).textContent = `${pendingCount} customer${pendingCount !== 1 ? "s" : ""}`;

  const container = document.getElementById("pendingList");

  if (pendingCount === 0) {
    container.innerHTML = `<div class="noPending">No pending payments! 🎉</div>`;
    return;
  }

  const sorted = Object.entries(customersPending).sort((a, b) => b[1] - a[1]);

  let html = "";
  sorted.forEach(([number, amount]) => {
    const customer = customers.find((c) => c.number === number);
    const customerName = customer ? customer.name : "Unknown";

    html += `
      <div class="pendingCard">
        <div class="pendingCustomer">${customerName}</div>
        <div class="pendingAmount">₹${amount.toLocaleString()}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Monthly Target Progress
function createTargetProgress(achieved, currentMonth) {
  const target = 150000; // ₹1,50,000 target

  document.getElementById(
    "targetAmount"
  ).textContent = `₹${target.toLocaleString()}`;
  document.getElementById(
    "achievedAmount"
  ).textContent = `₹${achieved.toLocaleString()}`;

  const percentage = Math.min((achieved / target) * 100, 100);

  document.getElementById("progressFill").style.width = `${percentage}%`;
  document.getElementById("progressText").textContent = `${percentage.toFixed(
    1
  )}%`;

  // Calculate remaining days in month
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), currentMonth + 1, 0).getDate();
  const remainingDays = lastDay - now.getDate();
  document.getElementById(
    "remainingDays"
  ).textContent = `${remainingDays} days`;
}
