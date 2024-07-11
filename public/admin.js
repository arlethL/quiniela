document.addEventListener("DOMContentLoaded", function() {
    const jornadaSelect = document.getElementById("jornada");
    const cargarQuinielasButton = document.getElementById("cargarQuinielas");
    const calcularPuntosForm = document.getElementById("calcularPuntosForm");
    const resultadosContainer = document.getElementById("resultadosContainer");
    const exportarExcelButton = document.getElementById("exportarExcel");
    const tablaQuinielas = document.getElementById("tablaQuinielas");
    const tablaQuinielasBody = tablaQuinielas.getElementsByTagName('tbody')[0];

    const partidosPorJornada = {
        1: [
            "Querétaro vs Tijuana",
            "Puebla vs Santos",
            "FC Juárez vs Atlas",
            "San Luis vs América",
            "Tigres vs Necaxa",
            "Chivas vs Toluca",
            "Cruz Azul vs Mazatlán",
            "Pumas vs León",
            "Pachuca vs Rayados"
        ],
        2: [
            "América vs Querétaro",
            "Atlas vs Tigres",
            "Mazatlán vs Atlético de San Luis",
            "Tijuana vs Chivas",
            "Necaxa vs Puebla",
            "León vs Pachuca",
            "Toluca vs Juárez FC",
            "Santos vs Pumas",
            "Rayados vs Cruz Azul"
        ],
        3: [
            "Querétaro vs Chivas",
            "Atlas vs Santos",
            "Cruz Azul vs Tijuana",
            "Puebla vs León",
            "Juárez vs Pumas",
            "Toluca vs Mazatlán",
            "Pachuca vs Atlético de San Luis",
            "Necaxa vs Rayados",
            "Tigres vs América"
        ],
        4: [
            "Atlético de San Luis vs Tijuana",
            "Puebla vs Atlas",
            "Chivas vs Mazatlán",
            "Santos vs Tigres",
            "Rayados vs Querétaro",
            "Juárez FC vs América",
            "Cruz Azul vs Toluca",
            "Pumas vs Pachuca",
            "León vs Necaxa"
        ],
        5: [
            "Querétaro vs Cruz Azul",
            "Mazatlán vs Pachuca",
            "Tijuana vs Rayados",
            "Necaxa vs Juárez FC",
            "León vs Santos",
            "Atlas vs Pumas",
            "Tigres vs Chivas",
            "Toluca vs Atlético de San Luis"
        ],
        6: [
            "Atlético de San Luis vs Atlas",
            "Mazatlán vs Puebla",
            "Tijuana vs León",
            "Pachuca vs Querétaro",
            "Chivas vs Juárez FC",
            "Rayados vs Toluca",
            "Cruz Azul vs América",
            "Pumas vs Tigres",
            "Santos vs Necaxa"
        ],
        7: [
            "Puebla vs Querétaro",
            "Tigres vs Atlético de San Luis",
            "Atlas vs Pachuca",
            "Juárez FC vs Mazatlán",
            "Toluca vs Tijuana",
            "América vs Chivas",
            "León vs Cruz Azul",
            "Necaxa vs Pumas",
            "Santos vs Rayados"
        ],
        8: [
            "Atlético de San Luis vs Cruz Azul",
            "Pachuca vs Toluca",
            "América vs Atlas",
            "Querétaro vs Tigres",
            "Chivas vs León",
            "Pumas vs Puebla",
            "Mazatlán vs Necaxa",
            "Tijuana vs Santos",
            "Rayados vs Juárez FC"
        ],
        9: [
            "Atlas vs Querétaro",
            "Puebla vs Pachuca",
            "León vs Atlético de San Luis",
            "Necaxa vs América",
            "Rayados vs Mazatlán",
            "Cruz Azul vs Chivas",
            "Santos vs Toluca",
            "Pumas vs Tijuana",
            "Juárez FC vs Tigres"
        ],
        10: [
            "Puebla vs Juárez FC",
            "Querétaro vs Necaxa",
            "Tigres vs León",
            "Tijuana vs Mazatlán",
            "Toluca vs Atlas",
            "Pachuca vs Cruz Azul",
            "Chivas vs Rayados",
            "Atlético de San Luis vs Santos",
            "América vs Pumas"
        ],
        11: [
            "Mazatlán vs Querétaro",
            "Tijuana vs Pachuca",
            "Tigres vs Puebla",
            "Atlético San Luis vs Rayados",
            "Chivas vs Atlas",
            "León vs América",
            "Toluca vs Puebla",
            "Cruz Azul vs Necaxa",
            "Santos vs Juárez FC"
        ],
        12: [
            "Atlas vs Mazatlán",
            "Querétaro vs Toluca",
            "Necaxa vs Tijuana",
            "Puebla vs Cruz Azul",
            "Pachuca vs Chivas",
            "América vs Santos",
            "FC Juárez vs León",
            "Rayados vs Tigres",
            "Pumas vs Atlético San Luis"
        ],
        13: [
            "Chivas vs Necaxa",
            "Santos vs Pachuca",
            "Toluca vs Puebla",
            "Mazatlán vs Tigres",
            "Atlético San Luis vs Querétaro",
            "Cruz Azul vs FC Juárez",
            "Rayados vs Pumas",
            "León vs Atlas",
            "Tijuana vs América"
        ],
        14: [
            "Santos vs Mazatlán",
            "Puebla vs Chivas",
            "León vs Querétaro",
            "Pumas vs Cruz Azul",
            "Tigres vs Pachuca",
            "Atlas vs Tijuana",
            "Necaxa vs Toluca",
            "FC Juárez vs Atlético San Luis",
            "América vs Rayados"
        ],
        15: [
            "Querétaro vs FC Juárez",
            "Tijuana vs Tigres",
            "Mazatlán vs América",
            "Atlético San Luis vs Puebla",
            "Toluca vs León",
            "Chivas vs Pumas",
            "Rayados vs Atlas",
            "Pachuca vs Necaxa",
            "Cruz Azul vs Santos"
        ],
        16: [
            "León vs Mazatlán",
            "Pumas vs Querétaro",
            "Puebla vs Rayados",
            "Santos vs Chivas",
            "Tigres vs Toluca",
            "Necaxa vs Atlético San Luis",
            "América vs Pachuca",
            "Atlas vs Cruz Azul",
            "FC Juárez vs Tijuana"
        ],
        17: [
            "Querétaro vs Santos",
            "Mazatlán vs Pumas",
            "Chivas vs Atlético San Luis",
            "Pachuca vs FC Juárez",
            "Toluca vs América",
            "Cruz Azul vs Tigres",
            "Necaxa vs Atlas",
            "Rayados vs León",
            "Tijuana vs Puebla"
        ]
    };

    function actualizarResultados() {
        const jornada = jornadaSelect.value;
        const partidos = partidosPorJornada[jornada] || [];
        resultadosContainer.innerHTML = "";

        partidos.forEach((partido, index) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <label>${partido}</label>
                <select name="partido${index + 1}">
                    <option value="Local">Local</option>
                    <option value="Empate">Empate</option>
                    <option value="Visitante">Visitante</option>
                </select>
            `;
            resultadosContainer.appendChild(div);
        });

        actualizarTabla(partidos);
    }

    function actualizarTabla(partidos) {
        const thead = tablaQuinielas.querySelector('thead');
        thead.innerHTML = "";
        const tr = document.createElement("tr");
        tr.innerHTML = "<th>Nombre</th>";
        partidos.forEach(partido => {
            const th = document.createElement("th");
            th.textContent = partido;
            tr.appendChild(th);
        });
        tr.innerHTML += "<th>Puntos</th>";
        thead.appendChild(tr);
    }

    jornadaSelect.addEventListener("change", actualizarResultados);
    actualizarResultados(); // Inicializa con la primera jornada

    cargarQuinielasButton.addEventListener("click", function() {
        const jornada = jornadaSelect.value;

        fetch(`/api/quiniela/jornada/${jornada}`)
        .then(response => response.json())
        .then(data => {
            tablaQuinielasBody.innerHTML = "";
            data.forEach(quiniela => {
                const row = tablaQuinielasBody.insertRow();
                row.insertCell(0).textContent = quiniela.nombre;
                partidosPorJornada[jornada].forEach((partido, index) => {
                    const partidoSeleccionado = quiniela.partidos[index] ? quiniela.partidos[index].resultado : "";
                    row.insertCell().textContent = partidoSeleccionado;
                });
                row.insertCell().textContent = "0"; // Placeholder para los puntos
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    calcularPuntosForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const jornada = jornadaSelect.value;
        const formData = new FormData(calcularPuntosForm);
        const resultados = {};

        formData.forEach((value, key) => {
            resultados[key] = value;
        });

        fetch('/api/quiniela/calcular-puntos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jornada, resultados })
        })
        .then(response => response.json())
        .then(data => {
            tablaQuinielasBody.innerHTML = "";
            data.forEach(quiniela => {
                const row = tablaQuinielasBody.insertRow();
                row.insertCell(0).textContent = quiniela.nombre;
                partidosPorJornada[jornada].forEach((partido, index) => {
                    const partidoSeleccionado = quiniela.partidos[index] ? quiniela.partidos[index].resultado : "";
                    row.insertCell().textContent = partidoSeleccionado;
                });
                row.insertCell().textContent = quiniela.puntos;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    exportarExcelButton.addEventListener("click", function() {
        const wb = XLSX.utils.table_to_book(document.getElementById("tablaQuinielas"));
        XLSX.writeFile(wb, 'quinielas.xlsx');
    });
});
