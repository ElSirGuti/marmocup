document.addEventListener("DOMContentLoaded", function () {
  // Datos de los campeonatos
  const championshipsData = {
    "sim-boxer-2025": {
      title: "MarmoCup SimBoxer 2025",
      tabs: {
        "boxer-porsche": {
          title: "Pilotos Porsche Cup",
          headers: ["Pos", "Piloto", "Puntos"],
          data: [
            { "pos": 1, "name": "Gabriel Parra", "points": 106 },
            { "pos": 2, "name": "Gustavo Mendez", "points": 90 },
            { "pos": 3, "name": "Ricardo Serrano", "points": 59 },
            { "pos": 4, "name": "Paul Ordoñez", "points": 54 },
            { "pos": 5, "name": "José Ruiz", "points": 50 },
            { "pos": 6, "name": "Hector García", "points": 50 },
            { "pos": 7, "name": "Luis Ramírez", "points": 38 },
            { "pos": 8, "name": "Jhoiner Cornelis", "points": 35 },
            { "pos": 9, "name": "Luis González", "points": 32 },
            { "pos": 10, "name": "Jesus Zabala", "points": 32 },
            { "pos": 11, "name": "Andrés Aza", "points": 30 },
            { "pos": 12, "name": "Victor Cova", "points": 30 },
            { "pos": 13, "name": "Carlos Aleman", "points": 22 },
            { "pos": 14, "name": "Eduardo Socarras", "points": 20 },
            { "pos": 15, "name": "Carlos Alvarez", "points": 20 },
            { "pos": 16, "name": "Pablo Granadillo", "points": 0 }
          ],
        },
        "boxer-toyota": {
          title: "Pilotos Toyota GR86",
          headers: ["Pos", "Piloto", "Puntos"],
          data: [
            { "pos": 1, "name": "Carlos Reyes", "points": 108 },
            { "pos": 2, "name": "Hugo De Sousa", "points": 75 },
            { "pos": 3, "name": "Juan Sanz", "points": 64 },
            { "pos": 4, "name": "Castor Morales", "points": 61 },
            { "pos": 5, "name": "Elionay Delgado", "points": 60 },
            { "pos": 6, "name": "Luis Monasterios", "points": 58 },
            { "pos": 7, "name": "Pablo Ricupero", "points": 58 },
            { "pos": 8, "name": "Cesar Acevedo", "points": 50 },
            { "pos": 9, "name": "Gabriel Medina", "points": 45 },
            { "pos": 10, "name": "Erick Ramírez", "points": 42 },
            { "pos": 11, "name": "Felix Vargas", "points": 38 },
            { "pos": 12, "name": "José Pernía", "points": 36 },
            { "pos": 13, "name": "Luis Millán", "points": 18 },
            { "pos": 14, "name": "Pablo Miguez", "points": 17 },
            { "pos": 15, "name": "Kevin Prada", "points": 16 },
            { "pos": 16, "name": "Andrés Gutiérrez", "points": 0 },
            { "pos": 17, "name": "Anthony Briceño", "points": 0 }
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

  // Datos de las carreras detalladas
  const raceDetailsData = {
  "sim-boxer-2025": {
    "ronda-1": {
      title: "Ronda 1: Oschersleben",
      subtitle: "MarmoCup SimBoxer 2025",
      date: "13 Jun 2025",
      results: {
        "porsche-cup": {
          title: "Porsche Cup",
          headers: ["Pos", "Piloto", "Diferencia", "Vuelta Más Rápida", "Puntos"],
          data: [
            { pos: 1, name: "Gabriel Parra", time: "----", fastestLap: "1:28.499", points: 58},
            { pos: 2, name: "Gustavo Mendez", time: "+17.101", fastestLap: "1:28.662", points: 40},
            { pos: 3, name: "Ricardo Serrano", time: "+30.107", fastestLap: "1:29.441", points: 35},
            { pos: 4, name: "Jesus Zabala", time: "+43.295", fastestLap: "1:30.514", points: 32},
            { pos: 5, name: "Victor Cova", time: "+45.481", fastestLap: "1:30.742", points: 30},
            { pos: 6, name: "José Manuel Ruiz", time: "+50.781", fastestLap: "1:30.739", points: 28},
            { pos: 7, name: "Paul Ordoñez", time: "+51.604", fastestLap: "1:29.826", points: 26},
            { pos: 8, name: "Hector Garcia", time: "+1:07", fastestLap: "1:30.128", points: 24},
            { pos: 9, name: "Carlos Alemán", time: "+1:27", fastestLap: "1:30.954", points: 22},
            { pos: 10, name: "Eduardo Socarras", time: "+1L", fastestLap: "1:30.068", points: 20},
            { pos: 11, name: "Luis Ramírez", time: "DNF", fastestLap: "1:30.176", points: 19},
            { pos: 12, name: "Jhoiner Cornelis", time: "DNF", fastestLap: "1:29.766", points: "0"}
        ]
        },
        "toyota-gr86": {
          title: "Toyota GR86",
          headers: ["Pos", "Piloto", "Diferencia", "Vuelta Más Rápida", "Puntos"],
          data: [
            { pos: 1, name: "Carlos Reyes", time: "----", fastestLap: "1:41.275", points: 55},
            { pos: 2, name: "Hugo De Sousa", time: "+0.951", fastestLap: "1:41.375", points: 40},
            { pos: 3, name: "Castor Morales", time: "+2.415", fastestLap: "1:41.683", points: 35},
            { pos: 4, name: "Juan Sanz", time: "+19.318", fastestLap: "1:42.260", points: 32},
            { pos: 5, name: "Elionay Delgado", time: "+19.386", fastestLap: "1:41.272", points: 33},
            { pos: 6, name: "Luis Monasterio", time: "+23.189", fastestLap: "1:42.540", points: 28},
            { pos: 7, name: "Cesar Alejandro", time: "+29.041", fastestLap: "1:42.715", points: 26},
            { pos: 8, name: "Ranses Gutierrez", time: "+33.988", fastestLap: "1:43.168", points: 24},
            { pos: 9, name: "Erick Ramirez", time: "+51.822", fastestLap: "1:43.930", points: 22},
            { pos: 10, name: "Jose Pernia", time: "+53.232", fastestLap: "1:41.451", points: 20},
            { pos: 11, name: "Felix Vargas", time: "+1:01", fastestLap: "1:42.046", points: 19},
            { pos: 12, name: "Pablo Ricupero", time: "+1L", fastestLap: "1:43.090", points: 18},
            { pos: 13, name: "Gabo Medina", time: "+1L", fastestLap: "1:41.825", points: 17},
            { pos: 14, name: "Kevin Perez", time: "+1L", fastestLap: "1:48.659", points: 16},
            { pos: 15, name: "Luis Millán", time: "DNF", fastestLap: "1:42.368", points: "0"}
          ]
        }
      },
      qualifying: {
        "porsche-cup": {
          title: "Porsche Cup",
          headers: ["Pos", "Piloto", "Mejor Vuelta", "Diferencia"],
          "data": [
            { pos: 1, name: "Gabriel Parra", bestLap: "1:28.132", diff: "----" },
            { pos: 2, name: "Gustavo Mendez", bestLap: "1:28.295", diff: "+0.163" },
            { pos: 3, name: "Jhoiner Cornelis", bestLap: "1:29.493", diff: "+1.361" },
            { pos: 4, name: "Paul Ordoñez", bestLap: "1:29.527", diff: "+1.395" },
            { pos: 5, name: "Luis Ramirez", bestLap: "1:29.659", diff: "+1.527" },
            { pos: 6, name: "Ricardo Serrano", bestLap: "1:29.733", diff: "+1.601" },
            { pos: 7, name: "Eduardo Socarras", bestLap: "1:29.985", diff: "+1.853" },
            { pos: 8, name: "Victor Cova", bestLap: "1:30.416", diff: "+2.284" },
            { pos: 9, name: "Jesus Zabala", bestLap: "1:30.634", diff: "+2.502" },
            { pos: 10, name: "Carlos Aleman", bestLap: "1:30.736", diff: "+2.604" },
            { pos: 11, name: "Hector Garcia", bestLap: "1:30.814", diff: "+2.682" },
            { pos: 12, name: "Jose Manuel Ruiz", bestLap: "1:31.201", diff: "+3.069" }
          ]
        },
        "toyota-gr86": {
          title: "Toyota GR86",
          headers: ["Pos", "Piloto", "Mejor Vuelta", "Diferencia"],
          data: [
            { pos: 1, name: "Carlos Alberto Reyes Saade", bestLap: "1:41.015", diff: "----" },
            { pos: 2, name: "Hugo De Sousa", bestLap: "1:41.085", diff: "+0.070" },
            { pos: 3, name: "Elionay Delgado", bestLap: "1:41.293", diff: "+0.278" },
            { pos: 4, name: "Jose Pernia", bestLap: "1:41.385", diff: "+0.370" },
            { pos: 5, name: "Luis Monasterio", bestLap: "1:41.442", diff: "+0.427" },
            { pos: 6, name: "Felix Vargas", bestLap: "1:41.521", diff: "+0.506" },
            { pos: 7, name: "Castor Morales", bestLap: "1:41.691", diff: "+0.676" },
            { pos: 8, name: "Gabo Medina", bestLap: "1:41.745", diff: "+0.730" },
            { pos: 9, name: "Cesar Alejandro", bestLap: "1:41.918", diff: "+0.903" },
            { pos: 10, name: "Luis Millan", bestLap: "1:42.581", diff: "+1.566" },
            { pos: 11, name: "Juan Sanz", bestLap: "1:42.884", diff: "+1.869" },
            { pos: 12, name: "Ranses Gutierrez", bestLap: "1:43.332", diff: "+2.317" },
            { pos: 13, name: "Kevin Perez", bestLap: "1:45.465", diff: "+4.450" }
          ]
        }
      },
      practice: {
        "porsche-cup": {
          title: "Porsche Cup",
          headers: ["Pos", "Piloto", "Mejor Vuelta", "Vueltas"],
          data: [
            { "pos": 1, "name": "Gabriel Parra", "bestLap": "1:28.259", "laps": 12, "diff": "-" },
            { "pos": 2, "name": "Gustavo Mendez", "bestLap": "1:28.473", "laps": 12, "diff": "+0.214" },
            { "pos": 3, "name": "Ricardo Serrano", "bestLap": "1:29.663", "laps": 10, "diff": "+1.404" },
            { "pos": 4, "name": "Jhoiner Cornelis", "bestLap": "1:29.904", "laps": 10, "diff": "+1.645" },
            { "pos": 5, "name": "Eduardo Socarras", "bestLap": "1:29.905", "laps": 8, "diff": "+1.646" },
            { "pos": 6, "name": "Luis Ramirez", "bestLap": "1:30.116", "laps": 11, "diff": "+1.857" },
            { "pos": 7, "name": "Jesus Zabala", "bestLap": "1:30.116", "laps": 10, "diff": "+1.857" },
            { "pos": 8, "name": "Victor Cova", "bestLap": "1:30.417", "laps": 7, "diff": "+2.158" },
            { "pos": 9, "name": "Carlos Aleman", "bestLap": "1:30.473", "laps": 9, "diff": "+2.214" },
            { "pos": 10, "name": "Paul Ordoñez", "bestLap": "1:30.621", "laps": 4, "diff": "+2.362" },
            { "pos": 11, "name": "Hector Garcia", "bestLap": "1:31.102", "laps": 2, "diff": "+2.843" },
            { "pos": 12, "name": "Jose Manuel Ruiz", "bestLap": "1:31.979", "laps": 4, "diff": "+3.720" }
          ]
        },
        "toyota-gr86": {
          title: "Toyota GR86",
          headers: ["Pos", "Piloto", "Mejor Vuelta", "Vueltas"],
          data: [
              { "pos": 1, "name": "Carlos Reyes", "bestLap": "1:40.808", "laps": 7, "diff": "-" },
              { "pos": 2, "name": "Gabo Medina", "bestLap": "1:41.420", "laps": 6, "diff": "+0.612" },
              { "pos": 3, "name": "Luis Monasterio", "bestLap": "1:41.466", "laps": 9, "diff": "+0.658" },
              { "pos": 4, "name": "Elionay Delgado", "bestLap": "1:41.656", "laps": 10, "diff": "+0.848" },
              { "pos": 5, "name": "Felix Vargas", "bestLap": "1:41.858", "laps": 8, "diff": "+1.050" },
              { "pos": 6, "name": "Jose Pernia", "bestLap": "1:41.899", "laps": 7, "diff": "+1.091" },
              { "pos": 7, "name": "Castor Morales", "bestLap": "1:42.257", "laps": 7, "diff": "+1.449" },
              { "pos": 8, "name": "Cesar Alejandro", "bestLap": "1:42.496", "laps": 4, "diff": "+1.688" },
              { "pos": 9, "name": "Luis Millan", "bestLap": "1:42.826", "laps": 6, "diff": "+2.018" },
              { "pos": 10, "name": "Juan Sanz", "bestLap": "1:43.028", "laps": 4, "diff": "+2.220" },
              { "pos": 11, "name": "Ranses Gutierrez", "bestLap": "1:43.040", "laps": 8, "diff": "+2.232" },
              { "pos": 12, "name": "Erick Ramirez", "bestLap": "1:45.042", "laps": 3, "diff": "+4.234" },
              { "pos": 13, "name": "Hugo De Sousa", "bestLap": "1:45.445", "laps": 2, "diff": "+4.637" },
              { "pos": 14, "name": "Pablo Ricupero", "bestLap": "1:45.696", "laps": 1, "diff": "+4.888" }
          ]
        }
      }
    },
    "ronda-2":{
      title: "Ronda 2: Virginia International Raceway",
      subtitle: "MarmoCup SimBoxer 2025",
      date: "20 Jun 2025",
      results: {
        "porsche-cup": {
          title: "Porsche Cup",
          headers: ["Pos", "Piloto", "Diferencia", "Vuelta Más Rápida", "Puntos"],
          data: [
            { "pos": 1, "name": "Gustavo Mendez", "time": "----", "fastestLap": "1:47.559", "points": 50 },
            { "pos": 2, "name": "Gabriel Parra", "time": "+4.968", "fastestLap": "1:47.274", "points": 40 + 3 + 5 },
            { "pos": 3, "name": "Jhoiner Cornelis", "time": "+22.372", "fastestLap": "1:48.477", "points": 35 },
            { "pos": 4, "name": "Luis Gonzalez", "time": "+27.970", "fastestLap": "1:49.549", "points": 32 },
            { "pos": 5, "name": "Andres Aza", "time": "+33.364", "fastestLap": "1:48.888", "points": 30 },
            { "pos": 6, "name": "Paul Ordoñez", "time": "+44.538", "fastestLap": "1:48.738", "points": 28 },
            { "pos": 7, "name": "Hector Garcia", "time": "+44.745", "fastestLap": "1:48.972", "points": 26 },
            { "pos": 8, "name": "Ricardo Serrano Lovera", "time": "+51.686", "fastestLap": "1:49.149", "points": 24 },
            { "pos": 9, "name": "Jose Ruiz", "time": "+54.907", "fastestLap": "1:49.517", "points": 22 },
            { "pos": 10, "name": "Carlos Alvarez", "time": "+1:11.207", "fastestLap": "1:48.478", "points": 20 },
            { "pos": 11, "name": "Luis Ramirez", "time": "+1L", "fastestLap": "1:48.660", "points": 19 }
          ],
        },
        "toyota-gr86":{
          title: "Toyota GR86",
          headers: ["Pos", "Piloto", "Diferencia", "Vuelta Más Rápida", "Puntos"],
          data: [
              { "pos": 1, "name": "Carlos Reyes", "time": "----", "fastestLap": "", "points": 50 + 3 },
              { "pos": 2, "name": "Pablo Ricupero", "time": "+12.06", "fastestLap": "", "points": 40 },
              { "pos": 3, "name": "Hugo de Sousa", "time": "+12.47", "fastestLap": "", "points": 35 },
              { "pos": 4, "name": "Juan Sanz", "time": "+14.85", "fastestLap": "", "points": 32 },
              { "pos": 5, "name": "Luis Monasterios", "time": "+18.38", "fastestLap": "", "points": 30 },
              { "pos": 6, "name": "Gabriel Medina", "time": "+19.70", "fastestLap": "", "points": 28 },
              { "pos": 7, "name": "Castor Morales", "time": "+36.26", "fastestLap": "", "points": 26 },
              { "pos": 8, "name": "Cesar Acevedo", "time": "+38.81", "fastestLap": "", "points": 24 },
              { "pos": 9, "name": "Elionay Delgado", "time": "+44.92", "fastestLap": "", "points": 22 + 5 },
              { "pos": 10, "name": "Erick Ramirez", "time": "+57.54", "fastestLap": "", "points": 20 },
              { "pos": 11, "name": "Felix Vargas", "time": "+1:01.150", "fastestLap": "", "points": 19 },
              { "pos": 12, "name": "Luis Millan", "time": "+2L", "fastestLap": "", "points": 18 },
              { "pos": 13, "name": "Pablo Miguez", "time": "+2L", "fastestLap": "", "points": 17 },
              { "pos": 14, "name": "José Pernia", "time": "+3L", "fastestLap": "", "points": 16 },
              { "pos": 15, "name": "Andres Gutiérrez", "time": "+8L", "fastestLap": "", "points": "0" }
          ]
        }
      }
    }
    // Más rondas...
  },
  // Más campeonatos...
};

  // Event listeners para los botones de ver resultados generales
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

  // Event listeners para los items de ronda
  document.querySelectorAll(".round-item.clickable").forEach(item => {
    item.addEventListener("click", function() {
      const championshipId = this.closest(".championship-card").getAttribute("data-championship");
      const roundId = this.getAttribute("data-round");
      openRaceDetailsModal(championshipId, roundId);
    });
  });

  // Función para abrir el modal de detalles de carrera
  function openRaceDetailsModal(championshipId, roundId) {
  const modal = document.getElementById("race-details-modal");
  const titleElement = document.getElementById("race-modal-title");
  const subtitleElement = document.getElementById("race-modal-subtitle");
  
  // Verificar que los datos existen
  if (!raceDetailsData[championshipId]) {
    console.error("No se encontró el campeonato:", championshipId);
    return;
  }
  
  const roundData = raceDetailsData[championshipId][roundId];
  
  if (!roundData) {
    console.error(`No se encontraron datos para ${championshipId} - ${roundId}`);
    return;
  }

  // Configurar títulos
  titleElement.textContent = roundData.title;
  subtitleElement.textContent = championshipsData[championshipId].title;

  // Cargar datos
  document.getElementById("race-results").innerHTML = 
    generateRaceResults(roundData.results);
  document.getElementById("race-qualifying").innerHTML = 
    generateRaceQualifying(roundData.qualifying);
  document.getElementById("race-practice").innerHTML = 
    generateRacePractice(roundData.practice);
  
  // Mostrar modal
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

  // Funciones para generar tablas de resultados
  function generateRaceResults(resultsData) {
    if (!resultsData) return "<p>No hay datos de resultados disponibles.</p>";
    
    let html = "";
    
    for (const [category, data] of Object.entries(resultsData)) {
      html += `<h3 class="category-title">${data.title}</h3>`;
      html += `<table class="race-details-table">`;
      html += `<thead><tr>${data.headers.map(header => `<th>${header}</th>`).join("")}</tr></thead>`;
      html += `<tbody>`;
      
      // Encontrar la vuelta más rápida global
      const fastestLaps = data.data.map(item => item.fastestLap).filter(Boolean);
      const globalFastestLap = fastestLaps.length > 0 ? 
        fastestLaps.reduce((a, b) => a < b ? a : b) : null;
      
      data.data.forEach(item => {
        html += `<tr>`;
        // Mapear cada header a su propiedad correspondiente en el objeto
        data.headers.forEach(header => {
          const headerKey = {
            'Pos': 'pos',
            'Piloto': 'name',
            'Equipo': 'team',
            'Diferencia': 'time',
            'Vuelta Más Rápida': 'fastestLap',
            'Puntos': 'points'
          }[header] || header.toLowerCase();
          
          let value = item[headerKey] || "";
          
          if (header === "Vuelta Más Rápida" && value === globalFastestLap) {
            value = `<span class="fastest-lap"><i class="fas fa-stopwatch"></i> ${value}</span>`;
          }
          
          html += `<td>${value}</td>`;
        });
        html += `</tr>`;
      });
      
      html += `</tbody></table>`;
    }
    
    return html;
  }

  function generateRaceQualifying(qualifyingData) {
  if (!qualifyingData) return "<p>No hay datos de clasificación disponibles.</p>";
  
  let html = "";
  
  for (const [category, data] of Object.entries(qualifyingData)) {
    html += `<h3 class="category-title">${data.title}</h3>`;
    html += `<table class="race-details-table">`;
    html += `<thead><tr>${data.headers.map(header => `<th>${header}</th>`).join("")}</tr></thead>`;
    html += `<tbody>`;
    
    data.data.forEach(item => {
      html += `<tr>`;
      data.headers.forEach(header => {
        const headerKey = {
          'Pos': 'pos',
          'Piloto': 'name',
          'Equipo': 'team',
          'Mejor Vuelta': 'bestLap',
          'Diferencia': 'diff'
        }[header] || header.toLowerCase();
        
        html += `<td>${item[headerKey] || ""}</td>`;
      });
      html += `</tr>`;
    });
    
    html += `</tbody></table>`;
  }
  
  return html;
}

function generateRacePractice(practiceData) {
  if (!practiceData) return "<p>No hay datos de práctica disponibles.</p>";
  
  let html = "";
  
  for (const [category, data] of Object.entries(practiceData)) {
    html += `<h3 class="category-title">${data.title}</h3>`;
    html += `<table class="race-details-table">`;
    html += `<thead><tr>${data.headers.map(header => `<th>${header}</th>`).join("")}</tr></thead>`;
    html += `<tbody>`;
    
    data.data.forEach(item => {
      html += `<tr>`;
      data.headers.forEach(header => {
        const headerKey = {
          'Pos': 'pos',
          'Piloto': 'name',
          'Equipo': 'team',
          'Mejor Vuelta': 'bestLap',
          'Vueltas': 'laps'
        }[header] || header.toLowerCase();
        
        html += `<td>${item[headerKey] || ""}</td>`;
      });
      html += `</tr>`;
    });
    
    html += `</tbody></table>`;
  }
  
  return html;
}

  // Función para cargar datos en los modales de campeonato
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

  // Función para generar tablas generales
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

  // Cerrar modales
  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".results-modal, .race-details-modal");
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  // Cambiar pestañas
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".results-modal, .race-details-modal");
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

document.querySelectorAll(".round-item.clickable").forEach(item => {
  item.addEventListener("click", function() {
    const championshipCard = this.closest(".championship-card");
    console.log("Elemento championshipCard:", championshipCard);
    console.log("Atributo data-championship:", championshipCard.getAttribute("data-championship"));
    console.log("Atributo data-round:", this.getAttribute("data-round"));
  });
});
