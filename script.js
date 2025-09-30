// 네비게이션 숨김/표시 기능
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // 스크롤 방향에 따라 헤더 표시/숨김
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // 아래로 스크롤할 때 헤더 숨김
    header.classList.remove('visible');
  } else {
    // 위로 스크롤할 때 헤더 표시
    header.classList.add('visible');
  }
  
  lastScrollY = currentScrollY;
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 스크롤 애니메이션
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// 애니메이션할 요소들 관찰
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// 인쇄 기능
function printPortfolio() {
  // 인쇄 대화상자 열기
  window.print();
}

// 이미지 출력 기능
function exportToImage() {
  // 헤더를 임시로 숨김 (이미지에 포함되지 않도록)
  const header = document.querySelector('header');
  const originalDisplay = header.style.display;
  header.style.display = 'none';
  
  // html2canvas로 스크린샷 생성
  html2canvas(document.body, {
    backgroundColor: '#1a1a2e',
    scale: 2,
    useCORS: true,
    allowTaint: true
  }).then(canvas => {
    // 헤더 다시 표시
    header.style.display = originalDisplay;
    
    // 이미지 다운로드
    const link = document.createElement('a');
    link.download = '개발자_포트폴리오.png';
    link.href = canvas.toDataURL();
    link.click();
  }).catch(error => {
    // 헤더 다시 표시
    header.style.display = originalDisplay;
    console.error('이미지 생성 중 오류가 발생했습니다:', error);
    alert('이미지 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
  });
}

// 페이지 로드 시 헤더 숨김
window.addEventListener('load', () => {
  header.classList.remove('visible');
});
