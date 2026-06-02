import { Factory } from 'fishery'
import { faker } from '@faker-js/faker'

const userFactory = Factory.define(({ sequence }) => ({
  id: `user-${sequence}`,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(['user', 'admin']),
}))

export function generateUser(overrides = {}) {
  return userFactory.build(overrides)
}

export function generateUserList(count = 3) {
  return userFactory.buildList(count)
}
