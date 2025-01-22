$('.characterPage').css('display', 'none');
$('.episodePage').css('display', 'none');
$('.locationPage').css('display', 'none');
$('.watchlistPage').css('display', 'none');

fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {
        for (let el of data.results) {
            $('.characterContainer').append(`
                <div class="character">
                    <img src="${el.image}">
                    <h2>${el.name}</h2>
                    <p>${el.gender}</p>
                    <button id='${el.id}' class="viewCharacter">View</button>
                </div>`)

        }
    })

function getCharacterPage(page) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(response => response.json())
        .then(data => {
            $('.characterContainer').empty();
            for (let el of data.results) {
                $('.characterContainer').append(`
                <div class="character">
                    <img src="${el.image}">
                    <h2>${el.name}</h2>
                    <p>${el.gender}</p>
                    <button id='view${el.id}' class="viewCharacter">View</button>
                </div>`)
            }
        })
}
getCharacterPage(1);

let p = 1;
$('#nextPage').click(() => {
    if (p < 42) {
        p++;
        getCharacterPage(p);
        $('#currentPage').text(p);
    }
})

$('#prevPage').click(() => {
    if (p > 1) {
        p--;
        getCharacterPage(p);
        $('#currentPage').text(p);
    }
})
let watchList = JSON.parse(localStorage.getItem('watchList')) || [];

$('.wrap').click(function (e) {

    let id = e.target.id;
    let watchListUPD = [];
    if (id.startsWith('delete')) {
        for (let el of watchList) {
            if (el.id != id.slice(6)) {
                watchListUPD.push(el);
            }
        }
        watchList = watchListUPD;
        localStorage.setItem('watchList', JSON.stringify(watchList));
        // alert('Eлемент видалено');
        $('.watchlistContainer').empty();
        for (let el of watchList) {
            $('.watchlistContainer').append(`
       
         <div class="watchlistItem"> 
            <h2>${el.name}</h2>
            <button id='delete${el.id}'>Delete</button>
        </div>`)
        }

    }
    else if (id.startsWith('addEpisode')) {
        fetch(`https://rickandmortyapi.com/api/episode/${id.slice(10)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                watchList.push(data);
                localStorage.setItem('watchList', JSON.stringify(watchList));
            })
    }
    else if (id.startsWith('view')) {
        fetch(`https://rickandmortyapi.com/api/character/${id.slice(4)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                $('.characterPopup').css('display', 'flex');
                $('.wrap').css('filter', 'blur(10px)');
                $('.popupContainer').empty();
                $('.popupContainer').append(`
                <img src="${data.image}">
                <div class="popupInfo">
                    <h2>${data.name}</h2>   
                    <p>${data.gender}</p>
                    <p>${data.species}</p>
                </div>
                `)

            })
    } else if (!e.target.classList.contains('character')) {
        $('.characterPopup').css('display', 'none');
        $('.wrap').css('filter', 'none');
    }
}
)


$('#closePopup').click(() => {
    $('.characterPopup').css('display', 'none');
    $('.wrap').css('filter', 'none');
})

$('#charactersBtn').click(() => {
    $('.page').css('display', 'none');
    $('.characterPage').css('display', 'block');
})

$('#homeBtn').click(() => {
    $('.page').css('display', 'none');
    $('.homePage').css('display', 'block');
})

$('#episodesBtn').click(() => {
    $('.page').css('display', 'none');
    $('.episodePage').css('display', 'block');

    fetch('https://rickandmortyapi.com/api/episode')
        .then(res => {
            return res.json()
        }).then(data => {
            for (let el of data.results) {
                $('.episodeContainer').append(`
                <div class="episode">
                    <h2>${el.name}</h2>
                    <p>${el.air_date}</p>
                    <button id='addEpisode${el.id}' class="viewEpisode">Додати</button>
                </div>`)
            }
        })
})


$('#applyEpisodeName').click(function () {
    let name = $('#episodeName').val();

    console.log(name);
    fetch('https://rickandmortyapi.com/api/episode/?name=' + name)
        .then(res => res.json())
        .then(data => {
            $('.episodeContainer').empty();
            if (data.results) {


                for (let el of data.results) {

                    $('.episodeContainer').append(`
                <div class="episode">
                     <h2>${data.results[0].name}</h2>
                     <p>${data.results[0].air_date}</p>
                </div>`)
                }

                $('.episodePagination').css('display', 'flex');
            } else {
                $('.episodeContainer').append(`
                <div >
                    <h2>No results</h2>
                </div>`)
                $('.episodePagination').css('display', 'none');
                $('.episodeContainer').css('color', '#fff');
            }
        })
})

$('#locationsBtn').click(() => {
    $('.page').css('display', 'none');
    $('.locationPage').css('display', 'block');

    fetch('https://rickandmortyapi.com/api/location')
        .then(res => {
            return res.json()
        }).then(data => {
            for (let el of data.results) {
                $('.locationContainer').append(`
                <div class="location">
                    <h2>${el.name}</h2>
                    <p>${el.type}</p>
                </div>`)
            }
        })
})


$('#watchListBtn').click(() => {
    $('.page').css('display', 'none');
    $('.watchlistPage').css('display', 'block');
})


$('#applySpecies').click(function () {
    let species = $('#species').val();
    fetch(`https://rickandmortyapi.com/api/character/?species=${species}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            $('.characterContainer').empty();
            if (data.results) {


                for (let el of data.results) {

                    $('.characterContainer').append(`
                <div class="character">
                    <img src="${el.image}">
                    <h2>${el.name}</h2>
                    <p>${el.gender}</p>
                    <button id='view${el.id}' class="viewCharacter">View</button>
                </div>`)
                }

                $('.characterPagination').css('display', 'flex');
            } else {
                $('.characterContainer').append(`
                <div >
                    <h2>No results</h2>
                </div>`)
                $('.characterPagination').css('display', 'none');
                $('.characterContainer').css('color', '#fff');
            }

        })
})


$('#gender').on('input', function () {
    let gender = $('#gender').val();
    console.log(gender);
    fetch(`https://rickandmortyapi.com/api/character/?gender=${gender}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            $('.characterContainer').empty();
            for (let el of data.results) {
                $('.characterContainer').append(`
                <div class="character">
                    <img src="${el.image}">
                    <h2>${el.name}</h2>
                    <p>${el.gender}</p>
                    <button id='view${el.id}' class="viewCharacter">View</button>
                </div>`)
            }

        })

})


for (let el of watchList) {
    $('.watchlistContainer').append(`
       
         <div class="watchlistItem"> 
            <h2>${el.name}</h2>
            <button id='delete${el.id}'>Delete</button>
        </div>`)
}


function getEpisodePage(page) {
    fetch(`https://rickandmortyapi.com/api/episode/?page=${page}`)
        .then(response => response.json())
        .then(data => {
            $('.episodeContainer').empty();
            for (let el of data.results) {
                $('.episodeContainer').append(`
                <div class="episode">
                    <h2>${el.name}</h2>
                    <p>${el.air_date}</p>
                    <button id='addEpisode${el.id}' class="viewEpisode">Додати</button>
                </div>`)
            }
        })
}

let e = 1;
$('#nextPageEpisode').click(() => {
    if (e < 3) {
        e++;
        getEpisodePage(e);
        $('#currentPageEpisode').text(e);
    }
})

$('#prevPageEpisode').click(() => {
    if (e > 1) {
        e--;
        getEpisodePage(e);
        $('#currentPageEpisode').text(e);
    }
})



// function getCharacterPage(page) {
//     fetch(`https://rickandmortyapi.com/api/location/?page=${page}`)
//         .then(response => response.json())
//         .then(data => {
//             $('.locationContainer').empty();
//             for (let el of data.results) {
//                 $('.locationContainer').append(`
//                 <div class="location">
//                     <h2>${el.name}</h2>
//                     <p>${el.air_date}</p>
//                 </div>`)
//             }
//         })
// }

// let l = 1;
// $('#nextPageLocation').click(() => {
//     l++;
//     getCharacterPage(l);
//     $('#currentPageLocation').text(l);
// })

// $('#prevPageLocation').click(() => {
//     if (l > 1) {
//         l--;
//         getCharacterPage(l);
//         $('#currentPageLocation').text(l);
//     }
// })

$('#searchLocationName').click(function () {
    let name = $('#locationName').val();

    console.log(name);
    fetch('https://rickandmortyapi.com/api/location/?name=' + name)
        .then(res => res.json())
        .then(data => {
            $('.locationContainer').empty();
            if (data.results) { // data.results.length > 0
                for (let el of data.results) {
                    $('.locationContainer').append(`
                <div class="location">
                    <h2>${data.results[0].name}</h2>
                    <p>${data.results[0].type}</p>
                </div>`)
                }
            } else {
                $('.locationContainer').append(`
                <div >
                    <h2>No results</h2>
                </div>`)
            }
        })
})

$('#searchLocationType').click(function () {
    let type = $('#locationType').val();

    console.log(type);
    fetch('https://rickandmortyapi.com/api/location/?type=' + type)
        .then(res => res.json())
        .then(data => {
            $('.locationContainer').empty();
            if (data.results) { // data.results.length > 0
                for (let el of data.results) {
                    $('.locationContainer').append(`
                <div class="location">
                    <h2>${data.results[0].name}</h2>
                    <p>${data.results[0].type}</p>
                </div>`)
                }
            } else {
                $('.locationContainer').append(`
                <div >
                    <h2>No results</h2>
                </div>`)
            }
        })
})






let a = 5;
let b = 10;

// ... 
// let c = a;
// a = b;
// b = c;

[a, b] = [b, a];

console.log(a); // 10
console.log(b); // 5