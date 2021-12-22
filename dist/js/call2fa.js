
/*********************************
Slider Call2fa Verification
*********************************/
document.addEventListener('DOMContentLoaded', () => {
  const sliderParam = [
    {
      youtube: 'gnZImHvA0ME',
      title: 'Подтверждение по кнопке 1',
      subTitle: 'Пользователь принимает  звонок и нажимает на 1'
    },
    {
      youtube: 'zDK2KJ8k-cs',
      title: 'Подтверждение по кнопке 2',
      subTitle: 'Пользователь принимает  звонок и нажимает на 2'
    },
    {
      youtube: 'p2JHOJCuRds',
      title: 'Подтверждение по кнопке 3',
      subTitle: 'Пользователь принимает  звонок и нажимает на 3'
    },
    {
      youtube: '_tV5LEBDs7w',
      title: 'Подтверждение по кнопке 4',
      subTitle: 'Пользователь принимает  звонок и нажимает на 4'
    }
  ];

  let html = '';

  for(let i = 0; i < sliderParam.length; i++){
    html += `
    <div class="call2faSlider__item">
      <div class="call2faSlider__inner">
        <div class="call2faSlider__count">
          <span>${i + 1}</span>/${sliderParam.length}
        </div>

        <div class="call2faVerification__slider--video" data-youtube="${sliderParam[i].youtube}">
          <picture>
            <source srcset="https://i.ytimg.com/vi_webp/${sliderParam[i].youtube}/maxresdefault.webp" type="image/webp">
            <img class="video__media" src="https://i.ytimg.com/vi/${sliderParam[i].youtube}/maxresdefault.jpg" alt="Видео1">
          </picture>
        </div>

        <div class="call2faSlider__desc">
          <h4>${sliderParam[i].title}</h4>
          <p>${sliderParam[i].subTitle}</p>
        </div>
      </div>
    </div>
    `;
  }

  document.querySelector('.call2faVerification__slider').insertAdjacentHTML('afterbegin', html);

  tns({
    container: '.call2faVerification__slider',
    items: 1,
    autoplay: false,
    controlsContainer: "#customize-controls",
    nav: true,
    navPosition: 'bottom'
  });


  const youtube = document.querySelectorAll('[data-youtube]');

  youtube.forEach((item) => {
    item.addEventListener('click', (event) => {
      if(event.target.dataset.youtube === "true") { return };

      let iframe = `<iframe src="https://www.youtube.com/embed/${event.target.dataset.youtube}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      event.target.insertAdjacentHTML('afterbegin', iframe);
      event.target.dataset.youtube = true;
    })
  })
});



/*********************************
Slider Call2fa Case
*********************************/
document.addEventListener('DOMContentLoaded', () => {

  tns({
    container: '.call2faCase__slider',
    items: 1,
    autoplay: false,
    // controlsContainer: "#customize-controls",
    nav: true,
    navPosition: 'bottom'
  });

});


/*********************************
Mask
*********************************/
document.addEventListener('DOMContentLoaded', () => {
  let phoneMask = IMask(
    document.getElementById('phone-mask-footer'), {
      mask: '+{38}(000)000-00-00'
    });
});


/*********************************
form
*********************************/
document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('[data-form-footer]');
  let inner = document.querySelector('[data-form-inner]');
  const modal = document.querySelector('[data-modal-id="form"]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = event.target.querySelector('[name="name"]');
    let phone = event.target.querySelector('[name="phone"]');

    if(name.value.length < 1){
      name.classList.add('invalid');
      return
     }else{
      name.classList.remove('invalid');
    }

    if(phone.value.length < 17){
      phone.classList.add('invalid');
      return
     }else{
      phone.classList.remove('invalid');
    }

    let formData = new FormData(event.target);

    postData('https://httpbin.org/post', formData)
      .then((data) => {
          console.log(data);
          inner.classList.add('complete');
          modal.classList.add('active');
      });
  })
});


/*********************************
Fetch default
*********************************/
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/json'
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data
  });
  return await response.json();
}
