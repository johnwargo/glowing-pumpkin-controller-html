const continueStr = 'Continue';
const ipAddressKey = "ipAddress";
const errorIcon = 'error';
const successIcon = 'success';

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
  execCmd(`color:${color}:${count}`);
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

  const options = {
    mode: "no-cors",
    headers: { 'Access-Control-Allow-Origin': '*' }
  }


  let json;
  try {
    const response = await fetch(theURL, options);
    json = await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      console.log('There was a SyntaxError', error);
      Swal.fire({
        title: 'Syntax Error',
        text: 'Perhaps an unexpected token in JSON response',
        icon: errorIcon,
        confirmButtonText: continueStr
      });
    } else {
      console.log('There was an error', error);
      Swal.fire({
        text: error.message,
        icon: errorIcon,
        confirmButtonText: continueStr
      });
    }
    return;
  }

  if (json) {
    console.log('Use the JSON here!', json);
    Swal.fire({
      text: 'Successfully changed color',
      toast: true,
      position: 'top-right',
      icon: successIcon
    });
  }

  // let response;
  // try {
  //   response = await fetch(theURL, options);
  // } catch (error) {
  //   console.log('There was an error: \n', error);
  // }
  // if (response?.ok) {
  //   console.log('Use the response here!');
  // } else {
  //   console.log(`HTTP Response Code: ${response?.status}`)
  // }


  // fetch(theURL, options)
  //   .then(response => {
  //     console.log('then');
  //     console.dir(response);
  //     response.json().then(data => {
  //       console.dir(data);
  //     });
  //     if (response.status == 200) {
  //       Swal.fire({
  //         // title: 'Success',
  //         text: 'Successfully changed color',
  //         toast: true,
  //         position: 'top-right',
  //         icon: 'success'
  //       });
  //     } else {
  //       Swal.fire({
  //         // title: 'Fetch Error',
  //         text: response.message,
  //         icon: 'error',
  //         confirmButtonText: 'Continue'
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     console.log('catch');
  //     console.error(err);
  //     Swal.fire({
  //       // title: 'Fetch Error',
  //       text: err.message,
  //       icon: 'error',
  //       confirmButtonText: 'Continue'
  //     });
  //   });
}