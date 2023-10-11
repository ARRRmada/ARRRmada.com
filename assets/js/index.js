// highlight the selected tag
function updateCurrent(tagId, tagName) {
  // Remove 'selected' class from previous tag button, if any
  if (currentTag) {
    document.getElementById(currentTag).classList.remove('selected');
  }

  // Add 'selected' class to current tag button
  document.getElementById(tagId).classList.add('selected');

  // Update currentTag variable
  currentTag = tagId;

  let current_tag = document.getElementById('current_tag');
  current_tag.innerText = tagName;
}

// show only merchants with the selected tag
function filterByTag(tagId, tagName) {
  var allMerchants = document.querySelectorAll('div[data-tags]');
  allMerchants.forEach(function(merchantDiv) {
      var tags = merchantDiv.getAttribute('data-tags').split(',');
      if (tags.includes(tagId)) {
          merchantDiv.style.display = 'inline-block';
      } else {
          merchantDiv.style.display = 'none';
      }
  });
  updateCurrent(tagId, tagName);
}

// show all merchant listings
function showAll() {
  var allMerchants = document.querySelectorAll('div[data-tags]');
  allMerchants.forEach(function(merchantDiv) {
      merchantDiv.style.display = 'inline-block';
  });
  document.getElementById(currentTag).classList.remove('selected');
  document.getElementById('current_tag').innerText = "All";
}

// Define the end count number
let endCount;
// Initial count
let count = 0;

// Get the element
let countElement;

// The function to increment the count
const incrementCount = () => {
  count++;
  countElement.innerText = count;

  // If count has not reached the end count, continue incrementing
  if (count < endCount) {
    requestAnimationFrame(incrementCount);
  }
};

// Function to check if an element is in view
const isScrolledIntoView = (el) => {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;

  // Only completely visible elements return true
  const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  return isVisible;
}

// Event listener for DOM content load event
document.addEventListener('DOMContentLoaded', () => {
  countElement = document.getElementById('merchantCount');
  if (countElement) {
    endCount = parseInt(countElement.textContent);

    // Event listener for scroll event
    window.addEventListener('scroll', () => {
      // If the element is in view and count has not yet started, start the count
      if (isScrolledIntoView(countElement) && count === 0) {
        incrementCount();
      }
    });
  }
});
