import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems, UpdateItemAsync, DeleteItemAsync, } from '../features/cart/cartSlice';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { UpdateUserAsync } from '../features/user/userSlice';
// import { UpdateUserAsync } from '../features/auth/authSlice';
import { createOrderAsync, currentOrder } from '../features/order/orderSlice';
import { useAlert } from 'react-alert'
import { selectUserInfo } from '../features/user/userSlice';


export default function CheckOut() {
    const [open, setOpen] = useState(true)
    const products = useSelector(selectItems);
    const alert = useAlert()
    const currentorder = useSelector(currentOrder)
    const [SelectedAddress, setSelectedAddress] = useState()
    const [Payment, setPayment] = useState("Cash On Delivery");

    const totalCount = products.reduce((amount, e) => {
        return e.product.price * e.quantity + amount
    }, 0)
    const QuantityPerItem = products.reduce((total, e) => {
        return e.quantity + total
    }, 0)
    // const totalCount = products.reduce((amount, e) => {
    //     return e.price * e.quantity + amount
    // }, 0)
    // const QuantityPerItem = products.reduce((total, e) => {
    //     return e.quantity + total
    // }, 0)
    const dispatch = useDispatch()

    const handleChange = (e, Item) => {
        dispatch(UpdateItemAsync({ id: Item.id, quantity: +e.target.value }))
        console.log(products)
        // dispatch(UpdateItemAsync({ ...Item, quantity: +e.target.value }))
    }

    const handleDelete = (e, Item) => {
        dispatch(DeleteItemAsync(Item))
        console.log(Item)
    }
    const {
        register, handleSubmit, reset, formState: { errors },
    } = useForm();

    const user = useSelector(selectUserInfo)
    // const user = useSelector(selectLoggedIn)
    const handleAddress = (e) => {
        console.log(e.target.value);
        setSelectedAddress(user.addresses[e.target.value])
        // setSelectedAddress(user.addresses[e.target.value]);
    };
    const handlePayment = (e) => {
        console.log(e.target.value);
        setPayment(e.target.value)
        // setSelectedAddress(user.addresses[e.target.value]);
    };
    const handleOrder = () => {
        const order = { user: user.id, products, SelectedAddress, Payment, status: 'pending', quantity: QuantityPerItem, totalAmount: totalCount }
        dispatch(createOrderAsync(order))
    }



    return (

        <>
            {currentorder && currentorder.Payment==='Cash On Delivery'&&(<Navigate to={`/OrderSuccess/${currentorder.id}`} replace={true}></Navigate>)}
            {currentorder && currentorder.Payment==='Net Banking'&&(<Navigate to={`/PaymentIntent`} replace={true}></Navigate>)}
            {currentorder && currentorder.Payment==='UPI'&&(<Navigate to={`/ForgetPassword`} replace={true}></Navigate>)}

            <div className="mx-auto my-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">

                    <div className="lg:col-span-3">
                        <form noValidate onSubmit={handleSubmit((data) => {
                            dispatch(UpdateUserAsync({ ...user, addresses: [...user.addresses, data] }))
                            alert.success("New Address Added")
                            reset();
                            console.log(data)
                        })} >
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="fullname"
                                                    {...register("fullname", {
                                                        required: true, pattern: {
                                                            message: "enter name"
                                                        }
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
                                        </div>
                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    type="email"
                                                    {...register("email", {
                                                        required: true, pattern: {
                                                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                                            message: "email invalid"
                                                        }
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    {...register("phone", {
                                                        required: true, pattern: {

                                                            message: "phone invalid"
                                                        }
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Country
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="country"
                                                    {...register("country", {
                                                        required: true, pattern: {
                                                            message: "country invalid"
                                                        }
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option>India</option>
                                                    <option>Canada</option>
                                                    <option>Taiwan</option>
                                                </select>
                                            </div>

                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="streetaddress"
                                                    {...register("streetaddress", {
                                                        required: true, pattern: {
                                                            message: "street address invalid"
                                                        }
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.streetaddress && <p className="text-red-500">{errors.streetaddress.message}</p>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="city"
                                                    {...register("city", {
                                                        required: true, pattern: {

                                                            message: "city invalid"
                                                        }
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                                            </div>
                                        </div>


                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="state"
                                                    {...register("state", {
                                                        required: true, pattern: {
                                                            message: "state invalid"
                                                        }
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.state && <p className="text-red-500">{errors.state.message}</p>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="postalcode"
                                                    {...register("postalcode", {
                                                        required: true, pattern: {
                                                            message: "postalcode invalid"
                                                        }
                                                    })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.postalcode && <p className="text-red-500">{errors.postalcode.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save
                                    </button>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Select your address for deliver.
                                    </p>

                                    <div className="mt-10 space-y-10">

                                        {/* adress list */}
                                        <ul role="list" className="divide-y divide-gray-100">
                                            {user && user.addresses.map((person, index) => (
                                                <li key={index} className="flex justify-between gap-x-6 py-5 px-2 my-2 border-solid border-2 border-gray-200">
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <input
                                                            onChange={e => handleAddress(e)}
                                                            id="push-everything"
                                                            name="address"
                                                            type="radio"
                                                            value={index}
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.fullname}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.phone}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                        <p className="text-sm leading-6 text-gray-900">House no. {person.streetaddress}</p>
                                                        <p className="text-xs leading-5 text-gray-500">{person.postalcode}</p>

                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        {/* payment list */}
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6  text-gray-900">Payment Method</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Choose your Payment Mode of Method.</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        onChange={handlePayment}
                                                        id="push-everything"
                                                        name="push-notifications"
                                                        type="radio"
                                                        checked={Payment == "Cash On Delivery"}
                                                        value="Cash On Delivery"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash On Delivery
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        onChange={handlePayment}
                                                        id="push-email"
                                                        name="push-notifications"
                                                        type="radio"
                                                        checked={Payment == "Net Banking"}
                                                        value="Net Banking"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Net Banking
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        onChange={handlePayment}
                                                        id="push-nothing"
                                                        name="push-notifications"
                                                        type="radio"
                                                        checked={Payment == "UPI"}
                                                        value="UPI"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                                        UPI
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <Link
                                                    onClick={handleOrder}
                                                    href="#"
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                >
                                                    Pay now
                                                </Link>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-white">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">CART</h2>

                                <div className="mt-8">
                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                            {products.length > 0 ? products.map((Item) => (
                                                <li key={Item.id} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img
                                                            src={Item.product.images[0]}
                                                            alt={Item.product.imageAlt}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <a href={Item.href}>{Item.product.title}</a>
                                                                </h3>
                                                                <p className="ml-4">₹  {Item.product.price.toFixed(2)}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">{Item.product.color}</p>
                                                        </div>
                                                        <div className="flex my-5 flex-1 items-end justify-between text-sm">
                                                            <div className="text-gray-900">
                                                                <label htmlFor="" className='inline text-sm mr-2 font-medium leading-6 '>
                                                                    Qty
                                                                </label>

                                                                <select onChange={e => handleChange(e, Item)} value={Item.quantity}>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                                </select>
                                                                {/* {product.quantity} */}
                                                            </div>

                                                            <div className="flex">
                                                                <button
                                                                    onClick={e => handleDelete(e, Item)}
                                                                    type="button"
                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )) : <div class="h-64 flex items-center justify-center">
                                                <h1 className="text-3xl font-bold tracking-tight text-gray-400">Your Cart is Empty...</h1>
                                            </div>}
                                        </ul>
                                    </div>
                                </div>


                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>₹ {totalCount.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between text-base my-4 font-medium text-gray-900">
                                        <p>Quantity</p>
                                        <p>{QuantityPerItem} items</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <Link
                                            onClick={handleOrder}
                                            href="#"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                        >
                                            Pay now
                                        </Link>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <Link to='/'>
                                            <p>
                                                or
                                                <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
