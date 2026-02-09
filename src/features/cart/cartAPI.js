// A mock function to mimic making an async request for data

export function AddToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

// export function fetchItemsByUserid(userId) {
export function fetchItemsByUserid() {
  return new Promise(async (resolve) => {
    // const response = await fetch('http://localhost:8080/cart?user=' + userId)
    const response = await fetch('http://localhost:8080/cart')
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function UpdateItem(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}
export function DeleteItem(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/'+item.id, {
      method: 'DELETE',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' }
    })
    // const data = await response.json()
    // resolve({ data })

      resolve({ id: item.id }); 
  }
  );
}

export function ResetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserid(userId);
    const items =  response.data;
    for (let item of items){
      await DeleteItem(item);
    }
    resolve({ status:'success' })
  }
  );
}
 

