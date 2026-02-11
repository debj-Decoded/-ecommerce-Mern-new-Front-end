export function CreateUser(userData) {
  return new Promise(async (resolve) => {
    //x const response = await fetch('http://euro/auth/signup', {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

//frontend api only
// export function CreateUser(userData) {
// return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8080/users', {
//       method: 'POST',
//       body: JSON.stringify(userData),
//       headers: { 'content-type': 'application/json' }
//     })
//     const data = await response.json()
//     resolve({ data })
//   }
//   );
// }

export function LoginUser(LoginInfo) {
  // export function CheckUser(LoginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      // const response = await fetch('http://euro/auth/login', {
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(LoginInfo),
        headers: { 'content-type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json()
        resolve({ data });
        // console.log({ data })
      }
      else {
        const error = await response.text()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  }
  );
}

export function CheckAuth() {
  // export function CheckUser(LoginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      // const response = await fetch('http://euro/auth/check');
      const response = await fetch('/auth/check');
      if (response.ok) {
        const data = await response.json()
        resolve({ data });
        // console.log({ data })
      }
      else {
        const error = await response.text()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  }
  );
}
// frontend api only

// export function CheckUser(LoginInfo) {
//   return new Promise(async (resolve, reject) => {
//     const email = LoginInfo.email
//     const password = LoginInfo.password
//     const response = await fetch('http://localhost:8080/users?email=' + email)
//     const data = await response.json()
//     // console.log({data})
//     if (data.length) {
//       if (password === data[0].password) {
//         resolve({ data: data[0] })
//       }
//       else {
//         reject({ message: "wrong password" })
//       }
//     }
//     else {
//       reject({ message: "user not found" })
//     }
//     resolve({ data })
//   }
//   );
// }

export function LogoutUser(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: 'Success' })
  }
  );
}