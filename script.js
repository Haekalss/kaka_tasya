let currentImageIndex = 0;
let allImages = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateImagesList();
    
    // Setup file upload
    const imageUpload = document.getElementById('imageUpload');
    imageUpload.addEventListener('change', handleImageUpload);
});

// Handle image upload
function handleImageUpload(event) {
    const files = event.target.files;
    const gallery = document.getElementById('gallery');
    
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const galleryItem = createGalleryItem(e.target.result, file.name);
                gallery.appendChild(galleryItem);
                updateImagesList();
            };
            
            reader.readAsDataURL(file);
        }
    }
    
    // Reset input
    event.target.value = '';
}

// Create gallery item
function createGalleryItem(src, alt) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    const button = document.createElement('button');
    button.className = 'view-btn';
    button.textContent = 'Lihat';
    button.onclick = function() {
        openModal(this);
    };
    
    overlay.appendChild(button);
    div.appendChild(img);
    div.appendChild(overlay);
    
    return div;
}

// Update images list
function updateImagesList() {
    const images = document.querySelectorAll('.gallery-item img');
    allImages = Array.from(images);
}

// Open modal
function openModal(button) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const img = button.closest('.gallery-item').querySelector('img');
    
    // Find current image index
    currentImageIndex = allImages.indexOf(img);
    
    modal.style.display = 'block';
    modalImg.src = img.src;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Navigate between images
function navigateImage(direction) {
    currentImageIndex += direction;
    
    // Loop around
    if (currentImageIndex < 0) {
        currentImageIndex = allImages.length - 1;
    } else if (currentImageIndex >= allImages.length) {
        currentImageIndex = 0;
    }
    
    const modalImg = document.getElementById('modalImage');
    modalImg.src = allImages[currentImageIndex].src;
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateImage(1);
        }
    }
});

// Close modal when clicking outside image
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});
