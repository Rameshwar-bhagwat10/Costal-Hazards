import { SocialPost } from '@/types/social'

export const dummySocialPosts: SocialPost[] = [
  {
    id: '1',
    url: 'https://twitter.com/example/status/123',
    platform: 'twitter',
    content: 'Heavy flooding reported at Marine Drive, Mumbai! Water levels rising rapidly. Stay safe everyone! #MumbaiRains #CoastalAlert',
    author: '@MumbaiCoastWatch',
    timestamp: new Date().toISOString(),
    verified: true,
    credibility: 'high',
  },
  {
    id: '2',
    url: 'https://facebook.com/post/456',
    platform: 'facebook',
    content: 'Unusual wave patterns observed at Calangute Beach, Goa. Lifeguards on alert.',
    author: 'Goa Beach Safety',
    timestamp: new Date().toISOString(),
    verified: false,
    credibility: 'medium',
  },
  {
    id: '3',
    url: 'https://twitter.com/example/status/789',
    platform: 'twitter',
    content: 'IMD issues cyclone warning for Tamil Nadu coast. Fishermen advised not to venture into sea for next 48 hours. #CycloneAlert #ChennaiWeather',
    author: '@ChennaiMetro',
    timestamp: new Date().toISOString(),
    verified: true,
    credibility: 'high',
  },
]
