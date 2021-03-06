var fetch = require('node-fetch');

function getMovieTitles(substr) {

    let currentPage = 1;
    let url = "https://jsonmock.hackerrank.com/api/movies/search/?Title="+substr+"&page=";
    let urls = [];
    let totalPages = 0;

    fetch(url+currentPage)
    .then(function(res) {
        return res.json();
    }).then(function(data) {
        
        totalPages = data.total_pages;
        for ( let i = 1 ; i <= totalPages ; i++ ){
            urls.push(url+""+i);
        }

        Promise.all(urls.map(url =>
            fetch(url).then(resp => resp.json())
        )).then(responses => {
            
            let data = responses.map( response => response.data );
            let movieTitles = [].concat.apply([],data).map( movie => movie.Title );
            movieTitles.sort();
            console.log(movieTitles);
            
        });
    });
}

getMovieTitles("spiderman");