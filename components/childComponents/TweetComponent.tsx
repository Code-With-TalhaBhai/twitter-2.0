import { ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon, UploadIcon } from '@heroicons/react/outline'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { fetchComments } from '../../labels/fetchComments'
// import ReactTimeAgo from 'react-time-ago'
import { Comment, CommentBody, Tweet } from '../../typings'

interface Props {
    tweet: Tweet
}

export default function TweetComponent({tweet}: Props) {
  const {data:session} = useSession();
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    postComment();
    setcommentBoxOpen(false);
    setInput('');
  };
  const postComment = async()=>{
    if(session){
    const commentBody:CommentBody = {
      comment: input,
      username: 
      session?.user?.name ||
       '',
      image:
       session?.user?.image || 
      '',
      tweet :{
        _ref: tweet._id,
        _type: 'reference'
      }
    }
    const result = await fetch('/api/addComments',{
      body: JSON.stringify(commentBody),
      method: 'POST'
    });
    const json = await result.json();
    toast("Comment Added",{
      icon: "🚀"
    });
    setComments(await fetchComments(tweet._id));
  }
  else{
    toast("You need to login to add Comment",
    {icon:"🎇"});
  }
  }

  const [input, setInput] = useState<string>('')
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxOpen, setcommentBoxOpen] = useState<boolean>(false);
  const refereshComment = async()=>{
    const comment = await fetchComments(tweet._id);
    setComments(comment);
    console.log(comments)
  }

  useEffect(() => {
    refereshComment();
  }, [])
  
  

  return (
    <div className='flex flex-col my-4 p-5 border-y'>
    <div className='flex items-center space-x-3'>
        <img src={tweet.mainImage}
         className="w-10 h-10 rounded-full object-cover object-center"
         alt="Anonymous User" />
          <div className='flex items-center space-x-1'>
        <p className='font-bold'>{tweet.username}</p>
        <p className='hidden text-sm sm:inline'>@{tweet.username.replace(/\s/g, '').toLowerCase()}</p> 
        <p
        className='text-sm text-gray-500 pl-2'>
         {moment(tweet._createdAt).fromNow()}
         </p> 
          </div>
    </div>

    <div>
          <p className='py-1'>{tweet.tweet}</p>
          <div className='flex items-center justify-end'>
          {
            tweet.tweetImage && <img className='m-5 mr-0 w-full max-h-80 mb-1 border-2 rounded-lg object-cover shadow-sm' src={tweet.tweetImage} alt="" />
          }
          </div>
        </div>     

        <div className='flex justify-between items-end user-section'>
          <div onClick={()=>setcommentBoxOpen(!commentBoxOpen)}>
            <ChatAlt2Icon className="w-5 h-5"/>
            <p>{comments.length}</p>
          </div>

          <div>
            <SwitchHorizontalIcon className="w-5 h-5"/>
            <p></p>
          </div>

          <div>
            <HeartIcon className="w-5 h-5"/>
            <p>3</p>
          </div>

          <div>
            <UploadIcon className="w-5 h-5"/>
            <p>3</p>
          </div>

        </div>

        {commentBoxOpen &&
        <form onSubmit={handleSubmit} className='mt-3 flex space-x-3'>
          <input onChange={e=>setInput(e.target.value)} className='flex-1 rounded-lg bg-gray-100 p-2 outline-none' type="text" placeholder='Write a comment...' />
          {/* <button type='submit' disabled={!input} className='text-twitter disabled:text-gray-200'>Post</button> */}
          <button disabled={!input} className='text-twitter disabled:text-gray-200'>Post</button>
        </form>
        }

          {/* Comment Section */}
          {comments?.length > 0 && (
            <div className='mt-3 max-h-44 overflow-y-auto'>
              {
                comments.map((comment,index)=>(
                  <div className='px-5 py-2' key={index}>
                    <div className='flex items-center space-x-3 relative'>
                    <img className='w-8 h-8 rounded-full object-cover' src={comment.image} alt="" />
                    {!(index+1 === comments.length) &&
                    <hr className='absolute left-1 top-10 h-8 text-twitter/30 border-x'/>
                    }
                    <div>
                    <div className='flex items-center space-x-2'>
                      <p className='font-bold'>{comment.username}</p>
                      {/* <p className='hidden sm:inline text-sm md:text-xs  text-gray-700'>@{comment.username.replace(/\s+/g,'').toLowerCase()}</p> */}
                      <p className='text-gray-500'>
                      {moment(comment._createdAt).fromNow()}
                      </p>
                    </div>
                    <p>{comment.comment}</p>
                  </div>
                  </div>
                  </div>
                ))
              }
            </div>
          )}
          
    </div>
  )
} 