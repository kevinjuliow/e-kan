"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const ZodLoginFormSchema = z.object({
  email: z.string().email("Email format must be valid"),
  password: z.string()
});

type LoginFormSchema = z.infer<typeof ZodLoginFormSchema>;

const Login = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormSchema>({
    resolver: zodResolver(ZodLoginFormSchema),
  });

  const { errors } = formState;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const router = useRouter();

  const handleForm = handleSubmit(async (values) => {
    setLoading(true); // Set loading to true before the signIn process starts
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: '/dashboard',
        redirect: false
      })

      if (response?.error) {
        throw new Error(response?.error);
      }

      router.push('/dashboard');
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false); // Set loading to false after the signIn process is complete
    }
  });

  return (
    <div className="w-full flex flex-col items-center justify-center relative top-[100px] mt-4">
      <div className="bg-wave"></div>
      <h1 className="font-semibold text-2xl mb-4">Login</h1>
      <form className="max-w-sm mx-auto w-[80%] md:w-[320px]" method="POST" onSubmit={handleForm}>
        <div className="mb-7 relative">
          <div className="mb-2 flex items-start justify-center border-mediumaqua border-b-2 py-1">
            <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#00A3A3">
              <path d="M7 9L12 12.5L17 9" stroke="#00A3A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="#00A3A3" strokeWidth="1.5"></path>
            </svg>
            <input
              type="email"
              id="email"
              className="bg-transparent focus:outline-none text-gray-900 text-sm block w-full p-1 ms-1 placeholder-gray-400"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          {errors?.email && <p className="absolute right-0 text-[12px] text-red-500">{errors.email?.message}</p>} 
        </div>

        <div className="mb-7 relative">
          <div className="mb-2 flex items-start justify-center border-mediumaqua border-b-2 py-1">
            <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#00a3a3">
              <path d="M16 12H17.4C17.7314 12 18 12.2686 18 12.6V19.4C18 19.7314 17.7314 20 17.4 20H6.6C6.26863 20 6 19.7314 6 19.4V12.6C6 12.2686 6.26863 12 6.6 12H8M16 12V8C16 6.66667 15.2 4 12 4C8.8 4 8 6.66667 8 8V12M16 12H8" stroke="#00a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <input
              type="password"
              id="password"
              className="bg-transparent focus:outline-none text-gray-900 text-sm block w-full p-1 ms-1 placeholder-gray-400"
              placeholder="Password"
              {...register("password")}
              />
          </div>
          {errors?.password && <p className="absolute right-0 text-[12px] text-red-500">{errors.password?.message}</p>} 
        </div>

        {error && <p className="text-[12px] mb-4 text-red-500">{error?.message}</p>}
        <button type="submit"
          className="w-full border px-5 py-2.5 custom-hover-button cursor-pointer rounded-md bg-darkaqua text-white border-none text-sm">
          {
            loading ? 
            <div role="status" className="">
                <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            : 'Login'
          }
        </button>
      </form>
      <p className="mt-6">belum punya akun? <Link href={"/auth/signup"} className="underline text-gray-800 dark:text-blue-600">sign up</Link></p>
    </div>
  );
};

export default Login;
