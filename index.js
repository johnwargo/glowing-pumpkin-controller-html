const ipAddressKey = "ipAddress";

document.getElementById(ipAddressKey).value = localStorage.getItem(ipAddressKey);

let ipForm = document.getElementById("ipForm");
ipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var ipAddress = document.getElementById(ipAddressKey).value.trim();
  console.log(`Storing IP address: ${ipAddress}`);
  localStorage.setItem(ipAddressKey, ipAddress);
});


document.getElementById('btnLightning').addEventListener('click', function (e) {
  // Send the `lightning` command to remote device
  console.log(`Click: ${e.target.id}`);
});

document.getElementById('btnFlash').addEventListener('click', function (e) {
  // Send the `flash` command to remote device
  console.log(`Click: ${e.target.id}`);
});

document.getElementById('btnOff').addEventListener('click', function (e) {
  // Send the `off` command to remote device
  console.log(`Click: ${e.target.id}`);
});

document.getElementById('btnRandom').addEventListener('click', function (e) {
  // Send the `random` command to remote device
  console.log(`Click: ${e.target.id}`);
});

// colors[] = { CRGB::Blue, CRGB::Green, CRGB::Orange, CRGB::Purple, CRGB::Red, CRGB::Yellow };
document.getElementById('btnBlue').addEventListener('click', e => setColor(e, 0));
document.getElementById('btnGreen').addEventListener('click', e => setColor(e, 1));
document.getElementById('btnOrange').addEventListener('click', e => setColor(e, 2));
document.getElementById('btnPurple').addEventListener('click', e => setColor(e, 3));
document.getElementById('btnRed').addEventListener('click', e => setColor(e, 4));
document.getElementById('btnYellow').addEventListener('click', e => setColor(e, 5));

async function setColor(e, color) {
  console.log(`Click: ${e.target.id}, Color: ${color}`);

  var ipAddress = localStorage.getItem(ipAddressKey);
  if (ipAddress == null || ipAddress == "") {
    console.error('Missing IP Address');
    Swal.fire({
      title: 'Missing IP Address',
      text: 'Please enter the IP Address of your device in the configuration section before clicking buttons.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  const options = {
    mode: "no-cors",
    headers: { 'Access-Control-Allow-Origin': '*' }
  }

  const response = await fetch(`http://${ipAddress}/color:${color}`, options)
    .catch(error => {
      Swal.fire({
        title: 'Fetch Error', text: error.message, icon: 'error', confirmButtonText: 'Continue'
      });
      return;
    });

  console.dir(response);
  let data = await response.json();
  console.dir(data);

  // .then(data => {
  //   console.dir(data);
  // if (response.status == 200) {
  //   Swal.fire({
  //     title: 'Success', text: 'Successfully changed color', toast: true, position: 'top-right', icon: 'success'
  //   });
  // } else {
  //   Swal.fire({
  //     title: 'Fetch Error', text: response.message, icon: 'error', confirmButtonText: 'Continue'
  //   });
  // }
  // });

}