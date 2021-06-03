import { FC, useEffect } from 'react'
import Link from 'next/link'
import styles from './ImageZoom.module.css'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ImageZoom: FC<{
  colSpanned?: number | any
  backgroundImage?: string
  title?: string
  width?: number
  height?: number
  to?: any
  text?: string | undefined
  smallColSpanned?: number | any
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
  // String concatenated classes with template literals are
  // getting tree shaken by Tailwind in prod
  function getColClass(num: any) {
    switch (num) {
      case 1:
        return 'sm:col-span-1'
      case 2:
        return 'sm:col-span-2'
      case 3:
        return 'sm:col-span-3'
    }
  }

  function getSmallColClass(num: any) {
    switch (num) {
      case 1:
        return 'col-span-1'
      case 2:
        return 'col-span-2'
      case 3:
        return 'col-span-3'
    }
  }

  const colClass = getColClass(colSpanned)
  const mediaQueryColClass = getSmallColClass(smallColSpanned)

  return (
    <>
      <span className="hidden sm:hidden col-span-3 sm:col-span-1 sm:col-span-3"></span>
      <Link href={to}>
        <motion.a
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={imageZoomVariant}
          className={` ${colClass} ${mediaQueryColClass}
        ${hide ? styles.hide : ''}`}
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
    </>
  )
}

export default ImageZoom
