window.onload = () => {
    
    let submit = document.querySelector("#submit");
    let reset = document.querySelector("#reset");
    let formCarga = document.querySelector("#formCarga");

        formCarga.onsubmit = function(event){

            let nombre = formCarga.querySelector("#nombre");
            let descripcion = formCarga.querySelector("#descripcion");
            let genre = formCarga.querySelector("#genre");
            let platform = formCarga.querySelector("#platform");
            let precio = formCarga.querySelector("#precio");
            let stock = formCarga.querySelector("#stock");
            let adjuntarimagen = formCarga.querySelector("#adjuntarimagen");
           
           
            if(nombre.value.length<5){
                formCarga.querySelector("#errorEmail").innerText= "Debes completar el nombre";
                nombre.style.backgroundColor="#FF655D";
                event.preventDefault();
            };
            if(descripcion.value.length<50){
                formCarga.querySelector("#errorDescripcion").innerText= "La descripcion debe tener al menos 50 caracteres";
                descripcion.style.backgroundColor="#FF655D";
                event.preventDefault();
            };
            
            if(!genre.value){
                formCarga.querySelector("#errorGenero").innerText= "Debes seleccionar un genero";
                genre.style.backgroundColor="#FF655D";
                event.preventDefault();
            };
            if(!platform.value){
                formCarga.querySelector("#errorPlatform").innerText= "Debes seleccionar un genero";
                platform.style.backgroundColor="#FF655D";
                event.preventDefault();
            };
            if(!precio.value){
                formCarga.querySelector("#errorPrecio").innerText= "Debes completar el precio";
                precio.style.backgroundColor="#FF655D";
                event.preventDefault();
            };
            if(!stock.value){
                formCarga.querySelector("#errorStock").innerText= "Debes completar el stock";
                stock.style.backgroundColor="#FF655D";
                event.preventDefault();
            };
            

            
            if( /\.(jpe?g|png|gif)$/i.test(adjuntarimagen.files[0].name) === false ){ 
                formCarga.querySelector("#erroradjuntarimagen").innerText= "los formatos admitidos son jpg. png. jpeg.";
                adjuntarimagen.style.backgroundColor="#FF655D";
                event.preventDefault();
              
            };

            





        }


}