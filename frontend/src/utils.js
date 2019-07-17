const API_BASE_URL = 'https://bii-vcf.herokuapp.com';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getInventory() {
    return request({
        url: API_BASE_URL + "/inventory/",
        method: 'GET'
    });
}

export function sellInventory(data) {
    return request({
        url: API_BASE_URL + "/inventory/sell/",
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export function getReorders(id = '') {
    let url;
    if (id !== '') {
        url = API_BASE_URL + "/reorders/" + id;
    } else {
        url = API_BASE_URL + "/reorders/";
    }
    return request({
        url: url,
        method: 'GET',
    });
}

export function processReorders(data) {
    return request({
        url: API_BASE_URL + "/reorders/dispatchOrders/",
        method: 'POST',
        body: JSON.stringify(data)
    });
}