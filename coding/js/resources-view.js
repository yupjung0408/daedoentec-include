// js/resources-view.js

function getNoFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get('no')) || window.resourcesData[0].no; // 기본 최신글
}

function renderResource() {
    const no = getNoFromUrl();
    const data = window.resourcesData;
    const resource = data.find((item) => item.no === no);

    if (!resource) {
        document.querySelector('.resources-view-title h4').innerText = '자료를 찾을 수 없습니다.';
        document.querySelector('.resources-view-number').innerHTML = '';
        document.querySelector('.resources-view-box').innerHTML = '';
        return;
    }

    // 조회수 증가(메모리상)
    resource.views = Number(resource.views || 0) + 1;

    document.querySelector('.resources-view-title h4').innerText = resource.title;
    document.querySelectorAll('.resources-view-number p')[0].innerText = resource.date;
    document.querySelectorAll('.resources-view-number p')[1].innerText = resource.views;

    // 내용 및 이미지 (desc, img)
    document.querySelector('.resources-view-box').innerHTML = `
        ${resource.img ? `<img src="${resource.img}" alt="${resource.title}">` : ''}
        <p>${resource.desc || ''}</p>
    `;

    renderPrevNext(no);
}

// 이전/다음글
function renderPrevNext(no) {
    const data = window.resourcesData.slice().sort((a, b) => b.no - a.no); // 최신 → 옛날
    const idx = data.findIndex((item) => item.no === no);

    // 이전글(더 큰 no)
    const prev = data[idx + 1];
    if (prev) {
        document.querySelector('.resources-view-prev').innerHTML = `
            <button class="view-prev-btn" onclick="location.href='/coding/cs/resources-view.html?no=${prev.no}'">이전글</button>
            <div class="resources-view-prev-title">
                <strong>${prev.title}</strong>
                <p>${prev.date}</p>
            </div>
        `;
    } else {
        document.querySelector('.resources-view-prev').innerHTML = `
            <button class="view-prev-btn" disabled>이전글</button>
            <div class="resources-view-prev-title">
                <strong>이전글이 없습니다.</strong>
                <p></p>
            </div>
        `;
    }

    // 다음글(더 작은 no)
    const next = data[idx - 1];
    if (next) {
        document.querySelector('.resources-view-next').innerHTML = `
            <button class="view-next-btn" onclick="location.href='/coding/cs/resources-view.html?no=${next.no}'">다음글</button>
            <div class="resources-view-next-title">
                <strong>${next.title}</strong>
                <p>${next.date}</p>
            </div>
        `;
    } else {
        document.querySelector('.resources-view-next').innerHTML = `
            <button class="view-next-btn" disabled>다음글</button>
            <div class="resources-view-next-title">
                <strong>다음글이 없습니다.</strong>
                <p></p>
            </div>
        `;
    }
}

// 목록버튼
document.querySelector('.back-list-btn button').onclick = function () {
    location.href = '/coding/cs/resources.html';
};

renderResource();
