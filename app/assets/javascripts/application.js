// from govuk_frontend_toolkit and not delivered by static as part of
// header-footer-only on deployed environments
//= require govuk/stick-at-top-when-scrolling
//= require govuk/stop-scrolling-at-footer
//
//= require_tree ./govuk
//= require_tree ./modules

window.GOVUK.stickAtTopWhenScrolling.init();
window.GOVUK.stopScrollingAtFooter.addEl($('.js-stick-at-top-when-scrolling'));
