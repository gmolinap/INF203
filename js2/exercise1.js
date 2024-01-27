function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tarea").value = this.responseText;
        }
    };
    xhttp.open("GET", "text.txt", true);
    xhttp.send();
}



function loadDoc2() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var lines = this.responseText.split('\n');
            var colors = ['red', 'green', 'blue', 'yellow', 'purple'];
            var tarea2 = document.getElementById('tarea2');
            tarea2.innerHTML = '';
            for (var i = 0; i < Math.min(lines.length, colors.length); i++) {
                var p = document.createElement('p');
                p.style.color = colors[i];
                p.textContent = lines[i];
                tarea2.appendChild(p);
            }
        }
    };
    xhttp.open("GET", "text.txt", true);
    xhttp.send();
}