// reveal button to return to top of page
document.addEventListener("DOMContentLoaded", function() {
  let rtt = document.getElementById("return-to-top");    
  window.onscroll = function() {    
  if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
    rtt.style.opacity = 1;
  } else { rtt.style.opacity = 0;}}
});

// copy text to clipboard and show message confirming copy
async function copyToClipboard() {
  const divContent = document.getElementById("codeOutput").innerText;
  try {
      await navigator.clipboard.writeText(divContent);
      const copiedText = document.getElementById('copiedText');
      copiedText.classList.remove('hidden'); 
      copiedText.classList.add('show');
      setTimeout(() => {
        copiedText.classList.remove('show');
        copiedText.classList.add('hidden');
      }, 2000);
  } catch (err) {
      console.error('Failed to copy text: ', err);
  }
}

// check a filename includes a image extension
function isImageFileName(filename) {
  var validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];
  
  for (var i = 0; i < validExtensions.length; i++) {
    if (filename.toLowerCase().endsWith(validExtensions[i])) {
      return true;
    }
  }  
  return false;
}; 