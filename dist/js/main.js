
/********************************
  Menu
********************************/
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('[data-menu-btn]');
  const inner = document.querySelector('[data-menu-inner]');
  const bg = document.querySelector('[data-menu-bg]');

  btn.addEventListener('click', (event) => {
    event.target.classList.toggle('active');
    inner.classList.toggle('active');
    bg.classList.toggle('active');
  });

  bg.addEventListener('click', (event) => {
    event.target.classList.toggle('active');
    inner.classList.toggle('active');
    btn.classList.toggle('active');
  });
});


/*********************************
Modal
*********************************/
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('[data-modal-id]');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const modal = document.querySelector('[data-modal-id="'+event.target.dataset.modal+'"]');
      modal.classList.add('active');
    })
  })

  document.addEventListener('click', (event) => {
    if(event.target.dataset.modalId != undefined){
      event.target.classList.remove('active');
      return
    }

    if(event.target.dataset.modalClose != undefined){
      event.target.parentElement.parentElement.parentElement.classList.remove('active');
      return
    }
  });
});


/*********************************
Scroll
*********************************/
document.addEventListener('DOMContentLoaded', () => {
  var scroll = new SmoothScroll('a[href*="#"]');

  const nav = document.querySelector('[data-nav]');
  nav.addEventListener('click', (event) => {
    const items = nav.querySelectorAll('a');
    for(const item of items){
      item.classList.remove('active');
    };

    event.target.classList.add('active');
  });
});


/*********************************
Mask
*********************************/
document.addEventListener('DOMContentLoaded', () => {
  let phoneMask = IMask(
    document.getElementById('phone-mask'), {
      mask: '+{38}(000)000-00-00'
    });
});


/*********************************
form
*********************************/
document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('[data-form]');
  let inner = document.querySelector('[data-form-inner]');

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


    //test send
    let formData = new FormData(event.target);

    postData('https://httpbin.org/post', formData)
      .then((data) => {
          console.log(data);
          inner.classList.add('complete');
      });

    //test send
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
