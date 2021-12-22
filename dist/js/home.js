
/*********************************
Slider Home
*********************************/
document.addEventListener('DOMContentLoaded', () => {
  const slider = () => {
    const width = document.querySelector('body').offsetWidth;
    const slider = document.querySelector('.slider');
    let html = '';

    const images = {
      mob: [
        'img/sprite/sprite.svg#company2_1',
        'img/sprite/sprite.svg#company2_2',
        'img/sprite/sprite.svg#company2_3',
        'img/sprite/sprite.svg#company2_4',
        'img/sprite/sprite.svg#company2_5',
        'img/sprite/sprite.svg#company2_6'
      ],
      pc: [
        'img/sprite/sprite.svg#company4_1',
        'img/sprite/sprite.svg#company4_2',
        'img/sprite/sprite.svg#company4_3'
      ]
    };

    let param = images.mob;

    if(width > 768){
      param = images.pc;
    }

    for(const img of param){
      html += `
        <div class="slider__item">
          <div class="slider__item--svg">
            <svg>
              <use xlink:href="${img}"></use>
            </svg>
          </div>
        </div>
      `
    };

    // slider.innerHTML = ' ';
    slider.insertAdjacentHTML('afterbegin', html);
  }

  slider();

  const run = tns({
    container: '.slider',
    items: 1,
    autoplay: true
  });
});
