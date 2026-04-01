// Variables
let fuse;
let searchData = [];
let selectedIndex = -1;
let results = [];

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeSearch();
  setupModalEvents();
});

// Load search data
async function initializeSearch() {
  try {
    const response = await fetch("/index.json");
    searchData = await response.json();

    const options = {
      keys: ["title", "content"],
      threshold: 0.3,
      includeScore: true,
    };

    fuse = new Fuse(searchData, options);
  } catch (error) {
    console.error("Search data loading error:", error);
  }
}

// Setup events
function setupModalEvents() {
  const modal = document.getElementById("search-modal");
  const searchToggle = document.getElementById("search-toggle");
  const searchClose = document.getElementById("search-close");
  const searchInput = document.getElementById("search-input");
  const overlay = document.querySelector(".search-modal-overlay");

  // Open modal
  searchToggle?.addEventListener("click", openModal);

  // Close modal
  searchClose?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", closeModal);

  // Keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Cmd+K or Ctrl+K to open
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      openModal();
      return;
    }

    // ESC to close
    if (e.key === "Escape") {
      closeModal();
      return;
    }

    // Arrow navigation (only when modal is open)
    if (modal.style.display === "flex") {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        navigateResults(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        navigateResults(-1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        selectResult();
      }
    }
  });

  // Search on input
  searchInput?.addEventListener("input", performSearch);
}

function openModal() {
  const modal = document.getElementById("search-modal");
  const searchInput = document.getElementById("search-input");

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    searchInput?.focus();
  }, 100);
}

function closeModal() {
  const modal = document.getElementById("search-modal");
  const searchInput = document.getElementById("search-input");
  const resultsDiv = document.getElementById("search-results");

  modal.style.display = "none";
  document.body.style.overflow = "";

  // Reset
  searchInput.value = "";
  resultsDiv.innerHTML = "";
  selectedIndex = -1;
  results = [];
}

function performSearch() {
  const query = document.getElementById("search-input").value;
  const resultsDiv = document.getElementById("search-results");

  selectedIndex = -1; // Reset selection

  if (!query || !fuse) {
    resultsDiv.innerHTML = "";
    results = [];
    return;
  }

  const searchResults = fuse.search(query);
  results = searchResults.slice(0, 8); // Limit to 8 results

  if (results.length === 0) {
    resultsDiv.innerHTML = '<div class="no-results">No results found</div>';
    return;
  }

  // Display results
  const html = results
    .map((result, index) => {
      const item = result.item;
      return `
            <div class="search-result-item" data-index="${index}">
                <a href="${item.permalink}" class="search-result-title">${item.title}</a>
            </div>
        `;
    })
    .join("");

  resultsDiv.innerHTML = html;

  // Add click events
  resultsDiv.querySelectorAll(".search-result-item").forEach((item, index) => {
    item.addEventListener("click", () => {
      window.location.href = results[index].item.permalink;
    });
  });
}

function navigateResults(direction) {
  if (results.length === 0) return;

  // Remove previous selection
  const previousSelected = document.querySelector(
    ".search-result-item.selected",
  );
  if (previousSelected) {
    previousSelected.classList.remove("selected");
  }

  // Update index
  selectedIndex += direction;

  // Wrap around
  if (selectedIndex >= results.length) {
    selectedIndex = 0;
  } else if (selectedIndex < 0) {
    selectedIndex = results.length - 1;
  }

  // Add new selection
  const newSelected = document.querySelector(`[data-index="${selectedIndex}"]`);
  if (newSelected) {
    newSelected.classList.add("selected");
    newSelected.scrollIntoView({ block: "nearest" });
  }
}

function selectResult() {
  if (selectedIndex >= 0 && selectedIndex < results.length) {
    window.location.href = results[selectedIndex].item.permalink;
  }
}
