// Map interface
var map = L.map('map').setView([35.1983, -111.6513], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Arrays to hold the items for every list
let visitItems = [];
let visitDateItems = [];

let packingItems = [];

let stayItems = [];
let stayLocItems = [];

let itinItems = [];
let itinDateItems = [];

let activItems = [];
let activLocItems = [];
let activDateItems = [];

// Function to render items
function renderItems(items, tdList) 
{
    let itemList = '';
    items.forEach((item, index) => 
    {
        itemList += `
            <li class="list-group-item">
                ${item} 
                <button class="btn btn-warning btn-sm float-end edit-btn" data-index="${index}">Edit</button>
                <button class="btn btn-danger btn-sm float-end remove-btn me-2" data-index="${index}">Remove</button>
            </li>
        `;
    });
    tdList.innerHTML = itemList;

    // Click event listeners for remove button
    document.querySelectorAll('.remove-btn').forEach(button => 
    {
        button.addEventListener('click', (event) => 
        {
            const index = event.target.getAttribute('data-index');
            removeItem(index, items, tdList);
        });
    });

    // Click event listeners for edit button
    document.querySelectorAll('.edit-btn').forEach(button => 
    {
        button.addEventListener('click', (event) => 
        {
            const index = event.target.getAttribute('data-index');
            editItem(index, items, tdList);
        });
    });
}

// Function to remove an item
function removeItem(index, items, tdList) 
{
    items.splice(index, 1); // Remove item from array
    renderItems(items, tdList, tdList); // Re-render the updated list
}

// Function to edit an item
function editItem(index, items, tdList) 
{
    const newValue = prompt("Edit the item:", items[index]); // Prompt user for new value
    // Check if the input is not empty
    if (newValue !== null && newValue.trim() !== "") 
    { 
        items[index] = newValue; // Update the item in the array
        renderItems(items, tdList, tdList); // Re-render the updated list
    }
}

// Event listener for the Add Place button
$('#addVisitBtn').on('click', function (event) 
{
    event.preventDefault(); // Prevent form submission
    const place = $('#visitPlace').val();
    const date = $('#visitDate').val();

    // Add new visit to the arrays
    visitItems.push(place);
    visitDateItems.push(date);

    // Render the updated lists
    renderItems(visitItems, $('.visit_list-unstyled')[0], $('.visit_list-unstyled')[0]);
    renderItems(visitDateItems, $('.visitDates_list-unstyled')[0], $('.visitDates_list-unstyled')[0]);

    // Clear input fields after adding
    $('#visitPlace').val('');
    $('#visitDate').val('');
});



// Event listener for the Add Accommodation button
$('#addStayBtn').on('click', function (event) 
{
    event.preventDefault(); // Prevent form submission
    const accommodation = $('#accommodation').val();
    const location = $('#accLocation').val();

    // Add new accommodation and location to their respective arrays
    stayItems.push(accommodation);
    stayLocItems.push(location);

    // Render the updated lists
    renderItems(stayItems, $('.stay_list-unstyled')[0], $('.stay_list-unstyled')[0]);
    renderItems(stayLocItems, $('.stayLocs_list-unstyled')[0], $('.stayLocs_list-unstyled')[0]);

    // Clear input fields after adding
    $('#accommodation').val('');
    $('#accLocation').val('');
});

// Event listener for the Add Item button (Packing List)
$('#addPackingBtn').on('click', function (event) {
    event.preventDefault(); // Prevent form submission
    const packingItem = $('#packingItem').val();

    // Add new item to the packing list
    packingItems.push(packingItem);

    // Render the updated packing items list and add checkboxes
    renderItems(packingItems, $('.packingItems_list-unstyled')[0], $('.packingItems_list-unstyled')[0]);
    renderPackingStatus(packingItems, $('.packedStatus_list-unstyled')[0]);

    // Clear input field after adding
    $('#packingItem').val('');
});

// Function to render packing items and checkboxes for "Mark as Packed"
function renderPackingStatus(items, tdList) {
    let statusList = '';
    items.forEach((item, index) => {
        statusList += `
            <li class="list-group-item">
                <input type="checkbox" class="packed-checkbox" data-index="${index}">
                Mark as Packed
            </li>
        `;
    });
    tdList.innerHTML = statusList;

    // Add event listener to checkbox for marking items as packed
    document.querySelectorAll('.packed-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const index = event.target.getAttribute('data-index');
            togglePackingStatus(index);
        });
    });
}

// Function to toggle the packing status
function togglePackingStatus(index) {
    const listItem = document.querySelectorAll('.packingItems_list-unstyled li')[index];
    const checkbox = document.querySelectorAll('.packed-checkbox')[index];
    if (checkbox.checked) {
        listItem.style.textDecoration = 'line-through';
    } else {
        listItem.style.textDecoration = 'none';
    }
}

// Event listener for the Add Itinerary button
$('#addItinBtn').on('click', function (event) {
    event.preventDefault(); // Prevent form submission
    const destination = $('#destination').val();
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();

    // Add new itinerary and dates to their respective arrays
    itinItems.push(destination);
    itinDateItems.push({ startDate, endDate });

    // Render the updated lists
    renderItems(itinItems, $('.itin_list-unstyled')[0], $('.itin_list-unstyled')[0]);
    renderDates(itinDateItems, $('.itinStartDates_list-unstyled')[0], $('.itinEndDates_list-unstyled')[0]);

    // Clear input fields after adding
    $('#destination').val('');
    $('#startDate').val('');
    $('#endDate').val('');
});

// Function to render itinerary dates
function renderDates(dateItems, startList, endList) {
    let startDateList = '';
    let endDateList = '';
    dateItems.forEach((dates) => {
        startDateList += `<li class="list-group-item">${dates.startDate}</li>`;
        endDateList += `<li class="list-group-item">${dates.endDate}</li>`;
    });
    startList.innerHTML = startDateList;
    endList.innerHTML = endDateList;
}

// Event listener for the Add Activity button
$('#addActivBtn').on('click', function (event) 
{
    event.preventDefault(); // Prevent form submission
    const activity = $('#activity').val();
    const activLocation = $('#activLocation').val();
    const activDate = $('#activTravelDates').val();

    // Add new activity and details to their respective arrays
    activItems.push(activity);
    activLocItems.push(activLocation);
    activDateItems.push(activDate);

    // Render the updated lists
    renderItems(activItems, $('.activ_list-unstyled')[0], $('.activ_list-unstyled')[0]);
    renderItems(activLocItems, $('.activLocs_list-unstyled')[0], $('.activLocs_list-unstyled')[0]);
    renderItems(activDateItems, $('.activDates_list-unstyled')[0], $('.activDates_list-unstyled')[0]);

    // Clear input fields after adding
    $('#activity').val('');
    $('#activLocation').val('');
    $('#activTravelDates').val('');
});