import { RefreshIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import TweetBox from './childComponents/TweetBox'
import {Tweet} from '../typings'
import TweetComponent from './childComponents/TweetComponent';
import toast from 'react-hot-toast';
import { fetchTweets } from '../labels/fetchTweets';

interface Props  {
  tweets: Tweet[];
}

export default function Feed({tweets:tweetsProp}: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);
  const refereshTweets = async()=>{
    const refereshToast = toast.loading('Refereshing...')
    const allTweets = await fetchTweets();
    setTweets(allTweets);
    toast.success('Feed Updated',{
      id: refereshToast
    })
  }

  
  return (
    <div className='md:mx-8 max-h-screen col-span-7 lg:col-span-5 overflow-scroll'>
        <div className='flex items-center justify-between'>
            <h1 className='pb-0 text-xl font-bold'>Home</h1>
            <RefreshIcon onClick={refereshTweets} className='w-8 h-8 mt-5 mr-5 cursor-pointer text-twitter hover:rotate-180 active:scale-125 transition-all duration-500 ease-out'/>
        </div>
        {/* Tweet Box */}
        <TweetBox setTweets={setTweets}/>
        {tweets?.map((tweet,index)=>{         
        return <TweetComponent key={index} tweet={tweet}/>
      })
        }
    </div>
  )
}