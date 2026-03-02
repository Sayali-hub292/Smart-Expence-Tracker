// Select Elements
const budgetInput = document.getElementById('monthly-budget');
const setBudgetBtn = document.getElementById('set-budget-btn');
const totalBudgetDisplay = document.getElementById('total-budget-display');
const totalSpentDisplay = document.getElementById('total-spent-display');
const remainingBudgetDisplay = document.getElementById('remaining-budget-display');
const remainingContainer = document.getElementById('remaining-container');
const budgetProgress = document.getElementById('budget-progress');
const budgetWarning = document.getElementById('budget-warning');

const expenseForm = document.getElementById('expense-form');
const expenseDateInput = document.getElementById('expense-date');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const expenseNoteInput = document.getElementById('expense-note');
const expenseList = document.getElementById('expense-list');

const langToggle = document.getElementById('language-toggle');
const langText = document.getElementById('lang-text');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const savingPlanBox = document.getElementById('saving-plan');
const savingPlanText = document.getElementById('plan-text');

// State
let budget = parseFloat(localStorage.getItem('budget')) || 0;
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let currentLang = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('theme') || 'light';

// Translations
const translations = {
    en: {
        title: "Smart Expense Tracker",
        subtitle: "Track your daily spends and manage your monthly budget.",
        labelBudget: "Monthly Budget (₹)",
        set: "Set",
        statBudget: "Total Budget",
        statSpent: "Total Spent",
        statRemaining: "Remaining",
        warning: "⚠ Warning: You have exceeded your budget!",
        headingAdd: "Add New Expense",
        labelDate: "Date",
        labelAmount: "Amount (₹)",
        labelCategory: "Category",
        labelNote: "Note",
        btn_add: "Add Expense",
        headingHistory: "Expense History",
        btnExport: "Export Data",
        btnImport: "Import Data",
        btnPdf: "Download PDF Report",
        thDate: "Date",
        thCategory: "Category",
        thNote: "Note",
        thAmount: "Amount",
        thAction: "Action",
        optSelect: "Select Category",
        optFood: "Food",
        optTravel: "Travel",
        optShopping: "Shopping",
        optOther: "Other",
        placeholderCategory: "Type or select category...",
        delete: "Delete",
        edit: "Edit",
        btnUpdate: "Update Expense",
        btnCancel: "Cancel",
        planTitle: "💡 Saving Plan",
        catWarning: "Reduce spending on {cat}, it's getting high!",
        tips: [
            "Cook at home today to save more!",
            "Review your subscriptions and cancel what you don't use.",
            "Use public transport instead of cabs.",
            "Make a shopping list before you go out.",
            "Wait 24 hours before making impulsive purchases."
        ]
    },
    mr: {
        title: "स्मार्ट खर्च ट्रॅकर",
        subtitle: "तुमच्या दैनंदिन खर्चाचा मागोवा घ्या आणि मासिक बजेट व्यवस्थापित करा.",
        labelBudget: "मासिक बजेट (₹)",
        set: "सेट करा",
        statBudget: "एकूण बजेट",
        statSpent: "एकूण खर्च",
        statRemaining: "शिल्लक",
        warning: "⚠ चेतावणी: तुम्ही तुमचे बजेट ओलांडले आहे!",
        headingAdd: "नवीन खर्च जोडा",
        labelDate: "तारीख",
        labelAmount: "रक्कम (₹)",
        labelCategory: "श्रेणी",
        labelNote: "टीप",
        btn_add: "खर्च जोडा",
        headingHistory: "खर्चाचा इतिहास",
        btnExport: "डेटा एक्सपोर्ट",
        btnImport: "डेटा इम्पोर्ट",
        btnPdf: "PDF रिपोर्ट डाउनलोड",
        thDate: "तारीख",
        thCategory: "श्रेणी",
        thNote: "टीप",
        thAmount: "रक्कम",
        thAction: "कृती",
        optSelect: "श्रेणी निवडा",
        optFood: "अन्न",
        optTravel: "प्रवास",
        optShopping: "खरेदी",
        optOther: "इतर",
        placeholderCategory: "श्रेणी टाइप करा किंवा निवडा...",
        delete: "डिलीट",
        edit: "संपादित करा",
        btnUpdate: "खर्च अपडेट करा",
        btnCancel: "रद्द करा",
        planTitle: "💡 बचत योजना",
        catWarning: "{cat} वर खर्च कमी करा, जास्त होतोय!",
        tips: [
            "पैसे वाचवण्यासाठी आज घरी जेवण बनवा!",
            "तुमची सबस्क्रिप्शन तपासा आणि अनावश्यक बंद करा.",
            "टॅक्सीऐवजी सार्वजनिक वाहतुकीचा वापर करा.",
            "बाहेर जाण्यापूर्वी खरेदीची यादी बनवा.",
            "तात्काळ खरेदी करण्यापूर्वी २४ तास थांबा."
        ]
    }
};

// Initialize
function init() {
    budgetInput.value = budget;
    applyTheme();
    applyLanguage();
    updateDashboard();
    renderExpenses();
    expenseDateInput.valueAsDate = new Date();
}

// Theme Switching
function applyTheme() {
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-theme');
        themeIcon.textContent = '🌙';
    }
}

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    applyTheme();
});

// Language Switching
function applyLanguage() {
    const t = translations[currentLang];
    langText.textContent = currentLang === 'en' ? 'Marathi' : 'English';

    document.getElementById('main-title').textContent = t.title;
    document.getElementById('main-subtitle').textContent = t.subtitle;
    document.getElementById('label-budget').textContent = t.labelBudget;
    document.getElementById('set-budget-btn').textContent = t.set;
    document.getElementById('stat-budget').textContent = t.statBudget;
    document.getElementById('stat-spent').textContent = t.statSpent;
    document.getElementById('stat-remaining').textContent = t.statRemaining;
    document.getElementById('budget-warning').textContent = t.warning;
    document.getElementById('heading-add').textContent = t.headingAdd;
    document.getElementById('label-date').textContent = t.labelDate;
    document.getElementById('label-amount').textContent = t.labelAmount;
    document.getElementById('label-category').textContent = t.labelCategory;
    document.getElementById('expense-category').placeholder = t.placeholderCategory;
    document.getElementById('label-note').textContent = t.labelNote;
    document.getElementById('btn-add').textContent = t.btn_add;
    document.getElementById('heading-history').textContent = t.headingHistory;
    document.getElementById('export-json-btn').textContent = t.btnExport;
    document.getElementById('import-json-btn').textContent = t.btnImport;
    document.getElementById('download-pdf-btn').textContent = t.btnPdf;
    document.getElementById('th-date').textContent = t.thDate;
    document.getElementById('th-category').textContent = t.thCategory;
    document.getElementById('th-note').textContent = t.thNote;
    document.getElementById('th-amount').textContent = t.thAmount;
    document.getElementById('th-action').textContent = t.thAction;
    document.getElementById('opt-food').value = t.optFood;
    document.getElementById('opt-travel').value = t.optTravel;
    document.getElementById('opt-shopping').value = t.optShopping;
    document.getElementById('opt-other').value = t.optOther;
    document.getElementById('plan-title').textContent = t.planTitle;

    renderExpenses();
}

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'mr' : 'en';
    localStorage.setItem('language', currentLang);
    applyLanguage();
});

// Update Dashboard
function updateDashboard() {
    const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    const remaining = Number(budget) - totalSpent;
    const percent = Number(budget) > 0 ? Math.min((totalSpent / Number(budget)) * 100, 100) : 0;

    totalBudgetDisplay.textContent = `₹${Number(budget).toLocaleString()}`;
    totalSpentDisplay.textContent = `₹${totalSpent.toLocaleString()}`;
    remainingBudgetDisplay.textContent = `₹${remaining.toLocaleString()}`;

    budgetProgress.style.width = `${percent}%`;

    if (totalSpent > budget && budget > 0) {
        budgetWarning.classList.remove('hidden');
        budgetProgress.style.backgroundColor = '#ef4444';
        remainingContainer.classList.add('over');
        showSavingPlan();
    } else {
        budgetWarning.classList.add('hidden');
        budgetProgress.style.backgroundColor = '#4f46e5';
        remainingContainer.classList.remove('over');
        savingPlanBox.classList.add('hidden');
    }

    localStorage.setItem('budget', budget);
}

function showSavingPlan() {
    if (expenses.length === 0) return;

    const t = translations[currentLang];

    // Analyze category spending
    const categoryTotals = {};
    expenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + Number(exp.amount);
    });

    // Find highest spending category
    let highestCat = '';
    let maxAmount = 0;
    for (const cat in categoryTotals) {
        if (categoryTotals[cat] > maxAmount) {
            maxAmount = categoryTotals[cat];
            highestCat = cat;
        }
    }

    const localizedCat = getLocalizedCategory(highestCat);
    const catMsg = t.catWarning.replace('{cat}', localizedCat);
    const randomTip = t.tips[Math.floor(Math.random() * t.tips.length)];

    savingPlanText.innerHTML = `<strong>${catMsg}</strong><br>${randomTip}`;
    savingPlanBox.classList.remove('hidden');
}

setBudgetBtn.addEventListener('click', () => {
    const val = parseFloat(budgetInput.value);
    if (!isNaN(val) && val >= 0) {
        budget = val;
        updateDashboard();
    }
});

let editingId = null;

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = parseFloat(expenseAmountInput.value);
    if (isNaN(amount) || amount <= 0) return;

    const expenseData = {
        date: expenseDateInput.value,
        amount: amount,
        category: expenseCategoryInput.value,
        note: expenseNoteInput.value || 'N/A'
    };

    if (editingId) {
        // Update existing expense
        expenses = expenses.map(exp =>
            exp.id === editingId ? { ...exp, ...expenseData } : exp
        );
        editingId = null;
        renderExpenses();
    } else {
        // Add new expense
        const expense = {
            id: Date.now(),
            ...expenseData
        };
        expenses.push(expense);
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));
    applyLanguage(); // This will refresh the form button text and render list
    updateDashboard();

    // Clear and Reset Form
    resetForm();
});

function resetForm() {
    editingId = null;
    expenseForm.reset();
    expenseDateInput.valueAsDate = new Date();
    applyLanguage(); // Restore "Add Expense" text
}

function renderExpenses() {
    expenseList.innerHTML = '';
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    sortedExpenses.forEach(exp => {
        const tr = document.createElement('tr');
        if (editingId === exp.id) tr.classList.add('editing-row');

        tr.innerHTML = `
            <td>${formatDate(exp.date)}</td>
            <td>${getLocalizedCategory(exp.category)}</td>
            <td>${exp.note}</td>
            <td>₹${exp.amount.toLocaleString()}</td>
            <td>
                <div class="row-actions">
                    <button class="edit-btn no-print" onclick="editExpense(${exp.id})">${translations[currentLang].edit}</button>
                    <button class="delete-btn no-print" onclick="deleteExpense(${exp.id})">${translations[currentLang].delete}</button>
                </div>
            </td>
        `;
        expenseList.appendChild(tr);
    });
}

window.editExpense = (id) => {
    const exp = expenses.find(e => e.id === id);
    if (!exp) return;

    editingId = id;
    expenseDateInput.value = exp.date;
    expenseAmountInput.value = exp.amount;
    expenseCategoryInput.value = exp.category;
    expenseNoteInput.value = exp.note === 'N/A' ? '' : exp.note;

    // Update form button text and visual state
    const t = translations[currentLang];
    document.getElementById('btn-add').textContent = t.btnUpdate;

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });

    renderExpenses(); // Re-render to highlight editing row
};

function getLocalizedCategory(cat) {
    const t = translations[currentLang];
    const map = {
        'Food': t.optFood,
        'Travel': t.optTravel,
        'Shopping': t.optShopping,
        'Other': t.optOther
    };
    return map[cat] || cat;
}

window.deleteExpense = (id) => {
    expenses = expenses.filter(exp => exp.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    updateDashboard();
};

function formatDate(dateStr) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString(currentLang === 'en' ? 'en-IN' : 'mr-IN', options);
}

// PDF Export
const downloadPdfBtn = document.getElementById('download-pdf-btn');
downloadPdfBtn.addEventListener('click', () => {
    const element = document.getElementById('history-section');
    const originalBtnText = downloadPdfBtn.textContent;

    // Provide visual feedback
    downloadPdfBtn.textContent = currentLang === 'en' ? 'Generating PDF...' : 'PDF तयार होत आहे...';
    downloadPdfBtn.style.opacity = '0.7';
    downloadPdfBtn.disabled = true;

    // Add a temporary class to ensure light theme and clean look during capture
    element.classList.add('pdf-export-mode');

    // Scroll to top to ensure html2canvas captures correctly (common issue)
    const scrollPos = window.scrollY;
    window.scrollTo(0, 0);

    const opt = {
        margin: [10, 10],
        filename: `Expense_History_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            scrollY: 0
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use a small timeout to ensure the class is applied and layout is updated
    setTimeout(() => {
        html2pdf().set(opt).from(element).save().then(() => {
            element.classList.remove('pdf-export-mode');
            window.scrollTo(0, scrollPos); // Restore scroll position
            downloadPdfBtn.textContent = originalBtnText;
            downloadPdfBtn.style.opacity = '1';
            downloadPdfBtn.disabled = false;
        }).catch(err => {
            console.error("PDF Export Error:", err);
            element.classList.remove('pdf-export-mode');
            window.scrollTo(0, scrollPos); // Restore scroll position
            downloadPdfBtn.textContent = originalBtnText;
            downloadPdfBtn.style.opacity = '1';
            downloadPdfBtn.disabled = false;
        });
    }, 200);
});

// JSON Export
const exportBtn = document.getElementById('export-json-btn');
exportBtn.addEventListener('click', () => {
    const data = { budget, expenses };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense_tracker_backup.json`;
    a.click();
    URL.revokeObjectURL(url);
});

// JSON Import
const importBtn = document.getElementById('import-json-btn');
const importFile = document.getElementById('import-file');
importBtn.addEventListener('click', () => importFile.click());
importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            if (data.budget !== undefined && Array.isArray(data.expenses)) {
                budget = data.budget;
                expenses = data.expenses;
                localStorage.setItem('budget', budget);
                localStorage.setItem('expenses', JSON.stringify(expenses));
                budgetInput.value = budget;
                updateDashboard();
                renderExpenses();
                alert(currentLang === 'en' ? 'Data imported successfully!' : 'डेटा यशस्वीपणे इम्पोर्ट झाला!');
            }
        } catch (err) { alert('Error!'); }
    };
    reader.readAsText(file);
});

init();
