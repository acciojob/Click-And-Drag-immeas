// Your code here.
const items = document.querySelectorAll('.item');
const container = document.querySelector('.items');
let selectedElement = null;
let offsetX, offsetY;

items.forEach(item => {
    item.addEventListener('mousedown', (event) => {
        selectedElement = event.target;
        const rect = selectedElement.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        
        selectedElement.style.position = 'absolute';
        selectedElement.style.zIndex = 1000;
    });
});

document.addEventListener('mousemove', (event) => {
    if (!selectedElement) return;
    
    let x = event.clientX - offsetX;
    let y = event.clientY - offsetY;
    
    // Get container boundaries
    const containerRect = container.getBoundingClientRect();
    const elementRect = selectedElement.getBoundingClientRect();
    
    // Ensure the element stays inside the container
    if (x < containerRect.left) x = containerRect.left;
    if (y < containerRect.top) y = containerRect.top;
    if (x + elementRect.width > containerRect.right) x = containerRect.right - elementRect.width;
    if (y + elementRect.height > containerRect.bottom) y = containerRect.bottom - elementRect.height;
    
    selectedElement.style.left = x + 'px';
    selectedElement.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
    if (selectedElement) {
        selectedElement.style.zIndex = '';
        selectedElement = null;
    }
});
