document.addEventListener('DOMContentLoaded', () => {
  let prompts = document.querySelector('#prompts');
  let vanillaDom = document.querySelector('#vanilla-dom');
  let reactDom = document.querySelector('#react-dom');

  let versionSelection = document.querySelector('#version');

  versionSelection.addEventListener("change", function() {
    if (versionSelection.value === '1') {
      prompts.setAttribute('class', 'display-block');
      vanillaDom.setAttribute('class', 'display-none');
      reactDom.setAttribute('class', 'display-none');
    } else if (versionSelection.value === '2') {
      prompts.setAttribute('class', 'display-none');
      vanillaDom.setAttribute('class', 'display-block');
      reactDom.setAttribute('class', 'display-none');
    } else {
      prompts.setAttribute('class', 'display-none');
      vanillaDom.setAttribute('class', 'display-none');
      reactDom.setAttribute('class', 'display-block');
    }
  });
});