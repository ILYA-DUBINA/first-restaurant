'use strict'

const arrow=document.querySelectorAll('.list__content-arrow');
const link=document.querySelectorAll('.list__link');
const linkTwo=document.querySelectorAll('.list__link-sub-open');
const arrowTwo=document.querySelectorAll('.two');
const linkThree=document.querySelectorAll('.list__content-sub-sub');

link.forEach(dropDownMenu);
linkTwo.forEach(dropDownMenuTwo);

function dropDownMenu(item) {
   item.addEventListener('click', function(){
      let currentBtn = item;
      let nextBtn = currentBtn.nextElementSibling;
      let nexNexttBtn = nextBtn.nextElementSibling;

      link.forEach(function(item){
         item.classList.remove('click');
         item.nextElementSibling.classList.remove('active');
         item.nextElementSibling.nextElementSibling.classList.remove('open');
      });

      currentBtn.classList.add('click');
      nextBtn.classList.add('active');
      nexNexttBtn.classList.add('open');   

      item.addEventListener('click', function(){
         currentBtn.classList.toggle('click');
         nextBtn.classList.toggle('active');
         nexNexttBtn.classList.toggle('open'); 
      });         
   });
}
function dropDownMenuTwo(item) {         
   item.addEventListener('click', function(){
      let currentBtn = item;
      let nextBtn = currentBtn.nextElementSibling;
      let nexNexttBtn = nextBtn.nextElementSibling;

      linkTwo.forEach(function(item){
         item.classList.remove('click');
      });
      arrowTwo.forEach(function(item){
         item.classList.remove('active');
      });
      linkThree.forEach(function(item){
         item.classList.remove('open');
      });

      currentBtn.classList.add('click');
      nextBtn.classList.add('active');
      nexNexttBtn.classList.add('open');

      item.addEventListener('click', function(){
         currentBtn.classList.toggle('click');
         nextBtn.classList.toggle('active');
         nexNexttBtn.classList.toggle('open'); 
      }); 
   });
}
for(let i=0; i<arrow.length; i++){
      let thisLink=arrow[i].previousElementSibling;
      let subMenu=arrow[i].nextElementSibling;
      let thisArrow=arrow[i];  

      thisLink.classList.add('parent');
   arrow[i].addEventListener('click', function(){
      subMenu.classList.toggle('open');
      thisArrow.classList.toggle('active');
   });
}

// ? /////////для выпадающего меню под тачскрины ---------------------------------------------

//? Выдвигающаяся форма поиска по клику -------------------------------------------------

let search = document.querySelector('.header__search-img');
let input = document.querySelector('.header__input');

search.addEventListener('click', () => {   
   input.classList.toggle('block');      
});
search.onclick = (event) => {
   event.target.classList.toggle('block-search'); 
}

//? ///////Выдвигающаяся форма поиска по клику------------------------------------------

//? Попап форма ----------------------------------------------

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock =true;

const timeout = 800;

// ? открытие попапа на любом обекте с классом .popup
if(popupLinks.length > 0){
   for(let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute('href').replace('#', '');
         const curentPopup =document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}
// ? обекты для закрытия попапа .popup-close
const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0) {
   for(let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}
//? функция открытия попапа
function popupOpen(curentPopup){
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      // ? добавил тернар!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      (popupActive) ? popupClose (popupActive, false) : bodyLock(); 
      
      curentPopup.classList.add('open');
      curentPopup.addEventListener('click', function (e) {
         if (!e.target.closest('.popup__content')){
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}
//? запрет открытие скролла для еще одного попапа
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
         bodyUnlock();         
      } 
   }
}
//? скролл
function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++){
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}
//? появление скролла как только заканчивается анимация
function bodyUnlock() {
   setTimeout(function () {
      if (lockPadding.length > 0){
         for(let index = 0; index < lockPadding.length; index++){
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}
// ? закрытие попапа через кнопку esc
document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
   }
});
// ? код полифил т е для старых браузеров 
(function () {
   //? проверяем поддержку
   if (!Element.prototype.closest) {
      //? реализуем
      Element.prototype.closest = function (css) {
         var node = this;
         // ? добавил тернар!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         while (node)  {
            (node.matches(css)) ? node : node = node.parentElement;
         }
         return null;
      };
   }
})();
(function () {
   //? проверяем поддержку
   if (!Element.prototype.matches) {
      //? определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;      
   }      
})();

//? ////Попап форма --------------------------------------------

// ? колокольчик ---------------------------------------------------

const bell = document.querySelector('.header__bell-img');
const bellArrow = document.querySelector('.bell-massege__arrow');
const bellMassege = document.querySelector('.bell-massege');
const bellDot = document.querySelector('.header__circle');
const bellArea = document.querySelector('.header__bell-area');

bell.addEventListener('click', function(){
   bellMassege.classList.toggle('bell');
   bellArrow.classList.toggle('bell');
   bellArea.classList.toggle('bell');  
   bellDot.classList.toggle('circle-none');     
});     
bellArea.addEventListener('click', function(){
   bellMassege.classList.remove('bell');
   bellArrow.classList.remove('bell');
   bellDot.classList.remove('circle-none'); 
   bellArea.classList.remove('bell'); 
});

// ? ////////////колокольчик-----------------------------------------

//? табы-------------------------------------------------------

const tabs = document.querySelectorAll('.recipes__tabs-text');
const tabsItems =document.querySelectorAll('.recipes__content-tasty');

tabs.forEach(onTabClick);

function onTabClick(item) {
   item.addEventListener('click', function(){
      let currntBtn = item;
      let tabId = currntBtn.getAttribute('data-tab');
      let curentTab = document.querySelector(tabId);

      if(!currntBtn.classList.contains('changeling')){         
         tabs.forEach(function(item){
            item.classList.remove('changeling');
         });
         currntBtn.classList.add('changeling');
      }   

      if(!curentTab.classList.contains('active')){  
         tabsItems.forEach(function(item){
            item.classList.remove('active');
         });         
         curentTab.classList.add('active');
      }     
   });
}
document.querySelector('.recipes__tabs-text').click();

//? ////////////табы------------------------------------------

//? адаптация сайдбара------------------------------------------

const burger = document.querySelector('.burger');
const sidebar = document.querySelector('.sidebar');
const cocoon = document.querySelector('.cocoon');

burger.addEventListener('click', function(){
   burger.classList.toggle('cross');
   sidebar.classList.toggle('open');
   cocoon.classList.toggle('mask');
   document.body.classList.toggle('_clock');
});

//? ///////////////////адаптация сайдбара------------------------------------------

//? открытие кнопки вкусняшек------------------------------------------

const btn = document.querySelector('.list__button');
const listContent = document.querySelector('.list__content');

btn.addEventListener('click', function(){
   listContent.classList.toggle('active-list');
});

//? ///////////////////открытие кнопки вкусняшек------------------------------------------

//? открытие меню бургер------------------------------------------
const iconMenu = document.querySelector('.footer__menu-burger');
const menuBody = document.querySelector('.footer__nav');

if(iconMenu){   
   iconMenu.addEventListener('click', function(e){
      document.body.classList.toggle('lock');
      menuBody.classList.toggle('nav-open');
      iconMenu.classList.toggle('burger-cross');
   });
}

//? ///////////////////открытие кнопки вкусняшек------------------------------------------

