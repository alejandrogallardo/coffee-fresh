import {createContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import clienteAxios from "../config/axios.js";

const QuioscoContext = createContext();
const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total,producto) => (producto.precio * producto.cantidad) + total, 0);
        setTotal(nuevoTotal);
    }, [pedido]);
    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const {data} = await clienteAxios('/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategorias(data.data);
            setCategoriaActual(data.data[0]);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        obtenerCategorias();
    }, []);

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0];
        setCategoriaActual(categoria);
    }
    const handleClickModal = () => {
        setModal(!modal);
    }
    const handleSetProducto = producto => {
        setProducto(producto);
    }
    const handleAgregarPedido = ({categoria_id, ...producto}) => {
        if(pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState);
            setPedido(pedidoActualizado);
            toast.success('guardado correctamente');
        } else {
            setPedido([...pedido, producto]);
            toast.success('agregado al pedido');
        }
    }
    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0];
        setProducto(productoActualizar);
        setModal(!modal);
    }
    /* https://doesitmutate.xyz/  */
    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id);
        setPedido(pedidoActualizado);
        toast.success('Eliminado del pedido');
    }
    const handleSubmitNuevaOrden = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const {data} = await clienteAxios.post('/pedidos', {
                total,
                productos: pedido.map(p => {
                    return {
                        id: p.id,
                        cantidad: p.cantidad,
                    }
                }),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(data.message);
            setTimeout(() => {
                setPedido([]);
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }
    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const {data} = await clienteAxios.put(`/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(data.message);
            setTimeout(() => {
                setPedido([]);
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }
    const handleClickProductoAgotado = async id => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const {data} = await clienteAxios.put(`/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(data.message);
            setTimeout(() => {
                setPedido([]);
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}
        >
            {children}
        </QuioscoContext.Provider>
    );
}
export {
    QuioscoProvider
}
export default QuioscoContext