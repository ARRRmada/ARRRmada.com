var selectedImageElement = null;
var selectedImage = '';

// cause the utton to indicate it is slected when clicked
window.selectButton = function selectButton(img, image) {
  // Remove the "selected" class from the previously selected image
  if (selectedImageElement) {
    selectedImageElement.classList.remove('selected');
  }
  // Add the "selected" class to the newly selected image
  img.classList.add('selected');
  // Store the selected image element and image name
  selectedImageElement = img;
  selectedImage = image;
}

// validate the donation address at least starts with zs1
// TODO: more extensive address verifiaction 
function validate() {
  var address = document.getElementById('address').value;
  var message = document.getElementById('message');
  if (address.startsWith('zs1')) {
    // Valid address.
    message.textContent = '';
    generateButton(address);
  } else {
    message.textContent = 'Invalid address in STEP 2. Pirate Chain addresses start with the characters zs1...';
  }
}

// produce the code for user to integrate doanaton button into their website
function generateButton(address) {
  if (!selectedImage) {
    document.getElementById('message').textContent = 'Please select an image in STEP 1 first.';
    return;
  }

  // get base url from the head (via liquid)
  var baseUrl = document.getElementById('baseUrl').value;

  // Generate syntax-highlighted code
  var code = `&lt;div <span class="key">class</span>=<span class="value">"donation-container"</span>>\n` +
    `    &lt;a <span class="key">id</span>=<span class="value">"donation-link"</span>\n` +
    `       <span class="key">title</span>=<span class="value">"click to donate ARRR"</span>\n` +
    `       <span class="key">href</span>=<span class="value">"pirate:${address}"</span>&gt;\n` +
    `        &lt;img <span class="key">class</span>=<span class="value">"donation-image"</span>\n` +
    `             <span class="key">alt</span>=<span class="value">"ARRR donation button"</span>\n` +
    `             <span class="key">src</span>=<span class="value">"${window.url}/button/${selectedImage}"</span>\n` +
    `             <span class="key">width</span>=<span class="value">"200px"</span> <span class="key">height</span>=<span class="value">"auto"</span> /&gt;\n` +
    `    &lt;/a&gt;\n` +
    `    &lt;div <span class="key">id</span>=<span class="value">"qrcode-popup"</span>&gt;&lt;/div&gt;\n` +
    `&lt;/div&gt;\n` +
    `&lt;script <span class="key">defer src</span>=<span class="value">"${window.url}/button/donate_arrr.js"</span>&gt;&lt;/script&gt;`;

  var codeBlock = document.getElementById('codeBlock');
  codeBlock.innerHTML = code;

  // display the code block by changing size for the transation effect
  document.getElementById('step4').style.width = "100%";
  document.getElementById('step4').style.height = "400px";
  document.getElementById('step4header').style.opacity = 1;
}
