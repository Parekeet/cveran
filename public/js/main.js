console.log('JS loaded!');

$(document).ready(function(){
  $('.parallax').parallax();
  $(".dropdown-button").dropdown();
  $('.modal-trigger').leanModal('#modal1');
  $('#modal1').closeModal();
    });

$('nav a').click(function () {
  var $href = $(this).attr('href');
  $('body').stop().animate({
    scrollTop: $($href).offset()
  }, 1000);
  return false;
});


