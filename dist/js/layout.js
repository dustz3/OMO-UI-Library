const navMap = {
  home: 'index.html',
  mall: 'mall.html',
  code: 'code.html',
  voucher: 'voucher.html',
  profile: 'profile.html',
};
function loadPage(page) {
  if (navMap[page]) {
    //- 首頁不覆蓋，僅載入其他頁
    if (page === 'home') return;
    fetch(navMap[page])
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.querySelector('.content');
        if (content) {
          document.getElementById('main-content').innerHTML = content.innerHTML;
        }
      });
  }
}
//- 頁面初始時與每次分頁切換都自動高亮正確的 nav-item
function highlightNav() {
  var navItems = document.querySelectorAll('.bottom-nav .nav-item');
  navItems.forEach(function (item) {
    item.classList.remove('active');
  });
  var path = location.pathname;
  if (path.endsWith('index.html') || path === '/' || path === '/index') {
    navItems[0].classList.add('active');
  } else if (path.endsWith('mall.html')) {
    navItems[1].classList.add('active');
  } else if (path.endsWith('code.html')) {
    navItems[2].classList.add('active');
  } else if (path.endsWith('voucher.html')) {
    navItems[3].classList.add('active');
  } else if (path.endsWith('profile.html')) {
    navItems[4].classList.add('active');
  }
}
window.addEventListener('DOMContentLoaded', highlightNav);

document.addEventListener('DOMContentLoaded', function () {
  var lineBtn = document.querySelector('.login-btn--line');
  if (lineBtn) {
    lineBtn.addEventListener('click', function () {
      window.location.href = 'index.html';
    });
  }
});
document.querySelectorAll('.bottom-nav .nav-item').forEach((item) => {
  item.addEventListener('click', function () {
    setTimeout(highlightNav, 10); //- 等待路徑變更後再高亮
    const page = this.getAttribute('data-page');
    loadPage(page);
  });
});

// login form step 切換
if (document.getElementById('form-step1')) {
  document
    .getElementById('form-step1')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      this.style.display = 'none';
      document.getElementById('form-step2').style.display = '';
      document.getElementById('form-step3').style.display = 'none';
    });
}
if (document.getElementById('form-step2')) {
  document
    .getElementById('form-step2')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      this.style.display = 'none';
      document.getElementById('form-step3').style.display = '';
      document.getElementById('form-step1').style.display = 'none';
    });
}
if (document.getElementById('form-step3')) {
  document
    .getElementById('form-step3')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      window.location.href = 'index.html';
    });
}
