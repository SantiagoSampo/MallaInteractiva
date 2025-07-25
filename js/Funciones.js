function removePopUp(){
    const overlay = document.getElementById("overlay");
    if(overlay){
        overlay.style.display = "none";
    }
}

function guardarEstadoTachado() {
  const tachadas = Array.from(document.querySelectorAll('g.subject line.diagonal')).map(linea => linea.parentNode.id);
  localStorage.setItem('materias_tachadas', JSON.stringify(tachadas));
}

function actualizarMateriasHabilitadas(previas) {
  document.querySelectorAll('g.subject').forEach(g => {
    if (puedeTachar(g, previas)) {
      g.classList.remove('disabled');
    } else {
      g.classList.add('disabled');
    }
  });
}

const previas = {
  "Taller de Tecnologías 1": [],
  "Programación 1": [],
  "Álgebra Lineal": [],
  "Cálculo en una variable": [],
  "Fundamentos de Computación": [],
  "Programación 2": ["Programación 1"],
  "Matemática Discreta": [],
  "Fundamentos de sistemas ciberfísicos": ["Cálculo en una variable"],
  "Lógica para Computación": ["Fundamentos de Computación"],
  "Estructura de datos y algoritmos 1": ["Programación 2","Fundamentos de Computación"],
  "Arquitectura de sistemas":[],
  "Probabilidad y Estadística": ["Álgebra Lineal", "Cálculo en una variable"],
  "Fundamentos de ingeniería de software": ["Programación 2"],
  "Estructura de datos y algoritmos 2":["Estructura de datos y algoritmos 1","Matemática Discreta"],
  "Bases de datos 1":["Programación 2"],
  "Sistemas operativos": ["Arquitectura de sistemas"],
  "Materia de Matemática":["Álgebra Lineal", "Cálculo en una variable"],
  "Teoría de la computación": ["Estructura de datos y algoritmos 1", "Lógica para Computación"],
  "Diseño de aplicaciones 1":["Estructura de datos y algoritmos 1","Bases de datos 1","Fundamentos de ingeniería de software"],
  "Bases de datos 2":["Bases de datos 1", "Lógica para Computación"],
  "Redes": ["Sistemas operativos"],
  "Materia de Ciencas sociales": [],
  "Ingeniería de software ágil 1": ["Diseño de aplicaciones 1", "Fundamentos de ingeniería de software", "Materia de Ciencas sociales"],
  "Diseño de aplicaciones 2": [ "Diseño de aplicaciones 1", "Fundamentos de ingeniería de software"],
  "Taller de tecnologías 2": ["Estructura de datos y algoritmos 2","Bases de datos 1", "Redes", "Diseño de aplicaciones 1", "Fundamentos de sistemas ciberfísicos", "Taller de Tecnologías 1"],
  "Programación de redes":["Diseño de aplicaciones 1","Sistemas operativos" ],
  "Materia de Sistemas Inteligentes": ["Estructura de datos y algoritmos 1", "Probabilidad y Estadística"],
  "Materia de comunicación y negociación": [],
  "Ingeniería de software ágil 2": ["Diseño de aplicaciones 1", "Diseño de aplicaciones 2","Programación de redes", "Ingeniería de software ágil 1"],
  "Arquitectura de software": ["Estructura de datos y algoritmos 2","Bases de datos 2","Diseño de aplicaciones 2","Programación de redes"],
  "Materia de Gestión de la información": [ "Sistemas operativos","Diseño de aplicaciones 1","Bases de datos 2"],
  "Materia de Seguridad informática": [],
  "Inteligencia artificial": ["Estructura de datos y algoritmos 2","Probabilidad y Estadística","Lógica para Computación"],
  "Materia de Innovación y emprendedurismo": ["Materia de comunicación y negociación"],
  "Materia de Ingeniería de productos de software": ["Ingeniería de software ágil 1","Diseño de aplicaciones 2","Programación de redes"],
  "Arquitectura de software en la práctica": ["Ingeniería de software ágil 2","Arquitectura de software","Programación de redes","Materia de Sistemas Inteligentes"],
  "Materia de nuevas tecnologías y dominios de aplicación": ["Diseño de aplicaciones 2","Materia de Sistemas Inteligentes"],
  "Trabajo integrador": ["Ingeniería de software ágil 1", "Diseño de aplicaciones 2", "Programación de redes","Bases de datos 2","Teoría de la computación"],
  "Materia de Lenguajes de programación": ["Lógica para Computación","Estructura de datos y algoritmos 1"],
  "Materia de Comunicación y negociación": ["Materia de Ciencas sociales","Fundamentos de ingeniería de software"],
  "Electiva 1": [],
  "Electiva 2": [],
  "Electiva 3": [],
  "Proyecto": ["Taller de Tecnologías 1","Programación 1","Álgebra Lineal","Cálculo en una variable","Fundamentos de Computación","Programación 2","Matemática Discreta","Fundamentos de sistemas ciberfísicos","Lógica para Computación",
  "Estructura de datos y algoritmos 1","Arquitectura de sistemas","Probabilidad y Estadística","Fundamentos de ingeniería de software","Estructura de datos y algoritmos 2","Bases de datos 1","Sistemas operativos","Materia de Matemática","Teoría de la computación","Diseño de aplicaciones 1","Bases de datos 2","Redes",
  "Materia de Ciencas sociales","Ingeniería de software ágil 1","Diseño de aplicaciones 2","Taller de tecnologías 2","Programación de redes","Materia de Sistemas Inteligentes","Materia de comunicación y negociación",
  "Ingeniería de software ágil 2","Arquitectura de software","Materia de Gestión de la información","Materia de Seguridad informática","Inteligencia artificial","Materia de Innovación y emprendedurismo",
  "Materia de Ingeniería de productos de software","Arquitectura de software en la práctica","Materia de nuevas tecnologías y dominios de aplicación","Trabajo integrador","Materia de Lenguajes de programación"],
}

function isTachada(materia){
  return materia.querySelector('line.diagonal') !== null;
}

function puedeTachar(g, previas){
  const id = g.id;
  const previasMateria = previas[id] || [];
  return previasMateria.every(previa => {
    const previaElement = document.getElementById(previa);
    return previaElement && isTachada(previaElement);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  //Persistencia
  const tachadasGuardadas = JSON.parse(localStorage.getItem('materias_tachadas') || "[]");
  tachadasGuardadas.forEach(nombreMateria => {
  const nodo = document.getElementById(nombreMateria);
  if (!nodo) return;

  const diag = nodo.querySelector('line.diagonal');
  if (!diag) {
    const rect = nodo.querySelector('rect');
    if (!rect) return;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const x = parseFloat(rect.getAttribute('x'));
    const y = parseFloat(rect.getAttribute('y'));
    const width = parseFloat(rect.getAttribute('width'));
    const height = parseFloat(rect.getAttribute('height'));

    line.setAttribute('x1', x);
    line.setAttribute('y1', y);
    line.setAttribute('x2', x + width);
    line.setAttribute('y2', y + height);
    line.setAttribute('stroke', '#8B0000');
    line.setAttribute('stroke-width', '6');
    line.classList.add('diagonal');

    nodo.appendChild(line);
  }
});
  
  
  //Click para cada materia (g.subject)
  document.querySelectorAll('g.subject').forEach(g => {
    g.addEventListener('click', (e) => {
      e.stopPropagation();

      if (!puedeTachar(g, previas)) {
        alert("No podés tachar esta materia porque tiene previas pendientes.");
        return;
      }

      let diag = g.querySelector('line.diagonal');
      if (diag) {
        diag.remove();
      } else {
        const rect = g.querySelector('rect');
        if (!rect) return;

        const x = parseFloat(rect.getAttribute('x'));
        const y = parseFloat(rect.getAttribute('y'));
        const width = parseFloat(rect.getAttribute('width'));
        const height = parseFloat(rect.getAttribute('height'));

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', x);
        line.setAttribute('y1', y);
        line.setAttribute('x2', x + width);
        line.setAttribute('y2', y + height);
        line.setAttribute('stroke', '#8B0000');
        line.setAttribute('stroke-width', '6');
        line.classList.add('diagonal');
        g.appendChild(line);
      }
       guardarEstadoTachado();
      actualizarMateriasHabilitadas(previas);
      quitarTachadosInvalidados();
    });
  });

  
  actualizarMateriasHabilitadas(previas);

  //Click para semestres
  for (const semestreId in materiasPorSemestre) {
    const semElem = document.getElementById(semestreId);
    if (!semElem) continue;

    semElem.addEventListener('click', () => {
      const materias = materiasPorSemestre[semestreId];

      
      const algunaNoTachable = materias.some(nombreMateria => {
        const previasMateria = previas[nombreMateria] || [];
        return previasMateria.some(previa => {
          const previaNodo = document.getElementById(previa);
          return !previaNodo?.querySelector('line.diagonal');
        });
      });

      if (algunaNoTachable) {
        alert("No se puede tachar el semestre completo ya que hay materias con previas pendientes.");
        return;
      }

      
      materias.forEach(nombreMateria => {
        const nodo = document.getElementById(nombreMateria);
        if (!nodo) return;
        const diag = nodo.querySelector('line.diagonal');
        if (diag) diag.remove();
      });

      
      materias.forEach(nombreMateria => {
        const nodo = document.getElementById(nombreMateria);
        if (!nodo) return;

        const rect = nodo.querySelector('rect');
        if (!rect) return;

        const x = parseFloat(rect.getAttribute('x'));
        const y = parseFloat(rect.getAttribute('y'));
        const width = parseFloat(rect.getAttribute('width'));
        const height = parseFloat(rect.getAttribute('height'));

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', x);
        line.setAttribute('y1', y);
        line.setAttribute('x2', x + width);
        line.setAttribute('y2', y + height);
        line.setAttribute('stroke', '#8B0000');
        line.setAttribute('stroke-width', '6');
        line.classList.add('diagonal');

        nodo.appendChild(line);
        
      });
      guardarEstadoTachado();
      actualizarMateriasHabilitadas(previas);
    });
  }

  // Click para años
  for (const añoId in semestresPorAño) {
    const añoElem = document.getElementById(añoId);
    if (!añoElem) continue;

    añoElem.addEventListener('click', () => {
      const semestresActuales = semestresPorAño[añoId];
      const materiasActuales = semestresActuales.flatMap(sem => materiasPorSemestre[sem] || []);

      const años = Object.keys(semestresPorAño);
      const indexAño = años.indexOf(añoId);
      const añosPrevios = años.slice(0, indexAño);
      const materiasPrevias = añosPrevios.flatMap(a =>
        semestresPorAño[a].flatMap(sem => materiasPorSemestre[sem] || [])
      );

      const faltanPrevias = materiasPrevias.some(nombre => {
        const nodo = document.getElementById(nombre);
        if (!nodo) return false;
        return !nodo.querySelector('line.diagonal');
      });

      if (faltanPrevias) {
        alert("No podés tachar este año porque hay materias de años anteriores sin completar.");
        return;
      }

      materiasActuales.forEach(nombre => {
        const nodo = document.getElementById(nombre);
        if (!nodo) return;

        const diag = nodo.querySelector('line.diagonal');
        if (!diag) {
          const rect = nodo.querySelector('rect');
          if (!rect) return;

          const x = parseFloat(rect.getAttribute('x'));
          const y = parseFloat(rect.getAttribute('y'));
          const width = parseFloat(rect.getAttribute('width'));
          const height = parseFloat(rect.getAttribute('height'));

          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute('x1', x);
          line.setAttribute('y1', y);
          line.setAttribute('x2', x + width);
          line.setAttribute('y2', y + height);
          line.setAttribute('stroke', '#8B0000');
          line.setAttribute('stroke-width', '6');
          line.classList.add('diagonal');
          nodo.appendChild(line);
        }
      });
      guardarEstadoTachado();
      actualizarMateriasHabilitadas(previas);
    });
  }

  document.getElementById('btnReset')?.addEventListener('click', () => {
    localStorage.removeItem('materias_tachadas');
    document.querySelectorAll('g.subject line.diagonal').forEach(line => line.remove());
    actualizarMateriasHabilitadas(previas);
    guardarEstadoTachado();
  });

});


const materiasPorSemestre ={
  "sem1": ["Taller de Tecnologías 1", "Programación 1", "Álgebra Lineal", "Cálculo en una variable"],
  "sem2": ["Fundamentos de Computación", "Programación 2", "Matemática Discreta", "Fundamentos de sistemas ciberfísicos"],
  "sem3": ["Lógica para Computación", "Estructura de datos y algoritmos 1", "Arquitectura de sistemas", "Probabilidad y Estadística"],
  "sem4": ["Fundamentos de ingeniería de software", "Estructura de datos y algoritmos 2", "Bases de datos 1", "Sistemas operativos", "Materia de Matemática"],
  "sem5": ["Teoría de la computación", "Diseño de aplicaciones 1", "Bases de datos 2", "Redes", "Materia de Ciencas sociales"],
  "sem6": ["Ingeniería de software ágil 1", "Diseño de aplicaciones 2", "Taller de tecnologías 2", "Programación de redes", "Materia de Sistemas Inteligentes"],
  "sem7": ["Materia de comunicación y negociación", "Ingeniería de software ágil 2", "Arquitectura de software", "Materia de Gestión de la información", "Materia de Seguridad informática", "Inteligencia artificial"],
  "sem8": ["Materia de Innovación y emprendedurismo", "Materia de Ingeniería de productos de software", "Arquitectura de software en la práctica", "Materia de nuevas tecnologías y dominios de aplicación","Trabajo integrador", "Materia de Lenguajes de programación"],
  "sem9": ["Materia de Comunicación y negociación", "Electiva 1"],
  "sem10": ["Electiva 2", "Electiva 3"],
};



const semestresPorAño = {
  "Año1": ["sem1", "sem2"],
  "Año2": ["sem3", "sem4"],
  "Año3": ["sem5", "sem6"],
  "Año4": ["sem7", "sem8"],
  "Año5": ["sem9", "sem10"],
}


const dependientes = {};

for (const materia in previas) {
  previas[materia].forEach(previa => {
    if (!dependientes[previa]) dependientes[previa] = [];
    dependientes[previa].push(materia);
  });
}

function quitarTachadosInvalidados() {
  
  const cola = [];

  
  document.querySelectorAll('g.subject').forEach(g => {
    if (g.classList.contains('disabled') && isTachada(g)) {
      cola.push(g.id);
    }
  });

  while (cola.length > 0) {
    const materiaId = cola.shift();
    const g = document.getElementById(materiaId);
    if (!g) {
      continue;
    }

    const diag = g.querySelector('line.diagonal');
    if (diag) {
      diag.remove();
    }

    actualizarMateriasHabilitadas(previas);

    
    const deps = dependientes[materiaId] || [];
    deps.forEach(depId => {
      const depElem = document.getElementById(depId);
      if (depElem && depElem.classList.contains('disabled') && isTachada(depElem)) {
        if (!cola.includes(depId)) {
          cola.push(depId);
        }
      }
    });
  }
}