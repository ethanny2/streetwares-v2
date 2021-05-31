import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ImageZoom.module.css'

const ImageZoom: FC<{
  colSpanned?: number
  backgroundImage?: string
  title?: string
  width?: number
  height?: number
  to?: string
  text?: string | undefined
}> = ({ colSpanned, backgroundImage, title, width, height, to, text }) => {
  return (
    <Link href={'#'}>
      <a className={`col-span-${colSpanned}`}>
        <div className={styles['card-zoom']}>
          <div
            title={title}
            className={`${styles['card-zoom-image']} ${backgroundImage}`}
          ></div>
          {text && <h1 className={`${styles['card-zoom-text']}`}>{text}</h1>}
        </div>
      </a>
    </Link>
  )
}

export default ImageZoom
