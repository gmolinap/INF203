document.addEventListener('DOMContentLoaded', function() {
    setInterval(loadChatLog, 1000);
});

function sendMessage() {
    var message = document.getElementById('textedit').value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'chat.php?phrase=' + encodeURIComponent(message), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('textedit').value = '';
            loadChatLog();
        } else {
            console.error('Error sending message');
        }
    };
    xhr.send();
}

function loadChatLog() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'chatlog.txt', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            displayChat(xhr.responseText);
        } else {
            console.error('Error loading chat log');
        }
    };
    xhr.send();
}

function displayChat(data) {
    var lines = data.trim().split('\n');
    var chatDiv = document.getElementById('tarea');
    chatDiv.innerHTML = '';
    var maxLines = 10;
    lines.slice(Math.max(lines.length - maxLines, 0)).reverse().forEach(function(line) {
        var p = document.createElement('p');
        p.textContent = line;
        chatDiv.appendChild(p);
    });
}
