import React from 'react'

interface Props {
    title: String;
    Icon: (props: React.ComponentProps<'svg'>)=> JSX.Element;
    // onClick?: (event: React.MouseEventHandler<HTMLButtonElement>)=>void
    onClick?: ()=>{}
}

export default function SidebarRow({title,Icon,onClick}: Props) {
  return (
    <div onClick={() => onClick?.()} className='flex items-center max-w-fit space-x-2 rounded-full cusor-pointer px-4 py-3 transition-all duration-200 hover:bg-gray-100 group'>
        <Icon className='w-6 h-6'/>
        <div className='group-hover:text-twitter text-base hidden md:inline-flex lg:text-xl'>{title}</div>
    </div>
  )
}