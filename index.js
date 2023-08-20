const continueStr = 'Continue';
const errorIcon = 'error';
const hostAddressKey = "hostAddress";
const successIcon = 'success';

// const headers = new Headers();
// headers.append('Accept', 'application/json');
// headers.append('Access-Control-Allow-Origin', '*');
// headers.append('Access-Control-Allow-Headers', '*');
const fetchOptions = { mode: "cors", headers: { accept: "*/*" } };


document.getElementById(hostAddressKey).value = localStorage.getItem(hostAddressKey);

let ipForm = document.getElementById("ipForm");
ipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var hostAddress = document.getElementById(hostAddressKey).value.trim();
  console.log(`Storing IP address: ${hostAddress}`);
  localStorage.setItem(hostAddressKey, hostAddress)
  Swal.fire({ title: 'Address Saved', toast: true, timer: 500, position: 'top' });
});


document.getElementById('btnLightning').addEventListener('click', function (e) {
  // Send the `lightning` command to remote device
  console.log(`Click: ${e.target.id}`);
  execCmd('lightning');
});

document.getElementById('btnFlash').addEventListener('click', function (e) {
  // Send the `flash` command to remote device
  console.log(`Click: ${e.target.id}`);
  let color = document.getElementById('flashColor').value;
  let count = document.getElementById('flashCount').value;
  execCmd(`flash:${color}:${count}`);
});

document.getElementById('btnOff').addEventListener('click', function (e) {
  // Send the `off` command to remote device
  console.log(`Click: ${e.target.id}`);
  execCmd('off');
});

document.getElementById('btnRandom').addEventListener('click', function (e) {
  // Send the `random` command to remote device
  console.log(`Click: ${e.target.id}`);
  execCmd(`random`);
});

// colors[] = { CRGB::Blue, CRGB::Green, CRGB::Orange, CRGB::Purple, CRGB::Red, CRGB::Yellow };
document.getElementById('btnBlue').addEventListener('click', e => setColor(e, 0));
document.getElementById('btnGreen').addEventListener('click', e => setColor(e, 1));
document.getElementById('btnOrange').addEventListener('click', e => setColor(e, 2));
document.getElementById('btnPurple').addEventListener('click', e => setColor(e, 3));
document.getElementById('btnRed').addEventListener('click', e => setColor(e, 4));
document.getElementById('btnYellow').addEventListener('click', e => setColor(e, 5));

function setColor(e, colorIdx) {
  console.log(`Click: ${e.target.id}, Color: ${colorIdx}`);
  execCmd(`color:${colorIdx}`);
}

async function execCmd(cmdStr) {

  var ipAddress = localStorage.getItem(hostAddressKey);
  if (ipAddress == null || ipAddress == "") {
    console.error('Missing IP Address');
    Swal.fire({
      title: 'Missing IP Address',
      text: 'Please enter the IP Address of your device in the configuration section before clicking buttons.',
      icon: errorIcon,
      confirmButtonText: continueStr
    });
    return;
  }

  let theURL = `http://${ipAddress}/${cmdStr}`;
  console.log(`Executing: ${theURL}`);

  try {
    const response = await fetch(theURL, fetchOptions);
    response.json()
      .then(json => {
        if (response.status == 200) {
          Swal.fire({
            text: 'Successfully executed command',
            toast: true,
            timer: 1500,
            position: 'top',
            icon: successIcon
          });
        } else {
          console.log(`HTTP error: ${response.status}`);
          Swal.fire({ text: `HTTP error: ${response.status}`, icon: errorIcon, confirmButtonText: continueStr });
        }
      });
  } catch (err) {
    console.dir(err);
    console.log(err.message);
    if (err instanceof SyntaxError) {
      Swal.fire({ text: err, icon: errorIcon, confirmButtonText: continueStr });
    } else {
      Swal.fire({ text: err.message, icon: errorIcon, confirmButtonText: continueStr });
    }
  }
}