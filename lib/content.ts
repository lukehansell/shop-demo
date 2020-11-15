import Prismic from 'prismic-javascript'

const REPOSITORY = process.env.CONTENT_REPO_NAME
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`

export const API_TOKEN = process.env.CONTENT_KEY
export const API_LOCALE = 'en/GB'

export const Client = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN
})

const fetchApi = async (query, { previewData, variables } = {}) => {
  const prismicAPI = await Client.getApi()
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        'Prismic-Ref': previewData?.ref || prismicAPI.masterRef.ref,
        'Content-Type': 'application/json',
        'Accept-Language': API_LOCALE,
        Authorization: `Token ${API_TOKEN}`
      }
    }
  )

  if (res.status !== 200) {
    console.log(await res.text())
    throw new Error('Failed to fetch API')
  }

  const json = await res.json()
  if (json.errors) {
    console.log(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getAllProducts() {
  const data = await fetchApi(`
    {
      allProducts {
        edges {
          node {
            name
            price
            _meta {
              uid
            }
          }
        }
      }
    }
  `)

  return data?.allProducts?.edges.map(({ node: { name, price, _meta: { uid: slug } } }) => {
    return {
      name,
      price,
      slug
    }
  }) || []
}

export async function getProduct(uid) {
  const data = await fetchApi(`
    query getProduct ($uid: String!, $lang: String!) {
      product (uid: $uid, lang: $lang) {
        name
        price
        _meta {
          uid
        }
      }
    }
  `, {
    previewData: null,
    variables: {
      uid,
      lang: 'en-gb'
    }
  })

  const { name, price, _meta: { uid: slug }} = data?.product

  return {
    name,
    price,
    slug
  }
}