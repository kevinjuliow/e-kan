import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div className="w-full flex items-center justify-center mt-24 h-[600px] mb-12">
      <div className="max-w-screen-xl w-full h-full p-8 lg:px-0 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-black text-center">Tentang Kami</h1>
        <p className="mt-2 text-xl text-darkaqua text-center">Mari berkenalan dengan kami, e-KAN</p>
        <p className="text-center w-[60%]">e-Kan, sebuah layanan jual-beli ikan secara online. Kami menyediakan berbagai jenis ikan termasuk juga tiga habitat ikan yang berbeda.</p>
        
        <p className="mt-10 text-xl text-darkaqua text-center">Layanan</p>
        <div className="mt-2 flex flex-col items-start justify-center">
          <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M17.707 12.293a.999.999 0 0 0-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 0 0 0-1.414l-4-4a.999.999 0 0 0-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 0 0 0-1.414l-4-4.001zm-.127 6.712c-1.248-.021-5.518-.356-8.873-3.712-3.366-3.366-3.692-7.651-3.712-8.874L7 4.414 9.586 7 8.293 8.293a1 1 0 0 0-.272.912c.024.115.611 2.842 2.271 4.502s4.387 2.247 4.502 2.271a.991.991 0 0 0 .912-.271L17 14.414 19.586 17l-2.006 2.005z"/>
            </svg>
            <p className="ms-2">085101999888</p>
          </div>
          <div className="flex items-center justify-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"/>
            </svg>
            <p className="ms-2">bptpbcangkringan@gmail.com</p>
          </div>
          <div className="flex items-center justify-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"/>
            </svg>
            <p className="ms-2">bptpb.jogjaprov.go.id</p>
          </div>
        </div>

        <p className="mt-10 text-xl text-darkaqua text-center">Didukung oleh:</p>
        <Image src={"/Coat_of_arms_of_Yogyakarta.png"} alt="Provinsi DIY" width={100} height={100} />
        <div className="mt-2 font-bold flex flex-col items-center justify-center">
          <p className="text-center">BPTPB (Balai Pengembangan Teknologi Perikanan Budidaya)</p>
          <p className="text-center">Daerah Istimewa Yogyakarta</p>
        </div>
      </div>
    </div>
  )
}

export default About