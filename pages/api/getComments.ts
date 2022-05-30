import { groq } from 'next-sanity';
import { NextApiRequest,NextApiResponse } from "next";
import { sanityClient } from '../../Sanity';
import { Comment } from '../../typings';

type Data = {
    TweetComments:Comment[]
}

const fetchComments = groq`
    *[_type == 'comment' && references(*[_type == 'tweet' && _id == $tweetId]._id)] {
        _id,
        ...
    }  | order(_createdAt desc)`

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    const {tweetId} = req.query;
    const TweetComments: Comment[] = await sanityClient.fetch(fetchComments,{
        tweetId,
    })
    res.status(200).json({TweetComments})
}