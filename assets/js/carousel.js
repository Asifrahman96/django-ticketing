$('#cover', '.carousel').owlCarousel({
    items:3,
    margin: 15, 
    center:true,
    loop: false,
    autoplay:true,
    autoplayTimeout:10000,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 2
      }
    }
})
