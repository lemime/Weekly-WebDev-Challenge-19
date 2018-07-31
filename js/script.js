class Carousel {
    constructor() {
        this.customers = document.querySelector('.customers');
        this.currentElement;
        this.elements = document.querySelectorAll('.customer');
        this.elementNumber = this.elements.length;
        for (let [index, element] of this.elements.entries()) {
            element.style.order = index;
        }
        this.elements[0].parentElement.classList.add('animate');
        this.quote = this.elements[1].firstElementChild.cloneNode(true);
        document.querySelector('.quote-block').appendChild(this.quote);
    }
    previous() {

        if (this.currentElement.nextElementSibling) {
            this.currentElement.nextElementSibling.classList.add('primary');
            this.currentElement.nextElementSibling.classList.remove('small');
            this.quote = this.currentElement.nextElementSibling.firstElementChild.cloneNode(true);
            document.querySelector('.quote-block').replaceChild(this.quote, document.querySelector('.quote-block').firstChild);
        } else {
            this.elements[0].classList.add('primary');
            this.elements[0].classList.remove('small');
            this.quote = this.elements[0].firstElementChild.cloneNode(true);
            document.querySelector('.quote-block').replaceChild(this.quote, document.querySelector('.quote-block').firstChild);
        }
        let index = 2;
        for (let element of this.elements) {
            this.currentElement.style.order = index;
            index--;
            if (index == -1) {
                index = this.elementNumber;
            }
            this.currentElement.previousElementSibling ? this.currentElement = this.currentElement.previousElementSibling : this.currentElement = this.elements[this.elementNumber - 1];
            this.currentElement.style.order = index;
        }
    }
    next() {

        if (this.currentElement.previousElementSibling) {
            this.currentElement.previousElementSibling.classList.add('primary');
            this.currentElement.previousElementSibling.classList.remove('small');
            this.quote = this.currentElement.previousElementSibling.firstElementChild.cloneNode(true);
            document.querySelector('.quote-block').replaceChild(this.quote, document.querySelector('.quote-block').firstChild);
        } else {
            this.elements[this.elementNumber - 1].classList.add('primary');
            this.elements[this.elementNumber - 1].classList.remove('small');
            this.quote = this.elements[this.elementNumber - 1].firstElementChild.cloneNode(true);
            document.querySelector('.quote-block').replaceChild(this.quote, document.querySelector('.quote-block').firstChild);
        }
        let index = 2;
        for (let element of this.elements) {
            this.currentElement.style.order = index;
            index++;
            index = index % this.elementNumber;
            this.currentElement.nextElementSibling ? this.currentElement = this.currentElement.nextElementSibling : this.currentElement = this.elements[0];
            this.currentElement.style.order = index;
        }
    }
    animate() {
        this.customers.classList.remove('animate');
        this.customers.offsetWidth;
        this.customers.classList.add('animate');

        this.currentElement = document.querySelector('.primary');
        this.currentElement.classList.remove('primary');
        this.currentElement.classList.add('small');

    }
}
class Calendar {
    constructor(elementClass) {
        let name = '.mini-clndr' + elementClass;
        let parentName = '.date' + elementClass;
        $(name).clndr({
            clickEvents: {
                click: function (target) {
                    if (document.querySelector(".selected")) {
                        document.querySelector(".selected").classList.remove("selected");
                    }
                    target.element.firstElementChild.classList.add("selected");
                    document.querySelector(elementClass).firstElementChild.lastElementChild.value = target.date._i;
                },

            },
        });

        $(elementClass).on('click', function () {
            document.querySelector(parentName).classList.add('calendar-visible');
        });

        $(document).on('click', function (event) {
            if (!$(event.target).parents().is(elementClass)) {
                document.querySelector(parentName).classList.remove('calendar-visible');
            }
        });
        $(name).on('click', function (event) {
            event.stopPropagation();
        });
    }
}

function setDate(date, selector) {
    var dd = date.getDate();
    if (dd.toString().length == 1) {
        dd = "0" + dd;
    }
    var mm = date.getMonth() + 1;
    if (mm.toString().length == 1) {
        mm = "0" + mm;
    }
    var yyyy = date.getFullYear();

    date = yyyy + "-" + mm + "-" + dd;
    document.querySelector(selector).firstElementChild.lastElementChild.value = date;

}

function calculateTop(element) {

    _top = 0;
    do {
        _top = _top + element.offsetTop;
        element = element.offsetParent;
    }
    while (element != document.body)

    return _top;
}

function animateElements(elements, buttons) {
    for (let element of elements) {
        if (window.pageYOffset + window.innerHeight > calculateTop(element)) {
            element.classList.add('animate-up');
        }
    }
    for (let button of buttons) {
        if (window.pageYOffset + window.innerHeight > calculateTop(button)) {
            button.classList.add('button-animate');
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {

    let carousel = new Carousel();
    document.querySelector('.next').addEventListener('click', function () {
        carousel.customers.classList.remove('is-reversing');
        carousel.animate();
        carousel.next();
    });
    document.querySelector('.prev').addEventListener('click', function () {
        carousel.customers.classList.add('is-reversing');
        carousel.animate();
        carousel.previous();
    })
    calendar = new Calendar('.from');
    calendar = new Calendar('.to');

    let peopleInput = document.querySelector('.people-number');
    document.querySelector('.number-up').addEventListener('click', () => {
        peopleInput.value++;
    });
    document.querySelector('.number-down').addEventListener('click', () => {
        if (peopleInput.value > 1) {
            peopleInput.value--;
        }
    });

    let today = new Date();
    setDate(today, '.from');
    setDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7), '.to');

    elementsToAnimate = document.querySelectorAll('h1, h2, h3, .description');
    buttonsToAniamte = document.querySelectorAll('.primary-button');
    console.log(buttonsToAniamte);
    animateElements(elementsToAnimate, buttonsToAniamte);
    window.onscroll = function () {
        animateElements(elementsToAnimate, buttonsToAniamte);
    };
});