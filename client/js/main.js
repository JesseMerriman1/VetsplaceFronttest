document.addEventListener('DOMContentLoaded', function() {
    const addClientForm = document.getElementById('add-client-form');
    addClientForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addClient();
    });
});

function openClientForm() {
    document.getElementById('add-client-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('add-client-modal').style.display = 'none';
}

function closeSearchModal() {
    document.getElementById('search-results-modal').style.display = 'none';
}

function addClient() {
    const clientData = {
        name: document.getElementById('client-name').value,
        phoneNumber: document.getElementById('phone-number').value,
        address: document.getElementById('address').value,
        petsName: document.getElementById('pets-name').value
    };

    fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Client added:', data);
        closeModal();
    })
    .catch(error => console.error('Error:', error));
}

function searchClients() {
    const query = document.getElementById('search-query').value;
    fetch(`http://localhost:3000/api/clients/search?term=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = data.map(client => `<p>${client.name}</p>`).join('');
            document.getElementById('search-results-modal').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            resultsContainer.innerHTML = '<p>Error fetching results.</p>';
        });
}
