document.addEventListener('DOMContentLoaded', function () {
    //изменение цвета фона меню
    const navInit = () => {
        const navbarCollapsable = document.body.querySelector('#mainNav');

        if (window.scrollY === 0) {
            navbarCollapsable.classList.remove('navbar-shrink');
        } else {
            navbarCollapsable.classList.add('navbar-shrink');
        }
        //алгоритм вычисления текущего местоположения 
        const links = document.querySelectorAll('.nav-link');//ищем все навигационные ссылки
        const sections = document.querySelectorAll('section');//ищем все секции


        sections.forEach(section => {//для каждой секции
            if (window.scrollY >= (section.offsetTop - 100)) { //если страница прокручена больше чем растояние секции от начала страницы.
                console.log(window.scrollY + ' >= ' + section.offsetTop + ' ' + section.id);//отладка
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.href.split('#').pop() === section.id) {//если атрибуты href без # === id секции 
                        link.classList.add('active');
                    }
                });

            }

        });
    };

    //анимация контента

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }


    //1 способ

    const animItems = document.querySelectorAll('.animate');
    if (animItems.length > 0) {
        console.log('here!');
        function onEntry(params) {
            animItems.forEach(item => {
                const itemHeight = item.offsetHeight;//высота анимируемого объекта
                const itemOffset = offset(item).top; // позиция объекта от верхнего края
                const startPos = 2;//Параметр регулирования старта анимации.
                const animPoint = document.documentElement.clientHeight - itemHeight / startPos;//

                if (itemHeight > document.documentElement.clientHeight) { //в случае если высота элемента больше высоты страницы, то нужно пересчитать
                    const animpoint = document.documentElement.clientHeight - document.documentElement.clientHeight / startPos;
                }
                if ((scrollY > itemOffset - animPoint) && scrollY < itemOffset + itemHeight) {
                    item.classList.add('show');
                } else {
                    if(!item.classList.contains('no-hide')){
                        item.classList.remove('show');
                    }

                }
            });
        }
    }

    // //2 способ (не будет работать горизонтальная анимация, а только вертикальная)

    // function onEntry(entry) {
    //     console.log("I'm here");
    //     entry.forEach(change => {
    //         if (change.isIntersecting) {
    //             change.target.classList.add('show');
    //         } else {
    //             change.target.classList.remove('show');
    //         }
    //     });
    // }
    // let options ={threshold: [0.5]};
    // let observer = new IntersectionObserver(onEntry, options);
    // let elements = document.querySelectorAll('.animate');

    // for (let elm of elements) {
    //     observer.observe(elm);
    // }



    onEntry();
    navInit();
    window.addEventListener('scroll', () => {
        navInit();//ф-ция запускается при скроле страницы
        onEntry();
    });
    window.addEventListener('resize', () => {
        navInit();//ф-ция запускается при ресайзе страницы
    });

});