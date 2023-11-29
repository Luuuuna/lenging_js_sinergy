const modalLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');//будем блокировать скрол 
const blockPaddind = document.querySelectorAll('.lock-padding');//не позволит контенту дергаться при включении модалки.
let unblock = true; //блокируем двойные нажатия
const timeout = 800; // таймаут, равный времени анимации

if (modalLinks.length > 0) {
    modalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const modalName = link.getAttribute('href').replace('#', '');
            const currentModal = document.getElementById(modalName);
            modalOpen(currentModal);
            e.preventDefault();//запрет на перезагрузку страницы при клике на ссылку
        });
    });
}

const modalCloseElem = document.querySelectorAll('.close-modal');
if (modalCloseElem.length > 0) {
    modalCloseElem.forEach(el => {
        el.addEventListener('click', function (e) {
            modalClose(el.closest('.popup'));//ближайщий родитель закрывающего элемента
            e.preventDefault(); //запрет на перезагрузку страницы при клике на ссылку
            
        });
    });
}


function modalOpen(currentModal) {
    if (currentModal && unblock) {
        const modalActive = document.querySelector('.popup.open');
        if (modalActive) {
            modalClose(modalActive, false);
        } else {
            bodyBlock();
        }
        currentModal.classList.add('open');
        currentModal.addEventListener('click', function (e) {
            if (!e.target.closest('.popup_content')) {
                modalClose(e.target.closest('.popup'));//модалка будет закрываться по клику возле нее
            }
        });
    };
}




function modalClose(modalActive, doUnblock = true) {
    if (unblock) {
        modalActive.classList.remove('open');
        if (doUnblock) {
            bodyUnblock();
        }
    }
}

function bodyBlock() {
    const blockPaddingValue = window.innerWidth - document.querySelector('#wrapper').offsetWidth + 'px';
    console.log('blockPaddingValue = ' + blockPaddingValue);
    if (blockPaddind.length > 0) {
        blockPaddind.forEach(el => {
            el.style.paddingRight = blockPaddingValue;
        });
    }
    body.classList.add('blocked');
    document.querySelector('.navbar').classList.add('blocked');

    unblock = false;
    setTimeout(function () {
        unblock = true;
    }, timeout);
}

function bodyUnblock() {
    setTimeout(function () {
        if (blockPaddind.length > 0) {
            blockPaddind.forEach(el => {
                el.style.paddingRight = '0px';

            });
        }
        body.style.paddingRight = '0px';
        body.classList.remove('blocked');
    }, timeout);

    unblock = false;
    setTimeout(function () {
        unblock = true;
    }, timeout);
}
