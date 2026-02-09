import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fLoginUserOrderAsync, selectUserInfo, selectUserOrders, selectUserorderStatus } from '../userSlice';
// import { selectLoggedIn } from '../../auth/authSlice';
import { FidgetSpinner } from 'react-loader-spinner'
// import { fetchOrderById } from '../../order/orderAPI';
// import { fetchOrderByIdAsync, selectSelectedOrder } from '../../order/orderSlice';API';
// import { fetchOrderByIdAsync, selectSelectedOrder } from '../../order/orderSlice';
import { Link } from 'react-router-dom';

export const UserOrder = () => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const userInfo = useSelector(selectUserInfo)
    // const selectOrderId= useSelector(selectSelectedOrder)

    // console.log("this is user")
    // console.log(userInfo)
    const orders = useSelector(selectUserOrders);
    const orderStatus = useSelector(selectUserorderStatus);
    console.log("orders")
    console.log(orders)
    console.log("first")
    useEffect(() => {
        dispatch(fLoginUserOrderAsync(userInfo.id))
    }, [])

     
    return (
        <>
            <div>
                <h1>wqe</h1>
                {orders && orders.map((order) => (
                    <div>
                        {orderStatus === 'loading' ? <div className="content-center z-30">
                            <FidgetSpinner
                                visible={true}
                                height="180"
                                width="180"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                                ballColors={['#ff0000', '#00ff00', '#0000ff']}
                                backgroundColor="#F4442E"
                            /></div> : null}

                        <div>
                            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="border-t border-gray-200 px-4 py-3 sm:px-8">
                                    <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                                        Order # {order.id}
                                    </h1>
                                    <Link to={`/Invoice/${order.id}`}>
                                    <button class="text-blue-600 hover:text-blue-800 font-medium">
                                        Download Invoice ⬇️
                                    </button>
                                    </Link>
                                    <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                                        Order Status : {order.status}
                                    </h3>

                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                            {order.products.map((item) => (
                                                <li key={item.id} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img
                                                            src={item.product.thumbnail}
                                                            alt={item.product.title}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <a href={item.product.href}>{item.product.title}</a>
                                                                </h3>
                                                                <p className="ml-4">${item.product.price}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                {item.product.brand}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <div className="text-gray-500">
                                                                <label
                                                                    htmlFor="quantity"
                                                                    className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                                                >
                                                                    Qty :{item.quantity}
                                                                </label>

                                                            </div>

                                                            <div className="flex">

                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="border-t w- border-gray-200 px-4 py-2 sm:px-8">
                                    <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>₹ {order.totalAmount.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                        <p>Total Items in Cart</p>
                                        <p>{order.quantity} items</p>
                                    </div>
                                    <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                        <p>Payment Type</p>
                                        <p>{order.Payment} items</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">
                                        Shipping Address :
                                    </p
                                    >
                                    {order.SelectedAddress.map((e) => (

                                        <div className="flex justify-between my-3 gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                                            <div className="flex gap-x-4">

                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                                        {e.fullname}
                                                    </p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                        {e.streetaddress}
                                                    </p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                        {e.postalcode}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                <p className="text-sm leading-6 text-gray-900">
                                                    Phone: {e.phone}
                                                </p>
                                                <p className="text-sm leading-6 text-gray-500">
                                                    {e.city}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>


                    </div>

                ))}
            </div>
        </>
    )


}
