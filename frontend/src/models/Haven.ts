import Address from 'types/scalars/Address'

export default interface Haven {
	address: Address
	ownerAddress: Address
	name: string
	description: string
	tags: string[]
	subscribers: Address[]
}
