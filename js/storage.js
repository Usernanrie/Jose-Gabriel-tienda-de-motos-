// storage.js - Full Motos Bolivia (final)
function guardarLS(clave, valor){ localStorage.setItem(clave, JSON.stringify(valor)); }
function leerLS(clave){ return JSON.parse(localStorage.getItem(clave)); }

// Si no existe catálogo, inicializar con 40 productos
if(!leerLS("catalogo")){
  const catalogo = [
    // (usa el mismo array que te di antes; para ahorrar espacio, lo escribo abreviado aquí,
    // pega el array completo de 40 productos que ya compartí en mensajes previos).
    // Pero si prefieres: usa el catálogo simplificado:
    {id:1,nombre:"Casco Integral",precio:120,categoria:"Cascos",imagen:"../imagenes/cascos/casco1.jpg",descripcion:"Casco integral."},
    {id:2,nombre:"Casco Abierto",precio:80,categoria:"Cascos",imagen:"../imagenes/cascos/casco2.jpg",descripcion:"Casco abierto."},
    {id:3,nombre:"Casco Modular",precio:150,categoria:"Cascos",imagen:"../imagenes/cascos/casco3.jpg",descripcion:"Casco modular."},
    {id:4,nombre:"Casco Deportivo",precio:140,categoria:"Cascos",imagen:"../imagenes/cascos/casco4.jpg",descripcion:"Casco deportivo."},
    {id:5,nombre:"Casco Off-Road",precio:130,categoria:"Cascos",imagen:"../imagenes/cascos/casco5.jpg",descripcion:"Casco off-road."},
    {id:6,nombre:"Aceite Motor 10W40",precio:25,categoria:"Aceites y lubricantes",imagen:"../imagenes/aceites/aceite1.jpg",descripcion:"Aceite 10W40."},
    {id:7,nombre:"Aceite Transmisión",precio:30,categoria:"Aceites y lubricantes",imagen:"../imagenes/aceites/aceite2.jpg",descripcion:"Aceite transmisión."},
    {id:8,nombre:"Lubricante Cadena",precio:10,categoria:"Aceites y lubricantes",imagen:"../imagenes/aceites/aceite3.jpg",descripcion:"Lubricante cadena."},
    {id:9,nombre:"Aceite 5W30",precio:28,categoria:"Aceites y lubricantes",imagen:"../imagenes/aceites/aceite4.jpg",descripcion:"Aceite 5W30."},
    {id:10,nombre:"Aceite Frenos",precio:15,categoria:"Aceites y lubricantes",imagen:"../imagenes/aceites/aceite5.jpg",descripcion:"Aceite frenos."},
    {id:11,nombre:"Maleta Trasera",precio:60,categoria:"Accesorios",imagen:"../imagenes/accesorios/accesorio1.jpg",descripcion:"Maleta trasera."},
    {id:12,nombre:"Soporte Smartphone",precio:20,categoria:"Accesorios",imagen:"../imagenes/accesorios/accesorio2.jpg",descripcion:"Soporte smartphone."},
    {id:13,nombre:"Luces LED",precio:35,categoria:"Accesorios",imagen:"../imagenes/accesorios/accesorio3.jpg",descripcion:"Luces LED."},
    {id:14,nombre:"Parabrisas",precio:50,categoria:"Accesorios",imagen:"../imagenes/accesorios/accesorio4.jpg",descripcion:"Parabrisas ajustable."},
    {id:15,nombre:"Protectores Mano",precio:25,categoria:"Accesorios",imagen:"../imagenes/accesorios/accesorio5.jpg",descripcion:"Protectores mano."},
    {id:16,nombre:"Chaqueta Moto",precio:80,categoria:"Ropa de moto",imagen:"../imagenes/ropa/ropa1.jpg",descripcion:"Chaqueta moto."},
    {id:17,nombre:"Guantes Moto",precio:25,categoria:"Ropa de moto",imagen:"../imagenes/ropa/ropa2.jpg",descripcion:"Guantes moto."},
    {id:18,nombre:"Pantalón Moto",precio:70,categoria:"Ropa de moto",imagen:"../imagenes/ropa/ropa3.jpg",descripcion:"Pantalón moto."},
    {id:19,nombre:"Botas Moto",precio:90,categoria:"Ropa de moto",imagen:"../imagenes/ropa/ropa4.jpg",descripcion:"Botas moto."},
    {id:20,nombre:"Camisa Motera",precio:30,categoria:"Ropa de moto",imagen:"../imagenes/ropa/ropa5.jpg",descripcion:"Camisa motera."},
    {id:21,nombre:"Neumático Sport",precio:120,categoria:"Neumáticos",imagen:"../imagenes/neumaticos/neumatico1.jpg",descripcion:"Neumático sport."},
    {id:22,nombre:"Neumático Touring",precio:100,categoria:"Neumáticos",imagen:"../imagenes/neumaticos/neumatico2.jpg",descripcion:"Neumático touring."},
    {id:23,nombre:"Neumático Off-Road",precio:130,categoria:"Neumáticos",imagen:"../imagenes/neumaticos/neumatico3.jpg",descripcion:"Neumático off-road."},
    {id:24,nombre:"Neumático Urbano",precio:90,categoria:"Neumáticos",imagen:"../imagenes/neumaticos/neumatico4.jpg",descripcion:"Neumático urbano."},
    {id:25,nombre:"Neumático Pista",precio:140,categoria:"Neumáticos",imagen:"../imagenes/neumaticos/neumatico5.jpg",descripcion:"Neumático pista."},
    {id:26,nombre:"Batería 12V 7Ah",precio:40,categoria:"Baterías",imagen:"../imagenes/baterias/bateria1.jpg",descripcion:"Batería 7Ah."},
    {id:27,nombre:"Batería 12V 9Ah",precio:50,categoria:"Baterías",imagen:"../imagenes/baterias/bateria2.jpg",descripcion:"Batería 9Ah."},
    {id:28,nombre:"Batería AGM",precio:60,categoria:"Baterías",imagen:"../imagenes/baterias/bateria3.jpg",descripcion:"Batería AGM."},
    {id:29,nombre:"Batería Gel",precio:65,categoria:"Baterías",imagen:"../imagenes/baterias/bateria4.jpg",descripcion:"Batería Gel."},
    {id:30,nombre:"Batería Larga",precio:70,categoria:"Baterías",imagen:"../imagenes/baterias/bateria5.jpg",descripcion:"Batería larga duración."},
    {id:31,nombre:"Juego Llaves",precio:35,categoria:"Herramientas",imagen:"../imagenes/herramientas/herramienta1.jpg",descripcion:"Juego llaves."},
    {id:32,nombre:"Destornilladores",precio:20,categoria:"Herramientas",imagen:"../imagenes/herramientas/herramienta2.jpg",descripcion:"Destornilladores."},
    {id:33,nombre:"Llave Inglesa",precio:25,categoria:"Herramientas",imagen:"../imagenes/herramientas/herramienta3.jpg",descripcion:"Llave inglesa."},
    {id:34,nombre:"Multiherramienta",precio:40,categoria:"Herramientas",imagen:"../imagenes/herramientas/herramienta4.jpg",descripcion:"Multiherramienta 10en1."},
    {id:35,nombre:"Bomba Aire",precio:30,categoria:"Herramientas",imagen:"../imagenes/herramientas/herramienta5.jpg",descripcion:"Bomba aire."},
    {id:36,nombre:"Cadena Seguridad",precio:15,categoria:"Otros",imagen:"../imagenes/otros/otros1.jpg",descripcion:"Cadena antirrobo."},
    {id:37,nombre:"Reflectores",precio:10,categoria:"Otros",imagen:"../imagenes/otros/otros2.jpg",descripcion:"Reflectores seguridad."},
    {id:38,nombre:"Parche Repuesto",precio:5,categoria:"Otros",imagen:"../imagenes/otros/otros3.jpg",descripcion:"Parche neumático."},
    {id:39,nombre:"Soporte Matrícula",precio:12,categoria:"Otros",imagen:"../imagenes/otros/otros4.jpg",descripcion:"Soporte matrícula."},
    {id:40,nombre:"Kit Limpieza",precio:20,categoria:"Otros",imagen:"../imagenes/otros/otros5.jpg",descripcion:"Kit limpieza moto."}
  ];
  guardarLS("catalogo", catalogo);
}

// inicializar carrito/usuarios si no existen
if(!leerLS("carrito")) guardarLS("carrito", []);
if(!leerLS("usuarios")) guardarLS("usuarios",[ {nombre:"Admin", correo:"admin@fullmotos.com", password:"123456"} ]);
