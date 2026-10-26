export function typewriterLoop(element, word) {
  // Initialize element as empty and create the cursor element
  element.textContent = '';
  
  let cursor = document.createElement('span');
  cursor.textContent = '_';
  cursor.className = 'cursor';
  cursor.style.display = 'none'; // Hidden initially
  
  // Insert cursor right after the element
  if (element.nextSibling) {
    element.parentNode.insertBefore(cursor, element.nextSibling);
  } else {
    element.parentNode.appendChild(cursor);
  }

  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    if (!isDeleting) {
      if (charIndex < word.length) {
        element.textContent = word.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(tick, 100);
      } else {
        // Word is fully displayed
        cursor.style.display = 'inline-block'; // Cursor appears
        setTimeout(() => {
          isDeleting = true;
          cursor.style.display = 'none'; // Disappears during deleting
          tick();
        }, 1000);
      }
    } else {
      if (charIndex > 0) {
        element.textContent = word.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(tick, 100);
      } else {
        // Word is fully deleted
        setTimeout(() => {
          isDeleting = false;
          tick();
        }, 500);
      }
    }
  }

  tick();
}
