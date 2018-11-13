$( document )
  .ready( function ( $ ) {

    function deferVideo() {
      $( "video source" )
        .each( function () {
          var sourceFile = $( this )
            .attr( "data-src" );
          $( this )
            .attr( "src", sourceFile );
          var video = this.parentElement;
          video.load();
        } );
    }

    // Navbar fixa após rolagem
    $( window )
      .on( 'scroll', function () {
        if ( $( window )
          .scrollTop() >= $( window )
          .height() - 110 ) {
          $( '.navbar' )
            .addClass( 'sticky-top' );
          $( '.scroll-top' )
            .fadeIn();
        } else {
          $( '.navbar' )
            .removeClass( 'sticky-top' );
          $( '.scroll-top' )
            .fadeOut();
        }
      } );

    // Defer para carregamento posterior do video
    deferVideo();

    // Smooth Scroll
    var scroll = new SmoothScroll( 'a[href*="#"]', {
      speed: 600,
      easing: 'easeInOutQuad',
      offset: function ( anchor, toggle ) {
        if ( $( toggle )
          .attr( 'href' ) == '#quem-somos' ) {
          return 80;
        }
        return 0;
      },
    } );

  } )
