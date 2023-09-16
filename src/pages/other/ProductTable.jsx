import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { baseUrlImage } from '../../service/api';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../service/formatCurrency';
import { addToCart, decreaseQuantity, deleteFromCart } from '../../store/slices/cart-slice';
import { cartItemStock } from '../../helpers/product';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom';
import { deleteFromWishlist } from '../../store/slices/wishlist-slice';

export default function ProductTable({ type }) {
    // const [products, setProducts] = useState(productsData);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const [productQuantities, setProductQuantities] = useState({});
    const navigate = useNavigate();

    // const productBodyTemplate = (product) => {
    //     return (
    //         <div className='productSection'>
    //             <img src={baseUrlImage + product.images[0]} alt={product.image} className="imageConatiner" />
    //             <div>
    //                 <h4>{product.title}</h4>
    //                 <p>{formatCurrency(product.saleprice)}</p>
    //                 <p> Size: <span> {product.selectedProductSize}</span></p>
    //                 <p>Color: <span> {product.selectedProductColor}</span> </p>
    //             </div>
    //         </div>
    //     )
    // };


    // const handleAddQuantityChange = (product, newQuantity) => {
    //     setProductQuantities(prevQuantities => ({
    //         ...prevQuantities,
    //         [product._id]: newQuantity
    //     }));
    //     dispatch(
    //         addToCart({
    //             ...product,
    //             quantity: 1,
    //         })
    //     );
    //     const updatedProducts = products.map(p =>
    //         p._id === product._id ? { ...p, quantity: newQuantity } : p
    //     );
    //     setProducts(updatedProducts);
    // };
    // const handleMinusQuantityChange = (product, newQuantity) => {
    //     setProductQuantities(prevQuantities => ({
    //         ...prevQuantities,
    //         [product._id]: newQuantity
    //     }));
    //     dispatch(decreaseQuantity(product))
    //     const updatedProducts = products.map(p =>
    //         p._id === product._id ? { ...p, quantity: newQuantity } : p
    //     );
    //     setProducts(updatedProducts);
    // };

    // const quantityBodyTemplate = (product) => {
    //     const productQuantity = productQuantities[product._id] || product.quantity || 1;

    //     return (
    //         <div className='quantitySection'>
    //             <button
    //                 className="dec qtybutton"
    //                 onClick={() => handleMinusQuantityChange(product, productQuantity - 1)}
    //                 disabled={productQuantity === 1}
    //             >
    //                 -
    //             </button>
    //             <input
    //                 className="cart-plus-minus-box"
    //                 type="text"
    //                 value={productQuantity}
    //                 readOnly
    //             />
    //             <button
    //                 className="inc qtybutton"
    //                 onClick={() =>
    //                     handleAddQuantityChange(product, productQuantity + 1)
    //                 }
    //                 disabled={
    //                     product !== undefined &&
    //                     productQuantity >=
    //                     cartItemStock(
    //                         product,
    //                         product.selectedProductColor,
    //                         product.selectedProductSize
    //                     )
    //                 }
    //             >
    //                 +
    //             </button>

    //         </div>
    //     );
    // };

    // const totalBodyTemplate = (product) => {
    //     const productQuantity = productQuantities[product._id] || product.quantity || 1;
    //     const totalAmount = product.saleprice * productQuantity;
    //     return formatCurrency(totalAmount);
    // };
    // const getSeverity = (product) => {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };


    // const footer = `In total there are ${products ? products.length : 0} products.`;
    return (
        // <div className='producttableConatiner'>
        //     <DataTable value={products} footer={footer} tableStyle={{ minWidth: '60rem' }} responsiveLayout="stack" breakpoint="960px">
        //         <Column header="Product" body={productBodyTemplate}></Column>
        //         <Column header="Quantity" body={quantityBodyTemplate}></Column>
        //         <Column header="Total" body={totalBodyTemplate}></Column>

        //         {/* <Column header="Status" body={statusBodyTemplate}></Column> */}
        //     </DataTable>
        // </div>
        <div className='producttableConatiner'>
            {
                type === "cart" ?
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Product</Th>
                                <Th>Quantity</Th>
                                <Th>Total</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                cartItems.map((product) => (
                                    <Tr>
                                        <Td> <div className='productSection'>
                                            <img src={baseUrlImage + product.images[0]} alt={product.image} className="imageConatiner" />
                                            <div>
                                                <h4>{product.title}</h4>
                                                <p>{formatCurrency(product.saleprice)}</p>
                                                <p> Size: <span> {product.selectedProductSize}</span></p>
                                                <p>Color: <span> {product.selectedProductColor}</span> </p>
                                            </div>
                                        </div></Td>
                                        <Td>
                                            <div className="quantitySection">
                                                <button
                                                    className="dec qtybutton"
                                                    onClick={() =>
                                                        dispatch(decreaseQuantity(product))
                                                    }
                                                    disabled={product.quantity === 1}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    className="cart-plus-minus-box"
                                                    type="text"
                                                    value={product.quantity}
                                                    readOnly
                                                />
                                                <button
                                                    className="inc qtybutton"
                                                    onClick={() =>
                                                        dispatch(
                                                            addToCart({
                                                                ...product,
                                                                quantity: 1,
                                                            })
                                                        )
                                                    }
                                                    disabled={
                                                        product !== undefined &&
                                                        product.quantity &&
                                                        product.quantity >=
                                                        cartItemStock(
                                                            product,
                                                            product.selectedProductColor,
                                                            product.selectedProductSize
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </Td>
                                        <Td>{formatCurrency(product.saleprice * product.quantity)} <button
                                            onClick={() => dispatch(deleteFromCart(product.cartItemId))}
                                        >
                                            <i className="fa fa-trash-o"></i>
                                        </button></Td>

                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                    : <Table>
                        <Thead>
                            <Tr>
                                <Th>Product</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                wishlistItems.map((product) => {
                                    const cartItem = cartItems.find(
                                        (item) => item.id === product.id
                                    )
                                    return (<Tr>
                                        <Td> <div className='productSection'>
                                            <img src={baseUrlImage + product.images[0]} alt={product.image} className="imageConatiner" />
                                            <div>
                                                <h4>{product.title}</h4>
                                                <p>{formatCurrency(product.saleprice)}</p>

                                            </div>
                                        </div>
                                        </Td>

                                        <Td>
                                            <div className="wishlist">
                                                {product.totalstockcount > 0 ? (
                                                    <button
                                                        onClick={() =>
                                                            navigate(`/product/${product._id}`)
                                                        }
                                                        className={
                                                            cartItem !== undefined &&
                                                                cartItem.quantity > 0
                                                                ? "active"
                                                                : ""
                                                        }
                                                        disabled={
                                                            cartItem !== undefined &&
                                                            cartItem.quantity > 0
                                                        }
                                                        title={
                                                            product !== undefined
                                                                ? "Added to cart"
                                                                : "Add to cart"
                                                        }
                                                    >
                                                        {cartItem !== undefined &&
                                                            cartItem.quantity > 0
                                                            ? "Added"
                                                            : "Add to cart"}
                                                    </button>
                                                ) : (
                                                    <button disabled className="active">
                                                        Out of stock
                                                    </button>
                                                )}
                                                <button
                                                    className='delete'
                                                    onClick={() => dispatch(deleteFromWishlist(product._id))}
                                                >
                                                    <i className="fa fa-trash-o"></i>
                                                </button>
                                            </div>
                                        </Td>
                                    </Tr>)
                                }

                                )
                            }
                        </Tbody>
                    </Table>
            }

        </div>
    )
}
