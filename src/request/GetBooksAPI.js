import axios from 'axios'

export default async function fetchContentApi (uri) {
 
  const endpoint = `https://www.googleapis.com/books/v1/volumes/`

  try {
    const response = await axios.get(endpoint)
    return { data: response.data }
  } catch (err) {
    const error = {
      statusCode: err.response.status,
      message: err.response.data
    }

    return { error }
  }

}