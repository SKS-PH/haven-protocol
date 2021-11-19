import { expect } from 'chai'
import { ethers, waffle } from 'hardhat'
import { Haven, HavenProtocol, HavenToken } from '../typechain'
const parseEther = ethers.utils.parseEther

describe('HavenProtocol', () => {
	let havenProtocol: HavenProtocol
	let havenProtocolAsSigner1: HavenProtocol
	let havenToken: HavenToken
	let havenTokenAsSigner1: HavenToken
	let havenToSubscribeTo: Haven

	beforeEach(async () => {
		const [deployer , signer1] = await ethers.getSigners()
		const HavenProtocol = await ethers.getContractFactory('HavenProtocol')
		const HavenToken = await ethers.getContractFactory('HavenToken')
		havenToken = await HavenToken.deploy(parseEther('1000000000'), [])
		havenProtocol = await HavenProtocol.deploy(havenToken.address, 450) // 4.5%
		await havenProtocol.deployed()
		havenProtocolAsSigner1 = havenProtocol.connect(signer1)
		await havenToken.transfer(signer1.address, parseEther('100'))
		havenTokenAsSigner1 = havenToken.connect(signer1)
		const Haven = await ethers.getContractFactory('Haven')

		const createHavenTx = await havenProtocol.createHaven(parseEther('10'))
		await createHavenTx.wait()

		const havenToSubscribeToAddr = await havenProtocol.ownerToHavens(deployer.address, 0)
		havenToSubscribeTo = Haven.attach(havenToSubscribeToAddr)
	})
	it('Should prevent receiving of haven tokens outside of subscribe()', async () => {
		await expect(havenTokenAsSigner1.send(havenProtocol.address, parseEther('10'), [])).to.be.revertedWith('Please don\'t send your haven tokens here')
	})
	describe('#createHaven()', () => {
		it('Should emit created haven with caller as owner', async () => {
			const [signer0] = await ethers.getSigners()
			const Haven = await ethers.getContractFactory('Haven')
			const createHavenTx = await havenProtocol.createHaven(parseEther('10'))
			await createHavenTx.wait()

			const newHavenAddr = await havenProtocol.ownerToHavens(signer0.address, 1)
			expect(newHavenAddr).is.not.equal(0)

			await expect(createHavenTx)
				.to.emit(havenProtocol, 'HavenCreated')
				.withArgs(signer0.address, newHavenAddr)

			const newHaven = Haven.attach(newHavenAddr)
			expect(await newHaven.owner()).to.equal(signer0.address)
		})
	})
	describe('#subscribe()', async () => {
		it('Should subscribe user and emit a subscribe event', async () => {
			const [, signer1] = await ethers.getSigners()
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			const subscribeTx = await havenProtocolAsSigner1.subscribe(havenToSubscribeTo.address)
			await subscribeTx.wait()

			await expect(subscribeTx)
				.to.emit(havenProtocol, 'UserSubscribed')
				.withArgs(havenToSubscribeTo.address, signer1.address, parseEther('10'))

			const [isSubscribedToHaven] = await havenProtocol.havenToSubscriber(havenToSubscribeTo.address, signer1.address)
			expect(isSubscribedToHaven).to.be.true
		})
		it('Should revert when user is already subscribed', async () => {
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			const subscribeTx = await havenProtocolAsSigner1.subscribe(havenToSubscribeTo.address)

			await subscribeTx.wait()

			await expect(havenProtocolAsSigner1.subscribe(havenToSubscribeTo.address)).to.be.revertedWith('You are already subscribed!')
		})
		it('Should revert when user\'s haven balance is not enough otherwise ok', async () => {
			const [, , signer2, signer3] = await ethers.getSigners()
			await havenToken.transfer(signer2.address, parseEther('9'))
			await havenToken.transfer(signer3.address, parseEther('11'))
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			await havenToken.connect(signer2).authorizeOperator(havenProtocol.address)
			await havenToken.connect(signer3).authorizeOperator(havenProtocol.address)

			await expect(havenProtocol.connect(signer2).subscribe(havenToSubscribeTo.address)).to.be.revertedWith('Insufficient haven token balance!')
			expect(havenProtocolAsSigner1.subscribe(havenToSubscribeTo.address)).to.be.ok
			expect(havenProtocol.connect(signer3).subscribe(havenToSubscribeTo.address)).to.be.ok
		})
		it('Should revert when address isn\'t a haven address otherwise ok', async () => {
			const [, , someNonHavenAddress] = await ethers.getSigners()

			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)

			await expect(havenProtocolAsSigner1.subscribe( someNonHavenAddress.address)).to.be.revertedWith('Invalid haven address!')
			expect(havenProtocolAsSigner1.subscribe(havenToSubscribeTo.address)).to.be.ok
		})
		it('Should transfer protocol commission to protocol address, remaining sub fee to haven owner address', async () => {
			const [havenOwner] = await ethers.getSigners()

			const subFee = await havenToSubscribeTo.subscriptionFee()
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			const protocolFee = subFee.mul(await havenProtocol.protocolFeeBasisPoints()).div(10000) // 4.5% of subFee
			const expectedProtocolBalance = protocolFee // protocol fee + user balance after sub fee
			const expectedHavenOwnerBalance = subFee.sub(protocolFee) // haven owner gets rest of sub fee
			await expect(() => havenProtocolAsSigner1.subscribe(havenToSubscribeTo.address))
				.to.changeTokenBalances(havenToken, [havenProtocol, havenOwner], [expectedProtocolBalance, expectedHavenOwnerBalance])
			
		})
		it('Should revert if haven protocol isnt an erc777 operator of user', async () => {
			await expect(havenProtocolAsSigner1.subscribe(havenToSubscribeTo.address))
				.to.be.revertedWith('Haven Protocol is not an authorized operator!')
		})
	})
	describe('#unsubscribe()', async () => {
		it('Should unsubscribe user and emit unsubscribe event', async () => {
			const [, signer1] = await ethers.getSigners()
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			const subTx = await havenProtocolAsSigner1.subscribe(havenToSubscribeTo.address)
			await subTx.wait()

			await expect(havenProtocolAsSigner1.unsubscribe(havenToSubscribeTo.address))
				.to.emit(havenProtocol, 'UserUnsubscribed')
				.withArgs(havenToSubscribeTo.address, signer1.address)

			const [isSubscribed] = await havenProtocol.havenToSubscriber(havenToSubscribeTo.address, signer1.address)
			expect(isSubscribed).to.be.false
		})
	})
})
