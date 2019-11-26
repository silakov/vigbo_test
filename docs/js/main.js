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
document.querySelector('.mobile-buttons__menu').onclick = () => {
  changeLayout('--closed-menu', '--opened-menu');
};
document.querySelector('.mobile-buttons__search').onclick = () => {
  changeLayout('--closed-menu', '--opened-menu');
  document.querySelector('.search__input').focus()
};