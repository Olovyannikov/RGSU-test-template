import SwiperCore, {Navigation, Pagination} from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);

window.addEventListener('DOMContentLoaded', () => {
    let allSlides = document.querySelector('.slider-total');
    let currentSlide = document.querySelector('.slider-current');

    const swiper = new SwiperCore('.swiper-container', {
        slidesPerGroup: 1,
        pagination: {
            el: '.swiper-pagination',
            type: "progressbar"
        },

        navigation: {
            nextEl: '.swiper-button-next',
        },

        allowTouchMove: false,

        on: {
            init: function () {
                allSlides.innerHTML = this.slides.length;
                currentSlide.innerHTML = this.realIndex + 1;
            },
            slideChange: function () {
                currentSlide.innerHTML = ++this.realIndex;
            }
        }
    });


    let answerBoxes = document.querySelectorAll('.swiper-slide');
    let testBtn = document.querySelector('.test__button');
    let submitBtn = document.querySelector('.test__submit');
    let inputElements = document.querySelectorAll('input');

    submitBtn.addEventListener('click', (event) => {
        let arr = [];
        let acc = 0;
        event.preventDefault();
        for (let i = 0; i < inputElements.length; i++) {
            if (inputElements[i].checked) {
                acc += +inputElements[i].getAttribute('value');
                const step = {
                    question: inputElements[i].getAttribute('name'),
                    answer: inputElements[i].getAttribute('data-answer')
                };
                arr.push(step);
            }
        }
        console.log('Результат в виде массива', arr);
        console.log('Сумма баллов за ответы: ', acc);
        console.log('JSON массив: \n\n', JSON.stringify(arr));
    })

    answerBoxes.forEach(item => {
        let acc = 0;
        let answerItem = item.querySelectorAll('.test__slide-group');
        answerItem.forEach(i => {
            i.querySelectorAll('input').forEach(radio => {
                radio.addEventListener('click', () => {
                    acc++;
                    i.querySelectorAll('input').forEach(q => q.setAttribute('disabled', 'disabled'))
                    if (acc >= answerItem.length) {
                        testBtn.removeAttribute('disabled')
                        testBtn.classList.add('test__button_active');
                        acc = 0;
                    }
                    testBtn.addEventListener('click', (evt) => {
                        evt.preventDefault();
                        testBtn.classList.remove('test__button_active');
                        testBtn.setAttribute('disabled', 'disabled')
                    })
                }, {once: true})
            }, {once: true})
        })
    })
})

