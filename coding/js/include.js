// js/include.js

function includeHeaderFooter() {
    // base href="/"일 경우: /coding/include/header.html
    // base href="/daedoentec/"일 경우: /daedoentec/coding/include/header.html
    const headerPromise = fetch('include/header.html')
        .then((res) => res.text())
        .then((data) => {
            document.getElementById('include-header').innerHTML = data;
        });

    const footerPromise = fetch('include/footer.html')
        .then((res) => res.text())
        .then((data) => {
            document.getElementById('include-footer').innerHTML = data;
        });

    return Promise.all([headerPromise, footerPromise]);
}

// 전역에서 쓸 수 있게 export (만약 ES6 import/export 쓰면)
// window.includeHeaderFooter = includeHeaderFooter;

// window 등록은 혹시라도 scope 충돌이나 전역 선언 보장이 필요할 때 쓰는 안전장치
