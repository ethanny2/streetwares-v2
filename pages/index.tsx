import { Layout } from '@components/common'
import { Marquee } from '@components/ui'
import { ProductCard } from '@components/product'
import HeroImage from '@components/customize/HeroImage/'
import ImageZoom from '@components/customize/ImageZoom/'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'

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
  return (
    <>
      <HeroImage
        alt="Skateboarder ollies over a barrier"
        width={1500}
        height={500}
        src="/home-images/active-home.jpg"
        to="/search/designers/active"
      />
      <section className="w-full h-30 grid gap-4 grid-cols-3 px-10 my-4">
        <ImageZoom
          colSpanned={1}
          title="Skateboarder sitting on his board with a pigeon in the front of the lens"
          to="/search/designers/obey"
          backgroundImage="bg-obey2-home"
          text="Shop Obey"
          smallColSpanned={3}
        />
        <ImageZoom
          colSpanned={1}
          title="Man in light blue shirt with beanie against white background"
          to="/search?q=shirts"
          backgroundImage="bg-tshirt3-home"
          text="Shop Shirts"
          smallColSpanned={3}
        />{' '}
        <ImageZoom
          colSpanned={1}
          title="2 pairs of pants on top of each other"
          to="/search?q=pants"
          backgroundImage="bg-pants-home"
          text="Shop Pants"
          smallColSpanned={3}
        />
        <ImageZoom
          colSpanned={3}
          title="Skateboarder mid push on a bridge sidewalk"
          to="/search?q=shoes"
          backgroundImage="bg-dc-home"
          smallColSpanned={3}
          hide={true}
          text={'Shop Shoes'}
        />
      </section>
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
    </>
  )
}

Home.Layout = Layout
