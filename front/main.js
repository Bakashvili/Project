 const  UserServices = require('../Api_Services/UserServices');
const menuBtn = document.querySelector('.menu__btn');
const menuClose = document.querySelector('.menu__close');
const menuList = document.querySelector('.menu__list');
const menuShadow = document.querySelector('.menu--close');
menuBtn.addEventListener('click', ()=>{
    menuList.classList.toggle('menu__list--open');
    menuShadow.classList.toggle('menu--open');
} );
menuClose.addEventListener('click', ()=>{
    menuList.classList.remove('menu__list--open');
    menuShadow.classList.remove('menu--open');
} );
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin_popup');
const iconClose = document.querySelector('.icon-close');
const iconClose_1 = document.querySelector('.icon-close_1');

registerLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
} );
loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
} );
btnPopup.addEventListener('click', ()=>{
    wrapper.classList.add('active-popup');
} );
iconClose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-popup');
} );
iconClose_1.addEventListener('click', ()=>{
    wrapper.classList.remove('active-popup');
} );


    const btnreg = document.querySelector('[name="btnreg"]');
    btnreg.addEventListener('click', ()=> {
        event.preventDefault();
    const password = document.querySelector('input[name="lock-closed"]').value;
    const login = document.querySelector('input[name="mail"]').value;
    const username = document.querySelector('input[name="close"]').value;
    UserServices.Register(username, login, password);
});
//alert('ok');