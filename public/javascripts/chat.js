const chatForm = document.querySelector('#chat-form')
const chatMess = document.querySelector('#msg')
const messages = document.querySelector('#Mess')

const socket = io();

// nhận client mới join the chat
socket.on("message", (msg) => {
    console.log(msg)
})

// hiển thị chat của user từ server
socket.on('user-chat', data => {
    const mess = `<div id="parMess"><div id="user">${data.user}</div><div id="mess">${data.message}</div></div>`
    const chatItem = document.createElement('div')
    chatItem.innerHTML = mess
    messages.appendChild(chatItem)
})

// submit message send mess to server
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const msg = chatMess.value
    // emit to server
    socket.emit('chatMessage', {user: "user", message: msg})
    chatMess.value = ""
})