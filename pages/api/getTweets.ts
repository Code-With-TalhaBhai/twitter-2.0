// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity';
import {sanityClient} from '../../Sanity';
import { Tweet } from './../../typings';

type Data = {
  AllTweets: Tweet[]; 
}

const fetchTweets = groq`
*[_type == 'tweet' && !blockTweet] {
  _id,
  ...
}  | order(_createdAt desc)
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const AllTweets: Tweet[] = await sanityClient.fetch(fetchTweets);
  res.status(200).json({ AllTweets })
}
