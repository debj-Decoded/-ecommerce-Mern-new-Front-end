// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
   const response= await fetch('http://localhost:8080/products') 
   const data=await response.json()
  resolve({data})
  }

  );

}

export function fetchProductByFilter(filter, sort, pagination, search, admin) {
  let queryString = '';

  // Filters
  for (let key in filter) {
    let initial_str = filter[key];
    if (initial_str.length) {
      const lastStr = initial_str[initial_str.length - 1];
      queryString += `${key}=${lastStr}&`;
    }
  }

  // Sorting
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  // Pagination
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  // Admin flag
  if (admin) {
    queryString += `admin=true&`;
  }

  // Search keyword
  if (search) {
    queryString += `q=${search}&`;   
    console.log("Search value:", search);

  }

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products?' + queryString);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchProductByCategory() {
  return new Promise(async(resolve) =>{
   const response= await fetch('http://localhost:8080/categories') 
   const data=await response.json()
  resolve({data})
  }
  );
}
export function fetchProductByBrand() {
  return new Promise(async(resolve) =>{
   const response= await fetch('http://localhost:8080/brands') 
   const data=await response.json()
  resolve({data})
  }
  );
}
export function fetchProductById(id) {
  return new Promise(async(resolve) =>{
   const response= await fetch('http://localhost:8080/products/'+id) 
   const data=await response.json()
  resolve({data})
  }
  );
}

export function CreateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}
 

export function EditProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+product.id, {
      method: 'PATCH',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}
// // A mock function to mimic making an async request for data
// export function fetchAllProducts() {
//   return new Promise(async(resolve) =>{
//    const response= await fetch('http://localhost:8080/products') 
//    const data=await response.json()
//   resolve({data})
//   }

//   );
// }
// export function fetchProductByFilter(filter,sort,pagination) {

//   // filter ={"category":["smartphones","laptops"]}
//   // sort={_sort:"price",_order="desc"}
//   let queryString='';
//   for(let key in filter){
//     let initial_str=filter[key];
//     if(initial_str.length){
//       const lastStr=initial_str[initial_str.length-1]
//       queryString +=`${key}=${lastStr}&`
//     }
//   }
//   for(let key in sort){
//     queryString +=`${key}=${sort[key]}&`
//   }
//   for(let key in pagination){
//     queryString +=`${key}=${pagination[key]}&`
//   }
//   return new Promise(async(resolve) =>{
//    const response= await fetch('http://localhost:8080/products?'+queryString) 
//    const data=await response.json()
//    const totalItems=await response.headers.get('X-Total-Count')
//   resolve({data:{products:data,totalItems:+totalItems}})
//   }

//   );
// }

// export function fetchProductByCategory() {
//   return new Promise(async(resolve) =>{
//    const response= await fetch('http://localhost:8080/category') 
//    const data=await response.json()
//   resolve({data})
//   }
//   );
// }
// export function fetchProductByBrand() {
//   return new Promise(async(resolve) =>{
//    const response= await fetch('http://localhost:8080/brand') 
//    const data=await response.json()
//   resolve({data})
//   }
//   );
// }
// export function fetchProductById(id) {
//   return new Promise(async(resolve) =>{
//    const response= await fetch('http://localhost:8080/products/'+id) 
//    const data=await response.json()
//   resolve({data})
//   }
//   );
// }

// export function CreateProduct(product) {
//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8080/products', {
//       method: 'POST',
//       body: JSON.stringify(product),
//       headers: { 'content-type': 'application/json' }
//     })
//     const data = await response.json()
//     resolve({ data })
//   }
//   );
// }

// export function EditProduct(product) {
//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8080/products/'+product.id, {
//       method: 'PATCH',
//       body: JSON.stringify(product),
//       headers: { 'content-type': 'application/json' }
//     })
//     const data = await response.json()
//     resolve({ data })
//   }
//   );
// }
