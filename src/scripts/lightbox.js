export default function initLightbox() {
  const groups = {
    photo1: [
      { src: "/images/gallery/art/robotics/robotics-1.jpg", alt: "Team 24124, Sturgeon Meet 1" },
      { src: "/images/gallery/art/robotics/robotics-3.jpg", alt: "Team 24124, Sturgeon Meet 1" },
      { src: "/images/gallery/art/robotics/robotics-2.jpg", alt: "Team 26145, Sturgeon Meet 1" },
      { src: "/images/gallery/art/robotics/robotics-4.jpg", alt: "Team 24124, Winter Pep Rally" },
      { src: "/images/gallery/art/robotics/robotics-5.jpg", alt: "Team 24124, Winter Pep Rally" },
      { src: "/images/gallery/art/robotics/robotics-6.jpg", alt: "Team 24124, Robotics Room" },
      { src: "/images/gallery/art/robotics/robotics-7.jpg", alt: "Team 24124, Robotics Room" },
      { src: "/images/gallery/art/robotics/robotics-8.jpg", alt: "Team 24124, Provincial Championships" },
      { src: "/images/gallery/art/robotics/robotics-9.jpg", alt: "Team 24124, Provincial Championships" }
    ],
    photo2: [
      { src: "https://picsum.photos/id/1016/1200/800", alt: "Photo 2" },
      { src: "https://picsum.photos/id/1017/1200/800", alt: "Photo 2 - Variant 1" },
      { src: "https://picsum.photos/id/1019/1200/800", alt: "Photo 2 - Variant 2" }
    ],
    art1: [
      { src: "/images/gallery/art/Artboard 4.png", alt: "Cat" },
      { src: "/images/gallery/art/Artboard 4.png", alt: "Dawg" },
      { src: "/images/gallery/art/bingus.png", alt: "Bingus" }
    ],
    art2: [
      { src: "/images/gallery/art/lvespls.png", alt: "A greyscale portrait of an upcoming indie artist, Love Spells." }
    ]
  };

  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  let currentGroup = [];
  let currentIndex = 0;

  document.querySelectorAll('.photo').forEach(photo => {
    photo.addEventListener('click', (e) => {
      e.preventDefault();
      const groupName = photo.dataset.group;
      currentGroup = groups[groupName];
      currentIndex = 0;
      showImage();
      lightbox.classList.add('active');
    });
  });

  function showImage() {
    const item = currentGroup[currentIndex];
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.alt || "Untitled";

    if (currentGroup.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'block';
      nextBtn.style.display = 'block';
    }
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
