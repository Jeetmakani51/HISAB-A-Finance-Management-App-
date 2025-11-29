const navbar = document.getElementById('navbar');
const openBtn = document.getElementById('openSliders');
const closeBtn = document.getElementById('closeSliders');
const media = window.matchMedia("(width < 700px)");
media.addEventListener('change',(e) => updateNavbar(e))

function updateNavbar(e){
    console.log(e);
    const isMobile = e.matches
    console.log(isMobile)
    if(isMobile){
        navbar.setAttribute('inert','')
    }else{
        navbar.removeAttribute('inert',)
    }
}

function openSidebar(){
    navbar.classList.add('show');
    openBtn.style.display = 'none';
    closeBtn.style.display = 'block';
    navbar.removeAttribute('inert');
}

function closeSidebar(){
    navbar.classList.remove('show');
    openBtn.style.display = 'block';
    closeBtn.style.display = 'none';
    navbar.setAttribute('inert','');
}

updateNavbar(media)