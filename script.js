// Event listener to handle form submission
document.getElementById('logForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh on submit

    const logEntryText = document.getElementById('logEntry').value;

    if (logEntryText) {
        // Get current date and time
        const now = new Date();
        const date = now.toLocaleDateString();  // Local date format
        const hour = now.toLocaleTimeString();  // Local time format

        // Retrieve existing entries from localStorage, or initialize an empty array
        const entries = JSON.parse(localStorage.getItem('logEntries')) || [];

        // Add the new entry to the entries array
        entries.push({ date, hour, text: logEntryText });

        // Save the updated entries back to localStorage
        localStorage.setItem('logEntries', JSON.stringify(entries));

        // Clear the textarea after submission
        document.getElementById('logEntry').value = '';

        // Update the displayed logbook entries
        displayLogEntries();
    }
});

// Function to display the log entries from localStorage
function displayLogEntries() {
    const entries = JSON.parse(localStorage.getItem('logEntries')) || [];
    const entryList = document.getElementById('entryList');

    // Clear the table body before adding updated entries
    entryList.innerHTML = '';

    // Add each log entry to the table
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

// Initialize the log entries when the page loads
document.addEventListener('DOMContentLoaded', displayLogEntries);
