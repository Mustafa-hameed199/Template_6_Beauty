let log = console.log;

const cards = Array.from(document.querySelectorAll('[data-card]'));
const galleryCardsBox = document.querySelector('[data-gallery-cards]');
const contentToShow = [...document.querySelectorAll('.content-to-show')]

galleryCardsBox.style.width = `${240 * cards.length}px`;

let options = {
    root: null,
    threshold: .15,
    rootMargin: '0px'
}

let observer = new IntersectionObserver(observeElements,options)

function observeElements(entries , observer) {
    entries.forEach(el => {
        if (el.isIntersecting) {
            el.target.classList.add('reveal')
        }
    })
}

contentToShow.forEach(el => {
    observer.observe(el);
})




// ----------------------------------------------------------------- jQuery ----------------

$(document).ready(function() {
    let ulLines = $('.gallery__lines');
    let move = $('.gallery__card').outerWidth(true);

    let cards = $('[data-gallery-cards]').children().length;
    let start = 3;

    if ($(window).outerWidth() > 1125 ) {
        start = start
        creatLines();
    }
    if ($(window).outerWidth() > 992 && $(window).outerWidth() < 1125 ) {
        start = 2;
        creatLines();
    }
    if ($(window).outerWidth() < 992 && $(window).outerWidth() > 768 ) {
        start= 1;
        creatLines();
    }
    if ($(window).outerWidth() < 768 ) {
        start= 0;
        creatLines();
    }
    $(window).on('resize', function () {
        if ($(window).outerWidth() > 1125 ) {
            start = 3;
            creatLines();
        } else if ($(window).outerWidth() > 992 && $(window).outerWidth() < 1125) {
            start = 2 ;
            creatLines();
            
        } else if ($(window).outerWidth() < 992 && $(window).outerWidth() > 768 ) {
            start= 1;
            creatLines();
        } else if ($(window).outerWidth() < 768 ) {
            start= 0;
            creatLines();
        }
    })
    
// --------------------------------------------------------------------------- Line Move Gallery  ------------    

    function creatLines() {
        let lines = document.querySelectorAll('.gallery__line')
         if (lines) {
            lines.forEach(el => el.remove());
         }
        for (let i = start ; i < cards ; i++) {
            let li = document.createElement('li');
            li.className = 'gallery__line';
            ulLines.append(li);
        }
        $('.gallery__line').first().addClass('current-slide');
        $('.gallery__cards').css('left','0px');
    }
    
    function lineMove (direction) {
        let plus = $('.gallery__cards').css('left');
        let current_slide = $('.current-slide');

        if (direction == 'next') {
            if ($('.gallery__line').last().hasClass('current-slide')) return;
            current_slide.removeClass('current-slide').next().addClass('current-slide');
            $('.gallery__cards').css('left',`-${move - parseInt(plus)}px`);
            
        } else {
            if ($('.gallery__line').first().hasClass('current-slide')) return;
            current_slide.removeClass('current-slide').prev().addClass('current-slide');
            $('.gallery__cards').css('left',`${move + parseInt(plus)}px`);
        }
    } 
    
    $('[data-gallery__btn-right]').on('click', () => {
        lineMove('next')
    })
    $('[data-gallery__btn-left]').on('click', () => {
        lineMove('prev')
    })
})

