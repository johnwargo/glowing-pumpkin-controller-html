const ipAddressKey = "ipAddress";

document.getElementById(ipAddressKey).value = localStorage.getItem(ipAddressKey);

let ipForm = document.getElementById("ipForm");
ipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var ipAddress = document.getElementById(ipAddressKey).value.trim();
  console.log(`Storing IP address: ${ipAddress}`);
  localStorage.setItem(ipAddressKey, ipAddress);
});

document.getElementById('btnRandom').addEventListener('click', function (e) {
  // Send Random command to remote device
  console.log(`Click: ${e.target.id}`);
});

document.getElementById('btnLightning').addEventListener('click', function (e) {
  // Send Lightning command to remote device
  console.log(`Click: ${e.target.id}`);
});

document.getElementById('btnFlash').addEventListener('click', function (e) {
  console.log(`Click: ${e.target.id}`);
});

// colors[] = { CRGB::Blue, CRGB::Green, CRGB::Orange, CRGB::Purple, CRGB::Red, CRGB::Yellow };
document.getElementById('btnBlue').addEventListener('click', e => setColor(e, 0));
document.getElementById('btnGreen').addEventListener('click', e => setColor(e, 1));
document.getElementById('btnOrange').addEventListener('click', e => setColor(e, 2));
document.getElementById('btnPurple').addEventListener('click', e => setColor(e, 3));
document.getElementById('btnRed').addEventListener('click', e => setColor(e, 4));
document.getElementById('btnYellow').addEventListener('click', e => setColor(e, 5));

function setColor(e, color) {
  console.log(`Click: ${e.target.id}, Color: ${color}`);

  var ipAddress = localStorage.getItem(ipAddressKey);
  console.log('IP Address: ' + ipAddress);
  if (ipAddress == null || ipAddress == "") {
    Swal.fire({
      title: 'Missing IP Address',
      text: 'Please enter the IP Address of your device in the configuration section before clicking buttons.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://" + + "/setColor?color=" + color, true);
  xhr.send();
  // TODO: display a toast on success
  // TODO: show an error dialog on, you know, error
}