'use strict';

// put your own value below!
const apiKey = 'lxCXGFWgwoK3cwwBuczfe9uZftV8ztNa8iMEuRCG'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayData(json) {
  let html = '';

  json.data.map(function(park){
    html = html + `<h2>Park Name: ${park.name}</h5><p>Description: ${park.description}</p>
    <p>Url: <a href="${park.url}" target="_blank">${park.url}</a></p>\n`;
  })

  $('#results').html(html);


}


function getParkData(query, maxResults=10) {
  const params = {
    stateCode: query,
    limit: maxResults,
    api_key: apiKey
    
    
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      console.log(JSON.stringify(responseJson))
      displayData(responseJson);
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParkData(searchTerm, maxResults);
  });
}

$(watchForm);