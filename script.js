function fetchData() {
    const corsAnywhereProxy = 'https://cors-anywhere.herokuapp.com/';
    const fetchApi = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';
    
    fetch(corsAnywhereProxy + fetchApi)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}

fetchData();