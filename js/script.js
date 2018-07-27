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

});