

window.addEventListener('DOMContentLoaded', (event) => {
  let slides = Array.from(document.querySelectorAll('.slide'));

  let items = slides.map(slide => {
    let src = slide.getAttribute('src').replace(/thumb/gi, 'original');
    // We resize originals to 4200/2800, see gulpfile
    return { src, w: 4200, h: 2800, };
  });

  let pswpElement = document.querySelectorAll('.pswp')[0];

  slides.forEach(slide => {
    slide.addEventListener('click', el => {
      let options = {
        index: slides.indexOf(slide),
        loop: false,
      };

      let gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    })
  })
});
