import {
  IconBrandRecognition,
  IconDetailedRecords,
  IconFullyCustomizable,
} from '@/assets/img'

const ENDPOINT_SHORTENING_URL = import.meta.env.VITE_ENDPOINT_SHORTENING_URL
const PROXY_URL = import.meta.env.VITE_PROXY_URL
const API_KEY_SHORTENING_URL = import.meta.env.VITE_API_KEY_SHORTENING_URL
const BASE_SHORTENING_URL = `${PROXY_URL}${ENDPOINT_SHORTENING_URL}`

const NAV_LINKS = [
  { href: '#feature', label: 'Feature' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#resources', label: 'Resources' },
]

const DATA_FEATURES = [
  {
    icon: IconBrandRecognition,
    title: 'Brand Recognition',
    text: 'Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.',
  },
  {
    icon: IconDetailedRecords,
    title: 'Detailed Records',
    text: 'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.',
  },
  {
    icon: IconFullyCustomizable,
    title: 'Fully Customizable',
    text: 'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
  },
]

const FOOTER_LINKS = [
  {
    title: 'Features',
    links: [
      { label: 'Link Shortening', href: '#' },
      { label: 'Branded Links', href: '#' },
      { label: 'Analytics', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Developers', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Our Team', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
]

const SOCIAL_LINKS = [
  {
    icon: 'ri:facebook-circle-fill',
    href: '#',
  },
  {
    icon: 'ri:twitter-x-fill',
    href: '#',
  },
  {
    icon: 'ri:pinterest-fill',
    href: '#',
  },
  {
    icon: 'ri:instagram-fill',
    href: '#',
  },
]

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

export {
  BASE_SHORTENING_URL,
  API_KEY_SHORTENING_URL,
  NAV_LINKS,
  DATA_FEATURES,
  FOOTER_LINKS,
  SOCIAL_LINKS,
  URL_REGEX,
}
