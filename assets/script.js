/** 
 * Fetches data from the fetch hiring API with a proxy to enable cross origin requests 
*/
const fetchData = () => {
    const proxyUrl = 'https://quiet-journey-99569.herokuapp.com/';
    const fetchApi = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';

    fetch(proxyUrl + fetchApi)
        .then(response => response.json())
        .then(data => {
            sanitizeAndSortData(data);
        })
}

/** 
 * Parses the data received as an unsorted array to eliminate items with invalid names and sort the items, first by listId then by name
 * @param {array} data - Incoming data from API.
 */
const sanitizeAndSortData = (data) => {
    let listIdObj = {};
    for (let i = 0; i < data.length; i++) {
        let current = data[i];
        // filter our data without name and group by listId
        if (current.name) {
            if (current.listId in listIdObj) {
                listIdObj[current.listId].push(current);
            }
            else {
                listIdObj[current.listId] = [current];
            }
        }
    }
    // sort within listId array
    for (const listId in listIdObj) {
        listIdObj[listId].sort((a, b) => a.name.split(" ")[1] - b.name.split(" ")[1]);
    }
    populateTable(listIdObj);
}

/** 
 * Generates an HTML table and appends the sorted API information to the table
 * @param {object} listIdObj - The sorted data separated by listId.
 */
const populateTable = (listIdObj) => {
    document.getElementById("loader-holder").remove();
    document.getElementById("outer").classList.remove("hidden");
    const tableHeader = document.getElementById("table-header");
    const table = document.getElementById("data-table");
    const headerRow = tableHeader.insertRow(0);
    headerRow.insertCell(0).outerHTML = "<th>ID</th>";
    headerRow.insertCell(1).outerHTML = "<th>List ID</th>";
    headerRow.insertCell(2).outerHTML = "<th>Name</th>";
    let counter = 0;
    for (const id in listIdObj) {
        for (const item of listIdObj[id]) {
            const row = table.insertRow(counter);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            cell1.innerHTML = item.id;
            cell2.innerHTML = item.listId;
            cell3.innerHTML = item.name;
            counter++;
        }
    }
}

fetchData();

