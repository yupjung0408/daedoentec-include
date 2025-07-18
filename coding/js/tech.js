const tabButtons = document.querySelectorAll('.tech-tab-menu button');
const techInfo = document.querySelectorAll('.tech-certifications-info');

tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        // 버튼 활성화
        tabButtons.forEach((b) => b.parentElement.classList.remove('active'));
        btn.parentElement.classList.add('active');

        // 정보 영역 전환
        techInfo.forEach((box) => box.classList.toggle('active', box.id === `${target}-list`));
    });
});
