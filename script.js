const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row.seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
// + is to turn string into number
let ticketPrice = +movieSelect.value;

// save selected movie index and price
function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedPrice',moviePrice)
}

// update total count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // copy selected seats into arr
    // map through array
    // return new array indexes 
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // console.log(seatsIndex)

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    // console.log(selectedSeats);
    const selectedSeatsCount = selectedSeats.length;
    // console.log(selectedSeatsCount)
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}


// get data from storage and populate the UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    //console.log(selectedSeats)
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index)) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}


// seat click event
container.addEventListener('click', e => {
    if(
        e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// movie select event 
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
});


// initial count and total set 
updateSelectedCount();


