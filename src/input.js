const inputState = {
  left: false,
  right: false,
  spacePressed: false
};

function setMovementKey(key, isPressed) {
  if (key === 'ArrowLeft' || key.toLowerCase() === 'a') {
    inputState.left = isPressed;
  }

  if (key === 'ArrowRight' || key.toLowerCase() === 'd') {
    inputState.right = isPressed;
  }
}

export function setupInput() {
  window.addEventListener('keydown', (event) => {
    setMovementKey(event.key, true);

    if (event.code === 'Space' && !event.repeat) {
      inputState.spacePressed = true;
    }

    if (event.code === 'Space' || event.key.startsWith('Arrow')) {
      event.preventDefault();
    }
  });

  window.addEventListener('keyup', (event) => {
    setMovementKey(event.key, false);
  });
}

export function getInput() {
  const currentInput = { ...inputState };
  inputState.spacePressed = false;
  return currentInput;
}