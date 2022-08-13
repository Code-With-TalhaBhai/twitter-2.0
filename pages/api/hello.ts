import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
    Next: String; 
    Pure: String
}



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    res.status(200).json({Next:`${process.env.NEXT_PUBLIC_VERCEL_URL}`,Pure:`${process.env.VERCEL_URL}`})
  }
  