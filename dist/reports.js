document.addEventListener("DOMContentLoaded", () => {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

  // ========== UPDATE REPORT BOXES ==========
  
  // 1. Total Sales
  const totalSales = purchases.reduce((sum, p) => sum + p.price, 0);
  const reportBoxes = document.querySelectorAll(".reportBox");
  reportBoxes[0].innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 32px; font-weight: bold; margin-bottom: 5px;">₹${totalSales.toLocaleString()}</div>
      <span style="font-size: 16px;">Total Sales</span>
    </div>
  `;

  // 2. Total Customers
  reportBoxes[1].innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 32px; font-weight: bold; margin-bottom: 5px;">${customers.length}</div>
      <span style="font-size: 16px;">Customers</span>
    </div>
  `;

  // 3. Growth (comparing last 30 days vs previous 30 days)
  const now = Date.now();
  const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = now - (60 * 24 * 60 * 60 * 1000);

  const last30DaysSales = purchases
    .filter(p => p.timestamp >= thirtyDaysAgo)
    .reduce((sum, p) => sum + p.price, 0);

  const previous30DaysSales = purchases
    .filter(p => p.timestamp >= sixtyDaysAgo && p.timestamp < thirtyDaysAgo)
    .reduce((sum, p) => sum + p.price, 0);

  let growthPercentage = 0;
  if (previous30DaysSales > 0) {
    growthPercentage = ((last30DaysSales - previous30DaysSales) / previous30DaysSales * 100).toFixed(1);
  } else if (last30DaysSales > 0) {
    growthPercentage = 100;
  }

  const growthSymbol = growthPercentage >= 0 ? "↑" : "↓";
  const growthColor = growthPercentage >= 0 ? "#16a34a" : "#dc2626";

  reportBoxes[2].innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 32px; font-weight: bold; margin-bottom: 5px; color: ${growthColor};">
        ${growthSymbol} ${Math.abs(growthPercentage)}%
      </div>
      <span style="font-size: 16px;">Growth</span>
    </div>
  `;

  // 4. Top Product
  const productCount = {};
  purchases.forEach(p => {
    const itemName = p.items || "Unknown";
    productCount[itemName] = (productCount[itemName] || 0) + p.quantity;
  });

  let topProduct = "No Sales";
  let maxCount = 0;
  for (const [product, count] of Object.entries(productCount)) {
    if (count > maxCount) {
      maxCount = count;
      topProduct = product;
    }
  }

  reportBoxes[3].innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 20px; font-weight: bold; margin-bottom: 5px; color: #000;">${topProduct}</div>
      <span style="font-size: 14px; color: #666;">${maxCount} units sold</span>
    </div>
  `;

  // ========== SALES LINE CHART ==========
  createSalesLineChart(purchases);

  // ========== PAYMENT METHOD PIE CHART ==========
  createPaymentPieChart(purchases);
});

// Function to create Sales Line Chart
function createSalesLineChart(purchases) {
  const salesChartContainer = document.querySelector(".salesChart");
  
  if (purchases.length === 0) {
    salesChartContainer.innerHTML = `<p style="text-align: center; color: gray; padding: 20px;">No sales data available</p>`;
    return;
  }

  // Group sales by date
  const salesByDate = {};
  purchases.forEach(p => {
    const date = p.date || "Unknown";
    salesByDate[date] = (salesByDate[date] || 0) + p.price;
  });

  // Sort dates
  const sortedDates = Object.keys(salesByDate).sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  const maxSales = Math.max(...Object.values(salesByDate));
  const chartHeight = 250;
  const padding = { top: 20, right: 20, bottom: 50, left: 60 };
  const chartWidth = Math.max(sortedDates.length * 80, 300); // Dynamic width based on data points

  // Create SVG with responsive container
  let svg = `
    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 30px;">
      <h3 style="margin: 0 0 20px 0; color: #333;">Sales Over Time</h3>
      <div style="overflow-x: auto; overflow-y: visible;">
        <svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}" style="min-width: 100%;">
  `;

  // Draw axes
  svg += `<line x1="${padding.left}" y1="${chartHeight - padding.bottom}" x2="${chartWidth - padding.right}" y2="${chartHeight - padding.bottom}" stroke="#ddd" stroke-width="2"/>`;
  svg += `<line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${chartHeight - padding.bottom}" stroke="#ddd" stroke-width="2"/>`;

  // Add Y-axis labels (price values)
  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const value = (maxSales / ySteps) * i;
    const y = chartHeight - padding.bottom - ((value / maxSales) * (chartHeight - padding.top - padding.bottom));
    svg += `<text x="${padding.left - 10}" y="${y + 5}" text-anchor="end" font-size="11" fill="#666">₹${Math.round(value)}</text>`;
    svg += `<line x1="${padding.left}" y1="${y}" x2="${chartWidth - padding.right}" y2="${y}" stroke="#f0f0f0" stroke-width="1"/>`;
  }

  // Plot points and lines
  const availableWidth = chartWidth - padding.left - padding.right;
  const xStep = availableWidth / (sortedDates.length - 1 || 1);
  let pathData = "";

  sortedDates.forEach((date, i) => {
    const x = padding.left + i * xStep;
    const y = chartHeight - padding.bottom - ((salesByDate[date] / maxSales) * (chartHeight - padding.top - padding.bottom));

    if (i === 0) {
      pathData = `M ${x} ${y}`;
    } else {
      pathData += ` L ${x} ${y}`;
    }

    // Draw point
    svg += `<circle cx="${x}" cy="${y}" r="4" fill="#2563eb"/>`;
    
    // Value label on hover
    svg += `<title>₹${salesByDate[date].toLocaleString()}</title>`;
    
    // Date label (rotated for better fit)
    const shortDate = date.length > 10 ? date.substring(0, 6) : date;
    svg += `<text x="${x}" y="${chartHeight - padding.bottom + 15}" text-anchor="end" font-size="10" fill="#666" transform="rotate(-45 ${x} ${chartHeight - padding.bottom + 15})">${shortDate}</text>`;
  });

  // Draw line
  svg += `<path d="${pathData}" fill="none" stroke="#2563eb" stroke-width="2.5"/>`;

  svg += `</svg></div></div>`;
  salesChartContainer.innerHTML = svg;
}

// Function to create Payment Method Pie Chart
function createPaymentPieChart(purchases) {
  const pieChartContainer = document.querySelector(".salesByPaymentMethod");
  
  if (purchases.length === 0) {
    pieChartContainer.innerHTML = `<p style="text-align: center; color: gray; padding: 20px;">No payment data available</p>`;
    return;
  }

  // Count payment methods
  const paymentMethods = {};
  purchases.forEach(p => {
    const method = p.payment || "Unknown";
    paymentMethods[method] = (paymentMethods[method] || 0) + 1;
  });

  const total = purchases.length;
  const colors = {
    "paid": "#16a34a",
    "Paid": "#16a34a",
    "pending": "#f59e0b",
    "Pending": "#f59e0b",
    "cash": "#3b82f6",
    "Cash": "#3b82f6",
    "card": "#8b5cf6",
    "Card": "#8b5cf6",
    "upi": "#ec4899",
    "UPI": "#ec4899",
    "unknown": "#6b7280"
  };

  // Create pie chart
  const radius = 100;
  const centerX = 150;
  const centerY = 150;
  let currentAngle = 0;

  let svg = `
    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h3 style="margin: 0 0 20px 0; color: #333;">Sales by Payment Method</h3>
      <div style="display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap;">
        <svg width="300" height="300">
  `;

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
    
    svg += `
      <path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z"
            fill="${color}" stroke="white" stroke-width="2"/>
    `;
    
    currentAngle = endAngle;
  });

  svg += `</svg><div style="display: flex; flex-direction: column; gap: 10px;">`;

  // Legend
  Object.entries(paymentMethods).forEach(([method, count]) => {
    const percentage = ((count / total) * 100).toFixed(1);
    const color = colors[method] || colors["unknown"];
    
    svg += `
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 20px; height: 20px; background: ${color}; border-radius: 4px;"></div>
        <span style="font-size: 14px; color: #333;">${method}: ${count} (${percentage}%)</span>
      </div>
    `;
  });

  svg += `</div></div></div>`;
  pieChartContainer.innerHTML = svg;
}





