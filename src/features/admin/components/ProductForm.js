import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux';
import { CreateProductAsync, EditProductAsync, selectBrand, selectCategory } from '../../product/productSlice';
import { useForm, SubmitHandler } from "react-hook-form"
import { useParams } from 'react-router-dom';
import { fetchProductByIdAsync, selectProductById } from '../productSlice';
import { useEffect, useState } from 'react';
import Navbar from '../../navbar/Navbar';
import { useAlert } from 'react-alert'


export default function ProductForm() {
    const brands = useSelector(selectBrand);
    const categories = useSelector(selectCategory);
    const [tog, settog] = useState(true)
    const alert = useAlert()
    const dispatch = useDispatch()
    const {
        register, handleSubmit, setValue, reset, formState: { errors },
    } = useForm();
    const param = useParams()
    const ProductById = useSelector(selectProductById)
    useEffect(() => {
        if (param.id) {
            dispatch(fetchProductByIdAsync(param.id))
        }
    }, [param.id])

    useEffect(() => {
        if (ProductById && param.id) {
            setValue('title', ProductById.title)
            setValue('description', ProductById.description)
            setValue('price', ProductById.price)
            setValue('discountPercentage', ProductById.discountPercentage)
            setValue('stock', ProductById.stock)
            setValue('category', ProductById.category)
            setValue('brand', ProductById.brand)
            setValue('thumbnail', ProductById.thumbnail)
            setValue('title', ProductById.title)
            setValue('image1', ProductById.images[0])
            setValue('image2', ProductById.images[1])
            setValue('image3', ProductById.images[2])
            setValue('image4', ProductById.images[3])
            setValue('delete', ProductById.delete)
        }
    }, [ProductById])
    console.log(ProductById)

    const handleNa = () => {

        const product = { ...ProductById }
        product.delete = true;
        dispatch(EditProductAsync(product))
        console.log("3")
    }


    // const handletog=(e)=>{
    //     // const product = { ...ProductById }
    //     // if (tog) {
    //     //     settog(false)
    //     //     product.delete = true;
    //     // } else {
    //     //     settog(true)
    //     //     product.delete = false;
    //     // }
    //     // dispatch(EditProductAsync(product))
    //     // // tog?settog(false) && product.delete = true:settog(true)&& product.delete = false;
    //     // console.log(tog)
    //     console.log(e.target.value)

    // }


    return (
        <>
            <Navbar>

                <div className="space-y-12 b p-16">
                    <form noValidate onSubmit={handleSubmit((data) => {
                        // console.log('submit ddddddddaaaaaaaattttaa',data)
                        const product = { ...data }
                        product.images = [product.image1, product.image2, product.image3, product.image4]
                        product.rating = 0;
                        delete product['image1']
                        delete product['image2']
                        delete product['image3']
                        delete product['image4']

                        product.price = +product.price
                        product.rating = +product.rating
                        product.stock = +product.stock
                        product.discountPercentage = +product.discountPercentage
                        // console.log(product)
                        reset()
                        if (param.id) {
                            product.id = param.id
                            product.rating = ProductById.rating || 0
                            dispatch(EditProductAsync(product))
                            alert.success("Edited Successful")
                        }
                        else {
                            dispatch(CreateProductAsync(product))
                            // console.log(product)
                            alert.success("New Product Added")
                        }
                    })}>
                        <div className="space-y-12 g-white">

                            <div className="border-b border-gray-900/10 pb-12">
                                <h1 className="text-base font-semibold leading-7 text-gray-900">Add Product</h1>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    This information will be displayed publicly so be careful what you share.
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                            Productname
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    {...register("title", {
                                                        required: true
                                                    })}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="description"
                                                name="description"
                                                rows={3}
                                                {...register("description", {
                                                    required: true
                                                })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={''}
                                            />
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your product.</p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                            Price
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                                <input
                                                    type="text"
                                                    name="price"
                                                    id="price"
                                                    {...register("price", {
                                                        required: true
                                                    })}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                            DiscountPercentage
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                                <input
                                                    type="text"
                                                    name="discountPercentage"
                                                    id="discountPercentage"
                                                    {...register("discountPercentage", {
                                                        required: true
                                                    })}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                            Stock
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                                <input
                                                    type="text"
                                                    name="stock"
                                                    id="stock"
                                                    {...register("stock", {
                                                        required: true
                                                    })}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                                />
                                            </div>
                                        </div>
                                    </div>




                                    {/* <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Cover photo
                                        </label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                </div>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Product Categorize</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                            Category
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="category"
                                                name="category"
                                                {...register("category", {
                                                    required: true
                                                })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                {categories.map((category) => (

                                                    <option value={category.value}>{category.value}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                            Brand
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="brand"
                                                name="brand"
                                                {...register("brand", {
                                                    required: true
                                                })}
                                                autoComplete="country-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                {brands.map((brand) => (

                                                    <option value={brand.value}>{brand.value}</option>
                                                ))}

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                        image1
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                            <input
                                                type="text"
                                                name="image1"
                                                id="image1"
                                                {...register("image1", {
                                                    required: true
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                        image2
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                            <input
                                                type="text"
                                                name="image2"
                                                id="image2"
                                                {...register("image2", {
                                                    required: true
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                        image3
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                            <input
                                                type="text"
                                                name="image3"
                                                id="image3"
                                                {...register("image3", {
                                                    required: true
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
                                        image4
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                            <input
                                                type="text"
                                                name="image4"
                                                id="image4"
                                                {...register("image4", {
                                                    required: true
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                        Thumbnail
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                            <input
                                                type="text"
                                                name="thumbnail"
                                                id="thumbnail"
                                                {...register("thumbnail", {
                                                    required: true
                                                })}
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            {/* <h1>{ProductById.title}</h1> */}
                            {param.id && <button onClick={handleNa} type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Mark N/a
                            </button>}
                            {/* <label className="relative inline-flex items-center me-5 cursor-pointer">
                            <input
                            
                            onClick={e=>handletog(e)}
                                type="checkbox"
                                defaultValue=""
                                {...register("delete", {
                                    required: true
                                })}
                                className="sr-only peer"
                                defaultChecked=""
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600" />
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Purple
                            </span>
                        </label> */}
                            <h1>Wonder</h1>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add Product
                            </button>
                        </div>
                    </form>

                </div>
            </Navbar>
        </>
    )
}