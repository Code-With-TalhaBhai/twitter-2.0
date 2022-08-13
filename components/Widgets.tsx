import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

type Props = {}

export default function Widgets({}: Props) {
  return (
    <div className='mt-2 px-2 col-span-2 hidden lg:inline'>
        <div className='mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3'>
            <SearchIcon className='w-5 h-5 text-gray-400'/>
            <input type="text"
            placeholder='Search Twitter'
            className='flex-1 outline-none bg-transparent'
            />
        </div>

        <TwitterTimelineEmbed
            sourceType="profile"
            // screenName="saurabhnemade"
            screenName="elonmusk"
            options={{height: 1400}}
            />
    </div>
  )
}