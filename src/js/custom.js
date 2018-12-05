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

    // Script do MixPanel
    (function (c, a) {
        if (!a.__SV) {
            var b = window;
            try {
                var d, m, j, k = b.location,
                    f = k.hash;
                d = function (a, b) {
                    return (m = a.match(RegExp(b + "=([^&]*)"))) ? m[1] : null
                };
                f && d(f, "state") && (j = JSON.parse(decodeURIComponent(d(f, "state"))), "mpeditor" === j.action && (b.sessionStorage
                    .setItem("_mpcehash", f), history.replaceState(j.desiredHash || "", c.title, k.pathname + k.search)))
            } catch (n) {}
            var l, h;
            window.mixpanel = a;
            a._i = [];
            a.init = function (b, d, g) {
                function c(b, i) {
                    var a = i.split(".");
                    2 == a.length && (b = b[a[0]], i = a[1]);
                    b[i] = function () {
                        b.push([i].concat(Array.prototype.slice.call(arguments,
                            0)))
                    }
                }
                var e = a;
                "undefined" !== typeof g ? e = a[g] = [] : g = "mixpanel";
                e.people = e.people || [];
                e.toString = function (b) {
                    var a = "mixpanel";
                    "mixpanel" !== g && (a += "." + g);
                    b || (a += " (stub)");
                    return a
                };
                e.people.toString = function () {
                    return e.toString(1) + ".people (stub)"
                };
                l =
                    "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove"
                    .split(" ");
                for (h = 0; h < l.length; h++) c(e, l[h]);
                var f = "set set_once union unset remove delete".split(" ");
                e.get_group = function () {
                    function a(c) {
                        b[c] = function () {
                            call2_args = arguments;
                            call2 = [c].concat(Array.prototype.slice.call(call2_args, 0));
                            e.push([d, call2])
                        }
                    }
                    for (var b = {}, d = ["get_group"].concat(Array.prototype.slice.call(arguments, 0)), c = 0; c < f.length; c++)
                        a(f[c]);
                    return b
                };
                a._i.push([b, d, g])
            };
            a.__SV = 1.2;
            b = c.createElement("script");
            b.type = "text/javascript";
            b.async = !0;
            b.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ?
                MIXPANEL_CUSTOM_LIB_URL : "file:" === c.location.protocol &&
                "//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ?
                "https://cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js";
            d = c.getElementsByTagName("script")[0];
            d.parentNode.insertBefore(b, d)
        }
    })(document, window.mixpanel || []);
    mixpanel.init("b9d42d5f45384a477fb9842b057af083");


    // Script do MouseFlow
    window._mfq = window._mfq || [];
    (function () {
        var mf = document.createElement("script");
        mf.type = "text/javascript";
        mf.async = true;
        mf.src = "//cdn.mouseflow.com/projects/bf551b24-2640-4c5c-a462-43fc6a698aed.js";
        document.getElementsByTagName("head")[0].appendChild(mf);
    })();

})(jQuery);