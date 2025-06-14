document.addEventListener("DOMContentLoaded", function () {
  const championshipsData = {
    "sim-boxer-2025": {
      title: "MarmoCup SimBoxer 2025",
      tabs: {
        "boxer-porsche": {
          title: "Pilotos Porsche Cup",
          headers: ["Pos", "Piloto", "Puntos"],
          data: [
            { pos: 1, name: "Gabriel Parra", points: 58 },
            { pos: 2, name: "Gustavo Mendez", points: 40 },
            { pos: 3, name: "Ricardo Serrano", points: 35 },
            { pos: 4, name: "Jesus Zabala", points: 32 },
            { pos: 5, name: "Victor Cova", points: 30 },
            { pos: 6, name: "José Ruiz", points: 28 },
            { pos: 7, name: "Paul Ordoñez", points: 26 },
            { pos: 8, name: "Hector García", points: 24 },
            { pos: 9, name: "Carlos Aleman", points: 22 },
            { pos: 10, name: "Eduardo Socarras", points: 20 },
            { pos: 11, name: "Luis Ramírez", points: 19 },
            { pos: 12, name: "Jhoiner Cornelis", points: 0 },
            { pos: 13, name: "Carlos Alvarez", points: 0 },
            { pos: 14, name: "Pablo Granadillo", points: 0 },
            { pos: 15, name: "Luis González", points: 0 },
            { pos: 16, name: "Andrés Aza", points: 0 },
          ],
        },
        "boxer-toyota": {
          title: "Pilotos Toyota GR86",
          headers: ["Pos", "Piloto", "Puntos"],
          data: [
            { pos: 1, name: "Carlos Reyes", points: 50 },
            { pos: 2, name: "Hugo De Sousa", points: 40 },
            { pos: 3, name: "Castor Morales", points: 35 },
            { pos: 4, name: "Luis Monasterios", points: 32 },
            { pos: 5, name: "Juan Sanz", points: 38 },
            { pos: 6, name: "Elionay Delgado", points: 28 },
            { pos: 7, name: "Cesar Acevedo", points: 26 },
            { pos: 8, name: "Ranses Gutiérrez", points: 24 },
            { pos: 9, name: "Erick Ramírez", points: 22 },
            { pos: 10, name: "José Pernía", points: 28 },
            { pos: 11, name: "Felix Vargas", points: 19 },
            { pos: 12, name: "Pablo Ricupero", points: 18 },
            { pos: 13, name: "Gabriel Medina", points: 17 },
            { pos: 14, name: "Kevin Prada", points: 16 },
            { pos: 15, name: "Luis Millán", points: 0 },
            { pos: 16, name: "Andrés Gutiérrez", points: 0 },
            { pos: 17, name: "Anthony Briceño", points: 0 },
          ],
        },
      },
    },
    "porsche-supercup-2025": {
      title: "Porsche Mobil 1 Super Cup Virtual 2025",
      tabs: {
        "pcup-pilotos": {
          title: "Pilotos",
          headers: ["Pos", "Piloto", "Equipo", "Puntos"],
          data: [
            { pos: 1, name: "José Ruiz", team: "Top fuel", points: 43 },
            { pos: 2, name: "Hugo De Sousa", team: "", points: 42 },
            {
              pos: 3,
              name: "Cesar Acevedo",
              team: "Chigüire Team Racing",
              points: 39,
            },
            { pos: 4, name: "Elionay Delgado", team: "", points: 33 },
            { pos: 5, name: "Daniel Florez", team: "SCD Racing", points: 26 },
            {
              pos: 6,
              name: "Andres Gutierrez",
              team: "Chigüire Racing Team",
              points: 26,
            },
            { pos: 7, name: "Paul Alex", team: "Top Fuel", points: 25 },
            {
              pos: 8,
              name: "Ranses Gutierrez",
              team: "(R.R.T) RANSINHO RACING TEAM",
              points: 25,
            },
            { pos: 9, name: "Seb Baugh", team: "", points: 15 },
            { pos: 10, name: "Juan Rosas", team: "SCD Racing", points: 15 },
            {
              pos: 11,
              name: "Ricardo Benitez",
              team: "Upper Esport",
              points: 15,
            },
            {
              pos: 12,
              name: "Daniel Maldonado",
              team: "SDM Racing",
              points: 10,
            },
            { pos: 13, name: "Jhoiner Cornelis", team: "Top Fuel", points: 10 },
            {
              pos: 14,
              name: "Luis Ramirez",
              team: "Champ Racing Inc.",
              points: 6,
            },
            {
              pos: 15,
              name: "Felix Vargas",
              team: "Chigüire Racing Team",
              points: 4,
            },
          ],
        },
        "pcup-equipos": {
          title: "Equipos",
          headers: ["Pos", "Equipo", "Puntos"],
          data: [
            { pos: 1, name: "Top fuel", points: 43 },
            { pos: 2, name: "SCD Racing", points: 41 },
            { pos: 3, name: "Chigüire Team Racing", points: 39 },
            { pos: 4, name: "Top Fuel", points: 35 },
            { pos: 5, name: "Chigüire Racing Team", points: 30 },
            { pos: 6, name: "(R.R.T) RANSINHO RACING TEAM", points: 25 },
            { pos: 7, name: "Upper Esport", points: 15 },
            { pos: 8, name: "SDM Racing", points: 10 },
            { pos: 9, name: "Champ Racing Inc.", points: 6 },
          ],
        },
      },
    },
    "super-formula-2025": {
      title: "Super Formula Virtual 2025",
      tabs: {
        "sf-pilotos": {
          title: "Pilotos",
          headers: ["Pos", "Piloto", "Equipo", "Puntos"],
          data: [
            {
              pos: 1,
              name: "Hugo De Sousa",
              team: "Chigüire Racing Team",
              points: 61,
            },
            {
              pos: 2,
              name: "Andres Gutierrez",
              team: "Chigüire Racing Team",
              points: 58,
            },
            {
              pos: 3,
              name: "Cesar Acevedo",
              team: "Chigüire Racing Team",
              points: 21,
            },
            { pos: 4, name: "Daniel Florez", team: "SCD Racing", points: 20 },
            { pos: 5, name: "Seb Baugh", team: "Champ Racing Inc", points: 20 },
            { pos: 6, name: "Paul Alex", team: "Top Fuel", points: 14 },
            { pos: 7, name: "José Ruiz", team: "Top Fuel", points: 11 },
            {
              pos: 8,
              name: "Ivan Sanchez",
              team: "Chigüire Racing Team",
              points: 11,
            },
            { pos: 9, name: "Sergio Da Silva", team: "SDM Racing", points: 8 },
            {
              pos: 10,
              name: "Felix Vargas",
              team: "Chigüire Racing Team",
              points: 8,
            },
            { pos: 11, name: "Juan Rosas", team: "SCD Racing", points: 6 },
            {
              pos: 12,
              name: "Luis Ramírez",
              team: "Champ Racing Inc.",
              points: 5,
            },
          ],
        },
        "sf-equipos": {
          title: "Equipos",
          headers: ["Pos", "Equipo", "Puntos"],
          data: [
            { pos: 1, name: "Chigüire Racing Team", points: 159 },
            { pos: 2, name: "SCD Racing", points: 26 },
            { pos: 3, name: "Top Fuel", points: 25 },
            { pos: 4, name: "Champ Racing Inc", points: 20 },
            { pos: 5, name: "SDM Racing", points: 8 },
            { pos: 6, name: "Champ Racing Inc.", points: 5 },
          ],
        },
      },
    },
    "track-toys-2025": {
      title: "Track Toys Virtual 2025",
      headers: ["Pos", "Piloto", "Equipo", "Puntos"],
      tabs: {
        "ttc-pilotos": {
          title: "Pilotos",
          headers: ["Pos", "Piloto", "Equipo", "Puntos"],
          data: [
            {
              pos: 1,
              name: "Ivan Sanchez",
              team: "Chiguire Racing Team",
              points: 40,
            },
            {
              pos: 2,
              name: "Cesar Acevedo",
              team: "Chiguire Racing Team",
              points: 27,
            },
            { pos: 3, name: "Sergio Da Silva", team: "SDM Racing", points: 25 },
            {
              pos: 4,
              name: "Andres Gutierrez",
              team: "Chiguire Racing Team",
              points: 20,
            },
            {
              pos: 5,
              name: "Hugo De Sousa",
              team: "",
              points: 18,
            },
            {
              pos: 6,
              name: "Jhoiner Cornelis",
              team: "Top Fuel",
              points: 18,
            },
            { pos: 7, name: "Elionay Delgado", team: "", points: 12 },
            {
              pos: 8,
              name: "Vinicio Rengifo",
              team: "Chiguire Racing Team",
              points: 8,
            },
            {
              pos: 9,
              name: "Pablo Ricupero",
              team: "Team AnalRacing",
              points: 8,
            },
            {
              pos: 10,
              name: "Felix Vargas",
              team: "Chiguire Racing Team",
              points: 6,
            },
            {
              pos: 11,
              name: "Daniel Maldonado",
              team: "SDM Racing",
              points: 4,
            },
          ],
        },
        "ttc-equipos": {
          title: "Equipos",
          headers: ["Pos", "Equipo", "Puntos"],
          data: [
            { pos: 1, name: "Chiguire Racing Team", points: 101 },
            { pos: 2, name: "SDM Racing", points: 29 },
            { pos: 3, name: "Top Fuel", points: 18 },
            { pos: 4, name: "Team AnalRacing", points: 8 },
          ],
        },
      },
    },
    "endurance-spa-2025": {
      title: "Marmo Endurance Invitational (LMDH & GTE) 2025",
      tabs: {
        "endurance-lmdh-pilotos": {
          title: "Pilotos LMDH",
          headers: ["Pos", "Piloto", "Equipo", "Puntos"],
          data: [
            {
              pos: 1,
              name: "Ivan Sanchez",
              team: "Chiguire Racing Team",
              points: 25,
            },
            {
              pos: 2,
              name: "Felix Vargas",
              team: "Chiguire Racing Team",
              points: 18,
            },
            {
              pos: 3,
              name: "Cesar Acevedo",
              team: "Chiguire Racing Team",
              points: 15,
            },
            { pos: 4, name: "Francisco Garlin", team: "Ongrip", points: 12 },
            {
              pos: 5,
              name: "Hugo De Sousa",
              team: "Góticas culonas",
              points: 10,
            },
          ],
        },
        "endurance-gte-pilotos": {
          title: "Pilotos GTE",
          headers: ["Pos", "Piloto", "Equipo", "Puntos"],
          data: [
            { pos: 1, name: "Paul Alex", team: "Top Fuel", points: 25 },
            {
              pos: 2,
              name: "Vinicio Rengifo",
              team: "Chiguire Racing Team",
              points: 18,
            },
            { pos: 3, name: "Nico Arriaga", team: "", points: 15 },
            { pos: 4, name: "Luis Millán", team: "", points: 12 },
            { pos: 5, name: "Daniel Florez", team: "SCD Racing", points: 10 },
            {
              pos: 6,
              name: "Andres Gutierrez",
              team: "Chiguire Racing Team",
              points: 8,
            },
            {
              pos: 7,
              name: "Pablo Ricupero",
              team: "Team AnalRacing",
              points: 6,
            },
          ],
        },
        "endurance-lmdh-equipos": {
          title: "Equipos LMDH",
          headers: ["Pos", "Equipo", "Puntos"],
          data: [
            { pos: 1, name: "Chiguire Racing Team", points: 58 },
            { pos: 2, name: "Ongrip", points: 12 },
            { pos: 3, name: "Góticas culonas", points: 10 },
          ],
        },
        "endurance-gte-equipos": {
          title: "Equipos GTE",
          headers: ["Pos", "Equipo", "Puntos"],
          data: [
            { pos: 1, name: "Chiguire Racing Team", points: 26 },
            { pos: 2, name: "Top Fuel", points: 25 },
            { pos: 3, name: "SCD Racing", points: 10 },
            { pos: 4, name: "Team AnalRacing", points: 6 },
          ],
        },
      },
    },
    "imsa-2025": {
      title: "IMSA VP Racing Sportscar Challenge 2025",
      tabs: {
        "imsa-lmp3-pilotos": {
          title: "Pilotos LMP3",
          headers: ["Pos", "Piloto", "Equipo", "Puntos"],
          data: [
            {
              pos: 1,
              name: "Felix Vargas",
              team: "Chiguire Racing Team",
              points: 1570,
            },
            {
              pos: 2,
              name: "Cesar Acevedo",
              team: "Chiguire Racing Team",
              points: 1460,
            },
            {
              pos: 3,
              name: "Ricardo Benitez",
              team: "Upper Esport",
              points: 1300,
            },
            {
              pos: 4,
              name: "Manolo Cabeza",
              team: "Turpialito Racing",
              points: 970,
            },
            {
              pos: 5,
              name: "Andres Gutierrez",
              team: "Chiguire Racing Team",
              points: 890,
            },
            {
              pos: 6,
              name: "Ivan Sanchez",
              team: "chiguire racing team",
              points: 280,
            },
            {
              pos: 7,
              name: "Miguel Crespo",
              team: "Argentina Track",
              points: 260,
            },
            {
              pos: 8,
              name: "Castor Morales",
              team: "Castorgabo Team",
              points: 260,
            },
            {
              pos: 9,
              name: "Carlos Brun",
              team: "Argentina Track",
              points: 250,
            },
            {
              pos: 10,
              name: "Luis Ramírez",
              team: "Champ Racing inc.",
              points: 0,
            },
          ],
        },
        "imsa-gsx-pilotos": {
          title: "Pilotos GSX",
          headers: ["Pos", "Piloto", "Equipo", "Puntos"],
          data: [
            {
              pos: 1,
              name: "Hugo De Sousa",
              team: "Etron Racing",
              points: 1390,
            },
            { pos: 2, name: "Jhoiner Cornelis", team: "Top Fuel", points: 970 },
            { pos: 3, name: "Carlos Mayolo", team: "SCD Racing", points: 780 },
            {
              pos: 4,
              name: "Luis Ramirez",
              team: "Champ Racing Inc.",
              points: 700,
            },
            {
              pos: 5,
              name: "Edu Frendsdorff",
              team: "Argentina Track",
              points: 650,
            },
            {
              pos: 6,
              name: "Adrián Quirós",
              team: "Champ Racing Inc.",
              points: 620,
            },
            {
              pos: 7,
              name: "Manolo Cabeza",
              team: "Turpialito Racing",
              points: 610,
            },
            { pos: 8, name: "José Manuel Ruiz", team: "Top Fuel", points: 580 },
            {
              pos: 9,
              name: "Pablo Ricupero",
              team: "Team AnalRacing",
              points: 500,
            },
            { pos: 10, name: "Daniel Florez", team: "SCD Racing", points: 500 },
            { pos: 11, name: "Paul Alex", team: "Top Fuel", points: 320 },
            {
              pos: 12,
              name: "Victor Cova",
              team: "CACHAMAY MOTORSPORT",
              points: 300,
            },
            {
              pos: 13,
              name: "Carlos Aleman",
              team: "CACHAMAY MOTORSPORT",
              points: 280,
            },
            {
              pos: 14,
              name: "Ivan Nuñez",
              team: "Argentina Track",
              points: 260,
            },
            { pos: 15, name: "Ricardo Serrano", team: "Top Fuel", points: 250 },
            { pos: 16, name: "Agustin", team: "Argentina Track", points: 240 },
            {
              pos: 17,
              name: "TONI_CELE",
              team: "Pista Argentina",
              points: 230,
            },
            { pos: 18, name: "Gabo Medina", team: "Top Fuel", points: 230 },
          ],
        },
        "imsa-lmp3-equipos": {
          title: "Equipos LMP3",
          headers: ["Pos", "Equipo", "Puntos"],
          data: [
            { pos: 1, name: "Chiguire Racing Team", points: 4480 },
            { pos: 2, name: "Upper Esport", points: 1300 },
            { pos: 3, name: "Turpialito Racing", points: 1290 },
            { pos: 4, name: "Castorgabo Team", points: 540 },
            { pos: 5, name: "chiguire racing team", points: 540 },
            { pos: 6, name: "Argentina Track", points: 510 },
            { pos: 7, name: "Champ Racing Inc.", points: 350 },
          ],
        },
        "imsa-gsx-equipos": {
          title: "Equipos GSX",
          headers: ["Pos", "Equipo", "Puntos"],
          data: [
            { pos: 1, name: "Top Fuel", points: 2070 },
            { pos: 2, name: "Etron Racing", points: 1390 },
            { pos: 3, name: "Champ Racing Inc.", points: 1320 },
            { pos: 4, name: "SCD Racing", points: 1280 },
            { pos: 5, name: "Argentina Track", points: 1150 },
            { pos: 6, name: "Turpialito Racing", points: 610 },
            { pos: 7, name: "CACHAMAY MOTORSPORT", points: 580 },
            { pos: 8, name: "Team AnalRacing", points: 500 },
            { pos: 9, name: "ARA Team Racing", points: 280 },
            { pos: 10, name: "Pista Argentina", points: 230 },
          ],
        },
      },
    },
    "tcr-latam-2024": {
      title: "MarmoCup TCR Latam 2024",
      headers: ["Pos", "Piloto", "Equipo", "Puntos"],
      tabs: {
        "tcr-pilotos": {
          title: "Pilotos",
          headers: ["Pos", "Piloto", "Equipo", "Puntos"],
          data: [
            {
              pos: 1,
              name: "Alejandro Torres",
              team: "Champ Racing Inc.",
              points: 261,
            },
            {
              pos: 2,
              name: "Hugo de Sousa",
              team: "",
              points: 226,
            },
            { pos: 3, name: "Paul Alexander", team: "Top Fuel", points: 220 },
            { pos: 4, name: "Carlos Reyes", team: "Top Fuel", points: 208 },
            {
              pos: 5,
              name: "Carlos Aleman",
              team: "Cachamay Motorsports",
              points: 206,
            },
            {
              pos: 6,
              name: "Hector Guerrero",
              team: "Autoperformance",
              points: 202,
            },
            { pos: 7, name: "José Manuel Ruiz", team: "Top Fuel", points: 193 },
            {
              pos: 8,
              name: "Jhoiner Cornelis",
              team: "Top Fuel",
              points: 180,
            },
            {
              pos: 9,
              name: "Hans Castañeda",
              team: "Champ Racing Inc.",
              points: 176,
            },
            {
              pos: 10,
              name: "Daniel Francisco Florez",
              team: "SCD Racing",
              points: 170,
            },
            {
              pos: 11,
              name: "Felix Vargas",
              team: "Chigüire Racing Team",
              points: 166,
            },
            { pos: 12, name: "Ranses Gutierrez", team: "", points: 157 },
            {
              pos: 13,
              name: "Pablo Granadillo",
              team: "Turpialito Racing",
              points: 150,
            },
            {
              pos: 14,
              name: "Gabriel Medina",
              team: "ProSpeed Racing Team",
              points: 143,
            },
            {
              pos: 15,
              name: "Andres Gutierrez",
              team: "Chigüire Racing Team",
              points: 136,
            },
            { pos: 16, name: "Ricardo Serrano", team: "Top Fuel", points: 117 },
            { pos: 17, name: "Mauro Rico", team: "", points: 115 },
            {
              pos: 18,
              name: "Cesar Acevedo",
              team: "Chigüire Racing Team",
              points: 103,
            },
            { pos: 19, name: "Carlos Mayolo", team: "SCD Racing", points: 93 },
            {
              pos: 20,
              name: "Francisco Garlin",
              team: "OnGrip SimRacing Team",
              points: 71,
            },
            {
              pos: 21,
              name: "Santiago Barrios",
              team: "Rebellion Autosport",
              points: 62,
            },
            {
              pos: 22,
              name: "Nahuel Priarollo",
              team: "SCD Racing",
              points: 58,
            },
            {
              pos: 23,
              name: "Mathew Webb",
              team: "Rebellion Autosport",
              points: 48,
            },
            { pos: 24, name: "Ronny Farías", team: "", points: 38 },
            { pos: 25, name: "Tulio Pavone", team: "", points: 32 },
            {
              pos: 26,
              name: "Pablo Ricupero",
              team: "Chigüire Racing Team",
              points: 25,
            },
            { pos: 27, name: "Rogelio dos Santos", team: "", points: 20 },
            {
              pos: 28,
              name: "Ivan Sanchez",
              team: "ProSpeed Racing Team",
              points: 0,
            },
            { pos: 29, name: "Daniel Pardo", team: "", points: 0 },
            {
              pos: 30,
              name: "Martin Matko",
              team: "Eclipse-Champ Racing Inc.",
              points: 0,
            },
          ],
        },
        "tcr-equipos": {
          title: "Equipos",
          headers: ["Pos", "Equipo", "Puntos"],
          data: [
            { pos: 1, name: "Top Fuel", points: 918 },
            { pos: 2, name: "Champ Racing Inc.", points: 437 },
            { pos: 3, name: "Chigüire Racing Team", points: 430 },
            { pos: 4, name: "SCD Racing", points: 321 },
            { pos: 5, name: "Cachamay Motorsports", points: 206 },
            { pos: 6, name: "Autoperformance", points: 202 },
            { pos: 7, name: "Turpialito Racing", points: 150 },
            { pos: 8, name: "ProSpeed Racing Team", points: 143 },
            { pos: 9, name: "Rebellion Autosport", points: 110 },
            { pos: 10, name: "OnGrip SimRacing Team", points: 71 },
            { pos: 11, name: "Eclipse-Champ Racing Inc.", points: 0 },
          ],
        },
      },
    },
  };

  // Función para abrir modales
  document.querySelectorAll(".view-results").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(`${modalId}-modal`);

      if (modal) {
        const championship = championshipsData[modalId];
        if (championship) {
          loadChampionshipData(modal, championship);
        }

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  function loadChampionshipData(modal, championship) {
    const modalTitle = modal.querySelector(".modal-title");
    modalTitle.textContent = championship.title;

    // Cargar datos en cada pestaña
    Object.entries(championship.tabs).forEach(([tabId, tabData]) => {
      const tabContent = modal.querySelector(`#${tabId}`);
      if (tabContent) {
        tabContent.innerHTML = generateTable(tabData);
      }
    });
  }

  function generateTable(tabData) {
    const headers = tabData.headers
      .map((header) => `<th>${header}</th>`)
      .join("");
    const rows = tabData.data
      .map((item) => {
        const cells = Object.values(item)
          .map((value) => `<td>${value}</td>`)
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");

    return `
            <h3>${tabData.title}</h3>
            <table class="results-table">
                <thead><tr>${headers}</tr></thead>
                <tbody>${rows}</tbody>
            </table>
        `;
  }

  // Funciones para cerrar modales y cambiar pestañas (igual que antes)
  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".results-modal");
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".results-modal");
      const tabId = this.getAttribute("data-tab");

      modal
        .querySelectorAll(".tab-btn")
        .forEach((btn) => btn.classList.remove("active"));
      modal
        .querySelectorAll(".tab-content")
        .forEach((content) => content.classList.remove("active"));

      this.classList.add("active");
      modal.querySelector(`#${tabId}`).classList.add("active");
    });
  });

  // Efecto de scroll en navbar
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".glass-nav");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  document.getElementById("mobile-menu").addEventListener("click", function () {
    this.classList.toggle("active");
    document.querySelector(".nav-menu").classList.toggle("active");
  });
});
