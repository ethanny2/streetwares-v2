[![GitHub issues](https://img.shields.io/github/issues/ethanny2/streetwares-v2)](https://github.com/ethanny2/streetwares-v2/issues)[![GitHub forks](https://img.shields.io/github/forks/ethanny2/streetwares-v2)](https://github.com/ethanny2/streetwares-v2/network)[![GitHub stars](https://img.shields.io/github/stars/ethanny2/streetwares-v2)](https://github.com/ethanny2/streetwares-v2/stargazers)[![GitHub license](https://img.shields.io/github/license/ethanny2/streetwares-v2)](https://github.com/ethanny2/streetwares-v2/blob/master/license.md)[![Twitter Badge](https://img.shields.io/badge/chat-twitter-blue.svg)](https://twitter.com/ArrayLikeObj)

# 100 Streetwares Ecommerce

#### (Headless Shopify + Nextjs and TypeScript)

## [https://100streetwares.vercel.app/](https://100streetwares.vercel.app/)

<p align="center">
  <img  src="https://media3.giphy.com/media/2a2FrTYMXXNS5cbH1F/giphy.gif?cid=790b7611a7912e2491c0adb9e8a0a7535213aeae15e93193&rid=giphy.gif&ct=g" alt="Demo gif">
</p>

## Background

The goal of this project was to gain insight on how to connect an ecommerce
storefront with a CMS backend that could easily be handed off to a client. I eventually chose Next.js for its strong ecommerce facing templates and ended up using headless Shopify as the backend (as opposed to Sanity CMS or Bigcommerce).

**Goals** :

- Gain experience with the Nextjs ecosystem and learn when to implement SSG (static site generation) vs SSR (server side rendering)
- Practice using Tailwind CSS animation and styling
- Use Framer motion as a declarative animation library rather than making the animations through Tailwind CSS
- Gain insight into how a professional level TypeScript + Next.js application is built by reading through the codebase and creating new components as necessary

## Technology used

- Next.js
- Framer Motion
- react-intersection-observer to trigger animations when element in viewport
- Basic TypeScript to make strongly typed components to extend functionality
- GraphQL to connect to the Shopify Storefront API and fetch the backend product information
- Tailwind CSS for styling with utility classes
- CSS modules for classes scoped to a specific component
- Cookies to persist user cart information
- Headless Shopify Lite integration to redirect the user to a Shopify checkout page

## Concepts

### Working in a strongly typed professional codebase

Using this template helped me gain experience understanding how to navigate a well maintained codebase and how to add functionality to it by following the project conventions and structure when making my own TypeScript components.

```
100-streetwares
└───components
│     └─── auth
│     └─── cart
│     └─── common
|     └─── icons
|     └─── product
|     └─── ui
|     └─── wishlist
|     └─── customize
|            └─── HeroImage
|                  └─── HeroImage.module.css
|                  └─── HeroImage.tsx
|                  └─── index.ts
|            └─── ImageZoom
|                  └─── ImageZoom.module.css
|                  └─── ImageZoom.tsx
|                  └─── index.ts

    ...
    ...
```

### Intersection Observer Animations

Using the react-intersection-observer along with Framer motion's declarative syntax I only trigger the Framer motion animation when the element specified by the ref is in the viewport.

```
 const controls = useAnimation()
  const { ref, inView } = useInView({ threshold: 0.5, delay: 50 })
  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  const imageZoomVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

<motion.a
  ref={ref}
  initial="hidden"
  animate={controls}
  variants={imageZoomVariant}
  className={` ${colClass} ${mediaQueryColClass}
>
  // nested content...
  </motion.a>

```

### Resigning the Homepage with TypeScript Components

Since I wanted to make a streetwear / skate clothing store I looked online for sample images I could use to replicate the feel / UI of other popular online streetwear stores such as...

- [Black Sheep skateshop](https://blacksheepskateshop.com/)
- [CCS](https://shop.ccs.com/)
- [Skate Warehouse](https://www.skatewarehouse.com/)
- [Tactics](https://www.tactics.com/skate)

I typed my custom components and added in styling via Tailwind CSS and CSS modules to keep the generated class names unique.

**Issues:** In production PurgeCSS (activated through Tailwind) doesn't recognize Tailwind utility classes made via string concatenation. This was unintentionally deleting my responsive code for this component, so as a short work around I applied the generated classes on a hidden span to prevent it from being purged.

```
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

   // other code...

  return (
    <>
      {/* Prevent purging of generated Tailwind classes made through string concatenation */}
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

```

---

(_Original README_)

# Next.js Commerce

The all-in-one starter kit for high-performance e-commerce sites. With a few clicks, Next.js developers can clone, deploy and fully customize their own store.
Start right now at [nextjs.org/commerce](https://nextjs.org/commerce)

Demo live at: [demo.vercel.store](https://demo.vercel.store/)

- Shopify Demo: https://shopify.vercel.store/
- Swell Demo: https://swell.vercel.store/
- BigCommerce Demo: https://bigcommerce.vercel.store/
- Vendure Demo: https://vendure.vercel.store

## Features

- Performant by default
- SEO Ready
- Internationalization
- Responsive
- UI Components
- Theming
- Standardized Data Hooks
- Integrations - Integrate seamlessly with the most common ecommerce platforms.
- Dark Mode Support

## Integrations

Next.js Commerce integrates out-of-the-box with BigCommerce and Shopify. We plan to support all major ecommerce backends.

## Considerations

- `framework/commerce` contains all types, helpers and functions to be used as base to build a new **provider**.
- **Providers** live under `framework`'s root folder and they will extend Next.js Commerce types and functionality (`framework/commerce`).
- We have a **Features API** to ensure feature parity between the UI and the Provider. The UI should update accordingly and no extra code should be bundled. All extra configuration for features will live under `features` in `commerce.config.json` and if needed it can also be accessed programatically.
- Each **provider** should add its corresponding `next.config.js` and `commerce.config.json` adding specific data related to the provider. For example in case of BigCommerce, the images CDN and additional API routes.
- **Providers don't depend on anything that's specific to the application they're used in**. They only depend on `framework/commerce`, on their own framework folder and on some dependencies included in `package.json`

## Configuration

### How to change providers

Open `.env.local` and change the value of `COMMERCE_PROVIDER` to the provider you would like to use, then set the environment variables for that provider (use `.env.template` as the base).

The setup for Shopify would look like this for example:

```
COMMERCE_PROVIDER=shopify
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=xxxxxxx.myshopify.com
```

And check that the `tsconfig.json` resolves to the chosen provider:

```
  "@framework": ["framework/shopify"],
  "@framework/*": ["framework/shopify/*"]
```

That's it!

### Features

Every provider defines the features that it supports under `framework/{provider}/commerce.config.json`

#### How to turn Features on and off

> NOTE: The selected provider should support the feature that you are toggling. (This means that you can't turn wishlist on if the provider doesn't support this functionality out the box)

- Open `commerce.config.json`
- You'll see a config file like this:
  ```json
  {
    "features": {
      "wishlist": false
    }
  }
  ```
- Turn wishlist on by setting wishlist to true.
- Run the app and the wishlist functionality should be back on.

### How to create a new provider

Follow our docs for [Adding a new Commerce Provider](framework/commerce/new-provider.md).

If you succeeded building a provider, submit a PR with a valid demo and we'll review it asap.

## Contribute

Our commitment to Open Source can be found [here](https://vercel.com/oss).

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Create a new branch `git checkout -b MY_BRANCH_NAME`
3. Install yarn: `npm install -g yarn`
4. Install the dependencies: `yarn`
5. Duplicate `.env.template` and rename it to `.env.local`
6. Add proper store values to `.env.local`
7. Run `yarn dev` to build and watch for code changes

## Work in progress

We're using Github Projects to keep track of issues in progress and todo's. Here is our [Board](https://github.com/vercel/commerce/projects/1)

People actively working on this project: @okbel & @lfades.

## Troubleshoot

<details>
<summary>I already own a BigCommerce store. What should I do?</summary>
<br>
First thing you do is: <b>set your environment variables</b>
<br>
<br>
.env.local

```sh
BIGCOMMERCE_STOREFRONT_API_URL=<>
BIGCOMMERCE_STOREFRONT_API_TOKEN=<>
BIGCOMMERCE_STORE_API_URL=<>
BIGCOMMERCE_STORE_API_TOKEN=<>
BIGCOMMERCE_STORE_API_CLIENT_ID=<>
BIGCOMMERCE_CHANNEL_ID=<>
```

If your project was started with a "Deploy with Vercel" button, you can use Vercel's CLI to retrieve these credentials.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and Github accounts (creates .vercel file): `vercel link`
3. Download your environment variables: `vercel env pull .env.local`

Next, you're free to customize the starter. More updates coming soon. Stay tuned.

</details>

<details>
<summary>BigCommerce shows a Coming Soon page and requests a Preview Code</summary>
<br>
After Email confirmation, Checkout should be manually enabled through BigCommerce platform. Look for "Review & test your store" section through BigCommerce's dashboard.
<br>
<br>
BigCommerce team has been notified and they plan to add more detailed about this subject.
</details>
