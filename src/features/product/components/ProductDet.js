import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById, fetchProductByIdAsync } from '../productSlice';
import { useParams } from 'react-router-dom';
import { AddToCartAsync, selectItems } from '../../cart/cartSlice';
import { selectLoggedIn } from '../../auth/authSlice';
import { useAlert } from 'react-alert'
// const product = {
//   name: 'Basic Tee 6-Pack',
//   price: '$192',
//   href: '#',
//   breadcrumbs: [
//     { id: 1, name: 'Men', href: '#' },
//     { id: 2, name: 'Clothing', href: '#' },
//   ],
//   images: [
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
//       alt: 'Two each of gray, white, and black shirts laying flat.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//       alt: 'Model wearing plain black basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//       alt: 'Model wearing plain gray basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//       alt: 'Model wearing plain white basic tee.',
//     },
//   ],
//   // colors: [
//   //   { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//   //   { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//   //   { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//   // ],
//   // sizes: [
//   //   { name: 'XXS', inStock: false },
//   //   { name: 'XS', inStock: true },
//   //   { name: 'S', inStock: true },
//   //   { name: 'M', inStock: true },
//   //   { name: 'L', inStock: true },
//   //   { name: 'XL', inStock: true },
//   //   { name: '2XL', inStock: true },
//   //   { name: '3XL', inStock: true },
//   // ],
//   // description:
//   //   'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   // highlights: [
//   //   'Hand cut and sewn locally',
//   //   'Dyed with our proprietary colors',
//   //   'Pre-washed & pre-shrunk',
//   //   'Ultra-soft 100% cotton',
//   // ],
//   // details:
//   //   'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// }

const colors = [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
]
const sizes = [
  { name: 'XXS', inStock: false },
  { name: 'XS', inStock: true },
  { name: 'S', inStock: true },
  { name: 'M', inStock: true },
  { name: 'L', inStock: true },
  { name: 'XL', inStock: true },
  { name: '2XL', inStock: true },
  { name: '3XL', inStock: true },
]
const description =
  'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.'
const highlights = [
  'Hand cut and sewn locally',
  'Dyed with our proprietary colors',
  'Pre-washed & pre-shrunk',
  'Ultra-soft 100% cotton',
]
const details =
  'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.'



const reviews = { href: '#', average: 2, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function ProductDet() {
  const [selectedColor, setSelectedColor] = useState()
  const [selectedSize, setSelectedSize] = useState()
  const [popup, setpopup] = useState(false)
  const alert = useAlert()
  const product = useSelector(selectProductById)
  const dispatch = useDispatch()
  const params = useParams()
  const user = useSelector(selectLoggedIn)
  const items = useSelector(selectItems)
  console.log(user)

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex(item => item.product.id === product.id) < 0) {
      // if(items.findIndex(item=>item.productId===product.id)<0){
      // const Uitem={ ...product,product:product.id, quantity: 1, user: user.id };
      const Uitem = { ...product, product: product.id, quantity: 1 };
      // delete Uitem['id']
      dispatch(AddToCartAsync(Uitem))
      alert.success("added to Cart")
    }
    else {

      alert.error("already added")
    }

  }

  const showpop = () => {
    setpopup(true)
  }
  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id))
  }, [dispatch, params.id])


  return (
    <div className="bg-white">
      {product && <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs && product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <div href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </div>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <div href={product.thumbnail} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.title}
              </div>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[1]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[2]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.images[3]}
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">₹  {product.price}</p>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
              {product.discountPercentage}% OFF
            </span>

            {/* dimension */}
            <section class="bg-gray-50 mt-2 py-8 px-4">
              <div class="max-w-3xl mx-auto">
                <h2 class="text-2xl font-semibold text-gray-800 mb-6">Product Dimensions</h2>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div class="bg-white shadow rounded-lg p-4 text-center">
                    <p class="text-sm text-gray-500">Height</p>
                    <p class="text-lg font-bold text-gray-800">{product.dimensions.height}</p>
                  </div>

                  <div class="bg-white shadow rounded-lg p-4 text-center">
                    <p class="text-sm text-gray-500">Width</p>
                    <p class="text-lg font-bold text-gray-800">{product.dimensions.width}</p>
                  </div>

                  <div class="bg-white shadow rounded-lg p-4 text-center">
                    <p class="text-sm text-gray-500">Depth</p>
                    <p class="text-lg font-bold text-gray-800">{product.dimensions.depth}</p>
                  </div>

                  <div class="bg-white shadow rounded-lg p-4 text-center">
                    <p class="text-sm text-gray-500">Weight</p>
                    <p class="text-lg font-bold text-gray-800">{product.weight}kg</p>
                  </div>
                </div>
              </div>
            </section>

            {/* dimension */}
            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating)
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                        }`}
                    />
                  ))}
                  <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                </div>





                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <div href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {product.reviews.length} reviews
                </div>
              </div>
            </div>


            <div className="mt-2 border-t pt-3">
              <h3 className="text-sm font-semibold text-gray-800">Warranty Information</h3>
              <ul className="mt-2 text-xs text-gray-600 space-y-1">
                <li>✔ {product.warrantyInformation} limited manufacturer warranty</li>
                <li>✔ Covers defects in materials and workmanship</li>
                <li>✔ Free replacement or repair during warranty period</li>
                <li>✘ Does not cover accidental damage or misuse</li>
                <li>📞 For claims, contact support at support@example.com</li>
              </ul>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {colors.map((color) => (
                      // {product.colors&&product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <div href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </div>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {sizes.map((size) => (
                      // {product.sizes && product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                onClick={handleCart}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onChange={showpop}
              >
                Add to cart
              </button>
            </form>

          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-4 border-t pt-3">
              <h3 className="text-sm font-semibold text-gray-800">Shipping Information</h3>
              <ul className="mt-2 text-xs text-gray-600 space-y-1">
                <li>🚚 Free standard shipping on orders over $50</li>
                <li>⏱ Estimated delivery: {product.shippingInformation} / business days</li>
                <li>🔙   {product.returnPolicy} </li>
                <li>🌍 International shipping supported (rates vary)</li>
                <li>📦 Tracking number provided once shipped</li>
              </ul>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {highlights.map((highlight) => (
                    // {product.highlights&& product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{details}</p>
              </div>
            </div>




            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-800">Customer Reviews</h3>

              <div className="mt-3 space-y-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review, idx) => (
                    <div key={idx} className="border-b pb-3">
                      {/* Rating as stars */}
                      <p className="text-xs text-yellow-500">
                        {"⭐️".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                      </p>

                      {/* Comment */}
                      <p className="text-sm text-gray-700 mt-1">{review.comment}</p>

                      {/* Reviewer details */}
                      <span className="block text-xs text-gray-500 mt-1">
                        — {review.reviewerName} ({review.reviewerEmail})
                      </span>

                      {/* Date formatted */}
                      <span className="block text-xs text-gray-400">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">No reviews yet. Be the first to leave one!</p>
                )}
              </div>
            </div>


            {/* {product.reviews.map((e) => {
              return (
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-800">Customer Reviews</h3>

                  <div className="mt-3 space-y-4">
                    <div className="border-b pb-3">
                      <p className="text-xs text-gray-600">{e.rating}</p>
                      <p className="text-sm text-gray-700 mt-1">{e.comment}</p>
                      <span className="text-xs text-gray-500">{e.date}</span>
                    </div>



                  </div>
                </div>
              );
            })} */}

          </div>
        </div>
      </div>}
    </div>
  )
}
