import { FC, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ImageZoom.module.css'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { UrlObject } from 'url'
declare type Url = string | UrlObject

const ImageZoom: FC<{
  colSpanned?: number
  backgroundImage?: string
  title?: string
  width?: number
  height?: number
  to?: any
  text?: string | undefined
  smallColSpanned?: number
  hide?: boolean
}> = ({
  colSpanned,
  backgroundImage,
  title,
  width,
  height,
  to,
  text,
  smallColSpanned,
  hide,
}) => {
  const controls = useAnimation()
  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  const imageZoomVariant = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  }
  return (
    <Link href={to}>
      <motion.a
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={imageZoomVariant}
        className={`col-span-${smallColSpanned}  sm:col-span-${colSpanned}  
        ${hide && styles.hide}`}
      >
        <div className={styles['card-zoom']}>
          <div
            title={title}
            className={`${styles['card-zoom-image']} ${backgroundImage}`}
          ></div>
          {text && <h1 className={`${styles['card-zoom-text']}`}>{text}</h1>}
        </div>
      </motion.a>
    </Link>
  )
}

export default ImageZoom
