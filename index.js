const continueStr = 'Continue';
const ipAddressKey = "ipAddress";
const errorIcon = 'error';
const successIcon = 'success';

const headers = new Headers();
// headers.append('Accept', 'application/json');
headers.append('Accept', '*/*');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Headers', '*');
// const fetchOptions = { mode: "no-cors", headers };
const fetchOptions = { mode: "cors", headers };

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
  execCmd(`lightning:${document.getElementById('lightningCount').value}`);
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

  var ipAddress = localStorage.getItem(ipAddressKey);
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
    // console.dir(response);
    response.json()
      .then(json => {
        console.dir(json);
        if (response.ok) {
          console.dir(json);
          Swal.fire({
            text: 'Successfully changed color',
            toast: true,
            position: 'top-right',
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