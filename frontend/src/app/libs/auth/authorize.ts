import jwt from 'jsonwebtoken';
import axios from 'axios';

export async function authorize(credentials: any) {
  if (!credentials?.email || !credentials.password) { // if there is no credentials
    return null;
  }

  try {
    console.log(`ENV URL: ${process.env.API_BASEURL}`)
    let response = await loginUser(credentials.email, credentials.password, 'pembeli')
    
    if (!response) {
      response = await loginUser(credentials.email, credentials.password, 'penjual')
    }

    if (!response) {
      throw new Error('Email atau password salah, coba lagi!')
    }

    // Check if login success and retrieve a token
    const { token } = response;
    const { userType } = jwt.decode(token)
    if (token) {
      // Return user with token as a part of user object
      console.log(userType)
      return { 
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
  try {
    const response = await axios.post(`${process.env.API_BASEURL}/api/auth/${userType}/login`, {
      email, password
    })
    return response.data.data
  } catch (error: any) {
    if (error.response.status === 401) {
      return null
    }
  }
}
