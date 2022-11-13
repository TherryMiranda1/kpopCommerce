const [headerValues, setHeaderValues] = useState({
    title: "My Page",
    visible: true,
    image: logo,
    color: "#ffffff",
    textColor: "#000000",
    iconColor: "#000000",
    menuColor: "#ffffff",
    blur:true,
    menuItems: [
      { id: 1, title: "Home", url: "/" },
      { id: 2, title: "Services", url: "/services" },
      { id: 3, title: "About", url: "/about" },
      { id: 4, title: "My Profile", url: "/profile" },
    ],
  });
  const [bannerValues, setBannerValues] = useState({
    title: "Ultimas Tecnologias",
    visible: true,
    description:
      "Ayudando a construir sitios web increibles para empresas Increibles",
    image: banner,
    color: "#06006D",
    color2: "#090979",
    color3: "#74fff6",
    gradientAng: 90,
    textColor: "#ffffff",
    gradient: true,
  });

  const [servicesValues, setServicesValues] = useState({
    visible: true,
    title: "Services",
    color: "#ffffff",
    textColor: "#000000",
    cardColor: "#E7E7E7",
    cardTextColor: "#B2B2B2",
    shadowColor: "#B2B2B2",
    menuItems: [
      {
        id: 1,
        title: "Diseño de Webs",
        image: web,
        description:
          "Responsive, Rapidas, adaptadas a las ultimas tecnologias y dotadas de todo lo que necesitas para conectar con tus clientes",
      },
      {
        id: 2,
        title: "Expertos en SEO",
        image: seo,
        description:
          "Enfocados en la visibilidad de tu empresa en los motores de busqueda y en la web",
      },
      {
        id: 3,
        title: "Marketing Digital",
        image: marketing,
        description:
          "Darte a conocer y captar nuevos potenciales de forma consistente no debe ser tarea complicada",
      },
      {
        id: 4,
        title: "Creacion de Marca",
        image: branding,
        description:
          "Tu logo, tus colores, tu forma de comunicar. todo lo que hara que tu marca se quede grabada en tus clientes",
      },
    ],
  });

  const [servicesValuesPlus, setServicesValuesPlus] = useState({
    visible: true,
    title: "Sobre Nosotros",
    color: "#00B0BD",
    textColor: "#ffffff",
    cardColor: "#E7E7E7",
    cardTextColor: "gray",
    shadowColor: "black",
    menuItems: [
      {
        id: 1,
        title: "Ayudando a construir marcas desde 2008",
        image: marcas,
        description:
          "Mas de 200 empresas y mas de 100.000 usuarios finales nos han acompañado en este camino.",
      },
      {
        id: 2,
        title: "Metodologias Probadas",
        image: metodo,
        description:
          "Invertimos los recursos en lo que de verdad importa, sustentar tus ideas con la tecnologias mas avanzadas",
      },
      {
        id: 3,
        title: "Equipo multidisciplinar",
        image: equipo,
        description:
          "Contamos con desarrolladores, expertos en SEO, diseñadores, entre otros profesionales con la experiencia necesaria para sacar el maximo potencial de tu proyecto",
      },
      {
        id: 4,
        title: "Desarrollo continuo",
        image: mejora,
        description:
          "Creemos que las cosas siempre se pueden y se deben hacer mejor, por eso nunca bajamos la guardia y nos mantenemos depurando aun mas nuestras soluciones",
      },
    ],
  });

  const [productsValues, setProductsValues] = useState({
    visible: true,
    title: "Productos",
    color: "#ffffff",
    textColor: "#000000",
    cardColor: "#E7E7E7",
    cardTextColor: "#B2B2B2",
    shadowColor: "#B2B2B2",
    menuItems: [
      {
        id: 1,
        title: "Pagina Web estatica",
        image: pagina,
        price: "150 $",
        description:
          "Responsive, Rapidas, adaptadas a las ultimas tecnologias y dotadas de todo lo que necesitas para conectar con tus clientes",
      },
      {
        id: 2,
        title: "Optimizacion  SEO",
        image: seoWeb,
        price: "150 $",
        description:
          "Aumenta la presencia de tu marca en la web con la optimizacion para motores de busqueda",
      },
      {
        id: 3,
        title: "E-Commerce",
        image: ecommerce,
        price: "600 $",
        description:
          "Vende tus productos y servicios en tu propia plataforma robusta y diseñada para aumentar tus conversiones",
      },
      {
        id: 4,
        title: "Academia ",
        image: academia,
        price: "600 $",
        description:
          "Diseñado y funcionalidades orientadas a la venta de productos digitales y subscripciones, nos encargamos de todos los detalles tecnicos para que tu solo te enfoques en crear contenido",
      },
      {
        id: 5,
        title: "Web de Subscripciones",
        image: membresia,
        price: "600 $",
        description:
          "Permite que tus clientes se suscriban mediante un pago mensual a tus servicios. ",
      },
    ],
  });

  const [questionsValues, setQuestionsValues] = useState({
    visible: true,
    title: "FAQs",
    color: "#F6F6F6",
    textColor: "#000000",
    cardColor: "#F6F6F6",
    cardTextColor: "#4E4E4E",
    shadowColor: "#B2B2B2",
    menuItems: [
      {
        id: 1,
        title: "En cuanto tiempo tendre listo mi sitio web?",
        description:
          "El tiempo de entrega puede variar dependiendo de los requerimientos tecnicos de tu proyecto, suele rondar las 72 horas para sitios sencillos, pero para ecommerce y proectos que requieran de backend se encuentra al rededor de los 15 dias.",
      },
      {
        id: 2,
        title: "Que pasa si el resultado no es lo que esperaba?",
        description:
          "Durante el periodo de creacion tienes a tu disposicion la atencion tecnica con la que podras afinar los detalles de tu solicitud hasta que se acerque lo maximo posible a lo que tenias en mente, sin embargo siempre cuentas con una garantia de devolucion de 15 dias",
      },
      {
        id: 3,
        title: "Los sitios web son seguros?",
        description:
          "Nos aseguramos de cumplir los estandares en seguridad informatica certificados SSL, tokens de autenticacion y cifrado, visita la seccion de seguridad para mas detalles tecnicos",
      },
      {
        id: 4,
        title: "Quien se encarga del despliegue y mantenimiento de mi pagina?",
        description:
          "Una vez tu pagina se encuentre terminada te la entregaremos desplegada en el dominio de tu propiedad que nos indiques y te guiaremos durante el proceso, en los documentos puedes encontrar toda la informacion que necesitas. Pasado el despliegue los planes por subscripcion siguen contando con soporte, en el caso del resto de planes puedes hacer las modificaciones que desees en tu pagina desde el panel de control y reportar cualquier incidencia a travez de nuestros canales de contacto.",
      },
      {
        id: 5,
        title: "Cuanto tiempo puede estar mi pagina activa?",
        description:
          "Todos los planes incluyen alojamiento incluido por un año, una vez desplegada tu pagina recibiras las instrucciones sobre como renovar pasado este tiempo. ",
      },
    ],
  });

  const [footerValues, setFooterValues] = useState({
    title: "My page",
    visible: true,
    description: "2022. Todos los derechos reservados",
    image: logo,
    color: "#020024",
    color2: "#090979",
    color3: "#74fff6",
    gradientAng: 90,
    textColor: "#ffffff",
    gradient: true,
  });