import Link from 'next/link'
import { getAllProducts } from "../lib/content"

const HomePage = ({ preview, allProducts }) => {
  return (
    <ul>
      {allProducts.map(({ name, price, slug }) => (
        <li>
          <Link href={`products/${slug}`}>
            <a>
              <h2>{name}</h2>
              <span>£{price}</span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const getStaticProps = async ({ preview = false, previewData }) => {
  const allProducts = await getAllProducts()
  return {
    props: { preview, allProducts }
  }
}

export default HomePage
