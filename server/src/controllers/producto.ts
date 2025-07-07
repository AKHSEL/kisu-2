import {Request,Response} from 'express'
import Producto from '../models/producto'

export const getProducts = async (req: Request,res:Response) => {
    try {
        const listProducts = await Producto.findAll();
        res.json(listProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Error al obtener productos'});
    }
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Producto.findByPk(id);

        if (!product) {
            res.status(404).json({ msg: `No existe el producto con ID ${id}` });
        }

        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el producto' });
    }
};  

export const deleteProduct = async (req: Request, res: Response) => {
    
    const { id } = req.params;

    try {
        const product = await Producto.findByPk(id);

        if (!product) {
            res.status(404).json({ msg: `No existe el producto con ID ${id}` });
        } else {
            await product.destroy();
            res.json({ msg: `El producto con ID ${id} fue eliminado con éxito` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el producto' });
    }
};

export const postProduct = async (req: Request,res:Response)=>{
    const {body} = req;

    try {
        await Producto.create(body);
        res.json({ msg: 'Agregado de manera exitosa' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el producto' });
    }
}

export const updateProduct = async (req: Request,res:Response)=>{
    const {body} = req;
    const {id} = req.params;

    try {
        const product = await Producto.findByPk(id);
        if (product) {
            await product.update(body);
            res.json({ msg: `El producto con id ${id} fue actualizado` })
        } else {
            res.status(404).json({ msg: `No existe el producto con id ${id}` })
        }
    } catch (error) {
        console.log(error);
        res.json({ msg: 'Error al actualizar' })
    }
}   


