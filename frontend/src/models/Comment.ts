import Address from 'types/scalars/Address'

export default interface Comment {
	id: string
	userAddress: Address
	message: string
	likesAddresses: Address[]
}
