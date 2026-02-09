import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"
import { UpdateUserAsync, selectUserInfo } from '../userSlice';
import { TrashIcon, PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/20/solid'
import { useAlert } from 'react-alert'

export function UserProfile() {
    const userInfo = useSelector(selectUserInfo);
    const dispatch = useDispatch()
    const [handleIndex, sethandleIndex] = useState(-1);
    const [handleAddshow, sethandleAddshow] = useState(false);
    const {
        register, handleSubmit, reset, setValue, formState: { errors },
    } = useForm();
    const alert = useAlert()

    //   useEffect(() => {
    //     if(user){

    //       dispatch(fLoginUserAsync(user.id))
    //       // dispatch(UpdateUserAsync())
    //     }
    //   }, [dispatch,user])


    const handleEdit = (newAddress, index) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
        newUser.addresses.splice(index, 1, newAddress);
        dispatch(UpdateUserAsync(newUser))
        sethandleIndex(-1);
        alert.success("Edit Successfully")
    }
    const handleDelete = (e, index) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
        newUser.addresses.splice(index, 1);
        dispatch(UpdateUserAsync(newUser))
        alert.show("Address Deleted ")
    }

    const handleEditForm = (index) => {
        sethandleIndex(index);
        console.log(index)
        setValue('fullname', userInfo.addresses[index].fullname)
        setValue('email', userInfo.addresses[index].email)
        setValue('phone', userInfo.addresses[index].phone)
        setValue('country', userInfo.addresses[index].country)
        setValue('streetaddress', userInfo.addresses[index].streetaddress)
        setValue('city', userInfo.addresses[index].city)
        setValue('state', userInfo.addresses[index].state)
        setValue('postalcode', userInfo.addresses[index].postalcode)
    }

    const handleAddAddress = (newAddress) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses, newAddress] }
        dispatch(UpdateUserAsync(newUser));
        alert.success("New Address Added")
        sethandleAddshow(false)
    }


    return (
        <>
            <div>
                <div>

                    <div>
                        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="border-t border-gray-200 px-4 py-3 sm:px-8">

                                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                                    User Name : {userInfo.name ? userInfo.name : "new user"}
                                </h1>
                                <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                                    User Email : {userInfo.email}
                                </h3>
                                {userInfo.role === 'admin' && (<h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                                    Order Status : {userInfo.role}
                                </h3>)}

                            </div>

                            <div className="flex">
                                <button
                                    onClick={() => sethandleAddshow(true)}
                                    type="button"
                                    className="flex justify-between my-3 gap-x-2 px-5 py-2 font-medium text-green-600 hover:text-green-200"
                                >

                                    <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    Add New Address
                                </button>

                                {handleAddshow ? <form noValidate onSubmit={handleSubmit((data) => {
                                    handleAddAddress(data)
                                    reset();
                                    // console.log(data)
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
                                            <button onClick={() => sethandleAddshow(false)} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Save changes
                                            </button>
                                        </div>

                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Select your address for deliver.
                                            </p>
                                        </div>
                                    </div>
                                </form> : null}


                            </div>
                            <h1>{userInfo.addresses.fullname}</h1>
                            {userInfo.addresses && userInfo.addresses.map((adress, index) => (
                                <div>
                                    {handleIndex == index ? <form noValidate onSubmit={handleSubmit((data) => {
                                        handleEdit(data, index)
                                        reset();
                                        // console.log(data)
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
                                                <button onClick={() => sethandleIndex(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Save changes
                                                </button>
                                            </div>

                                            <div className="border-b border-gray-900/10 pb-12">
                                                <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                                    Select your address for deliver.
                                                </p>
                                            </div>
                                        </div>
                                    </form> : null}
                                    <div className="border-t w- border-gray-200 px-4 py-2 sm:px-8">

                                        <p className="mt-0.5 text-sm text-gray-500">
                                            Shipping Address :
                                        </p>


                                        <div className="flex justify-between my-3 gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                                            <div className="flex gap-x-4">

                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                                        FullName : {adress.fullname}
                                                    </p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                        Street Address : {adress.streetaddress}
                                                    </p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                        Postal Code : {adress.postalcode}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                <p className="text-sm leading-6 text-gray-900">
                                                    Phone : {adress.phone}
                                                </p>
                                                <p className="text-sm leading-6 text-gray-500">
                                                    City : {adress.city}
                                                </p>
                                                <p className="text-sm leading-6 text-gray-500">
                                                    State : {adress.state}
                                                </p>
                                            </div>


                                            <div className="flex">
                                                <button
                                                    onClick={(e) => handleEditForm(index)}
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >

                                                    <PencilSquareIcon className="h-7 w-7" aria-hidden="true" />

                                                </button>

                                            </div>
                                            <div className="flex">
                                                <button
                                                    onClick={(e) => handleDelete(e, index)}

                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"

                                                >
                                                    <TrashIcon className="h-7 w-7" aria-hidden="true" />

                                                </button>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>


            </div>
        </>
    );
}
