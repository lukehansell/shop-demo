import { getAllProducts, getProduct } from "../../lib/content"

const ProductPage = ({ product }) => {
  console.log(product)
  return (
    <>
      <h1>{product.name}</h1>
      <span>£{product.price}</span>
      <button className="snipcart-add-item"
        data-item-id={product.slug}
        data-item-price={product.price}
        data-item-url={`/products/${product.slug}`}
        data-item-name={product.name}
        >Add to cart</button>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const product = await getProduct(params.slug)
  return {
    props: {
      product
    }
  }
}

export const getStaticPaths = async () => {
  const products = await getAllProducts()
  const paths = products.map(product => ({ params: { slug: product.slug } }))

  return {
    paths,
    fallback: false
  }
}

export default ProductPage
