$(document).ready(function() {
    setInterval(function() {
       var current = $('#photo-slider img:visible');
       var next = current.next('img').length ? current.next('img') : $('#photo-slider img:first');
       current.fadeOut(1000);
       next.fadeIn(1000);
    }, 5000);
 });
 