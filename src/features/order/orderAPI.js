export function createOrder(order) {
  return new Promise(async (resolve) => {
    // const response = await fetch('http://euro/orders', {
    const response = await fetch('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchAllOrders({pagination,sort}) {
  //http://localhost:8080/orders?_page=1&_limit=2
  // http://localhost:8080/orders?_sort=id&_order=desc
  let queryString = '';
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  for(let key in sort){
    queryString +=`${key}=${sort[key]}&`
  }
  return new Promise(async (resolve) => {
    // const response = await fetch('http://euro/orders?'+queryString)
    const response = await fetch('/orders?'+queryString)
    const data = await response.json()
    const totalOrders = await response.headers.get('X-Total-Count')
    resolve({ data: { orders: data, totalOrders: +totalOrders } })
  }
  );
}

export function EditOrder(order) {
  return new Promise(async (resolve) => {
  // const response = await fetch('http://euro/orders/'+order.id, {
  const response = await fetch('/orders/'+order.id, {
  // const response = await fetch('http://localhost:8080/orders?/'+order.id, {
    method: 'PATCH',
    body: JSON.stringify(order),
    headers: { 'content-type': 'application/json' }
  })
  const data = await response.json()
  resolve({ data })
}
);
}


export function fetchOrderById(id) {
  return new Promise(async(resolve) =>{
  //  const response= await fetch('http://euro/orders/'+id) 
   const response= await fetch('/orders/'+id) 
   const data=await response.json()
  resolve({data})
  }
  );
}
