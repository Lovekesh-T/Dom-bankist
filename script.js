'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let btnOpenModal of btnsOpenModal) {
  btnOpenModal.addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const nav = document.querySelector('.nav');

const mouseEvents = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    siblings.forEach(sibling => {
      if (sibling !== link) {
        sibling.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
};

nav.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});
nav.addEventListener('mouseover', mouseEvents.bind('0.5'));
nav.addEventListener('mouseout', mouseEvents.bind('initial'));

const tabContainer = document.querySelector('.operations__tab-container');

tabContainer.addEventListener('click', function (e) {
  const element = e.target.closest('.operations__tab');
  if (!element) return;
  if (element.classList.contains('operations__tab')) {
    const classes = element.getAttribute('class');
    const Op1 = document.querySelector(
      `.operations__content--${classes.split(' ')[2].slice(-1)}`
    );
    console.log(`${classes.split(' ')[2].slice(-1)}`);
    const OpTab = document.querySelectorAll('.operations__tab');
    OpTab.forEach(tab => tab.classList.remove('operations__tab--active'));
    element.classList.add('operations__tab--active');

    const tabs = document.querySelectorAll('.operations__content');
    tabs.forEach(tab => tab.classList.remove('operations__content--active'));
    Op1.classList.add('operations__content--active');
  }
});

// const message = document.createElement('div')
// message.classList.add('cookie-message')

// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'
// message.style.backgroundColor = '#37383d';
// message.style.width = "120%"
// message.style.height = parseFloat(getComputedStyle(message).height,10) + 30 + 'px';

// header.append(message)

const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const scoord = section1.getBoundingClientRect();
  // console.log(section1.getBoundingClientRect())

  // window.scrollTo({
  //   left : scoord.left + window.pageXOffset,
  //   top : scoord.top + window.pageYOffset,
  //   behavior : "smooth",
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// window.addEventListener("scroll",function(){
//   // console.log(window.scrollX,window.scrollY)
//   const corrds = section1.getBoundingClientRect()
//   // console.log(section1.getBoundingClientRect())
//   console.log(window.scrollY,corrds.top,window.pageYOffset)
//   if(corrds.top<0){
//     nav.classList.add("sticky")
//   }

//   else{
//     nav.classList.remove("sticky")
//   }
// })
const obscallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const navHeight = nav.getBoundingClientRect().height;
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const observer = new IntersectionObserver(obscallback, obsOptions);

observer.observe(header);

////////////////////////////////////////////////////////
//////////////// sections obersever ///////////////////
const sections = document.querySelectorAll('.section');

const secCallback = function (entries, oberver) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  oberver.unobserve(entry.target);
};
const secObserver = new IntersectionObserver(secCallback, {
  root: null,
  threshold: 0.15,
});
sections.forEach(section => {
  secObserver.observe(section);
  section.classList.add('section--hidden');
});

const images = document.querySelectorAll('img[data-src]');

const imgCallback = function (entries, observer) {
  const [entry] = entries;
  console.log(entry.target);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('lazy-img');
  entry.target.src = entry.target.dataset.src;
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(imgCallback, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

images.forEach(img => imageObserver.observe(img));

///////////////////////////////////////////////
////////////////  slider /////////////////////

const sliders = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const sliderBtnR = document.querySelector('.slider__btn--right');
const sliderBtnL = document.querySelector('.slider__btn--left');
// slider.style.transform = "scale(0.5)";
// slider.style.overflow = "visible";

let curSlide = 0;
let maxSlide = sliders.length - 1;

const sliding = function (sliden) {
  sliders.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - sliden)}%)`;
  });
};
sliding(0);

const dotSlide = function (num) {
  const curDot = document.querySelector(`button[data-slide='${num}']`);
  const childrens = [...curDot.parentElement.children];
  childrens.forEach(sibling => sibling.classList.remove('dots__dot--active'));
  curDot.classList.add('dots__dot--active');
};
const slideRight = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  sliding(curSlide);
  dotSlide(curSlide);
};

const slideLeft = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  sliding(curSlide);
  dotSlide(curSlide);
};
sliderBtnR.addEventListener('click', slideRight);
sliderBtnL.addEventListener('click', slideLeft);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') slideRight();

  if (e.key === 'ArrowLeft') slideLeft();
});

///////////////////dots////////////////
///////////////////////////////////////

const dotContainer = document.querySelector('.dots');

sliders.forEach((_, index) => {
  dotContainer.insertAdjacentHTML(
    'beforeend',
    `<button class="dots__dot ${
      index === 0 ? 'dots__dot--active' : ''
    }" data-slide=${index}></button>`
  );
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    const siblings = [...e.target.parentElement.children];
    siblings.forEach(sibling => sibling.classList.remove('dots__dot--active'));
    e.target.classList.add('dots__dot--active');
    sliding(slide);
  }
});
