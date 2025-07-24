document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.tabs__item');
  var contents = document.querySelectorAll('.tab-content');
  tabs.forEach(function (tab, idx) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('tabs__item--active');
      });
      contents.forEach(function (c) {
        c.classList.remove('tab-content--active');
      });
      tab.classList.add('tabs__item--active');
      contents[idx].classList.add('tab-content--active');
    });
  });
});
