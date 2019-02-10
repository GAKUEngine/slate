//= require ./lib/_energize
//= require ./lib/_jquery
//= require ./lib/emojidex.min
//= require ./app/_toc
//= require ./app/_lang

$(function() {
  loadToc($('#toc'), '.toc-link', '.toc-list-h2', 10);
  setupLanguages($('body').data('languages'));
  $('.content').imagesLoaded( function() {
    window.recacheHeights();
    window.refreshToc();
  });
  $("body").emojidexReplace();
});

window.onpopstate = function() {
  activateLanguage(getLanguageFromQueryString());
};
