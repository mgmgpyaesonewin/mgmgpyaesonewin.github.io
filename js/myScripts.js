(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.typewriter-text');
    const TYPING_SPEED_MS = 75; // Milliseconds per character or HTML tag part

    function typeContent(element, textToType, speed, callback) {
      let overallIndex = 0; // Tracks position in textToType
      let displayedHTML = '';
      element.classList.add('typing-active');
      // Initial state: only cursor, or empty if preferred, then cursor added in type()
      // Let's ensure it's empty and cursor is managed consistently in type()
      element.innerHTML = ''; 

      function type() {
        // Always show cursor at the end of current displayedHTML during typing
        element.innerHTML = displayedHTML + '<span class="cursor">|</span>';

        if (overallIndex < textToType.length) {
          let segment = '';
          // If the current character is '<', try to find the whole tag
          if (textToType[overallIndex] === '<') {
            const tagEndIndex = textToType.indexOf('>', overallIndex);
            if (tagEndIndex !== -1) {
              segment = textToType.substring(overallIndex, tagEndIndex + 1);
              overallIndex = tagEndIndex + 1; // Move past the tag
            } else {
              // It's a lone '<' or malformed tag, treat as a normal character
              segment = textToType[overallIndex];
              overallIndex++;
            }
          } else {
            // It's a normal character, could be an HTML entity like &quot;
            // We can grab multiple non-'<' characters at once for slight efficiency
            // but problem asks for char-by-char for non-tags.
            // For HTML entities, they should be treated as single characters effectively.
            // The current approach of taking one char at a time is fine.
            segment = textToType[overallIndex];
            overallIndex++;
          }

          displayedHTML += segment;
          // Update is done at the start of the next timeout or before finishing
          setTimeout(type, speed);
        } else {
          element.innerHTML = displayedHTML; // Final content, remove cursor
          element.classList.remove('typing-active');
          if (callback) {
            callback();
          }
        }
      }
      // Initial call to start typing and display first cursor
      type();
    }

    function animateElementsSequentially(elements, index = 0, speed = TYPING_SPEED_MS) {
      if (index < elements.length) {
        const currentElement = elements[index];
        const text = currentElement.dataset.text || '';
        
        currentElement.innerHTML = ''; // Clear element before typing

        typeContent(currentElement, text, speed, () => {
          animateElementsSequentially(elements, index + 1, speed);
        });
      }
    }

    if (elementsToAnimate.length > 0) {
      animateElementsSequentially(Array.from(elementsToAnimate), 0, TYPING_SPEED_MS);
    }
  });
})();
