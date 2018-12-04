/* 
    Código JS do Site da Smartex 
    Versão: 1.0
    Author: Hans Bonini
*/

/* Importa o jQuery */
import jQuery from 'jquery/dist/jquery';

/* Importa o Smooth Scroll */
import SmoothScroll from 'smooth-scroll/src/js/smooth-scroll';

/* Importa o Waypoints */
import 'waypoints/lib/noframework.waypoints';

(function ($) {

    $(document).ready(function ($) {

        // Função de carregamento do video em modo defer
        function deferVideo() {
            $("video source").each(function () {
                var sourceFile = $(this)
                    .attr("data-src");
                $(this)
                    .attr("src", sourceFile);
                var video = this.parentElement;
                video.load();
            });
        }


        // Navbar fixa após rolagem
        $(window)
            .on('scroll', function () {
                if ($(window)
                    .scrollTop() >= $(window)
                    .height() - 110) {
                    $('.navbar')
                        .addClass('sticky-top');
                    $('.scroll-top')
                        .fadeIn();
                } else {
                    $('.navbar')
                        .removeClass('sticky-top');
                    $('.scroll-top')
                        .fadeOut();
                }
            });


        // Defer para carregamento posterior do video
        deferVideo();


        // Rolagem Suave
        var scroll = new SmoothScroll('a[href*="#"]', {
            speed: 600,
            easing: 'easeInOutQuad',
            offset: function (anchor, toggle) {

                // Evento de click do menu do Mixpanel
                mixpanel.track("Link Clickado: " + $(toggle).text());

                if ($(toggle)
                    .attr('href') == '#quem-somos') {
                    return 80;
                }

                return 0;
            },
        });

        // Waypoints enviando dados pro Mixpanel
        var wp_quemsomos = new Waypoint({
            element: document.getElementById('quem-somos'),
            handler: function () {
                mixpanel.track("Visualizando Bloco: Quem Somos");
            }
        });
        var wp_sangriaautomatizada = new Waypoint({
            element: document.getElementById('sangria-automatizada'),
            handler: function () {
                mixpanel.track("Visualizando Bloco: Sangria Automatizada");
            }
        });
        var wp_sensoriamentoremoto = new Waypoint({
            element: document.getElementById('sensoriamento-remoto'),
            handler: function () {
                mixpanel.track("Visualizando Bloco: Sensoriamento Remoto");
            }
        });
        var wp_contato = new Waypoint({
            element: document.getElementById('contato'),
            handler: function () {
                mixpanel.track("Visualizando Bloco: Contato");
            }
        })
    });

})(jQuery);