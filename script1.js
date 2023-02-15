const seats = document.querySelectorAll('.seat');

// Add click event listener to each seat
seats.forEach((seat) => {
  seat.addEventListener('click', () => {
    // Toggle selected class on click
    seat.classList.toggle('selected');
  });
});
const myDiv = document.getElementById("myDiv");
myDiv.addEventListener("click", function() {
  myDiv.classList.toggle("clicked");
});