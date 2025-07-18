/* file-upload */

const fileInput = document.getElementById('file');
const fileNameDisplay = document.querySelector('.file-name');

fileInput.addEventListener('change', function () {
    if (this.files.length > 0) {
        fileNameDisplay.textContent = this.files[0].name;
        fileNameDisplay.style.color = 'var(--bk)';
    } else {
        fileNameDisplay.textContent = '파일을 선택해주세요.';
        fileNameDisplay.style.color = '#var(--gray)';
    }
});
