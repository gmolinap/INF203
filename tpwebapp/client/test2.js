function showText() {
    var req = new XMLHttpRequest();
    req.open('GET', '../../Data');
    req.onload = function () {
        if (this.status == 200) {
            document.getElementById("MAINSHOW").textContent = this.responseText;
        } else {
            document.getElementById("MAINSHOW").textContent = 'ERROR';
        }
    }
    req.onerror = function () {
        document.getElementById("MAINSHOW").textContent = 'ERROR';
    }
    req.send();
}

function showAdd() {
    document.getElementById("addForm").style.visibility = "visible";
}

function sendAdd() {
    var req = new XMLHttpRequest();
    var title = document.getElementById("titleTF").value;
    var value = document.getElementById("valueTF").value;
    var color = document.getElementById("colorTF").value;
    if (title !== "" && value !== "" && color !== "") {
        req.open('GET', "../../add?title=" + title + "&value=" + value + "&color=" + color);
        req.send();
    }
}

function showRemove() {
    document.getElementById("removeForm").style.visibility = "visible";
}

function sendRem() {
    var req = new XMLHttpRequest();
    var index = new Number(document.getElementById("indexTF").value);
    if (index !== "") {
        req.open('GET', "../../remove?index=" + index);
        req.send();
    }
}

function clearData() {
    var req = new XMLHttpRequest();
    req.open('GET', "../../clear");
    req.send();
}

function restoreData() {
    var req = new XMLHttpRequest();
    req.open('GET', "../../restore");
    req.send();
}


// client/test2.js or wherever your client-side JavaScript code is
document.getElementById('BUT_LPI').addEventListener('click', () => {
    fetch('/Data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Assuming 'data' is an array of objects with 'title', 'value', and 'color' properties
            drawPieChart(data); // You need to implement this function
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});

function showPieChart() {
    const pieDiv = document.getElementById("pieDiv");
    pieDiv.innerHTML = ''; // Clear existing content
    const img = new Image();
    img.src = '../../PChart'; // Set the source to the server route that generates the pie chart
    pieDiv.appendChild(img); // Add the image to the div
}

function showLocalPieChart() {
    // Fetch the data and then generate the pie chart locally
    fetch('../../Data')
        .then(response => response.json())
        .then(data => {
            const svg = generatePieChart(data);
            document.getElementById("pieDiv").innerHTML = svg;
        })
        .catch(error => console.error('Error fetching data:', error));
}
