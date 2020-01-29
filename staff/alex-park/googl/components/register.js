'use strict';

function createRegister(idClass, onSubmit, onToLogin) {
    var register = document.querySelector('.' + idClass);

    register.addEventListener('submit', function(event) {
        event.preventDefault();

        var name = this.name.value;
        var surname = this.surname.value;
        var username = this.username.value;
        var password = this.password.value;

        onSubmit(name, surname, username, password);
    });
    
    register.toggle = function() {
        this.classList.toggle('register--hide');
    };

    var login = register.querySelector('a');

    login.addEventListener('click', function(event) {
        event.preventDefault();

        onToLogin();
    }); 

    return register;
}