// js/resources-data.js
window.resourcesData = Array.from({ length: 16 }, (_, i) => {
    const no = 16 - i;
    let data = {
        no,
        title: `자료실 제목 ${no}번입니다.`,
        date: `2025-05-${String((i % 30) + 1).padStart(2, '0')}`,
        views: 574 + Math.floor(Math.random() * 50),
        desc: `자료실 ${no}번의 내용입니다.`,
        img: '', // 필요하면 이미지 URL
        file: '', // 필요하면 파일명
    };
    return data;
});

// 특정 데이터 예시 (수정)
const idx13 = window.resourcesData.findIndex((item) => item.no === 13);
if (idx13 !== -1) {
    window.resourcesData[idx13].title = '㈜대도엔텍 투명홍수방어벽 홍보영상';
    window.resourcesData[idx13].date = '2025-07-11';
    window.resourcesData[idx13].views = 700;
    window.resourcesData[idx13].desc = '㈜대도엔텍 투명홍수방어벽 홍보영상입니다.';
    window.resourcesData[idx13].img = '/coding/images/cs/resources-view-pic.png';
    window.resourcesData[idx13].file = '홍보영상.pdf';
}
