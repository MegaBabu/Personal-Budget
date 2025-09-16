// ===== Variables =====
let currentBalance = 0;
const CURRENCY = "₹";
const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Salary"];
let transactions = [];

// ===== Functions =====

// Add transaction
function addTransaction() {
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  if (amount > 0 && CATEGORIES.includes(category)) {
    const transaction = {
      id: transactions.length + 1,
      amount,
      type,
      category,
      description,
      date: new Date().toLocaleString()
    };

    transactions.push(transaction);
    if (type === "income") {
      currentBalance += amount;
    } else {
      currentBalance -= amount;
    }

    updateUI();
  } else {
    alert("❌ Invalid transaction. Check amount and category.");
  }

  // clear fields
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
}

// Update summary & transactions
function updateUI() {
  let totalIncome = 0, totalExpense = 0;
  const list = document.getElementById("transactionList");
  list.innerHTML = "";

  transactions.forEach(t => {
    if (t.type === "income") {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
    }

    const li = document.createElement("li");
    li.classList.add(t.type);
    li.textContent = `${t.date} - ${t.category}: ${CURRENCY}${t.amount} (${t.description})`;
    list.appendChild(li);
  });

  document.getElementById("totalIncome").textContent = CURRENCY + totalIncome;
  document.getElementById("totalExpense").textContent = CURRENCY + totalExpense;
  document.getElementById("netBalance").textContent = CURRENCY + currentBalance;

  // Overspending warning
  const alertMsg = document.getElementById("alert");
  if (totalExpense > totalIncome) {
    alertMsg.textContent = "⚠️ Warning: You are overspending!";
  } else {
    alertMsg.textContent = "";
  }
}
