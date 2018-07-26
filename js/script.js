class Carousel {
    constructor() {

        this.elements = document.querySelectorAll('.customer');
        this.elementNumber = this.elements.length;
        for (let [index, element] of this.elements.entries()) {
            element.style.order = index;
        }
    }
    previous() {
        let currentElement = document.querySelector('.primary');

        currentElement.classList.remove('primary');
        currentElement.classList.add('small');
        if (currentElement.nextElementSibling) {
            currentElement.nextElementSibling.classList.add('primary');
            currentElement.nextElementSibling.classList.remove('small');
        } else {
            this.elements[0].classList.add('primary');
            this.elements[0].classList.remove('small');
        }

        let index = 2;
        for (let element of this.elements) {
            currentElement.style.order = index;
            index--;
            if (index == -1) {
                index = this.elementNumber;
            }
            currentElement.nextElementSibling ? currentElement = currentElement.nextElementSibling : currentElement = this.elements[0];
            currentElement.style.order = index;
        }
    }
    next() {
        let currentElement = document.querySelector('.primary');

        currentElement.classList.remove('primary');
        currentElement.classList.add('small');
        if (currentElement.previousElementSibling) {
            currentElement.previousElementSibling.classList.add('primary');
            currentElement.previousElementSibling.classList.remove('small');
        } else {
            this.elements[this.elementNumber - 1].classList.add('primary');
            this.elements[this.elementNumber - 1].classList.remove('small');
        }


        let index = 2;
        for (let element of this.elements) {
            currentElement.style.order = index;
            index++;
            index = index % this.elementNumber;
            currentElement.nextElementSibling ? currentElement = currentElement.nextElementSibling : currentElement = this.elements[0];
            currentElement.style.order = index;
        }
    }
}



document.addEventListener("DOMContentLoaded", function () {

    let carousel = new Carousel();
    document.querySelector('.next').addEventListener('click', function () {
        carousel.next();
    });
    document.querySelector('.prev').addEventListener('click', function () {
        carousel.previous();
    })

});