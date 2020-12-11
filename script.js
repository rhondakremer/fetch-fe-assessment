function fetchData() {
    const corsAnywhereProxy = 'https://cors-anywhere.herokuapp.com/';
    const fetchApi = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';
    
    fetch(corsAnywhereProxy + fetchApi)
        .then(response => response.json())
        .then(data => {
            sanitizeAndSortData(data);
        })
}

function sanitizeAndSortData(data) {
    let listIdObj = {};
    for (let i = 0; i < data.length; i++) {
        let current = data[i];
        if (current.name) {
            if (current.listId in listIdObj) {
                listIdObj[current.listId].push(current);
            }
            else {
                listIdObj[current.listId] = [current];
            }
        }
    }
    for (const listId in listIdObj) {
        listIdObj[listId].sort((a,b) => a.name.split(" ")[1] - b.name.split(" ")[1]);
    }
    console.log(listIdObj)
}

fetchData();