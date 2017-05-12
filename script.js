



var source = $('#store-template').html();
var template = Handlebars.compile(source);

var fetch = function (searchword) {
  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q='+ searchword,
    dataType: "json",
    success: function(data) {
      console.log(data);
      var items = data.items;
     //  var title = data.items[0].volumeInfo.title;
     // var author = data.items[0].volumeInfo.authors[0];
     // var description = data.items[0].volumeInfo.description;
     // var image = data.items[0].volumeInfo.imageLinks.smallThumbnail;
     // $(".display").append("<h1>"+ title + "</h1>" + "<br><h3>" +author + "</h3>" + "<br><p>" + description + "</p>" + "<img src='" + image + "'/>");
    
    var newHTML = template({items: items});
    
    $('.display').append(newHTML);
    
    },

    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  }); 
};

$(".search-isbn").on("click", function(){
  var searchword = $(".form-control").val();
  fetch(searchword);

})

var s = $('input'),
    f  = $('form'),
    a = $('.after'),
        m = $('h4');

s.focus(function(){
  if( f.hasClass('open') ) return;
  f.addClass('in');
  setTimeout(function(){
    f.addClass('open');
    f.removeClass('in');
  }, 1300);
});








a.on('click', function(e){
  e.preventDefault();
  if( !f.hasClass('open') ) return;
   s.val('');
  f.addClass('close');
  f.removeClass('open');
  setTimeout(function(){
    f.removeClass('close');
  }, 1300);
})

f.submit(function(e){
  e.preventDefault();
  m.html('Thanks, high five!').addClass('show');
  f.addClass('explode');
  setTimeout(function(){
    s.val('');
    f.removeClass('explode');
    m.removeClass('show');
  }, 3000);
})

$('.js-clearSearchBox').css('opacity', '0');

$('.js-searchBox-input').keyup(function() {
  if ($(this).val() !='' ) {
    $('.js-clearSearchBox').css('opacity', '1');
  } else {
    $('.js-clearSearchBox').css('opacity', '0');
  };
  
  $(window).bind('keydown', function(e)  {
    if(e.keyCode === 27) {
      $('.js-searchBox-input').val('');
    };
  });
});
// click the button 
$('.js-clearSearchBox').click(function() {
  $('.js-searchBox-input').val('');
  $('.js-searchBox-input').focus();
  $('.js-clearSearchBox').css('opacity', '0');
});

