document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    // Replace with your actual API key
    const API_KEY = '';
    const API_URL = 'https://api.deepseek.com';
    
    sendBtn.addEventListener('click', async function() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            
            try {
                const response = await fetchAIResponse(message);
                addMessage('ai', response);
            } catch (error) {
                console.error('Error:', error);
                addMessage('ai', 'Sorry, I encountered an error.');
            }
        }
    });
    
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    async function fetchAIResponse(prompt) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: prompt}],
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        return data.choices[0].message.content;
    }
});
