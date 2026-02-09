import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline'
import { ITEMS_PER_PAGE } from '../../../app/constant'
import { EditOrderAsync, fetchAllOrdersAsync, selectOrder, selectTotalOrder } from '../../order/orderSlice'
import { useDispatch, useSelector } from 'react-redux'

export const OrdersManagement = () => {


  const [page, setpage] = useState(1)
  const [showEditIcon, setshowEditIcon] = useState(-1)
  const [sort, setsort] = useState({})
  const orders = useSelector(selectOrder)
  const totalOrder = useSelector(selectTotalOrder)
  const dispatch = useDispatch()


  const handlePage = (page) => {
    setpage(page)

  }
  const handleEdit = (order) => {
    setshowEditIcon(order.id)
    // console.log(showEditIcon)
  }
  const handleShow = () => {
    console.log("show")
  }
  //status chnge 
  const handleStatus = (e, order) => {
    const UpdateOrder = { ...order, status: e.target.value }
    console.log(UpdateOrder)
    dispatch(EditOrderAsync(UpdateOrder))
    setshowEditIcon(-1)
  }

  //sort
  const handleSort = (Sortoption) => {
    const sort = { _sort: Sortoption.sort, _order: Sortoption.order }
    setsort(sort)
    // dispatch(fetchProductByFilterAsync(newfilter))
    console.log(sort)
  }

  // status color change
  const StatusColor = (key) => {
    switch (key) {
      case 'pending':
        return ('text-yellow-700 bg-yellow-100')
      case 'dispatch':
        return ('text-purple-700 bg-purple-100')
      case 'delivered':
        return ('text-green-700 bg-green-100')
      case 'cancel':
        return ('text-red-700 bg-red-100')
      default:
        return ('text-purple-700 bg-purple-100')
    }
  }

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
    dispatch(fetchAllOrdersAsync({ pagination, sort }))
  }, [dispatch, page, sort]);


  //  useEffect(() => {
  //    setpage(1)
  //  }, [totalOrder])

  return (
    <>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3" onClick={() => handleSort({ sort: 'id', order: sort?._order === 'asc' ? 'desc' : 'asc' })}>Order Id</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Edit</th>
                </tr>
              </thead>
              {orders.map((order, index) =>
                <tbody className="bg-white">
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 text-ms font-semibold border">{index + 1}</td>
                    <td className="px-4 py-3 border">
                      {order.products.map((item) =>
                        <div className="flex items-center text-sm">
                          <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img
                              className="object-cover w-full h-full rounded-full"
                              src={item.product.thumbnail}
                              alt=""
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-black">{item.product.title}</p>
                            <p className="text-xs text-gray-600">{item.product.category} qty-{item.quantity}</p>
                          </div>
                        </div>
                      )}

                    </td>  
                       
                    <td className="px-4 py-3 text-ms font-semibold border">
                        {order.SelectedAddress.map(e=>(
                      <div>
                           <p className="font-semibold text-black">fullname- {e.fullname}</p>
                        <p className="text-xs text-gray-600">email- {e.email}</p>
                        <p className="text-xs text-gray-600">phone- {e.phone}</p>
                        <p className="text-xs text-gray-600">country- {e.country}</p>
                        <p className="text-xs text-gray-600">city- {e.city}</p>
                        <p className="text-xs text-gray-600">state- {e.state}</p>
                        <p className="text-xs text-gray-600">street- {e.streetaddress}</p>
                        <p className="text-xs text-gray-600">pin- {e.postalcode}</p>
                      </div>
                        ))}
                        
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border"># {order.id}</td>
                    <td className="px-4 py-3 text-sm border">{order.Payment} - ₹ {order.totalAmount}</td>
                    <td className="px-4 py-3 text-xs border">
                      {showEditIcon == order.id ? (
                        <select onChange={(e) => handleStatus(e, order)}>
                          <option value={""}>-choose-</option>
                          <option value={"pending"}>pending</option>
                          <option value={"dispatch"}>dispatch</option>
                          <option value={"cancel"}>cancel</option>
                          <option value={"delivered"}>delivered</option>
                        </select>) : (<span className={`px-2 py-1 font-semibold leading-tight ${StatusColor(order.status)} rounded-sm`}>
                          {" "}{order.status}{" "}
                        </span>)}
                    </td>
                    <td className=" px-4 py-3 text-sm border">
                      <div className="h-6 w-6 m-1">
                        <PencilIcon onClick={() => handleEdit(order)}>
                        </PencilIcon>
                        <EyeIcon onClick={() => handleShow(order)}>
                        </EyeIcon>
                      </div>
                    </td>
                  </tr>

                </tbody>
              )}

            </table>
          </div>
          {/* Pagination  */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <div

                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >

                Previous
              </div>
              <div
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{page * ITEMS_PER_PAGE > totalOrder ? totalOrder : ''}</span> of{' '}
                  <span className="font-medium">{totalOrder}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <div
                    onClick={e => handlePage(e, page > 1 ? page - 1 : page + 0)}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  {Array.from({ length: Math.ceil(totalOrder / ITEMS_PER_PAGE) }).map((el, index) => {
                    return <div
                      onClick={e => handlePage(e, index + 1)}
                      aria-current="page"
                      className={`relative z-10 inline-flex cursor-pointer items-center ${index + 1 === page ? ' bg-indigo-600  text-white' : ''} px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"`}
                    >
                      {index + 1}
                    </div>
                  })}

                  <div
                    onClick={e => handlePage(e, Math.ceil(totalOrder / ITEMS_PER_PAGE) > page ? page + 1 : page + 0)}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </nav>
              </div>
            </div>
          </div>

          {/* Pagination-end  */}
        </div>
      </section>


    </>

  )
}
