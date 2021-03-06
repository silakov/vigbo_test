const changeLayout = function(mod1, mod2) {
  let curMod = mod1;
  let newMod = mod2;
  let elements = document.querySelectorAll(`[class*="${curMod}"]`);
  const switchMod = function() {
    let temp = curMod;
    curMod = newMod;
    newMod = temp;
  };
  if (elements.length === 0) {
    switchMod();
    elements = document.querySelectorAll(`[class*="${curMod}"]`);
  }
  elements.forEach(item => {
    item.className.split(/\s+/).forEach(name => {
      if(name.includes(curMod)) {
        let newName = name.replace(curMod, newMod);
        item.classList.toggle(name);
        item.classList.toggle(newName);
      }
    })
  })
  switchMod();
};

document.querySelector('.switch-layout').onclick = () => {
  changeLayout('--bruno', '--levi');
};

const buttons = document.querySelectorAll('.mobile-menu-opener');
for (const button of buttons) {
  button.addEventListener('click', function(event) {
    changeLayout('--closed-menu', '--opened-menu');
    if (event.target === document.querySelector('.mobile-menu-opener:first-child')) {
      document.querySelector('.search__input').focus();
    } else {
      document.querySelector('.nav-list__link').focus();
    }
  })
}