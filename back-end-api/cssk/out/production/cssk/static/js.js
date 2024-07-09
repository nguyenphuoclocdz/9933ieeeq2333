let webSocket;
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');

function connectWebSocket() {
    // Update the WebSocket URL with your server endpoint
    const webSocketUrl = 'ws://localhost:8080/chat'; // Update with your WebSocket endpoint

    webSocket = new WebSocket(webSocketUrl);

    webSocket.onopen = (event) => {
        console.log('WebSocket connection opened:', event);

        // You can add any initialization logic here
    };

    webSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        displayMessage(message);
    };

    webSocket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);

        // You can add any cleanup logic here
    };
}

function displayMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${message.username}: ${message.content}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
}

function sendMessage() {
    const content = messageInput.value.trim();
    if (content !== '') {
        const message = {
            username: 'YourUsername', // Replace with the actual username
            content: content
        };

        webSocket.send(JSON.stringify(message));

        // Clear the input field after sending the message
        messageInput.value = '';
    }
}

// Connect WebSocket when the page loads
connectWebSocket();
