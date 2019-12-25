$(document).ready(function () {
  $('.hidden-post-url').each(function () {
    $('.reading-time-home-ft-' + this.innerText).text(readingTimeCustom($('.hidden-post-content-ft-' + this.innerText).text()))
    $('.reading-time-home-reg-' + this.innerText).text(readingTimeCustom($('.hidden-post-content-reg-' + this.innerText).text()))
  })
})

readingTimeCustom = function(content, wordPerMinute = 200) {
  var readMinutes = content.split(' ').length / wordPerMinute;
  return readMinutes > 1 ? " " + Math.round(readMinutes) + ' minute read': " " + 'Less than a minute read'
};