import {
  IconBrandRecognition,
  IconDetailedRecords,
  IconFullyCustomizable,
} from '@/assets/img'

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

export { NAV_LINKS, DATA_FEATURES }
