// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {

  const jsonFilePath = './data/manuals.json';

  let data = {};
  let openTable = null;
  let openHeader = null;
  let openArrow = null;


  const dropdownContainer = document.querySelector(".dropdown-container");

  // Validate that required DOM elements exist
  if (!dropdownContainer) {
    console.error("Error: dropdown-container element not found!");
    return;
  }


  initializeManuals();


  /*
   * Initialize the manuals page by fetching data and creating the interface
   */
  function initializeManuals() {
    fetch(jsonFilePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(fetchedData => {
        data = fetchedData;

        // Remove loading message once data is loaded
        const loadingMessage = dropdownContainer.querySelector('.loading-message');
        if (loadingMessage) {
          loadingMessage.remove();
        }

        // Create the dropdown sections
        createDropdownSections();
      })
      .catch(error => {
        console.error("Error fetching manuals data:", error);
        showErrorMessage("Failed to load product manuals. Please try again later.");
      });
  }


  /*
   * Create dropdown sections for each category in the data
   */
  function createDropdownSections() {
    Object.keys(data).forEach(category => {
      const dropdown = document.createElement("div");
      dropdown.classList.add("dropdown");

      // Create header and table elements
      const dropdownHeader = createDropdownHeader(category);
      const table = createDropdownTable();

      // Assemble the dropdown
      dropdown.appendChild(dropdownHeader);
      dropdown.appendChild(table);

      // Add toggle functionality
      addDropdownToggleListener(dropdownHeader, table, category);

      dropdownContainer.appendChild(dropdown);
    });
  }



  function createDropdownHeader(category) {
    const dropdownHeader = document.createElement("div");
    dropdownHeader.classList.add("dropdown-header");

    // Category title
    const titleElement = document.createElement("p");
    titleElement.textContent = category;
    dropdownHeader.appendChild(titleElement);

    // Dropdown arrow indicator
    const arrowImg = document.createElement("img");
    arrowImg.src = "./assets/images/arrow.png";
    arrowImg.alt = "Dropdown arrow";
    arrowImg.width = 20;
    arrowImg.height = 20;
    arrowImg.classList.add("dropdown-arrow");
    dropdownHeader.appendChild(arrowImg);

    return dropdownHeader;
  }


  function createDropdownTable() {
    const table = document.createElement("table");
    table.classList.add("dropdown-table");
    table.style.display = "none"; // Initially hidden
    return table;
  }



  function addDropdownToggleListener(header, table, category) {
    const arrowImg = header.querySelector('.dropdown-arrow');

    header.addEventListener("click", function () {
      const isCurrentlyOpen = table.style.display !== "none";

      // Close any other open dropdown first
      if (openTable && openTable !== table) {
        closeOpenDropdown();
      }

      // Toggle current dropdown
      if (isCurrentlyOpen) {
        closeDropdown(table, header, arrowImg);
      } else {
        openDropdown(table, category);
        setActiveDropdown(header, table, arrowImg);
      }
    });
  }


  /*
   * Close the currently open dropdown if one exists
   */
  function closeOpenDropdown() {
    if (openTable && openTable.style.display !== "none") {
      closeDropdown(openTable, openHeader, openArrow);
    }
  }

  /*
   * Set the active dropdown and update global state variables
   */
  function setActiveDropdown(header, table, arrow) {
    openTable = table;
    openHeader = header;
    openArrow = arrow;

    // Add active styling
    header.classList.add("active-header");
    arrow.classList.add("rotate");
  }

  /*
   * Close a specific dropdown and update state
   */
  function closeDropdown(table, header, arrow) {
    table.style.display = "none";
    header.classList.remove("active-header");
    arrow.classList.remove("rotate");

    // Clear global state if this was the open dropdown
    if (openTable === table) {
      openTable = null;
      openHeader = null;
      openArrow = null;
    }
  }

  /*
   * Open a dropdown and populate it with data
   */
  function openDropdown(table, category) {
    // Clear existing content
    table.innerHTML = "";

    // Check if category has files
    if (!data[category] || data[category].length === 0) {
      displayNoFilesMessage(table);
      table.style.display = "table";
      return;
    }

    // Create table structure
    createTableHeader(table);

    // Add file rows
    data[category].forEach(filename => {
      createFileRow(table, filename);
    });

    // Show the table
    table.style.display = "table";
  }


  /*
   * Display a message when no files are available for a category
   */
  function displayNoFilesMessage(table) {
    const noDataRow = document.createElement("tr");
    const noDataCell = document.createElement("td");
    noDataCell.colSpan = 2;
    noDataCell.textContent = "No manuals available for this category.";
    noDataCell.classList.add("no-data-cell");
    noDataRow.appendChild(noDataCell);
    table.appendChild(noDataRow);
  }

  /*
   * Create the table header with column titles
   */
  function createTableHeader(table) {
    const headerRow = document.createElement("tr");
    headerRow.classList.add("table-header");

    // Manual name column header
    const fileNameHeader = document.createElement("th");
    fileNameHeader.textContent = "Manual Name";

    // Download column header
    const downloadHeader = document.createElement("th");
    downloadHeader.textContent = "Download";

    // Assemble header row
    headerRow.appendChild(fileNameHeader);
    headerRow.appendChild(downloadHeader);
    table.appendChild(headerRow);
  }

  /*
   * Create a table row for a manual file
   */
  function createFileRow(table, filename) {
    const row = document.createElement("tr");

    // File name cell
    const nameCell = document.createElement("td");
    nameCell.textContent = filename;
    nameCell.classList.add("file-name-cell");

    // Download button cell
    const downloadCell = document.createElement("td");
    const downloadButton = createDownloadButton(filename);
    downloadCell.appendChild(downloadButton);
    downloadCell.classList.add("download-cell");

    // Assemble row
    row.appendChild(nameCell);
    row.appendChild(downloadCell);
    table.appendChild(row);
  }


  /*
   * Create a download button for a manual file
   */
  function createDownloadButton(filename) {
    const downloadButton = document.createElement("a");
    downloadButton.textContent = "Download";
    downloadButton.href = `./assets/manuals/${filename}`;
    downloadButton.setAttribute("download", filename);
    downloadButton.classList.add("download-btn");
    downloadButton.title = `Download ${filename}`;

    return downloadButton;
  }


  /*
   * Display an error message to the user
   */
  function showErrorMessage(message) {
    dropdownContainer.innerHTML = `
      <div class="error-message">
        <p>${message}</p>
      </div>
    `;
  }
});