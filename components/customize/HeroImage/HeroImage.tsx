import { FC, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const HeroImage: FC<{
  src: string
  to: string
  width: number
  height: number
  alt: string
}> = ({ src, to, width, height, alt }) => {
  const heroVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  }
  const controls = useAnimation()
  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate="visible"
      variants={heroVariant}
      className="w-full h-auto"
    >
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
    </motion.section>
  )
}

export default HeroImage
