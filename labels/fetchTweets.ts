import { Tweet } from "../typings";

export const fetchTweets = async()=>{
    const data = await fetch(`${process.env.VERCEL_URL}/api/getTweets`);
    console.log(data)
    const res = await data.json()
    const tweets:Tweet[] = res.AllTweets;
    return tweets
}