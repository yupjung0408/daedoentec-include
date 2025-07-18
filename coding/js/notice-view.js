// js/notice-view.js

// URL에서 ?id=3 형태로 id값 추출
function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get('id')) || 1;
}

// 공지 가져오기/조회수 증가
function renderNotice() {
    const id = getIdFromUrl();
    const notice = window.noticeData.find((n) => n.id === id);
    if (!notice) {
        document.getElementById('noticeTitle').innerText = '공지사항을 찾을 수 없습니다.';
        return;
    }
    notice.views = (notice.views || 0) + 1; // 조회수 증가

    document.getElementById('noticeTitle').innerText = notice.title;
    document.getElementById('noticeDate').innerText = notice.date;
    document.getElementById('noticeViews').innerText = notice.views;

    // 파일
    if (notice.file) {
        document.getElementById('noticeDownload').innerHTML = `
            <strong>첨부파일</strong>
            <a href="/files/${notice.file}" class="download-btn" download>
                ${notice.file}<span></span>
            </a>
        `;
    } else {
        document.getElementById('noticeDownload').innerHTML = '';
    }

    // 내용 및 이미지
    document.getElementById('noticeBox').innerHTML = `
        ${notice.img ? `<img src="${notice.img}" alt="${notice.title}" />` : ''}
        <p>${notice.desc}</p>
    `;

    // 이전글/다음글
    renderPrevNext(id);
}

// 이전/다음글 렌더
function renderPrevNext(id) {
    const data = window.noticeData;
    const idx = data.findIndex((n) => n.id === id);

    // 이전글
    const prev = data[idx - 1];
    if (prev) {
        document.getElementById('noticePrev').innerHTML = `
            <button class="view-prev-btn" onclick="location.href='/coding/cs/notice-view.html?id=${prev.id}'">이전글</button>
            <div class="notice-view-prev-title">
                <strong>${prev.title}</strong>
                <p>${prev.date}</p>
            </div>
        `;
    } else {
        document.getElementById('noticePrev').innerHTML = `
            <button class="view-prev-btn" disabled>이전글</button>
            <div class="notice-view-prev-title">
                <strong>이전글이 없습니다.</strong>
                <p></p>
            </div>
        `;
    }

    // 다음글
    const next = data[idx + 1];
    if (next) {
        document.getElementById('noticeNext').innerHTML = `
            <button class="view-next-btn" onclick="location.href='/coding/cs/notice-view.html?id=${next.id}'">다음글</button>
            <div class="notice-view-next-title">
                <strong>${next.title}</strong>
                <p>${next.date}</p>
            </div>
        `;
    } else {
        document.getElementById('noticeNext').innerHTML = `
            <button class="view-next-btn" disabled>다음글</button>
            <div class="notice-view-next-title">
                <strong>다음글이 없습니다.</strong>
                <p></p>
            </div>
        `;
    }
}

document.getElementById('backToList').onclick = function () {
    location.href = '/coding/cs/notice.html';
};

renderNotice();
