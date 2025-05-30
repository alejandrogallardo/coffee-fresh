import useQuiosco from "../hooks/useQuiosco.js";
import ResumenProducto from "./ResumenProducto..jsx";
import {formatearDinero} from "../helpers/index.js";

export default function Resumen() {
    const {pedido, total, handleSubmitNuevaOrden} = useQuiosco();
    const comprobarPedido = () => pedido.length === 0;
    const handleSubmit = e => {
        e.preventDefault();
        handleSubmitNuevaOrden();
    }
    return (
        <aside className="w-72 h-screen overflow-y-scroll p-5">
            <h1 className="text-4xl font-black">Mi Pedido</h1>
            <p className="text-lg my-5">Aquí podras ver el resumen y total de tu pedido.</p>
            <div className="py-10">
                {pedido.length === 0 ? (
                    <p className="text-center text-2xl">No hay elementos en tu pedido aún.</p>
                ) : (
                    pedido.map(producto => (
                        <ResumenProducto
                            key={producto.id}
                            producto={producto}
                        />
                    ))
                )}
            </div>
            <p className="text-xl mt-10">
                Total: {''}
                {formatearDinero(total)}
            </p>
            <form
                className="w-full"
                onSubmit={handleSubmit}
            >
                <div className="mt-5">
                    <input
                        type="submit"
                        className={`${comprobarPedido() ? 'bg-indigo-100 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'} px-5 py-2 rounded uppercase font-bold text-white text-center w-full`}
                        value="confirmar pedido"
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </aside>
    )
}