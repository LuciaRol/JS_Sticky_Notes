document.addEventListener('DOMContentLoaded', () => {
    const stickyContainer = document.getElementById('stickies-container');
    const createStickyButton = document.getElementById('create');
    const stickyTitleInput = document.getElementById('stickytitle');
    const stickyTextInput = document.getElementById('stickytext');
  
    createStickyButton.addEventListener('click', createSticky);
  
    function createSticky() {
      const title = stickyTitleInput.value;
      const text = stickyTextInput.value;
  
      if (title.trim() === '' && text.trim() === '') {
        alert('Please enter a title or note text.');
        return;
      }
  
      const newSticky = document.createElement('div');
      newSticky.classList.add('sticky', 'draggable', 'editable');
      newSticky.innerHTML = `
        <h3 contenteditable="true">${title}</h3>
        <p contenteditable="true">${text}</p>
        <span class="deletesticky" onclick="deleteSticky(this)">&times;</span>
      `;
  
      stickyContainer.appendChild(newSticky);
  
      // Make the new sticky note draggable and editable
      makeStickyDraggable(newSticky);
      makeStickyEditable(newSticky);
  
      // Clear input fields
      stickyTitleInput.value = '';
      stickyTextInput.value = '';
    }
  
    // Function to make a sticky note draggable
    function makeStickyDraggable(sticky) {
      let isDragging = false;
      let offsetX, offsetY;
  
      sticky.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - sticky.getBoundingClientRect().left;
        offsetY = e.clientY - sticky.getBoundingClientRect().top;
      });
  
      document.addEventListener('mousemove', (e) => {
        if (isDragging) {
          sticky.style.left = e.clientX - offsetX + 'px';
          sticky.style.top = e.clientY - offsetY + 'px';
        }
      });
  
      document.addEventListener('mouseup', () => {
        isDragging = false;
      });
    }
  
    // Function to make a sticky note editable
    function makeStickyEditable(sticky) {
      const titleElement = sticky.querySelector('h3');
      const textElement = sticky.querySelector('p');
  
      titleElement.addEventListener('blur', () => {
        // Save changes to local storage or a database if needed
      });
  
      textElement.addEventListener('blur', () => {
        // Save changes to local storage or a database if needed
      });
    }
  
    // Function to delete a sticky note
    window.deleteSticky = function (element) {
      const sticky = element.parentNode;
      stickyContainer.removeChild(sticky);
    };
  });
  