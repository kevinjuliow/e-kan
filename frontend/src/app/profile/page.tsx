import React from 'react'
import Link from 'next/link'

const Profile = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-24"> 
      <p>This is profile page</p>
      <Link href={"/dashboard"}>dashboard</Link>
    </div>
  )
}

export default Profile