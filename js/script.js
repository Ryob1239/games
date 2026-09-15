document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTOS
    ===================================== */

    const buscador =
        document.getElementById("buscador");

    const tarjetas =
        [...document.querySelectorAll(".juego-item")];

    const btnTema =
        document.getElementById("btn-tema");

    const filtros =
        document.querySelectorAll(".filtro");

    const botonesConsejo =
        document.querySelectorAll(".btn-consejo");

    const contador =
        document.getElementById("contador-juegos");

    const sinResultados =
        document.getElementById("sin-resultados");


    let categoriaActual = "todos";


    /* =====================================
       NORMALIZAR TEXTO
    ===================================== */

    function normalizarTexto(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    }


    /* =====================================
       BUSCADOR + FILTROS
    ===================================== */

    function filtrarJuegos() {

        const textoBusqueda =
            normalizarTexto(buscador.value);

        let visibles = 0;


        tarjetas.forEach((tarjeta) => {

            const titulo =
                tarjeta
                    .querySelector(".titulo-juego")
                    .textContent;

            const descripcion =
                tarjeta
                    .querySelector(".contenido-tarjeta p")
                    .textContent;

            const tags =
                tarjeta
                    .querySelector(".tags")
                    ?.textContent || "";

            const categorias =
                tarjeta.dataset.categoria || "";


            const contenido =
                normalizarTexto(
                    `${titulo} ${descripcion} ${tags}`
                );


            const coincideBusqueda =
                contenido.includes(textoBusqueda);


            const coincideCategoria =
                categoriaActual === "todos" ||
                categorias
                    .split(" ")
                    .includes(categoriaActual);


            const mostrar =
                coincideBusqueda &&
                coincideCategoria;


            tarjeta.style.display =
                mostrar ? "flex" : "none";


            if (mostrar) {
                visibles++;
            }

        });


        contador.textContent =
            visibles;


        sinResultados.classList.toggle(
            "oculto",
            visibles !== 0
        );

    }


    /* Búsqueda en tiempo real */

    buscador.addEventListener(
        "input",
        filtrarJuegos
    );


    /* =====================================
       FILTROS
    ===================================== */

    filtros.forEach((boton) => {

        boton.addEventListener("click", () => {

            filtros.forEach((filtro) => {
                filtro.classList.remove("activo");
            });


            boton.classList.add("activo");


            categoriaActual =
                boton.dataset.categoria;


            filtrarJuegos();

        });

    });


    /* =====================================
       MODO CLARO / OSCURO
    ===================================== */

    const temaGuardado =
        localStorage.getItem("tema");


    if (temaGuardado === "claro") {

        document.body.classList.add(
            "modo-claro"
        );

    }


    actualizarBotonTema();


    btnTema.addEventListener("click", () => {

        document.body.classList.toggle(
            "modo-claro"
        );


        const modoClaro =
            document.body.classList.contains(
                "modo-claro"
            );


        localStorage.setItem(
            "tema",
            modoClaro ? "claro" : "oscuro"
        );


        actualizarBotonTema();

    });


    function actualizarBotonTema() {

        const modoClaro =
            document.body.classList.contains(
                "modo-claro"
            );


        btnTema.textContent =
            modoClaro
                ? "🌙 Oscuro"
                : "☀️ Claro";


        btnTema.setAttribute(
            "aria-label",
            modoClaro
                ? "Activar modo oscuro"
                : "Activar modo claro"
        );

    }


    /* =====================================
       CONSEJOS
    ===================================== */

    botonesConsejo.forEach((boton) => {

        boton.addEventListener("click", () => {

            const idConsejo =
                boton.dataset.consejo;

            const consejo =
                document.getElementById(
                    idConsejo
                );


            const estaAbierto =
                consejo.classList.toggle(
                    "abierto"
                );


            boton.classList.toggle(
                "activo",
                estaAbierto
            );


            boton.setAttribute(
                "aria-expanded",
                estaAbierto
            );


            boton.innerHTML =
                estaAbierto
                    ? "<span>✕</span> Ocultar consejo"
                    : "<span>💡</span> Ver consejo";

        });

    });


    /* =====================================
       INICIALIZACIÓN
    ===================================== */

    filtrarJuegos();

});