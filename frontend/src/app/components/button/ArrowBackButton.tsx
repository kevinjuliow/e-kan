import Link from 'next/link'
import React from 'react'
import { LeftArrowIcon } from '../icon'

interface Props {
  url: string
  hexColor: string
  size: number
}

const ArrowBackButton = ({ url, hexColor = "#1f2937", size=24 }: Props) => {
  return (
    <Link href={url} className="relative bottom-[2px]">
      <LeftArrowIcon size={size} hexColor={hexColor} />
    </Link>
  )
}

export default ArrowBackButton