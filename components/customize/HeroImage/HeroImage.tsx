import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeroImage: FC<{
  src: string
  to: string
  width: number
  height: number
  alt: string
}> = ({ src, to, width, height, alt }) => {
  return (
    <section className="w-full h-50">
      <Link href={to}>
        <a>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            layout="responsive"
          />
        </a>
      </Link>
    </section>
  )
}

export default HeroImage
