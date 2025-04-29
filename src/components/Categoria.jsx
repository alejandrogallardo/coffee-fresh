import useQuiosco from "../hooks/useQuiosco.js";

export default function Categoria({categoria}) {
    const {handleClickCategoria, categoriaActual} = useQuiosco();
    const {icono, id, nombre} = categoria;
    const resaltarCategoriaActual = () => categoriaActual.id === id ? "bg-amber-400" : "bg-white";
    return (
        <div className={`${resaltarCategoriaActual()} flex items-center gap-4 border border-gray-200 w-full p-3 hover:bg-amber-400 cursor-pointer`}>
            <img className="w-12" src={`/img/icono_${icono}.svg`} alt="Imagen Icono"/>
            <button
                className="text-lg font-bold cursor-pointer truncate"
                type="button"
                onClick={() => handleClickCategoria(id)}
            >{nombre}</button>
        </div>
    )
}