# Página web para ver el clima
Creación de una página del clima creada en React con la API de openwhatermap y CSS puro.
## Para ver el proyecto en producción accede a: `https://clima-app-eniquin.netlify.app/`

## Utilización:
#### ***Añadimos todos los documentos a una carpeta y ésta la abrimos con nuestro IDE de preferencia, en ésta misma abrimos la consola y ejecutamos:***
```
npm start
```
#### ***Así iniciaremos nuestra web donde podemos visualizar su funcionamiento y editarla en tiempo real***
#### ***Solo debemos colocar el nombre de una ciudad y nos indicará la fecha, temperatura y clima***

![image](https://user-images.githubusercontent.com/68208770/182745064-283c5272-796e-409b-9fb7-f6c62de03a5f.png)

## Explicación del código:
 
## Prerrequisitos:
#### ***1-Crear una cuenta en OpenWeatherMap***
**Ingresamos a:** `https://openweathermap.org/` **y creamos una cuenta, luego creamos una API Key con el nombre que queramos**

#### ***Esta key la almacenamos en el documento .env para asignarla como nuestra variable de entorno borrando el nombre "template", ésto realizado por motivos de seguridad.***

## API:
```
const api= {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

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
```
#### ***Creamos la constante _api_ donde almacenamos nuestra key con la base que es la dirección de la API de OpenWeather.***
#### ***Luego en la constante _search_ se realiza la consulta a la API, éstos podemos verlos en la consola de la página cuando se envía el nombre de la ciudad.***

## CreadorDeFecha:
```
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
```
#### ***En la constante CreadorDeFecha creamos arreglos con los meses y los días para luego obtener con .get las fechas correspondientes de la petición de la máquina del usuario para así estar al día, éstos datos se retornan como un arreglo.***

## Traductor:
```
const Traductor = (d) => {
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
```
#### ***Utilizamos esta función para traducir el clima desde la API que nos envía los datos en inglés.***

## App a ejecutar:
```
<div className={(typeof weather.main != "undefined")
    ? ((weather.weather[0].icon !== '01d' && weather.weather[0].icon !== '02d' && weather.weather[0].icon !== '03d' &&
     weather.weather[0].icon !== '04d' && weather.weather[0].icon !== '09d' && weather.weather[0].icon !== '10d' &&
      weather.weather[0].icon !== '11d' && weather.weather[0].icon !== '13d' && weather.weather[0].icon !== '50d')
      ? 'App noche'
      : 'App')
```
#### ***Aquí colocamos la búsqueda del clima como "indefinida" por defecto para que no retorne nada al abrir la página y luego una condición que analiza los íconos que retorna la API los cuales nos indican si es de día o de noche en la ciudad buscada, estos datos pueden verse en la documentación de OpenWeather lo cual retorna que se ejecute App.noche o App (día) lo cual afecta el fondo en este caso.***


## Main:
```
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
```

#### ***Aquí tenemos los componentes generales de la página como pueden ser la caja de búsqueda, la locación y el clima además de los créditos de autor.***
#### ***Tenemos la obtención de los datos correspondientes tanto desde la API como desde nuestras funciones anteriormente explicadas.***














