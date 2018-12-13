document.addEventListener('DOMContentLoaded', () => {
  let prompts = document.querySelector('#prompts');
  let vanillaDom = document.querySelector('#vanilla-dom');
  let reactDom = document.querySelector('#react-dom');

  let promptOption = document.querySelector('#prompt');
  let vanillaOption = document.querySelector('#vanilla');
  let reactOption = document.querySelector('#react');

  let versionSelection = document.querySelector('#version');

  document.addEventListener('keyup', e => {
    if (e.keyCode == 112) {
      promptOption.setAttribute('selected', 'selected')
      vanillaOption.removeAttribute('selected')
      reactOption.removeAttribute('selected')
      displayPrompt()
    } else if (e.keyCode == 113) {
      promptOption.removeAttribute('selected')
      vanillaOption.setAttribute('selected', 'selected')
      reactOption.removeAttribute('selected')
      displayVanilla()
    } else if (e.keyCode == 114) {
      promptOption.removeAttribute('selected')
      vanillaOption.removeAttribute('selected')
      reactOption.setAttribute('selected', 'selected')
      displayReact()
    }
  })

  versionSelection.addEventListener("change", function() {
    if (versionSelection.value === '1') {
      displayPrompt()
    } else if (versionSelection.value === '2') {
      displayVanilla()
    } else {
      displayReact()
    }
  });

  function displayPrompt() {
    prompts.setAttribute('class', 'display-block');
    vanillaDom.setAttribute('class', 'display-none');
    reactDom.setAttribute('class', 'display-none');
  }
  function displayVanilla() {
    prompts.setAttribute('class', 'display-none');
    vanillaDom.setAttribute('class', 'display-block');
    reactDom.setAttribute('class', 'display-none');
  }
  function displayReact() {
    prompts.setAttribute('class', 'display-none');
    vanillaDom.setAttribute('class', 'display-none');
    reactDom.setAttribute('class', 'display-block');
  }
});