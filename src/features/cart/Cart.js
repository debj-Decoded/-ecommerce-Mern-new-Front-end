import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems, UpdateItemAsync, DeleteItemAsync } from '../cart/cartSlice';
import { Link } from 'react-router-dom';
import Modal from '../common/Modal';



// const Items = [


//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-Item-01.jpg',
//     imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-Item-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   // More Items...
// ]



export function Cart() {
  const [open, setOpen] = useState(true)
  const [openModule, setopenModule] = useState(null)
  const products = useSelector(selectItems);

  const totalCount = products.reduce((amount, e) => {
    return e.product.price * e.quantity + amount
  }, 0)
  const totalPerItem = products.reduce((total, e) => {
    return e.quantity + total
  }, 0)
  const dispatch = useDispatch()

  const handleChange = (e,Item) => {
    // console.log("item")
    // console.log(Item)
    // // console.log(e.target.value)
    // console.log("Item2") 

    dispatch(UpdateItemAsync({id:Item.id,quantity: e.target.value }))
    // dispatch(UpdateItemAsync({ ...Item, quantity: e.target.value }))
    console.log("first")
    console.log(Item)
    console.log("sec")
  }
  console.log(products)

  const handleDelete = (Item) => {
    dispatch(DeleteItemAsync(Item))
    
  }



  return (

    <div className="bg-white">
     
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">YOUR CART</h2>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.length > 0 ? products.map((Item) => (
                <li key={Item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={Item.product.images[0]}
                      alt={Item.product.title}
                      // src={Item.images[0]}
                      // alt={Item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={Item.href}>{Item.product.title}</a>
                        </h3>
                        <p className="ml-4">₹ {Item.product.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{Item.color}</p>
                    </div>
                    <div className="flex flex-1 items-end  justify-between text-sm">
                      <div className="text-gray-900">
                        <label htmlFor="" className='inline text-sm mr-2 font-medium leading-6 '>
                          Qty
                        </label>
                            <h1>{Item.id}</h1>
                        <select onChange={(e,i) => handleChange(e, Item)} value={Item.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        {/* {Item.quantity} */}
                      </div>

                      <div className="flex">
                        <Modal warning={Item.product.title}
                         message={"sure you want to delete"} 
                         dangerAction={() => handleDelete(Item)} 
                         showDialog={openModule===Item.id} 
                         cancelAction={() => setopenModule(null)}>
                        
                         </Modal>
                        <button
                          onClick={() => setopenModule(Item.id)}
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


        <div className="border-t border-gray-200 px-4 mt-5 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>₹ {totalCount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-base my-4 font-medium text-gray-900">
            <p>Quantity</p>
            <p>{totalPerItem} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link
              to="/CheckOut"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
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
  );
}
