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

// Makes the site brighter for darker displays or bright rooms.

function toggleStyle() {
  document.body.classList.toggle('brighten');
}

document.addEventListener("keydown", e => { if (e.shiftKey && e.code === 'KeyL') toggleStyle(); });
document.addEventListener("click", e => { 
  if (e.target.closest('.light-mode')) { 
    toggleStyle(); 
    document.querySelectorAll('.light-mode').forEach(el => el.classList.toggle('lights-on'));
  }
});

// Hide/show menu

let isMenuTopRounded = true;

document.addEventListener('click', function(event) {
  if (event.target.id === 'openCloseBtn') {
    document.querySelectorAll('.menu').forEach(menu => {
      menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'flex' : 'none';
    });
    
    let menuTop = document.querySelector('.menu-top');
    if (isMenuTopRounded) {
      menuTop.style.borderRadius = '0';
    } else {
      menuTop.style.borderRadius = '0 0.3rem 0.3rem 0';
    }
    isMenuTopRounded = !isMenuTopRounded;
  }
});

// Add no follow tag if the site is not arrrmada.com, to stop it being counted as duplicate content.

(function() {
    var allowedDomain = 'arrrmada.com';

    function checkAndUpdateMeta() {
        var currentDomain = window.location.hostname;
        if (!currentDomain.endsWith(allowedDomain)) {
            var metaTag = document.querySelector('meta[name="robots"]');
            if (metaTag) {
                metaTag.setAttribute('content', 'noindex, nofollow');
            } else {
                metaTag = document.createElement('meta');
                metaTag.name = "robots";
                metaTag.content = "noindex, nofollow";
                document.head.appendChild(metaTag);
            }
        }
    }
    checkAndUpdateMeta();
    var observer = new MutationObserver(checkAndUpdateMeta);
    observer.observe(document.head, { childList: true });
})();


// Mockup alert untill buttons are working.

window.onload = function() {
  const lastAlertTime = localStorage.getItem("lastAlertTime");
  const currentTime = new Date().getTime();
  const timeInterval = 60 * 60 * 1000; 

  if (lastAlertTime === null || currentTime - lastAlertTime >= timeInterval) {
    setTimeout(function() {
      alert("NEW FEATURES\n\nPress Shift + L to lighten the theme\n\nJS lazy load removed in favour of native lazy load, which is faster and means there's no JS, making it easier for the community to manage\n\nCaution: Some pages are in transition and as such, aren't fully responsive atm.");
      localStorage.setItem("lastAlertTime", currentTime);
    }, 1000);
  }
};
