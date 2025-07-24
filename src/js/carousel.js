document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const imgs = carousel.querySelectorAll('.carousel-img');
  const indicators = carousel.querySelectorAll('.carousel-indicators span');
  let current = 0;
  let timer = null;
  const total = imgs.length;

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    indicators.forEach((el, i) => el.classList.toggle('active', i === current));
  }

  function next() {
    goTo(current + 1);
  }

  function startAuto() {
    timer = setInterval(next, 5000);
  }
  function stopAuto() {
    clearInterval(timer);
  }

  indicators.forEach((el, i) => {
    el.addEventListener('click', () => {
      goTo(i);
      stopAuto();
      startAuto();
    });
  });

  // 手機滑動事件
  let startX = 0;
  let dx = 0;
  track.addEventListener('touchstart', (e) => {
    stopAuto();
    startX = e.touches[0].clientX;
    dx = 0;
  });
  track.addEventListener('touchmove', (e) => {
    dx = e.touches[0].clientX - startX;
  });
  track.addEventListener('touchend', () => {
    if (dx > 50) goTo(current - 1);
    else if (dx < -50) goTo(current + 1);
    startAuto();
  });

  // 桌機滑鼠拖曳事件
  let isDown = false;
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    stopAuto();
    startX = e.clientX;
    dx = 0;
  });
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    dx = e.clientX - startX;
  });
  track.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    if (dx > 50) goTo(current - 1);
    else if (dx < -50) goTo(current + 1);
    startAuto();
  });
  track.addEventListener('mouseleave', () => {
    if (!isDown) return;
    isDown = false;
    if (dx > 50) goTo(current - 1);
    else if (dx < -50) goTo(current + 1);
    startAuto();
  });

  goTo(0);
  startAuto();
});
