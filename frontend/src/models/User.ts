import Address from 'types/scalars/Address'

export default interface User {
	subscriptions: Address[]
	nickname: string
}
