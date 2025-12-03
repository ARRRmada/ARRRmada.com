let currentTag = null;

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
          merchantDiv.style.display = '';
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
      merchantDiv.style.display = '';
  });
  if (currentTag) {
    document.getElementById(currentTag).classList.remove('selected');
  }
  currentTag = null;
  document.getElementById('current_tag').innerText = "All";
  
  // Clear search
  document.getElementById('merchant-search').value = '';
  updateSearchInfo(allMerchants.length, allMerchants.length, '');
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

// Search functionality
function searchMerchants() {
  const searchInput = document.getElementById('merchant-search').value.toLowerCase();
  const allMerchants = document.querySelectorAll('div[data-tags]');
  let visibleCount = 0;
  let totalCount = allMerchants.length;

  allMerchants.forEach(function(merchantDiv) {
    // Get merchant name and description
    const merchantName = merchantDiv.querySelector('h2').textContent.toLowerCase();
    const merchantDesc = merchantDiv.querySelector('.merchant-description').textContent.toLowerCase();
    
    // Check if search matches name or description
    const matchesSearch = merchantName.includes(searchInput) || merchantDesc.includes(searchInput);
    
    // Check if matches current tag filter (if any)
    let matchesTag = true;
    if (currentTag) {
      const tags = merchantDiv.getAttribute('data-tags').split(',');
      matchesTag = tags.includes(currentTag);
    }
    
    // Show only if both conditions are met
    if (matchesSearch && matchesTag) {
      merchantDiv.style.display = '';
      visibleCount++;
    } else {
      merchantDiv.style.display = 'none';
    }
  });

  // Update search results info
  updateSearchInfo(visibleCount, totalCount, searchInput);
}

// Update search results counter
function updateSearchInfo(visible, total, searchTerm) {
  const infoDiv = document.getElementById('search-results-info');
  
  if (searchTerm === '') {
    infoDiv.innerHTML = '';
  } else if (visible === 0) {
    infoDiv.innerHTML = '❌ No merchants found for "' + searchTerm + '"';
    infoDiv.style.color = '#ff6b35';
  } else if (visible === total) {
    infoDiv.innerHTML = '✅ Showing all ' + visible + ' merchants';
    infoDiv.style.color = '#4ade80';
  } else {
    infoDiv.innerHTML = '📋 Showing ' + visible + ' of ' + total + ' merchants';
    infoDiv.style.color = '#4ade80';
  }
}

// Status Filter Function
let currentStatusFilter = 'all';

function filterByStatus(status) {
  currentStatusFilter = status;
  
  // Update button states
  document.querySelectorAll('.status-filter').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.status === status) {
      btn.classList.add('active');
    }
  });
  
  // Apply filter
  applyFilters();
}

function applyFilters() {
  const merchantBoxes = document.querySelectorAll('.merchant-box');
  
  merchantBoxes.forEach(box => {
    const merchantStatus = box.dataset.status || 'active';
    let showByStatus = true;
    
    // Status filter logic
    if (currentStatusFilter === 'active') {
      showByStatus = merchantStatus === 'active';
    } else if (currentStatusFilter === 'issues') {
      showByStatus = merchantStatus === 'warning' || merchantStatus === 'inactive';
    }
    
    // Check if merchant is visible by tag filter
    const isVisibleByTag = box.style.display !== 'none';
    
    // Show only if both filters pass
    if (showByStatus && isVisibleByTag) {
      box.style.display = '';
    } else if (!showByStatus) {
      box.style.display = 'none';
    }
  });
}

// Update existing filter functions to work with status filter
const originalFilterByTag = window.filterByTag;
window.filterByTag = function(tagId, tagName) {
  originalFilterByTag(tagId, tagName);
  applyFilters();
};

const originalShowAll = window.showAll;
window.showAll = function() {
  originalShowAll();
  applyFilters();
};