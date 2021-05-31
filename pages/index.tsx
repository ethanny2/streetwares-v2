import { Layout } from '@components/common'
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
import HeroImage from '@components/customize/HeroImage/'
import ImageZoom from '@components/customize/ImageZoom/'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'
import getSiteInfo from '@framework/common/get-site-info'
import getAllPages from '@framework/common/get-all-pages'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const { products } = await getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  })
  console.log({ products })

  // const { categories, brands } = await getSiteInfo({ config, preview })
  // const { pages } = await getAllPages({ config, preview })

  return {
    props: {
      products,
      categories: [],
      brands: [],
      pages: [],
    },
    revalidate: 14400,
  }
}

export default function Home({
  products,
  brands,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log({ products })
  return (
    <>
      <>
        <HeroImage
          alt="Skateboarder ollies over a barrier"
          width={500}
          height={200}
          src="/home-images/active-home.jpg"
          to="/search/designers/active"
        />
      </>
      <Marquee variant="secondary">
        {products.slice(0, 3).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="slim"
            imgProps={{
              width: 320,
              height: 320,
            }}
          />
        ))}
      </Marquee>
      <Hero
        headline="Release Details: The Yeezy BOOST 350 V2 ‘Natural'"
        description="
        The Yeezy BOOST 350 V2 lineup continues to grow. We recently had the
        ‘Carbon’ iteration, and now release details have been locked in for
        this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this year, the
        shoe was originally called ‘Abez’, which translated to ‘Tin’ in
        Hebrew. It’s now undergone a name change, and will be referred to as
        ‘Natural’."
      />
      <section className="w-full h-30 grid gap-4 grid-cols-3 mt-4">
        {/* Add hover zoom to cards and make responsive  
        https://daily-dev-tips.com/posts/tailwind-zooming-background-images/
          Increase hero image height on smaller widths
          Remove middle yeezy section with autoplay short vid?
          Remake footer
          Remove one nav link or change breakpoint
          Get new logo
          Get new favicon
          Add in framer motion to animate in
          Find new font for the site?
        */}
        {/* <Link href={'#'}>
          <a className="sm:col-span-1 col-span-3">
            <Image
              src="/home-images/obey-home.jpg"
              alt="Skateboarder walking down train tracks while holding board"
              height="125"
              width="125"
              layout="responsive"
            />
          </a>
        </Link>
        <Link href={'#'}>
          <a className="sm:col-span-1 col-span-3">
            <Image
              src="/home-images/tshirt-home.jpg"
              alt="Man in tye-dye shirt with beanie against blue sky"
              height="150"
              width="150"
              layout="responsive"
            />
          </a>
        </Link>
        <Link href={'#'}>
          <a className="sm:col-span-1 col-span-3">
            <Image
              src="/home-images/pants-home.jpg"
              alt="Stack of pants on top of each other"
              height="150"
              width="150"
              layout="responsive"
            />
          </a>
        </Link> */}
        {/* <Link href={'#'}>
          <a className="col-span-3">
            <Image
              src="/home-images/nikesb-home.jpg"
              alt="Nike SB product collection with skateboarders hopping a fence in background"
              height="75"
              width="200"
              layout="responsive"
            />
          </a>
        </Link> */}
        <ImageZoom
          colSpanned={1}
          title="Skateboarder walking down train tracks while holding board"
          to="/search/designers/obey"
          backgroundImage="bg-obey-home"
          text="Shop Obey"
        />
        <ImageZoom
          colSpanned={1}
          title="Man in tye-dye shirt with beanie against blue sky"
          to="/search?q=shirts"
          backgroundImage="bg-tshirt-home"
          text="Shop Shirts"
        />{' '}
        <ImageZoom
          colSpanned={1}
          title="Stack of pants on top of each other"
          to="/search?q=pants"
          backgroundImage="bg-pants-home"
          text="Shop Pants"
        />
        <ImageZoom
          colSpanned={3}
          title="Nike SB product collection with skateboarders hopping a fence in background"
          to="/search?q=shoes"
          backgroundImage="bg-nikesb-home"
        />
      </section>
    </>
  )
}

Home.Layout = Layout
