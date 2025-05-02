// Handle log entry form submission
document.getElementById('logForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const logEntryText = document.getElementById('logEntry').value;
    if (logEntryText) {
        const now = new Date();
        const date = now.toLocaleDateString();
        const hour = now.toLocaleTimeString();

        const entries = JSON.parse(localStorage.getItem('logEntries')) || [];
        entries.push({ date, hour, text: logEntryText });
        localStorage.setItem('logEntries', JSON.stringify(entries));

        document.getElementById('logEntry').value = '';
        displayLogEntries();
    }
});

// Display log entries in table
function displayLogEntries() {
    const entries = JSON.parse(localStorage.getItem('logEntries')) || [];
    const entryList = document.getElementById('entryList');
    entryList.innerHTML = '';

    entries.forEach(entry => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.hour}</td>
            <td>${entry.text}</td>
        `;
        entryList.appendChild(tr);
    });
}

// Filter log entries by text
document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const entries = JSON.parse(localStorage.getItem('logEntries')) || [];
    const entryList = document.getElementById('entryList');

    entryList.innerHTML = '';
    entries
        .filter(entry => entry.text.toLowerCase().includes(searchTerm))
        .forEach(entry => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${entry.date}</td>
                <td>${entry.hour}</td>
                <td>${entry.text}</td>
            `;
            entryList.appendChild(tr);
        });
});

// Add editable row to the schedule table
document.getElementById('addRowBtn').addEventListener('click', function () {
    const tbody = document.getElementById('scheduleBody');
    const newRow = document.createElement('tr');
    newRow.setAttribute('contenteditable', 'true');

    for (let i = 0; i < 13; i++) {
        const td = document.createElement('td');
        td.textContent = '';
        newRow.appendChild(td);
    }

    tbody.appendChild(newRow);
});

// Initialize log entries on page load
document.addEventListener('DOMContentLoaded', displayLogEntries);
