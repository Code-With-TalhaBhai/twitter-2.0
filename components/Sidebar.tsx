import { useSession, signIn, signOut } from 'next-auth/react';
import React from 'react'
import {BellIcon, BookmarkIcon, CollectionIcon, DotsCircleHorizontalIcon, HashtagIcon, HomeIcon, MailIcon, UserIcon} from '@heroicons/react/outline';
import SidebarRow from './childComponents/SidebarRow';

type Props = {}

export default function Sidebar({}: Props) {
  const {data:session} = useSession();
  return (
    <div className='sidebar col-span-2 flex flex-col items-center border-r md:items-start px-4'>
        <img className='w-10 h-10 m-3' src="https://links.papareact.com/drq" alt="" />
        <SidebarRow title="Home" Icon={HomeIcon}/>
        <SidebarRow title="Explore" Icon={HashtagIcon}/>
        <SidebarRow title="Notification" Icon={BellIcon}/>
        <SidebarRow title="Messages" Icon={MailIcon}/>
        <SidebarRow title="Bookmarks" Icon={BookmarkIcon}/>
        <SidebarRow title="Lists" Icon={CollectionIcon}/>
        {/* <SidebarRow onClick={()=>session? `${console.log('Log Out')}` : `${console.log('Sign in')}`} title={session?"Log Out":"Sign In"} Icon={UserIcon}/> */}
        <SidebarRow onClick={()=>session? signOut() : signIn()} title={session?"Log Out":"Sign In"} Icon={UserIcon}/>
        {/* <SidebarRow onClick={()=>session? `${console.log(process.env.GITHUB_CLIENT_ID)}` : `${console.log('not working man',process.env.GITHUB_CLIENT_SECRET)}`} title={session?"Log Out":"Sign In"} Icon={UserIcon}/> */}
        {/* <SidebarRow onClick={()=>session? `${console.log(signOut())}` : `${console.log(signIn())}`} title={session?"Log Out":"Sign In"} Icon={UserIcon}/> */}
        <SidebarRow title="More" Icon={DotsCircleHorizontalIcon}/>
    </div>
  )
}