// js/resources.js

const perPage = 4;
const totalPages = Math.ceil(window.resourcesData.length / perPage);
let currentPage = 1;

function renderResourcesList() {
    const $tbody = document.getElementById('resourcesTbody');
    $tbody.innerHTML = '';
    const start = (currentPage - 1) * perPage;
    const pageItems = window.resourcesData.slice(start, start + perPage);

    pageItems.forEach((item) => {
        $tbody.innerHTML += `
            <tr>
                <td class="col-no">${item.no}</td>
                <td class="col-title">
                    <a href="/coding/cs/resources-view.html?no=${item.no}">${item.title}</a>
                </td>
                <td class="col-date">${item.date}</td>
                <td class="col-views">${item.views}</td>
            </tr>
        `;
    });

    // Total 개수 업데이트
    document.querySelector('.resources-list-total span').innerText = window.resourcesData.length;
}

function renderResourcesPagination() {
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
            updateResources();
        };
        $btnNumber.appendChild(btn);
    });

    // 컬러(비주얼)는 그룹 기준
    if (pageArr[0] > 1) {
        $btnPrev.style.color = 'var(--logo-main)';
    } else {
        $btnPrev.style.color = 'var(--bk)';
    }
    if (pageArr[pageArr.length - 1] < totalPages) {
        $btnNext.style.color = 'var(--logo-main)';
    } else {
        $btnNext.style.color = 'var(--bk)';
    }

    // 실제 비활성(disabled)은 "첫/끝"에서만
    $btnPrev.disabled = currentPage === 1;
    $btnNext.disabled = currentPage === totalPages;
}

// prev/next 클릭
document.getElementById('btnPrev').onclick = function () {
    if (currentPage > 1) {
        currentPage -= 1;
        updateResources();
    }
};
document.getElementById('btnNext').onclick = function () {
    if (currentPage < totalPages) {
        currentPage += 1;
        updateResources();
    }
};

function updateResources() {
    renderResourcesList();
    renderResourcesPagination();
}

updateResources();
