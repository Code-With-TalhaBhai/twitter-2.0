export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'tweet',
      title: 'Text in Tweet',
      type: 'string',
    },
    {
      name: 'blockTweet',
      title: 'Block Tweeet',
      description: 'ADMIN CONTROLS: Toggle if tweet is demanded inappropriate',
      type: 'boolean',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'mainImage',
      title: 'Profile Image',
      type: 'string',
    },
    {
      name: 'tweetImage',
      title: 'Tweet Image',
      type: 'string',
    },
  ]    
}
