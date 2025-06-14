document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para eventos
    const eventos = {
        'junio-2025': [
            {
                id: 'evento-1',
                imagen: 'img/circuitos/oschersleben.jpg',
                torneo: 'MarmoCup Sim Boxer 2025',
                ronda: 'Ronda 1: Oschersleben',
                plataforma: 'iRacing',
                fecha: '13 Junio 2025',
                hora: '19:00 GMT-4',
                estado: 'Concluido'
            },
            {
                id: 'evento-2',
                imagen: 'img/circuitos/spa-pcup.jpg',
                torneo: 'Porsche Mobil 1 Super Cup',
                ronda: 'Ronda 5: Spa Francorchamps',
                plataforma: 'Assetto Corsa',
                fecha: '15 Junio 2025',
                hora: '20:00 GMT-4',
                estado: 'Próximo'
            },
            {
                id: 'evento-3',
                imagen: 'img/circuitos/vir.jpg',
                torneo: 'MarmoCup Sim Boxer 2025',
                ronda: 'Ronda 2: Virginia International Raceway',
                plataforma: 'iRacing',
                fecha: '20 Junio 2025',
                hora: '19:00 GMT-4',
                estado: 'Próximo'
            },
            {
                id: 'evento-4',
                imagen: 'img/circuitos/hungaroring.jpg',
                torneo: 'Porsche Mobil 1 Super Cup',
                ronda: 'Ronda 6: Hungaroring',
                plataforma: 'Assetto Corsa',
                fecha: '22 Junio 2025',
                hora: '20:00 GMT-4',
                estado: 'Próximo'
            },
            {
                id: 'evento-5',
                imagen: 'img/circuitos/navarra.jpg',
                torneo: 'MarmoCup Sim Boxer 2025',
                ronda: 'Ronda 3: Navarra Circuit',
                plataforma: 'iRacing',
                fecha: '27 Junio 2025',
                hora: '19:00 GMT-4',
                estado: 'Próximo'
            },
            {
                id: 'evento-6',
                imagen: 'img/circuitos/zandvoort.jpeg',
                torneo: 'Porsche Mobil 1 Super Cup',
                ronda: 'Ronda 7: Zandvoort',
                plataforma: 'Assetto Corsa',
                fecha: '29 Junio 2025',
                hora: '20:00 GMT-4',
                estado: 'Próximo'
            }
        ],
        'julio-2025': [
            {
                id: 'evento-7',
                imagen: 'img/circuitos/okayama.jpg',
                torneo: 'MarmoCup Sim Boxer 2025',
                ronda: 'Ronda 4: Okayama International Circuit',
                plataforma: 'iRacing',
                fecha: '4 Julio 2025',
                hora: '19:00 GMT-4',
                estado: 'Próximo'
            },
            {
                id: 'evento-8',
                imagen: 'img/circuitos/monza.jpeg',
                torneo: 'Porsche Mobil 1 Super Cup',
                ronda: 'Ronda 8: Monza',
                plataforma: 'Assetto Corsa',
                fecha: '6 Julio 2025',
                hora: '20:00 GMT-4',
                estado: 'Próximo'
            }
        ]
    };

    // Cargar eventos en el calendario
    function cargarEventos() {
        for (const [mes, eventosMes] of Object.entries(eventos)) {
            const contenedor = document.getElementById(`${mes}-events`);
            if (contenedor) {
                contenedor.innerHTML = generarEventos(eventosMes);
            }
        }
    }

    // Generar HTML para los eventos
    function generarEventos(eventos) {
        return eventos.map(evento => `
            <div class="event-card">
                <div class="event-header">
                    <img src="${evento.imagen}" alt="${evento.ronda}" class="event-image">
                    <span class="event-badge">${evento.estado}</span>
                </div>
                <div class="event-body">
                    <h3 class="event-title">${evento.torneo}</h3>
                    <span class="event-round">${evento.ronda}</span>
                    <div class="event-meta">
                        <span><i class="fas fa-gamepad"></i> ${evento.plataforma}</span>
                        <span><i class="fas fa-calendar-alt"></i> ${evento.fecha}</span>
                        <span><i class="fas fa-clock"></i> ${evento.hora}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Inicializar el calendario
    cargarEventos();

    // Efecto de scroll en navbar
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".glass-nav");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

    // Mobile Menu Toggle (si no está en el JS principal)
    document.getElementById('mobile-menu').addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('.nav-menu').classList.toggle('active');
    });
});