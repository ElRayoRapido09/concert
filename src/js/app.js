document.addEventListener("DOMContentLoaded", function() {
    FijarMenu();
    CrearGaleria();
    ResaltarEnlace();
    scrollNav();
})

function FijarMenu(){
    const header = document.querySelector('.header');
    const sobrefestival = document.querySelector('.sobre-festival');

    document.addEventListener('scroll', function(){
        if (sobrefestival.getBoundingClientRect().bottom < 1 ) {
            header.classList.add('fijar');
        }
        else {
            header.classList.remove('fijar');
        }
    }) 
}

function CrearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i=1; i <= 16; i++){
        const imagen = document.createElement("PICTURE");
        imagen.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
        `;

        imagen.onclick = function(){
            Imagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function Imagen(i){
    const imagen = document.createElement("PICTURE");
    imagen.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
    `;
    imagen.classList.add("fedOut");


    const fondo = document.createElement('DIV');
    fondo.classList.add('fondo-imagen');
    fondo.onclick = Cerrarfondo;

    const Boton = document.createElement('BUTTON');
    Boton.classList.add("boton-cerrar");
    Boton.textContent = "X";
    Boton.onclick = Cerrarfondo;
    

    fondo.appendChild(imagen);
    fondo.appendChild(Boton);
    

    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(fondo);    
}  

function Cerrarfondo(){
    fondo = document.querySelector('.fondo-imagen') ;
    fondo.classList.add('fade-out');
    setTimeout(() => {
        fondo?.remove();

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 400);
}

function ResaltarEnlace(){ 
    document.addEventListener('scroll', function(){
        const section = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');

        let actual = '';
        section.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight; 

            if (window.scrollY >= (sectionTop - sectionHeight / 3) ) {
                actual = section.id;
            }
        })   


        navLinks.forEach( link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === "#" + actual){
                link.classList.add('active');
            }
        })
    })
}

function scrollNav() {
    const links = document.querySelectorAll('.navegacion-principal a');

    links.forEach(function(link) {
       link.addEventListener('click', e => {
            e.preventDefault()
            const value = e.target.getAttribute('href')
            const section = document.querySelector(value)
       })
    });
}
