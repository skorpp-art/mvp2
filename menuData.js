'''

const menuData = [
  // --- Entradas ---
  {
    categoria: "Entradas",
    nombre: "Provoleta a la Parrilla",
    precio: 15.00,
    descripcion: "Queso provolone derretido a la perfección en nuestra parrilla, aderezado con orégano fresco y un toque de aceite de oliva virgen extra. Servido con pan de campo tostado.",
    imagen: "image/logo.png",
    rentabilidad: "puzzle", // Alta rentabilidad, baja popularidad. Ideal para promocionar.
    sugerencias: ["Copa de Malbec", "Chorizo Criollo"]
  },
  {
    categoria: "Entradas",
    nombre: "Chorizo Criollo",
    precio: 10.00,
    descripcion: "Auténtico chorizo criollo de receta tradicional, cocido lentamente a la brasa para una explosión de sabor. Acompañado de chimichurri casero.",
    imagen: "image/logo.png",
    rentabilidad: "caballo_de_batalla",
    sugerencias: ["Cerveza Artesanal"]
  },

  // --- Platos Principales ---
  {
    categoria: "Principales",
    nombre: "Bife de Chorizo Angus",
    precio: 35.00,
    descripcion: "350g de puro sabor. Proveniente de ganado Angus certificado y cocinado a la perfección en nuestra parrilla de leña. Una capa crujiente y una jugosidad incomparable que se deshace en la boca.",
    imagen: "image/logo.png",
    rentabilidad: "estrella", // Alta rentabilidad, alta popularidad. Nuestro plato insignia.
    sugerencias: ["Vino Reserva Malbec", "Papas Trufadas"]
  },
  {
    categoria: "Principales",
    nombre: "Ojo de Bife",
    precio: 38.00,
    descripcion: "El corte preferido por los conocedores. 400g de terneza y marmoleo excepcionales que garantizan un sabor profundo e inolvidable en cada bocado.",
    imagen: "image/logo.png",
    rentabilidad: "estrella",
    sugerencias: ["Vino Reserva Malbec", "Ensalada de la casa"]
  },
  {
    categoria: "Principales",
    nombre: "Hamburguesa Clásica",
    precio: 18.00,
    descripcion: "200g de carne 100% de res con queso cheddar, lechuga fresca, tomate y pepinillos en pan brioche artesanal. Acompañada de papas fritas.",
    imagen: "image/logo.png",
    rentabilidad: "caballo_de_batalla", // Baja rentabilidad, alta popularidad.
    sugerencias: ["Cerveza Artesanal", "Papas Trufadas"]
  },
  {
    categoria: "Principales",
    nombre: "Salmón a la Parrilla",
    precio: 28.00,
    descripcion: "Filete de salmón fresco marinado en cítricos y finas hierbas, sellado a la parrilla para una piel crujiente y un interior jugoso. Servido con vegetales de estación.",
    imagen: "image/logo.png",
    rentabilidad: "puzzle",
    sugerencias: ["Vino Blanco Sauvignon Blanc", "Puré de papas"]
  },

  // --- Acompañamientos ---
  {
    categoria: "Acompañamientos",
    nombre: "Papas Trufadas",
    precio: 9.00,
    descripcion: "Papas crujientes bañadas en una delicada salsa de aceite de trufa y espolvoreadas con queso parmesano recién rallado. Un lujo irresistible.",
    imagen: "image/logo.png",
    rentabilidad: "estrella", // El acompañamiento que todos deben probar.
    sugerencias: []
  },
  {
    categoria: "Acompañamientos",
    nombre: "Ensalada de la Casa",
    precio: 7.50,
    descripcion: "Mezcla de hojas verdes frescas, tomates cherry, lascas de parmesano y aderezo de la casa.",
    imagen: "image/logo.png",
    rentabilidad: "caballo_de_batalla",
    sugerencias: []
  },

  // --- Postres ---
  {
    categoria: "Postres",
    nombre: "Tiramisú Casero",
    precio: 8.50,
    descripcion: "Capas de bizcochos de soletilla bañadas en café espresso, crema de mascarpone y cacao en polvo. La receta de la nonna.",
    imagen: "image/logo.png",
    rentabilidad: "perro", // Baja rentabilidad, baja popularidad.
    sugerencias: ["Café Espresso"]
  },
  {
    categoria: "Postres",
    nombre: "Volcán de Chocolate",
    precio: 10.00,
    descripcion: "Bizcocho de chocolate tibio con un corazón líquido de chocolate fundido. Servido con helado de vainilla artesanal.",
    imagen: "image/logo.png",
    rentabilidad: "puzzle",
    sugerencias: ["Café Espresso"]
  },
  
  // --- Bebidas ---
  {
    categoria: "Bebidas",
    nombre: "Agua Mineral",
    precio: 3.00,
    descripcion: "Agua sin gas o con gas.",
    imagen: "image/logo.png",
    rentabilidad: "caballo_de_batalla",
    sugerencias: []
  },
  {
    categoria: "Bebidas",
    nombre: "Cerveza Artesanal",
    precio: 7.00,
    descripcion: "Consulta por nuestras variedades de cervezas artesanales locales.",
    imagen: "image/logo.png",
    rentabilidad: "puzzle",
    sugerencias: []
  },
  {
    categoria: "Bebidas",
    nombre: "Vino Reserva Malbec",
    precio: 45.00,
    descripcion: "Botella de vino Malbec de una de las bodegas más prestigiosas de Mendoza. Ideal para maridar con nuestras carnes.",
    imagen: "image/logo.png",
    rentabilidad: "estrella",
    sugerencias: []
  }
];
''