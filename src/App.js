import React,{useState} from "react";

const api= {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key==="Enter"){
      fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)// llamada a la api con la key.
      .then(res => res.json())// usamos la respuesta de la llamada y obtenemos el json.
      .then(result => {
        setWeather(result);// guardamos el json en el resultado.
        setQuery("");// limpiamos el input.
        console.log(result);// imprimimos el json.
      })
    }
  }

  const CreadorDeFecha = (d) => {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", 
    "Viernes", "Sabado"];

    let dia = dias[d.getDay()]; // 0-6
    let fecha = d.getDate(); // 1-31
    let mes = meses[d.getMonth()]; // 0-11
    let año = d.getFullYear(); // ejemplo: 2020

    return `${dia} ${fecha} de ${mes} de ${año}`;
  }

  const Traductor = (d) => {// funcion para traducir los climas a español.
    let traduccion = "";
    if (d === "Clouds"){
      traduccion = "Nuboso";
    }
    else if (d === "Clear"){
      traduccion = "Despejado";
    }
    else if (d === "Rain"){
      traduccion = "Lluvia";
    }
    else if (d === "Snow"){
      traduccion = "Nieve";
    }
    else if (d === "Mist"){
      traduccion = "Neblina";
    }
    return traduccion;
  }



  return (
    <div className={(typeof weather.main != "undefined")
    ? ((weather.weather[0].icon !== '01d' && weather.weather[0].icon !== '02d' && weather.weather[0].icon !== '03d' &&
     weather.weather[0].icon !== '04d' && weather.weather[0].icon !== '09d' && weather.weather[0].icon !== '10d' &&
      weather.weather[0].icon !== '11d' && weather.weather[0].icon !== '13d' && weather.weather[0].icon !== '50d')//con esto sabemos si es de día o de noche.
      ? 'App noche'
      : 'App')
    : 'App' }>
      <main>
        <div className="Caja-Busqueda">
          <input
            type="text"
            className="barra-busqueda"
            placeholder="Buscar..."
            onChange={e => setQuery(e.target.value)}// obtenedremos el valor del input en la caja de texto.
            value = {query}// el valor del input lo guardaremos en query.
            onKeyPress={search}// cuando se presione enter, se ejecutara la funcion search.
          />
        </div>
        {(typeof weather.main != "undefined") ?(// si el weather no esta vacio, entonces se ejecutará el siguiente codigo.
          <div>
            <div className="Caja-locacion">
              <div className="locacion">{weather.name},{weather.sys.country}</div>
              <div className="fecha">{CreadorDeFecha(new Date())}</div>
            </div>
            <div className="Caja-Clima">
              <div className="temperatura">{Math.round(weather.main.temp)}°C</div>
              <div className="clima">{Traductor(weather.weather[0].main)}</div>
            </div>
            <div className="Creditos">Aplicación creada por Eduardo Niquín Muñoz</div>
          </div>
        ): ('')}
      </main>
    </div>
  );
}

export default App;
