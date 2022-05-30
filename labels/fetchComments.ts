import { Comment } from "../typings";


export const fetchComments = async(tweetId:string)=>{
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments?tweetId=${tweetId}`)
  const res = await data.json();
  const comment : Comment[] = res.TweetComments;
  return comment;
}