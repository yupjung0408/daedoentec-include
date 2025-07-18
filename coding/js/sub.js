const tabButtons = document.querySelectorAll('.location-tab-menu button');
const infoBoxes = document.querySelectorAll('.map-info');
const mapBoxes = document.querySelectorAll('.map-box');

tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        // 버튼 활성화
        tabButtons.forEach((b) => b.parentElement.classList.remove('active'));
        btn.parentElement.classList.add('active');

        // 정보 영역 전환
        infoBoxes.forEach((box) => box.classList.toggle('active', box.id === `${target}-map-info`));

        // 지도 영역 전환
        mapBoxes.forEach((map) => map.classList.toggle('active', map.id === `${target}-map`));
    });
});
