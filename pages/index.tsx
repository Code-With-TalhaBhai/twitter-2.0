import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { fetchTweets } from '../labels/fetchTweets'
import styles from '../styles/Home.module.css'
import { Tweet } from '../typings'

interface Props {
  tweets: Tweet[];
}

// const Home = () => {
const Home = ({tweets}:Props) => {
  console.log(tweets)
  return (
    <div className='mx-auto max-h-screen overflow-hidden lg:max-w-6xl'>
      <Head>
        <title>Twitter 2.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster/>
      <main className='grid grid-cols-9'>
        <Sidebar/>
        <Feed tweets={tweets} />
        <Widgets/>
      </main>
    </div>
  )
}

export default Home


export const getServerSideProps : GetServerSideProps = async()=>{
  const tweets = await fetchTweets();
  return {
    props: {
      tweets,
    }
  }
}
