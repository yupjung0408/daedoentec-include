// includeHeaderFooter가 완료된 후 실행

includeHeaderFooter().then(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    // // TOP버튼

    // TOP 버튼: footer에 도달하면 나타나고 클릭 시 맨 위로 이동
    const btnTop = document.querySelector('.btn-top');

    // TOP 버튼 애니메이션
    // gsap.from(btnTop, {
    //     autoAlpha: 0,
    //     scrollTrigger: {
    //         trigger: '.info',
    //         // markers: true,
    //         start: 'top 100%',
    //         toggleActions: 'play none play reverse',
    //     },
    // });

    // 클릭했을 때 상단으로 이동
    btnTop.addEventListener('click', () => {
        gsap.to(window, { duration: 0.5, scrollTo: 0 });
    });

    /* //e: TOP 버튼 */

    // GNB
    const header = document.querySelector('#header');
    const gnb = document.querySelector('.gnb');

    gnb.addEventListener('mouseenter', () => {
        header.classList.add('active');
    });
    header.addEventListener('mouseleave', () => {
        header.classList.remove('active');
    });

    // lang
    const langToggleBtn = document.querySelector('.lang-toggle');
    const langMenu = document.querySelector('.lang-menu');
    const langArrow = document.querySelector('.lang-arrow');

    langToggleBtn.addEventListener('click', () => {
        langMenu.classList.toggle('active');
        langArrow.classList.toggle('rotated'); // 화살표 회전
    });
});

/* //e: header */
