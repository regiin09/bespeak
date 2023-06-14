const seats = document.querySelectorAll('.seat');
const confirmSeatsBtn = document.getElementById('confirmSeatsBtn');
let selectedSeats = [];

const urlParams = new URLSearchParams(window.location.search);
const loginId = urlParams.get('loginId');
const eventId = urlParams.get('eventId');

seats.forEach((seat) => {
  seat.addEventListener('click', () => {
    // Toggle selected class on click
    seat.classList.toggle('selected');

    // Check if seat is selected or deselected
    if (seat.classList.contains('selected')) {
      // Add seat to selectedSeats array if not already selected
      if (!selectedSeats.includes(seat.textContent)) {
        selectedSeats.push(seat.textContent);
      }
    } else {
      // Remove seat from selectedSeats array if deselected
      const index = selectedSeats.indexOf(seat.textContent);
      if (index > -1) {
        selectedSeats.splice(index, 1);
      }
    }

    // Disable/enable the confirmSeatsBtn based on the number of selected seats
    if (selectedSeats.length === 0) {
      confirmSeatsBtn.disabled = true;
    } else {
      confirmSeatsBtn.disabled = false;
    }
  });
});

confirmSeatsBtn.addEventListener('click', () => {
  // Make an API request to store the selected seats in the database
  const selectedSeatsData = {
    loginId,
    eventId,
    selectedSeats
  };

  fetch('/save-seats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(selectedSeatsData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Handle the response from the server
      // Redirect the user to the next page or show a success message
    })
    .catch(error => {
      console.log(error);
      // Handle any errors that occur during the request
    });
});
