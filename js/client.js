const socket = io.connect('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('news-ting-6832.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){

        audio.play();
    }
    audio.play();
}

form.addEventListener('submit', (e)=>{
      e.preventDefault();
      
      const message = messageInput.value;
      append(`You: ${message}`, 'right');
      socket.emit('send', message);
      messageInput.value = ''
})

const userName = prompt("Enter your name to join");
if (userName && userName.trim() !== "") {
    socket.emit('new-user-joined', userName);
} else {
    console.error("Name is required to join.");
}

socket.on('user-joined', name =>{
append(`${name} joined the chat`, 'right')
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
    })

    socket.on('left', name =>{
        append(`${name} left the chat`, 'right')
        })