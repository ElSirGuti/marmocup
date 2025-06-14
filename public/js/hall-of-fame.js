document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para pilotos
    const pilotsData = {
        "felix-vargas": {
            name: "Félix Vargas",
            nickname: "MARMOTA",
            img: "img/pilotos/marmota-2.png",
            age: "40",
            nationality: "Venezuela",
            flag: "img/flags/venezuela.png",
            team: "Chigüire Racing Team",
            titles: ["IMSA VP Racing Sportscar Challenge 2025 - Categoría LMP3"],
            wins: 2,
            podiums: 4,
            poles: 1,
            fastlaps: 1
        },
        "hugo-de-sousa": {
            name: "Hugo De Sousa",
            nickname: "",
            img: "img/pilotos/hugo-2.png",
            age: 25,
            nationality: "Venezuela",
            flag: "img/flags/venezuela.png",
            team: ["Chigüire Racing Team", "Etron Racing"],
            titles: ["IMSA VP Racing Sportscar Challenge 2025 - Categoría GSX"],
            wins: 1,
            podiums: 8,
            poles: 0,
            fastlaps: 1
        },
        "alejandro-torres": {
            name: "Alejandro Torres",
            nickname: "",
            img: "img/pilotos/alejandro.jpg",
            age: "XX",
            nationality: "Colombia",
            flag: "img/flags/colombia.png",
            team: "Champ Racing Inc.",
            titles: ["MarmoCup TCR Latam 2024"],
            wins: 1,
            podiums: 3,
            poles: 0,
            fastlaps: 0
        },
        "paul-alex": {
            name: "Paul Alexander Ordoñez",
            nickname: "Pole Alex",
            img: "img/pilotos/paul-alex-2.jpg",
            age: "XX",
            nationality: "Venezuela",
            flag: "img/flags/venezuela.png",
            team: "Top Fuel Sim Racing Team",
            titles: [],
            wins: 3,
            podiums: 3,
            poles: 1,
            fastlaps: 2
        },
        "luis-ramirez": {
            name: "Luis Ramírez",
            nickname: "",
            img: "img/miembros/team-3.jpg",
            age: "XX",
            nationality: "Venezuela",
            flag: "img/flags/venezuela.png",
            team: "Champ Racing Inc.",
            titles: [],
            wins: 2,
            podiums: 2,
            poles: 3,
            fastlaps: 2
        },
        "jhoiner-cornelis": {
            name: "Jhoiner Cornelis",
            nickname: "",
            img: "img/pilotos/jhoiner-2.jpg",
            age: "XX",
            nationality: "Venezuela",
            flag: "img/flags/venezuela.png",
            team: "Top Fuel Sim Racing Team",
            titles: [],
            wins: 2,
            podiums: 5,
            poles: 1,
            fastlaps: 1
        },
        "ricardo-benitez": {
            name: "Ricardo Benítez",
            nickname: "",
            img: "img/pilotos/ricardo-2.jpeg",
            age: "XX",
            nationality: "Venezuela",
            flag: "img/flags/venezuela.png",
            team: "Upper Esport",
            titles: [],
            wins: 2,
            podiums: 4,
            poles: 4,
            fastlaps: 2
        },
        "pablo-granadillo": {
            name: "Pablo Granadillo",
            nickname: "Manolo",
            img: "img/pilotos/manolo.jpg",
            age: "XX",
            nationality: "Venezuela",
            flag: "img/flags/venezuela.png",
            team: "Top Fuel Sim Racing Team",
            titles: [],
            wins: 2,
            podiums: 4,
            poles: 1,
            fastlaps: 2
        }

    };

    const teamsData = {
        "chiguire-racing-team": {
            name: "Chigüire Racing Team",
            img: "img/equipos/chiguire-racing-2.png",
            nationality: "Venezuela",
            flag: "img/flags/venezuela.png",
            titles: ["IMSA VP Racing Sportscar Challenge 2025 - Categoría LMP3 - Trofeo de Pilotos", "IMSA VP Racing Sportscar Challenge 2025 - Categoría LMP3 - Trofeo de Equipos"],
            wins: 6,
            podiums: 27,
            poles: 2,
            fastlaps: 3,
            drivers: [
                {
                    name: 'Félix Vargas "MARMOTA"',
                    nickname: "MARMOTA",
                    img: "img/miembros/team-1.png",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: 'Andrés Gutiérrez "Pan Sobao"',
                    nickname: "PAN SOBAO",
                    img: "img/miembros/team-4.png",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: "Cesar Acevedo",
                    nickname: "",
                    img: "img/pilotos/cesar.jpeg",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: 'Pablo Ricupero "Ricocuerpo"',
                    nickname: "Ricocuerpo",
                    img: "img/pilotos/ricupero.jpg",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: 'Hugo De Sousa',
                    nickname: "",
                    img: "img/pilotos/hugo.png",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: 'Daniel Maldonado',
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: 'Vinicio Renguifo',
                    nickname: "",
                    img: "img/pilotos/vinicio.jpg",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: 'David Chavez',
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: 'Iván Sánchez',
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                }

            ]
        },
        "top-fuel": {
            name: "Top Fuel Sim Racing",
            img: "img/equipos/topfuel-2.png",
            nationality: "Venezuela",
            flag: "img/flags/venezuela.png",
            titles: ["IMSA VP Racing Sportscar Challenge 2025 - Categoría GSX - Trofeo de Equipos", "MarmoCup TCR Latam 2024 - Trofeo de Equipos"],
            wins: 6,
            podiums: 14,
            poles: 2,
            fastlaps: 3,
            drivers: [
                {
                    name: 'José Manuel Ruiz "Chema"',
                    nickname: "",
                    img: "img/miembros/team-2.png",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: "Paul Alexander Ordoñez",
                    nickname: "",
                    img: "img/pilotos/paul-alex.webp",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: "Carlos Reyes",
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: "Jhoiner Cornelis",
                    nickname: "",
                    img: "img/pilotos/jhoiner.jpg",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: "Ricardo Serrano",
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: 'Pablo Granadillo "Manolo"',
                    nickname: "",
                    img: "img/miembros/team-5.png",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: "Jesús Zabala",
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: "Luis Miguel González",
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
            ]
        },
        "champ-racing": {
            name: "Champ Racing Inc.",
            img: "img/equipos/champ-racing-2.png",
            nationality: "Estados Unidos",
            flag: "img/flags/usa.png",
            titles: ["TCR Latam 2024 - Trofeo de Pilotos"],
            wins: 4,
            podiums: 9,
            poles: 6,
            fastlaps: 7,
            drivers: [
                {
                    name: "Luis Ramírez",
                    nickname: "",
                    img: "img/miembros/team-3.jpg",
                    nationality: "Venezuela",
                    flag: "img/flags/venezuela.png"
                },
                {
                    name: "Hans Castañeda",
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "Colombia",
                    flag: "img/flags/colombia.png"
                },
                {
                    name: "Alejandro Torres",
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "Colombia",
                    flag: "img/flags/colombia.png"
                },
                {
                    name: "Adrian Quirós",
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "Costa Rica",
                    flag: "img/flags/costarica.png"
                },
                {
                    name: "Sebastian Baugh",
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "Jamaica",
                    flag: "img/flags/jamaica.png"
                },
                {
                    name: "Martin Matko",
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "República Checa",
                    flag: "img/flags/checa.png"
                },
                {
                    name: "Tim Yvain",
                    nickname: "",
                    img: "img/pilotos/alejandro.jpg",
                    nationality: "Francia",
                    flag: "img/flags/francia.png"
                },
            ]
        }
    };

    // Modal de piloto
    const pilotModal = document.getElementById('pilotModal');
    const pilotButtons = document.querySelectorAll('.btn-more-info');
    const closeModal = document.querySelectorAll('.close-modal');

    // Abrir modal de piloto
    pilotButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pilotId = this.getAttribute('data-pilot');
            const pilot = pilotsData[pilotId];
            
            if (pilot) {
                document.getElementById('modalPilotImg').src = pilot.img;
                document.getElementById('modalPilotName').textContent = pilot.name;
                document.getElementById('modalPilotNickname').textContent = pilot.nickname ? `"${pilot.nickname}"` : '';
                document.getElementById('modalPilotAge').textContent = pilot.age;
                document.getElementById('modalPilotFlag').src = pilot.flag;
                document.getElementById('modalPilotNationality').textContent = pilot.nationality;
                document.getElementById('modalPilotTitles').textContent = pilot.titles.length;
                document.getElementById('modalPilotWins').textContent = pilot.wins;
                document.getElementById('modalPilotPodiums').textContent = pilot.podiums;
                document.getElementById('modalPilotPoles').textContent = pilot.poles;
                document.getElementById('modalPilotFastlaps').textContent = pilot.fastlaps;
                
                const titlesList = document.getElementById('modalPilotTitlesList');
                titlesList.innerHTML = '';
                
                if (pilot.titles.length > 0) {
                    pilot.titles.forEach(title => {
                        const li = document.createElement('li');
                        li.textContent = title;
                        titlesList.appendChild(li);
                    });
                } else {
                    const li = document.createElement('li');
                    li.textContent = "Aún no ha ganado campeonatos";
                    li.style.color = "var(--gray)";
                    li.style.fontStyle = "italic";
                    titlesList.appendChild(li);
                }
                
                pilotModal.style.display = "block";
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Modal de equipo
    const teamModal = document.getElementById('teamModal');
    const teamButtons = document.querySelectorAll('.btn-more-info-team');

    // Abrir modal de equipo
    teamButtons.forEach(button => {
        button.addEventListener('click', function() {
            const teamId = this.getAttribute('data-team');
            const team = teamsData[teamId];
            
            if (team) {
                document.getElementById('modalTeamImg').src = team.img;
                document.getElementById('modalTeamName').textContent = team.name;
                document.getElementById('modalTeamFlag').src = team.flag;
                document.getElementById('modalTeamNationality').textContent = team.nationality;
                document.getElementById('modalTeamTitles').textContent = team.titles.length;
                document.getElementById('modalTeamWins').textContent = team.wins;
                document.getElementById('modalTeamPodiums').textContent = team.podiums;
                document.getElementById('modalTeamPoles').textContent = team.poles;
                document.getElementById('modalTeamFastlaps').textContent = team.fastlaps;
                
                const titlesList = document.getElementById('modalTeamTitlesList');
                titlesList.innerHTML = '';
                
                if (team.titles.length > 0) {
                    team.titles.forEach(title => {
                        const li = document.createElement('li');
                        li.textContent = title;
                        titlesList.appendChild(li);
                    });
                } else {
                    const li = document.createElement('li');
                    li.textContent = "Aún no ha ganado campeonatos";
                    li.style.color = "var(--gray)";
                    li.style.fontStyle = "italic";
                    titlesList.appendChild(li);
                }
                
                const driversGrid = document.getElementById('modalTeamDrivers');
                driversGrid.innerHTML = '';
                
                team.drivers.forEach(driver => {
                    const driverCard = document.createElement('div');
                    driverCard.className = 'driver-card';
                    
                    driverCard.innerHTML = `
                        <div class="driver-img">
                            <img src="${driver.img}" alt="${driver.name}">
                        </div>
                        <h4 class="driver-name">${driver.name}</h4>
                        <p class="driver-nationality">
                            <img src="${driver.flag}" alt="${driver.nationality}" class="flag-icon">
                            ${driver.nationality}
                        </p>
                    `;
                    
                    driversGrid.appendChild(driverCard);
                });
                
                teamModal.style.display = "block";
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Cerrar modales
    closeModal.forEach(button => {
        button.addEventListener('click', function() {
            pilotModal.style.display = "none";
            teamModal.style.display = "none";
            document.body.style.overflow = "auto";
        });
    });

    // Cerrar al hacer click fuera del modal
    window.addEventListener('click', function(event) {
        if (event.target === pilotModal) {
            pilotModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
        if (event.target === teamModal) {
            teamModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            pilotModal.style.display = "none";
            teamModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});