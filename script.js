document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('albumModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalFlickrEmbedContainer = document.getElementById('modalFlickrEmbedContainer'); // Nuevo contenedor para el embed
    const albumCards = document.querySelectorAll('.album-card'); // Seleccionamos todas las tarjetas para que sean clickeables
    const prevAlbumBtn = document.getElementById('prevAlbumBtn');
    const nextAlbumBtn = document.getElementById('nextAlbumBtn');

    // Array con las URLs de los álbumes de Flickr en orden
    // IMPORTANTE: Aquí almacenamos los CÓDIGOS COMPLETOS DE EMBED, no solo las URLs base
    const albumEmbedCodes = [
        '<a data-flickr-embed="true" href="https://www.flickr.com/photos/203132232@N02/albums/72177720327447778" title="Dia 1"><img src="https://live.staticflickr.com/65535/54644313348_19963cc997_b.jpg" alt="Día 1: Llegada al Paraíso"/></a>', // Día 1
        '<a data-flickr-embed="true" href="https://www.flickr.com/photos/203132232@N02/albums/72177720327427210" title="Dia 2"><img src="https://live.staticflickr.com/65535/54644355923_4d8608a7d6_b.jpg" alt="Día 2: Encanto Urbano e Histórico"/></a>', // Día 2
        '<a data-flickr-embed="true" href="https://www.flickr.com/photos/203132232@N02/albums/72177720327429561" title="Dia 3 Hollywood"><img src="https://live.staticflickr.com/65535/54643287897_afe1a26a4c_b.jpg" alt="Día 3: Luces, Cámara, ¡Hollywood!"/></a>', // Día 3 Hollywood
        '<a data-flickr-embed="true" href="https://www.flickr.com/photos/203132232@N02/albums/72177720327454599" title="Dia 3 en Medieval Times"><img src="https://live.staticflickr.com/31337/54644376463_1b17416c6a_z.jpg" alt="Día 3: Viaje al Pasado Medieval"/></a>', // Día 3 Medieval
        '<a data-flickr-embed="true" href="https://www.flickr.com/photos/203132232@N02/albums/72177720327454649" title="Dia 4 por Disney"><img src="https://live.staticflickr.com/65535/54644368334_17ca5974b1_b.jpg" alt="Día 4: La Magia de Disneyland"/></a>', // Día 4 Disney
        '<a data-flickr-embed="true" href="https://www.flickr.com/photos/203132232@N02/albums/72177720327436622" title="Dia 4 en el Desfile de Disney"><img src="https://live.staticflickr.com/65535/54643337932_975ec57c87_b.jpg" alt="Día 4: Desfile de Fantasía Disney"/></a>', // Día 4 Disney Desfile
        '<a data-flickr-embed="true" href="https://www.flickr.com/photos/203132232@N02/albums/72177720327436757" title="Dia 5 regreso a México"><img src="https://live.staticflickr.com/31337/54644187616_c915e479a2_z.jpg" alt="Día 5: Despedida Costera y Regreso"/></a>'  // Día 5 Tijuana / Regreso
    ];
    let currentAlbumIndex = 0; // Índice del álbum actualmente abierto

    // Función para abrir el modal y cargar el álbum
    function openModal(albumIndex) {
        currentAlbumIndex = albumIndex;
        const embedCode = albumEmbedCodes[currentAlbumIndex];
        
        // Limpiamos el contenedor y cargamos el nuevo embed de Flickr
        modalFlickrEmbedContainer.innerHTML = embedCode;

        // Necesitamos recargar el script de Flickr para que los embeds dinámicos funcionen
        // Flickr Embeds necesita que su script se ejecute *después* de que el HTML esté en el DOM
        const scriptElement = document.createElement('script');
        scriptElement.async = true;
        scriptElement.src = "//embedr.flickr.com/assets/client-code.js";
        scriptElement.charset = "utf-8";
        modalFlickrEmbedContainer.appendChild(scriptElement);

        modal.style.display = 'flex'; // Muestra el modal
        document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
    }

    // Función para cerrar el modal
    function closeModal() {
        modal.style.display = 'none'; // Oculta el modal
        document.body.style.overflow = ''; // Restaura el scroll del fondo
        modalFlickrEmbedContainer.innerHTML = ''; // Limpia el contenido del modal
    }

    // Función para navegar al álbum anterior/siguiente
    function navigateAlbum(direction) {
        currentAlbumIndex += direction;
        if (currentAlbumIndex < 0) {
            currentAlbumIndex = albumEmbedCodes.length - 1; // Vuelve al último
        } else if (currentAlbumIndex >= albumEmbedCodes.length) {
            currentAlbumIndex = 0; // Vuelve al primero
        }
        openModal(currentAlbumIndex); // Abre el modal con el nuevo álbum
    }

    // Asignar eventos a las tarjetas de álbum completas (NO solo al span "Ver Álbum")
    albumCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Asegurarse de que el clic no sea en el enlace de Flickr directo dentro del embed
            if (event.target.closest('a[data-flickr-embed="true"]')) {
                // Si el clic fue en la imagen del embed, dejamos que Flickr haga su trabajo
                // y abra la página de Flickr en nueva pestaña.
                return; 
            }
            
            const albumIndex = parseInt(this.dataset.albumIndex); // Obtiene el índice del data-attribute
            openModal(albumIndex);
        });
    });

    // Asignar eventos a los botones de navegación del modal
    closeBtn.addEventListener('click', closeModal);
    prevAlbumBtn.addEventListener('click', () => navigateAlbum(-1));
    nextAlbumBtn.addEventListener('click', () => navigateAlbum(1));

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});