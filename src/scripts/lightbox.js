let initialized = false;

export default function lightbox() {
  if (initialized) return;
  initialized = true;

  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  let currentGroup = [];
  let currentIndex = 0;

  document.querySelectorAll('.stacked-photo.photo').forEach(photo => {
    photo.addEventListener('click', (e) => {
      e.preventDefault();
      const groupName = photo.dataset.group;
      currentGroup = window.imageGroups[groupName] || [];
      currentIndex = currentGroup.length - 1;
      if (!currentGroup.length) return;
      showImage();
      lightbox.classList.add('active');
    });
  });

  function showImage() {
    const item = currentGroup[currentIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.alt || "Untitled";

    const showNav = currentGroup.length > 1;
    prevBtn.style.display = showNav ? 'block' : 'none';
    nextBtn.style.display = showNav ? 'block' : 'none';
  }

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentGroup.length;
    showImage();
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    showImage();
  });

  lightbox.addEventListener('click', (e) => {
    if (!e.target.closest('.lightbox-content')) {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
    }
  });
}
