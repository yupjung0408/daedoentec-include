/* info-bg */
const infoImg = document.querySelector('.info-img');
const infoDim = document.querySelector('.info-dim');
const infoTitle = document.querySelector('.info-title');

// pin의 대상을 info-pin-area로!
gsap.timeline({
    scrollTrigger: {
        trigger: '.info-pin-area',
        start: 'bottom bottom',
        end: '+=100%',
        scrub: true,
        pin: '.info-pin-area',
        anticipatePin: 1,
        // markers: true,
        onUpdate: (self) => {
            const p = self.progress;
            const minHeight = 40;
            const maxHeight = 100;
            const minTop = 64.8;
            const maxTop = 0;

            // info-img와 info-dim에 모두 같은 값 적용!
            [infoImg, infoDim].forEach((el) => {
                el.style.height = `${minHeight + (maxHeight - minHeight) * p}vh`;
                el.style.top = `${minTop + (maxTop - minTop) * p}vh`;
            });

            infoDim.style.background = `rgba(0,0,0,${0.45 * p})`;

            if (p > 0.6) {
                infoTitle.classList.add('active');
            } else {
                infoTitle.classList.remove('active');
            }

            //  여백 방지용 강제 보정
            if (p >= 0.99) {
                infoImg.style.top = '0';
                infoImg.style.height = '100vh';
                infoDim.style.top = '0';
                infoDim.style.height = '100vh';
            }
        },
    },
});

/* visual-slider */

const visualSwiper = new Swiper('.visual-slider', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    speed: 500,

    // If we need pagination
    pagination: {
        el: '.visual-slider-pagination',
        clickable: true, // 클릭가능 */
    },
    // 마우스 드래그 & 터치 스와이프 비활성화
    allowTouchMove: false,
});

/* s: product-slider */

// 1. 페이지네이션 라벨 정의
const productPaginationTitles = ['가동보', '홍수방어벽', '홍수방어문', '수문'];
const PAGINATION_AUTOPLAY_DELAY = 4000; // Swiper autoplay와 동일하게 맞추세요!
const SWIPER_SPEED = 1000;

// 2. 페이지네이션 렌더 함수
function renderProductPagination(activeIdx = 0) {
    const pagination = document.querySelector('.product-slider-pagination');
    pagination.innerHTML = '';
    productPaginationTitles.forEach((title, idx) => {
        pagination.innerHTML += `
        <div class="product-pagination-item${activeIdx === idx ? ' active' : ''}" data-index="${idx}">
            <div class="product-pagination-stroke-bg"></div>
            <div class="product-pagination-stroke-fg"></div>
            <div class="product-pagination-label">${title}</div>
        </div>
        `;
    });
}

// 3. stroke 애니메이션 함수
function animateProductPaginationStroke(idx) {
    document.querySelectorAll('.product-pagination-stroke-fg').forEach((el, i) => {
        el.style.transition = 'none';
        el.style.width = '0%';
        if (i === idx) {
            setTimeout(() => {
                el.style.transition = `width ${PAGINATION_AUTOPLAY_DELAY}ms linear`;
                el.style.width = '100%';
            }, 20); // transition 버그 방지
        }
    });
}

// 4. Swiper 초기화/연동
let productSwiper;

function initProductSwiper() {
    renderProductPagination(0);

    productSwiper = new Swiper('.product-slider', {
        loop: true,
        loopedSlides: productPaginationTitles.length,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: SWIPER_SPEED,
        autoplay: {
            delay: PAGINATION_AUTOPLAY_DELAY,
            disableOnInteraction: false,
            waitForTransition: false,
        },
        allowTouchMove: false,
        on: {
            init: function () {
                // 첫 슬라이드 UI 및 프로그레스바만 수동으로 애니메이션
                const liEls = document.querySelectorAll('.product-list li');
                liEls.forEach((li) => li.classList.remove('active'));
                liEls[this.realIndex].classList.add('active');
                renderProductPagination(this.realIndex);
                animateProductPaginationStroke(this.realIndex); // 첫 프로그레스바

                // ★ 추가: 첫 프로그레스바 재실행 방지(첫 전환에도 애니메이션이 겹치지 않게)
                this.on('slideChangeTransitionStart', function handler() {
                    // 전환 시작할 때마다 프로그레스바 애니메이션
                    const liEls = document.querySelectorAll('.product-list li');
                    liEls.forEach((li) => li.classList.remove('active'));
                    liEls[this.realIndex].classList.add('active');
                    renderProductPagination(this.realIndex);
                    animateProductPaginationStroke(this.realIndex);

                    // 첫 전환 이후, 핸들러는 그대로 두고
                    // (추가적인 타이머 등 없음)
                });
            },
        },
    });

    document.querySelector('.product-slider-pagination').addEventListener('click', (e) => {
        const item = e.target.closest('.product-pagination-item');
        if (item) {
            const idx = parseInt(item.getAttribute('data-index'));
            productSwiper.slideToLoop(idx, SWIPER_SPEED);
        }
    });
}
initProductSwiper();
