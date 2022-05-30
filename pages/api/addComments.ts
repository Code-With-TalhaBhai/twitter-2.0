// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CommentBody, Tweet,TweetBody } from './../../typings';

type Data = {
  message: String; 
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  // res: NextApiResponse
)
{
  const commentData: CommentBody = JSON.parse(req.body);
  const mutations = {
      "mutations":[
          {
              "create": {
                  _type: "comment",
                  comment: commentData.comment,
                  username:commentData.username,
                  image: commentData.image,
                  tweet:{
                      _ref: commentData.tweet._ref, 
                      _type: "reference"
                  }
              }
          }
      ]
    }

  // const apiEndPoints = `https://<project-id>.api.sanity.io/v2021-06-07/data/mutate/<dataset-name>`
  const apiEndPoints = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`

    const result = await fetch(apiEndPoints,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`
        },
        body: JSON.stringify(mutations),
        method: 'POST'
    })

    const json = await result.json();

  res.status(200).json({ message: "Added! " })
}
