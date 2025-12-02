/* 
Birthday Paradox for 10,000 merchants
In binary strings:
sqrt(2^n) = 10000 * 10^6
2^n = (10000 * 10^6)^2
n = log2((10000 * 10^6)^2)
n = 2 * log2(10000 * 10^6)
n = 2 * (23.25)  (approximately)
n = 47 (rounded up)
alphanumeric carries log2(62) = 5.95 bits of information, 
so we only need strings of length 47/5.95 = 8 (rounded up)
for the probability of a collision among 10,000 merchants
to be less than 1 in a million. */

function generateID() {
    var length = 8;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
function updateMerchantURL() {
  var msg = document.getElementById('urlMessage');
  var url = document.getElementById("merchantURLInput").value;
  var linkElement = document.getElementById('merchant_url');
  
  if (url.trim() === '') {
    // Wenn leer, zeige Platzhalter
    linkElement.href = '#';
    linkElement.innerText = 'URL will appear here...';
    linkElement.style.color = '#888';
    msg.innerHTML = '';
    return;
  }
  
  try {
    new URL(url);
    linkElement.href = url;
    linkElement.innerText = url;
    linkElement.style.color = '#ff6b35';
    msg.innerHTML = '✅ Valid URL';
    msg.style.color = 'lime';
  } catch (e) {    
    linkElement.href = '#';
    linkElement.innerText = url + ' (invalid URL)';
    linkElement.style.color = 'red';
    msg.innerText = 'Please enter a full, valid URL (e.g., https://www.pirate.black)';
    msg.style.color = 'red';
  }
}
  
  function updateMerchantImage() {
    var input = document.getElementById("merchantImageInput");
    var img = document.getElementById("merchant_img");
  
    if (input.files && input.files[0]) {
      var filename = input.files[0].name;
      var msg = document.getElementById('uploadMessage');
  
      // Check if the uploaded file is an image
      if (!isImageFileName(filename)) {
        msg.innerText = 'Please upload an image file (jpeg, jpg, png, gif, svg, or webp)';
        return;
      }
      msg.innerText = '';
  
      var reader = new FileReader();
  
      reader.onload = function (e) {
        img.src = e.target.result;
      }
  
      reader.readAsDataURL(input.files[0]);
  
      var fileName = input.files[0].name;
      document.getElementById("merchant_image_filename").value = fileName;
    }
  }
  
  function updateCharacterCount(inputId, countId) {
    var input = document.getElementById(inputId);
    var count = input.value.length;
    var countId = document.getElementById(countId);
    var maxLength = input.getAttribute('maxlength');
    countId.innerText = count + '/' + maxLength;
    if (count >= maxLength) {
      countId.classList.add("red-font");
    } else {
      countId.classList.remove("red-font");
    };
  }
  
  var selectedTags = [];
  var maxTags = 6;
  
  function updateTagSelection() {
    // Get all tag checkboxes
    var tagInputs = document.querySelectorAll('#tagsInput input[type="checkbox"]');
    selectedTags = []; // Reset selected tags
  
    // Loop over checkboxes and update selectedTags
    tagInputs.forEach(function(input) {
      if (input.checked) {
        selectedTags.push({id: input.dataset.id, name: input.dataset.name});
      }
    });
  
    // Update tag selection count
    document.getElementById('tagSelectionCount').innerText = selectedTags.length + '/6';
  
    // If max tags are selected, disable other checkboxes
    if (selectedTags.length >= maxTags) {
      document.getElementById('tagSelectionCount').classList.add("red-font");
      tagInputs.forEach(function(input) {
        if (!input.checked) {
          input.disabled = true;
        }
      });
    } else {
      // If fewer than max tags are selected, enable all checkboxes
      document.getElementById('tagSelectionCount').classList.remove("red-font");
      tagInputs.forEach(function(input) {
        input.disabled = false;
      });
    }
  
    // Update tags on the page
    updateTags();
  }
  
  function updateTags() {
    // Get merchant_tags element
    var merchantTags = document.getElementById('merchant_tags');
    if (merchantTags) { // Check if element exists
      merchantTags.innerHTML = ''; // Reset tag elements
  
      // Append a tag link for each selected tag
      selectedTags.forEach(function(tag) {
        var a = document.createElement('span');
        a.href = '';
        a.className = 'tag-btn';
        a.dataset.tagId = tag.id;
        a.innerText = tag.name;
  
        merchantTags.appendChild(a);
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', (event) => {
    // Only add event listener if element exists
    var merchantNameInput = document.getElementById('merchantNameInput');
    var merchantName = document.getElementById('merchant_name');
    if (merchantNameInput && merchantName) {
      merchantNameInput.addEventListener('input', function(e) {
        merchantName.innerText = e.target.value;
      });
    }
  
    // Merchant Description Input
    var merchantDescInput = document.getElementById('merchantDescInput');
    if (merchantDescInput) {
      // Prevent newline characters from being entered
      merchantDescInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      });
  
      merchantDescInput.addEventListener('input', function(e) {
        var merchantDesc = document.getElementById('merchant_description');
        if (merchantDesc) {
          merchantDesc.innerText = e.target.value;
        }
        updateCharacterCount('merchantDescInput', 'descCharCount');
      });
    }
  
    var merchantImageInput = document.getElementById('merchantImageInput');
    if (merchantImageInput) {
      merchantImageInput.addEventListener('change', function(e) {
      });
    }
  
    var tagInputs = document.querySelectorAll('#tagsInput input[type="checkbox"]');
    if (tagInputs.length > 0) {
      tagInputs.forEach(function(input) {
        input.addEventListener('change', function(e) {
          updateTagSelection(); 
        });
      });
    }
  });
  
  function escapeHTML(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;")
         .replace(/\//g, "&#x2F;");
  }
  
  function isValidURL(str) {
    let url;
    
    try {
      url = new URL(str);
    } catch (_) {
      return false;  
    }
    
    return url.protocol === "http:" || url.protocol === "https:";
  }

  function validateFields(name, description, url, filename, tags) {
    let errorMessages = [];
    
    let nameMaxLength = document.getElementById('merchantNameInput').maxLength;
    if (!name) {
      errorMessages.push('Please enter a merchant name.');
    } else if (name.length > nameMaxLength) {
      errorMessages.push(`The merchant name should not exceed ${nameMaxLength} characters.`);
    }
  
    let descMaxLength = document.getElementById('merchantDescInput').maxLength;
    if (!description) {
      errorMessages.push('Please enter a merchant description.');
    } else if (description.length > descMaxLength) {
      errorMessages.push(`The description should not exceed ${descMaxLength} characters.`);
    }
    
    if (!url) {
      errorMessages.push('Please enter a URL linking to your website.');
    } else if (!isValidURL(url)) {
      errorMessages.push('Please enter a valid URL. (e.g., https://pirate.black)');
    }
    
    if (!filename) {
      errorMessages.push('Please upload an image file.');
    } else if (!isImageFileName(filename)) {
      errorMessages.push('Must be an image file (jpg, jpeg, png, gif, bmp, svg, webp)');
    }
    
    if (!tags || tags.length < 1 || tags.length > 6) {
      errorMessages.push('Select between 1 and 6 tags.');
    }
  
    return errorMessages;
  }  
  
  function updateSubmitButton(encodedData, name) {
    var submitListing = document.getElementById('submit_listing');
    var href = submitListing.getAttribute('href');
    var url = new URL(href, window.location.origin); 
  
    // Update or add 'title' and 'listing_code' parameters
    url.searchParams.set('title', name);
    url.searchParams.set('listing_code', encodedData);
  
    // Update the href of the submit_listing element
    submitListing.setAttribute('href', url.toString());
  }

  function generateCode() {
    var name = document.getElementById('merchant_name').innerText;
    var description = document.getElementById('merchant_description').innerText;
    var url = document.getElementById('merchant_url').innerText;
    var filename = document.getElementById('merchant_image_filename').value;
    var tags = getActiveTagIds();
  
    let errorMessages = validateFields(name, description, url, filename, tags);
    let errorDiv = document.getElementById('errorMessage');
    if (errorMessages.length > 0) {    
      let errorStatement = errorMessages.length > 1 ? "<h4>Some issues were detected in the listing:</h4>" : "<h4>A issue was found with the listing:</h4>";
      let errorsList = errorMessages.map(message => `<li>${message}</li>`).join('');
      errorDiv.innerHTML = `${errorStatement}<ul>${errorsList}</ul>`;
      return;
    } else {
      errorDiv.innerHTML = '';
    }
   
    var id = generateID();
    name = escapeHTML(name);
    description = escapeHTML(description);
    var data = [id, name, description, filename, url, tags];
   
    var encodedData = encodeData(data);
    var outputDiv = document.getElementById('codeOutput');
    outputDiv.innerText = encodedData;

    // Update the href GET feilds in the form submission button
    updateSubmitButton(encodedData, name);

    document.getElementById('codeOutputContainer').style.display = 'block';
    document.getElementById('submitListing').style.display = 'block';
  }
  
  function encodeData(data) {
    let jsonData = JSON.stringify(data);
    let encodedData = encodeURIComponent(jsonData);
    let base64Data = btoa(encodedData);
    return '---BEGIN CODE---\n' + base64Data + '\n---END CODE---';
  }
  
  function wrapAndIndent(str, width, indent) {
    var lines = [];
    var currentLine = ' '.repeat(indent);
  
    while (str.length > width) {
      var pos = str.substring(0, width).lastIndexOf(' ');
  
      if (pos <= 0) {
        pos = width;
      }
  
      currentLine += str.substring(0, pos).trim();
      lines.push(currentLine);
      currentLine = ' '.repeat(indent);
      str = str.substring(pos);
    }
  
    currentLine += str.trim();
    lines.push(currentLine);
  
    return lines.join('\n');
  }
  
  function createYamlOutput(dataObject) {
    // Replace newline characters with spaces in the description
    var descriptionWithoutNewlines = dataObject.desc.replace(/(\r\n|\n|\r)/gm, " ");
  
    var wrappedDescription = wrapAndIndent(descriptionWithoutNewlines, 70, 4);
  
    var yamlText = `- id: ${dataObject.id}\n` +
      `  name: "${dataObject.name}"\n` +
      `  description: >\n${wrappedDescription}\n` +
      `  image: "${dataObject.img}"\n` +
      `  url: "${dataObject.url}"\n` +
      `  tags: [${dataObject.tags.join(', ')}]\n`;
  
    var preElement = document.createElement('pre');
    preElement.innerHTML = yamlText;
    document.getElementById('codeOutput').innerHTML = '';
    document.getElementById('codeOutput').appendChild(preElement);
    document.getElementById('codeOutputContainer').style.display = 'block';
  }
  
  function checkTagSelection(tagIds) {  
  
    // Iterate over the checkboxes
    var checkboxes = document.querySelectorAll('#tagsInput input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
      var tagId = checkbox.getAttribute('data-id');
  
      // Check the checkbox if its ID is present in tagIds array
      if (tagIds.includes(tagId)) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });
  }
  
  function updateInspectionLinks(url) {
    var tools = {
        "Mozilla Observatory": "https://observatory.mozilla.org/analyze/<URL>",
        "BuiltWith": "https://builtwith.com/<URL>",
        "SSL Labs": "https://www.ssllabs.com/ssltest/analyze.html?d=<URL>&latest",
        "URLvoid": "https://www.urlvoid.com/scan/<URL>/",
        "Site Check": "https://sitecheck.sucuri.net/results/<URL>"  
    }
  
    var linksElement = document.getElementById("links");
    
    // Check if the "links" element exists.
    if (!linksElement) {
        console.error('"links" element does not exist in the DOM');
        return;
    }
    
    // Empty out the existing links.
    linksElement.innerHTML = '';
  
      // Parse the URL and extract just the domain and any subdomains.
      var parsedUrl = new URL(url);
      var cleanedUrl = parsedUrl.hostname;
      
      // Remove 'www.' from the start of the domain, if it exists.
      if (cleanedUrl.startsWith('www.')) {
          cleanedUrl = cleanedUrl.substring(4);
      }
    
    for (var toolName in tools) {
        if (tools.hasOwnProperty(toolName)) {
            // Create a new 'li' element.
            var li = document.createElement("li");
            // Create a new 'a' element.
            var a = document.createElement("a");
            a.textContent = toolName;
            a.title = `Inspect ${cleanedUrl} using ${toolName}`;
            a.href = tools[toolName].replace("<URL>", cleanedUrl);
            a.target = "_blank";
            a.rel = "noopener noreferrer"; // Add security and privacy attributes.
            
            // Append the 'a' element to the 'li' element.
            li.appendChild(a);
            // Append the 'li' element to the 'links' element.
            linksElement.appendChild(li);
        }
    }
  }
  
  function decodeListingCode() {
    var tagsData = JSON.parse(document.getElementById('tagData').value);
    var merchantIds = JSON.parse(document.getElementById('merchantIds').value);
    var data = document.getElementById('codeInput').value.trim();
    data = data.trim();
  
    var codeContent = extractCodeContent(data);
    if (!codeContent) {
      document.getElementById('decodeMsg').innerHTML = "<h4>No code content found.</h4>";
      return;
    }
  
    try {
      var dataObject = decodeData(codeContent);
    } catch (e) {
      console.error(`Error decoding base64Data: ${e}`);
      document.getElementById('decodeMsg').innerHTML = "<h4>Error decoding the input. Please ensure it is correctly formatted.</h4>";
      return;
    }
  
    let errorMessages = validateDecodedFields(dataObject);
    checkMerchantId(merchantIds, dataObject, errorMessages);
  
    let errorDiv = document.getElementById('decodeMsg');
    if (errorMessages.length > 0) {
      let errorStatement = errorMessages.length > 1 ? "<h4>Some issues were detected with the code:</h4>" : "<h4>An issue was found with the code:</h4>";
      let errorsList = errorMessages.map(message => `<li>${message}</li>`).join('');
      errorDiv.innerHTML = `${errorStatement}<ul>${errorsList}</ul>`;
      return;
    } else {  
      errorDiv.innerHTML = '';
      document.getElementById('merchantIDInput').value = dataObject.id;
      document.getElementById('merchantNameInput').value = decodeHTML(dataObject.name);
      document.getElementById('merchantDescInput').innerText = decodeHTML(dataObject.desc);
      document.getElementById('merchantURLInput').value = dataObject.url;     
      document.getElementById('merchantIMGInput').value = dataObject.img;
      
      document.getElementById('merchant_commit_message').innerText = "New Merchant Added: " + decodeHTML(dataObject.name);
      document.getElementById('upload_commit_message').innerText = "Merchant Image Upload: " + decodeHTML(dataObject.name);
  
      checkTagSelection(dataObject.tags);
      document.getElementById('result').style.display = 'block';
      updateCharacterCount('merchantNameInput', 'nameCharCount')
      updateCharacterCount('merchantDescInput', 'descCharCount')
      updateTagSelection();
      updateInspectionLinks(dataObject.url) 
    } 
  
    createYamlOutput(dataObject);
    document.getElementById('result_container').style.display = 'block';
  }
  
  function updateMerchantListing() {
    var id = document.getElementById('merchantIDInput').value
    var name = document.getElementById('merchantNameInput').value;
    var description = document.getElementById('merchantDescInput').value;
    var url = document.getElementById('merchantURLInput').value;
    var filename = document.getElementById('merchantIMGInput').value;
    var tags = getActiveTagIds();
  
    let errorMessages = validateFields(name, description, url, filename, tags);
    let errorDiv = document.getElementById('errorMessage');
    if (errorMessages.length > 0) {    
      let errorStatement = errorMessages.length > 1 ? "<h4>Some issues were detected in the listing:</h4>" : "<h4>A issue was found with the listing:</h4>";
      let errorsList = errorMessages.map(message => `<li>${message}</li>`).join('');
      errorDiv.innerHTML = `${errorStatement}<ul>${errorsList}</ul>`;
      return;
    } else {
      errorDiv.innerHTML = '';
    }
  
    name = escapeHTML(name);
    description = escapeHTML(description);
    var data = [id, name, description, filename, url, tags];
   
    var encodedData = encodeData(data);
    var inputDiv = document.getElementById('codeInput');
    inputDiv.value = encodedData;
  
    decodeListingCode()  
  }  
  
  function extractCodeContent(data) {
    var codeHeaderIndex = data.indexOf("BEGIN CODE");
    var codeFooterIndex = data.lastIndexOf("END CODE");
  
    if (codeHeaderIndex === -1 || codeFooterIndex === -1 || codeHeaderIndex >= codeFooterIndex) {
      return null;
    }
  
    var codeContent = data.substring(codeHeaderIndex + 10, codeFooterIndex).trim();
    codeContent = codeContent.replace(/^---\n?/, '').replace(/---$/, '');
  
    return codeContent;
  }
  function checkMerchantId(merchantIds, dataObject, errorMessages) {
    if (merchantIds.includes(dataObject.id)) {
      errorMessages.push(`The merchant ID ${dataObject.id} already exists.`);
    }
  }  
  
  function decodeHTML(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }  
  
  function validateDecodedFields(data) {
    let errorMessages = [];
  
    // ID check
    if (typeof data.id !== "string" || data.id.length !== 8) {
      errorMessages.push("The ID should be an 8 characters long string.");
    }
    
    // Image filename check
    if (!isImageFileName(data.img)) {
      errorMessages.push("The image file name does not appear to be valid.");
    }
    
    // URL check
    try {
      new URL(data.url);
    } catch (e) {    
      errorMessages.push("The URL does not appear to be valid.");
    }
    
    // Tags check
    if (!Array.isArray(data.tags)) {
      errorMessages.push("Tags should be in an array.");
    }
  
    return errorMessages;
  }
  
  
  function decodeData(data) {
    let strippedData = data.replace('---BEGIN CODE---', '').replace('---END CODE---', '').trim();
    let base64Data = strippedData.replace(/[\r\n]+/g, '');
    let decodedData = atob(base64Data);
    let jsonData = decodeURIComponent(decodedData);  
    let dataArray;

    try {
      dataArray = JSON.parse(jsonData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return;
    }
  
    // Generate an object from the decoded data
    let dataObject = {
      id: dataArray[0],
      name: dataArray[1],
      desc: dataArray[2],
      img: dataArray[3],
      url: dataArray[4],
      tags: dataArray[5]
    };
    return dataObject;
  }

  function getActiveTagIds(tags) {
    // Get all checkbox elements within #tagsInput div
    var checkboxes = document.querySelectorAll('#tagsInput input[type="checkbox"]');
    // Create an empty array for the active tag IDs
    var activeTagIds = [];
    // Iterate through checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
        // If checkbox is checked, add its data-id to activeTagIds
        if (checkboxes[i].checked) {
            activeTagIds.push(checkboxes[i].getAttribute('data-id'));
        }
    }
        // Return the array of active tag IDs
    return activeTagIds;
}

// Live URL update without button click
function liveUpdateURL() {
  updateMerchantURL();
}