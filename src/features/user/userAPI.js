export function fLoginUserOrder(userId) {
  return new Promise(async(resolve) =>{
  //  const response= await fetch('http://euro/orders/user/'+userId) 
   const response= await fetch('/orders/user/'+userId) 
  //  const response= await fetch('http://localhost:8080/orders/?user='+userId) 
  //  const response= await fetch('http://localhost:8080/orders/?users.id='+userId) 
   const data=await response.json()
  resolve({data})
  }

  );
}

export function fLoginUser() {
// export function fLoginUser(userId) {
return new Promise(async (resolve) =>{
    // const response = await fetch('http://euro/users/own') 
    const response = await fetch('/users/own') 
    // const response = await fetch('http://localhost:8080/users/'+userId) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function UpdateUser(update) {
  return new Promise(async (resolve) => {
    // const response = await fetch('http://euro/users/'+update.id, {
    const response = await fetch('/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function DeleteUserAddress(item) {
  return new Promise(async (resolve) => {
    // const response = await fetch('http://euro/users/'+item.id, {
    const response = await fetch('/users/'+item.id, {
      method: 'DELETE',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}