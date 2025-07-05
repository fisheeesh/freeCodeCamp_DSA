//* Initialize data
let price = 19.5;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

//* Map for display names
const displayNames = {
    'PENNY': 'Pennies',
    'NICKEL': 'Nickels',
    'DIME': 'Dimes',
    'QUARTER': 'Quarters',
    'ONE': 'Ones',
    'FIVE': 'Fives',
    'TEN': 'Tens',
    'TWENTY': 'Twenties',
    'ONE HUNDRED': 'Hundreds'
};

//* Currency unit values
const currencyUnit = {
    'PENNY': 0.01,
    'NICKEL': 0.05,
    'DIME': 0.1,
    'QUARTER': 0.25,
    'ONE': 1,
    'FIVE': 5,
    'TEN': 10,
    'TWENTY': 20,
    'ONE HUNDRED': 100
};

const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const result = document.getElementById('change-due');

//* Function to calculate change
function calculateChange(cash, price, cid) {
    let change = Math.round((cash - price) * 100) / 100;
    let totalCID = Math.round(cid.reduce((sum, [name, amount]) => sum + amount, 0) * 100) / 100;

    if (change > totalCID) {
        return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }

    if (change === totalCID) {
        return { status: 'CLOSED', change: cid };
    }

    let changeArray = [];
    let cidCopy = [...cid];

    //* Process from highest to lowest denomination
    for (let i = cidCopy.length - 1; i >= 0; i--) {
        let [name, amount] = cidCopy[i];
        let unit = currencyUnit[name];
        let amountToGive = 0;

        while (change >= unit && amount >= unit) {
            change = Math.round((change - unit) * 100) / 100;
            amount = Math.round((amount - unit) * 100) / 100;
            amountToGive = Math.round((amountToGive + unit) * 100) / 100;
        }

        if (amountToGive > 0) {
            changeArray.push([name, amountToGive]);
        }
    }

    if (change > 0) {
        return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }

    return { status: 'OPEN', change: changeArray };
}

purchaseBtn.addEventListener('click', () => {
    const cash = parseFloat(cashInput.value);
    //* Clear previous results
    result.innerHTML = '';

    if (cash < price) {
        result.style.display = 'none';
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if (cash === price) {
        result.style.display = 'flex';
        result.textContent = "No change due - customer paid with exact cash";
        return;
    }

    const changeResult = calculateChange(cash, price, cid);
    result.style.display = 'flex';

    if (changeResult.status === 'INSUFFICIENT_FUNDS') {
        result.textContent = 'Status: INSUFFICIENT_FUNDS';
    } else if (changeResult.status === 'CLOSED') {
        let changeText = 'Status: CLOSED ';
        changeText += changeResult.change
            .filter(([name, amount]) => amount > 0)
            .map(([name, amount]) => `${name}: $${amount.toFixed(2)}`)
            .join(' ');
        result.textContent = changeText;
    } else {
        let changeText = 'Status: OPEN ';
        changeText += changeResult.change
            .map(([name, amount]) => `${name}: $${amount.toFixed(2)}`)
            .join(' ');
        result.textContent = changeText;
    }
});

//* Function to populate the drawer display
function populateDrawer() {
    const priceEl = document.getElementById('cost');
    priceEl.textContent = `$${price}`;
    const drawerBreakdown = document.getElementById('drawer-breakdown');
    drawerBreakdown.innerHTML = '';

    cid.forEach(([denomination, amount]) => {
        const denominationDiv = document.createElement('div');
        denominationDiv.className = 'denomination';
        denominationDiv.innerHTML = `
                    <span class="coin-name">${displayNames[denomination]}:</span>
                    <span class="coin-value">$${amount.toFixed(2)}</span>
                `;
        drawerBreakdown.appendChild(denominationDiv);
    });
}

//* Initialize the display when page loads
document.addEventListener('DOMContentLoaded', function () {
    populateDrawer();
});