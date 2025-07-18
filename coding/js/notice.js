// js/notice-list.js

const perPage = 8;
const totalPages = Math.ceil(window.noticeData.length / perPage);
let currentPage = 1;

function renderList() {
    const $list = document.getElementById('noticeList');
    $list.innerHTML = '';
    const start = (currentPage - 1) * perPage;
    const pageItems = window.noticeData.slice(start, start + perPage);

    pageItems.forEach((item) => {
        $list.innerHTML += `
        <li>
            <a href="/coding/cs/notice-view.html?id=${item.id}" class="notice-link">
                <dl>
                    <dt>${item.title}</dt>
                    <dd>${item.desc}</dd>
                </dl>
                <p>${item.date}</p>
            </a>
        </li>
        `;
    });
}

function renderPagination() {
    const $btnNumber = document.getElementById('btnNumber');
    const $btnPrev = document.getElementById('btnPrev');
    const $btnNext = document.getElementById('btnNext');
    $btnNumber.innerHTML = '';

    let pageArr = [];
    if (totalPages <= 3) {
        for (let i = 1; i <= totalPages; i++) pageArr.push(i);
    } else if (currentPage <= 2) {
        pageArr = [1, 2, 3];
    } else if (currentPage >= totalPages - 1) {
        pageArr = [totalPages - 2, totalPages - 1, totalPages];
    } else {
        pageArr = [currentPage - 1, currentPage, currentPage + 1];
    }

    pageArr.forEach((p) => {
        const btn = document.createElement('button');
        btn.className = 'pagination-btn' + (p === currentPage ? ' active' : '');
        btn.innerText = p;
        btn.onclick = function () {
            currentPage = p;
            update();
        };
        $btnNumber.appendChild(btn);
    });

    const minVisible = pageArr[0]; // 현재 페이지그룹의 첫 번호
    const maxVisible = pageArr[pageArr.length - 1]; // 현재 페이지그룹의 마지막 번호

    // prev 스타일
    if (minVisible > 1) {
        $btnPrev.style.color = 'var(--logo-main)';
    } else {
        $btnPrev.style.color = 'var(--bk)';
    }
    $btnPrev.disabled = currentPage === 1;

    // next 스타일
    if (maxVisible < totalPages) {
        $btnNext.style.color = 'var(--logo-main)';
    } else {
        $btnNext.style.color = 'var(--bk)';
    }
    $btnNext.disabled = currentPage === totalPages;
}

document.getElementById('btnPrev').onclick = function () {
    if (currentPage > 1) {
        currentPage -= 1;
        update();
    }
};

document.getElementById('btnNext').onclick = function () {
    if (currentPage < totalPages) {
        currentPage += 1;
        update();
    }
};

function update() {
    renderList();
    renderPagination();
}

update();
