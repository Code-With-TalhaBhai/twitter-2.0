import { CalendarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, SearchCircleIcon } from '@heroicons/react/outline'
import { useSession,signIn,signOut } from 'next-auth/react';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { fetchTweets } from '../../labels/fetchTweets';
import {TweetBody,Tweet} from '../../typings'

type Props = {
    setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

export default function TweetBox({setTweets}: Props) {
    const {data:session} = useSession();
    const [happening, setHappening] = useState<string>('');
    const [imgBoxOpen, setimgBoxOpen] = useState<boolean>(false);
    const [imageTweet, setImageTweet] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const addImgUrl = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        if(!inputRef.current?.value) return ;

        setImageTweet(inputRef.current.value);
        inputRef.current.value = '';
        setimgBoxOpen(false);
    }

    const postTweet = async()=>{
        if(session){
        const tweetBody : TweetBody = {
            tweet: happening,
            username: session?.user?.name || 'Userknown User',
            mainImage: session?.user?.image || 'https://links.papareact.com/gll',
            tweetImage: imageTweet
        }
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addTweets`,{
            body: JSON.stringify(tweetBody),
            method: 'POST'
        })
        const json = await result.json();
        // console.log(tweetBody);

        // By me;
        const newTweets = await fetchTweets();
        setTweets(newTweets);
        toast("Tweet Posted",{
        icon:"🚀"}
        )
        return json;
        }
        else{
            toast("You need to login to post Tweet",
            {icon:"🎇"});
          }
    }

    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        postTweet();
        setImageTweet('');
        setHappening('')
        setimgBoxOpen(false);
    }
    
  return (
    <div className='flex'>
        <img
         className='mt-4 w-14 h-14 object-cover rounded-full'
         src= {session?.user?.image || "https://links.papareact.com/gll"} alt=""
        />
        {/* <div className='flex items-center flex-1 pl-2'> */}
        <div className='flex flex-col flex-1 pl-2'>
        <form className='flex flex-col flex-1'>
            <div>
                <input className='h-24 text-xl w-full outline-none placeholder:text-xl' value={happening} onChange={e=>setHappening(e.target.value)} type="text" placeholder="What's Happening?" />
            </div>
            <div className='flex items-center'>
            <div className='widg flex items-center flex-1 space-x-2 text-twitter'>
                <PhotographIcon onClick={()=>setimgBoxOpen(!imgBoxOpen)}/>
                <SearchCircleIcon/>
                <EmojiHappyIcon/>
                <CalendarIcon/>
                <LocationMarkerIcon/>
            </div>
            <button onClick={handleSubmit} disabled={(!happening && !imageTweet) || !session} className='bg-twitter cursor-pointer text-white font-bold rounded-full px-5 py-2 disabled:opacity-40'>Tweet</button>
            </div>
        </form>
        {imgBoxOpen &&
        <form className='flex justify-between rounded-lg bg-twitter/80 px-4 mt-4 py-2'>
            <input className='p-2 bg-transparent outline-none text-white placeholder:text-white font-medium' ref={inputRef} type="text" placeholder='Enter Image URL...' />
            <button type='submit' onClick={addImgUrl} className='text-white font-bold'>Add Image</button>
        </form>
        }
        {imageTweet && 
        <div className='w-full flex justify-center mt-4'>
        <img src={imageTweet} width="50%" alt="" />
        </div>}
        </div>
    </div>
  )
}