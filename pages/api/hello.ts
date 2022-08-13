import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
    message: String; 
}



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    res.status(200).json({message:`${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`})
  }
  