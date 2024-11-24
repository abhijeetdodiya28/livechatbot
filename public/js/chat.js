const socket = io();
const URLParams = new URLSearchParams(window.location.search);
const room = URLParams.get('room');
const username = URLParams.get('username'); 

socket.emit('join-room',room );

socket.emit('set-username',username);

const messagesDiv = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message');

socket.on('receive-message', ({username,message}) => {
    const msgDiv = document.createElement('div');
    msgDiv.innerHTML = `<strong>${username}:</strong><br>${message}`;
    messagesDiv.appendChild(msgDiv);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-message', { room, message });
    messageInput.value = '';
});
