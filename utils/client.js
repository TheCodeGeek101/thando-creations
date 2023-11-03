import {createClient} from "next-sanity";

const client = createClient({
  projectId: "fauat7no",
  dataset: "production",
  apiVersion: "2023-10-30",
  useCdn: true
});

export default client;