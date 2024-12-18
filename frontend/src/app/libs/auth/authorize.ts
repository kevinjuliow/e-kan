import jwt from 'jsonwebtoken';
import axios, { AxiosError } from 'axios';

export async function authorize(credentials: any) {
  console.log("step 1: get into authorize")
  if (!credentials?.email || !credentials.password) { // if there is no credentials
    return null;
  }

  console.log("step 2: pass the if statement")
  try {
    console.log(`ENV URL: ${process.env.API_BASEURL}`)
    // try to login as pembeli
    let response = await loginUser(credentials.email, credentials.password, 'pembeli')
    
    console.log(response)
    // if response has a value of null, then try to login as penjual
    if (!response) {
      response = await loginUser(credentials.email, credentials.password, 'penjual')
    }

    console.log(response)
    if (!response) {
      console.log("eh ternyata response gak ada semua, jadi error")
      throw new Error('Email atau password salah, coba lagi!')
    }

    console.log("berhasil dapetin respon yey")
    // Check if login success and retrieve a token
    const { token } = response;

    let getUserResponse = null

    // Getting user data to be returned
    if (token) {
      console.log("step 3: pass the if statement checking token")
      console.log("GETTING PEMBELI DATA")
      getUserResponse = await getUser(token, 'pembeli')
      
      if (!getUserResponse) {
        console.log("GETTING PENJUAL DATA")
        getUserResponse = await getUser(token, 'penjual')
      }
  
      if (!getUserResponse) {
        console.log("ini masuk error setelah mau dapetin userData")
        throw new Error()
      }
      console.log("PASSED")
    }
    const { userType } = jwt.decode(token)
    const id_user = userType === 'PEMBELI' ? getUserResponse.id_pembeli : getUserResponse.id_penjual
    const { nama, email } = getUserResponse
    if (token) {
      // Return user with token as a part of user object
      console.log(userType.toLowerCase())
      return { 
        id: id_user,
        email: email,
        name: nama,
        accessToken: token,
        userType
      };
    }

  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Authorization error');
    }
  }
}

async function loginUser(email: string, password: string, userType: 'pembeli' | 'penjual') {
  console.log("MASUK loginUser")
  console.log("email in loginUser: " + email)
  console.log("password in loginUser: " + password)
  console.log("userType in loginUser: " + userType)
  try {
    console.log(`${process.env.API_BASEURL}/api/auth/${userType}/login`)
    const response = await axios.post(`${process.env.API_BASEURL}/api/auth/${userType}/login`, {
      email, password
    })
    console.log("di bawah ini response axios post dari loginUser")
    console.log(response)
    return response.data.data
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }
  }
}

async function getUser(accessToken: string, userType: 'pembeli' | 'penjual') {
  try {
    const response = await axios.get(`${process.env.API_BASEURL}/api/${userType}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error?.response?.status === 401) {
        return null
      }
    }
  }
}
