import { Factory } from 'fishery'
import { faker } from '@faker-js/faker'

const managementLinkFactory = Factory.define(({ sequence }) => ({
  id: sequence.toString(),
  originalUrl: faker.internet.url(),
  shortUrl: `https://short.ly/${faker.string.alphanumeric(6)}`,
  createdAt: faker.date.recent().toISOString(),
  clicks: faker.number.int({ min: 0, max: 9999 }),
  status: faker.helpers.arrayElement(['active', 'inactive', 'expired']),
}))

const shortenerLinkFactory = Factory.define(({ sequence }) => ({
  url: faker.internet.url(),
  urlShortened: `https://short.ly/${faker.string.alphanumeric(6)}`,
}))

export function generateLink(overrides = {}) {
  return managementLinkFactory.build(overrides)
}

export function generateLinkList(count = 3) {
  return managementLinkFactory.buildList(count)
}

export function generateShortenerLink(overrides = {}) {
  return shortenerLinkFactory.build(overrides)
}

export function generateShortenerLinkList(count = 3) {
  return shortenerLinkFactory.buildList(count)
}
