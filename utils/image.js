import ImageUrlBuilder from '@sanity/image-url';
import {createClient} from 'next-sanity';

const client = createClient({
  projectId: "fauat7no",
  dataset: "production",
  apiVersion: "2023-10-31",
  useCdn: true
});


function urlForThumbnail(source) {
  return ImageUrlBuilder(client).image(source).width(300).url();
}

function urlFor(source) {
  return ImageUrlBuilder(client).image(source).width(580).url();
}

export { urlFor, urlForThumbnail };