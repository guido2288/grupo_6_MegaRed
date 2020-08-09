
window.onload = () => {

    formulario = document.getElementById("formulario")
    

    formulario.onsubmit = function(event){
        
        let usuario = document.getElementById("usuario");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let cpassword = document.getElementById("cpassword");
        let avatar = document.getElementById("avatar")

        let invalidUsuario = document.getElementById("invalidUsuario");
        let invalidEmail = document.getElementById("invalidEmail");
        let invalidPassword = document.getElementById("invalidPassword");
        let invalidCpassword = document.getElementById("invalidCpassword");
        let invalidAvatar = document.getElementById("invalidAvatar");

        let errorEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let errorImg = /\.(jpe?g|png|gif)$/i
        if(usuario.value == "") {
  
            invalidUsuario.innerHTML = "El usuario esta vacio"
            event.preventDefault();
        };
        
        if(!errorEmail.test(email.value)){
          
            invalidEmail.innerHTML = "El Email no es valido"
            event.preventDefault();
        }

        if(password.value.length < 6){
            
            invalidPassword.innerHTML = "El Password debe tener 6 caracteres como minimo"
            event.preventDefault();
        }
        
        if(password.value != cpassword.value) {
            
            invalidCpassword.innerHTML = "Los Passwords no coinciden"
            event.preventDefault();
        }

        if(avatar.value == "") {
            invalidAvatar.innerHTML = "Debes seleccionar una imagen para tu Avatar"
            event.preventDefault();
        }

        if(errorImg.test(avatar.files[0].name) === false) {
            invalidAvatar.innerHTML = "los formatos admitidos son jpg. png. jpeg."
            event.preventDefault();
        }

        

        
    }




}