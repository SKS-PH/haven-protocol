
import { BigNumber } from '@ethersproject/bignumber'
import { expect } from 'chai'
import { ethers, network, waffle } from 'hardhat'
import { Haven, HavenProtocol, HavenToken } from '../typechain'
const parseEther = ethers.utils.parseEther
const abiCoder = ethers.utils.defaultAbiCoder

describe('HavenProtocol', () => {
	let havenProtocol: HavenProtocol
	let havenProtocolAsSigner1: HavenProtocol
	let havenToken: HavenToken
	let havenTokenAsSigner1: HavenToken

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

			expect( (await havenProtocol.havens(0)).owner).to.equal(signer0.address)
		})
	})
	describe('#subscribe()', async () => {
		it('Should subscribe user and emit a subscribe event', async () => {
			const [, signer1] = await ethers.getSigners()
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			const subscribeTx = await havenProtocolAsSigner1.subscribe(0)
			await subscribeTx.wait()

			await expect(subscribeTx)
				.to.emit(havenProtocol, 'UserSubscribed')
				.withArgs(0, signer1.address, parseEther('10'))

			const id = await havenProtocol.havenToSubscriptionId(0, signer1.address)
			expect(id).to.be.equal(0)
			const [,haven, subscriber] = await havenProtocol.subscriptions(0)
			expect(subscriber).to.be.equal(signer1.address)
			expect(haven).to.be.equal(0)
			expect(await havenProtocol.havenToSubscriptionStatus(0, signer1.address)).to.be.true

		})
		it('Should revert when user is already subscribed', async () => {
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			const subscribeTx = await havenProtocolAsSigner1.subscribe(0)

			await subscribeTx.wait()

			await expect(havenProtocolAsSigner1.subscribe(0)).to.be.revertedWith('You are already subscribed!')
		})
		it('Should revert when user\'s haven balance is not enough otherwise ok', async () => {
			const [, , signer2, signer3] = await ethers.getSigners()
			await havenToken.transfer(signer2.address, parseEther('9'))
			await havenToken.transfer(signer3.address, parseEther('11'))
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			await havenToken.connect(signer2).authorizeOperator(havenProtocol.address)
			await havenToken.connect(signer3).authorizeOperator(havenProtocol.address)

			await expect(havenProtocol.connect(signer2).subscribe(0)).to.be.revertedWith('Insufficient haven token balance!')
			expect(havenProtocolAsSigner1.subscribe(0)).to.be.ok
			expect(havenProtocol.connect(signer3).subscribe(0)).to.be.ok
		})
		it('Should revert when address isn\'t a haven address otherwise ok', async () => {
			const [, , someNonHavenAddress] = await ethers.getSigners()

			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)

			await expect(havenProtocolAsSigner1.subscribe( someNonHavenAddress.address)).to.be.revertedWith('Invalid haven address!')
			expect(havenProtocolAsSigner1.subscribe(0)).to.be.ok
		})
		it('Should transfer protocol commission to protocol address, remaining sub fee to haven owner address', async () => {
			const [havenOwner] = await ethers.getSigners()

			const subFee = await (await (havenProtocol.havens(0))).subscriptionFee
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			const protocolFee = subFee.mul(await havenProtocol.protocolFeeBasisPoints()).div(10000) // 4.5% of subFee
			const expectedProtocolBalance = protocolFee // protocol fee + user balance after sub fee
			const expectedHavenOwnerBalance = subFee.sub(protocolFee) // haven owner gets rest of sub fee
			await expect(() => havenProtocolAsSigner1.subscribe(0))
				.to.changeTokenBalances(havenToken, [havenProtocol, havenOwner], [expectedProtocolBalance, expectedHavenOwnerBalance])
			
		})
		it('Should revert if haven protocol isnt an erc777 operator of user', async () => {
			await expect(havenProtocolAsSigner1.subscribe(0))
				.to.be.revertedWith('Haven Protocol is not an authorized operator!')
		})
	})
	describe('#unsubscribe()', async () => {
		it('Should unsubscribe user and emit unsubscribe event', async () => {
			const [, signer1] = await ethers.getSigners()
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			const subTx = await havenProtocolAsSigner1.subscribe(0)
			await subTx.wait()

			await expect(havenProtocolAsSigner1.unsubscribe(0))
				.to.emit(havenProtocol, 'UserUnsubscribed')
				.withArgs(0, signer1.address)

			expect(await havenProtocol.havenToSubscriptionStatus(0, signer1.address)).to.be.false
		})
	})
	describe('#checkUpkeep()', async () => {
		it('Should only return haven subscriptions that should be renewed', async () => {
			const [, , signer2, signer3] = await ethers.getSigners()
			const subDuration = 30 * 86400 // 30 days
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			await havenToken.connect(signer2).authorizeOperator(havenProtocol.address)
			await havenToken.connect(signer3).authorizeOperator(havenProtocol.address)
			await havenToken.transfer(signer2.address, parseEther('100'))
			await havenToken.transfer(signer3.address, parseEther('100'))
			await havenProtocolAsSigner1.subscribe(0)
			await havenProtocol.connect(signer2).subscribe(0)
			// advance block time by only 15 days
			await network.provider.send('evm_increaseTime', [subDuration / 2])
			await network.provider.send('evm_mine')

			await havenProtocol.connect(signer3).subscribe(0)

			// expect upkeep not needed and empty array
			let checkUpkeepResponse = await havenProtocol.checkUpkeep([])
			expect(checkUpkeepResponse.upkeepNeeded).to.be.false
			let actualDecodedData = abiCoder.decode(['uint256[]'], checkUpkeepResponse.performData)[0]
			expect(actualDecodedData).to.be.empty

			// advance block time by another 15 days
			await network.provider.send('evm_increaseTime', [subDuration / 2])
			await network.provider.send('evm_mine')

			// expect third subscription to be excluded
			const expectedDecodedData = [BigNumber.from(0), BigNumber.from(1)]

			checkUpkeepResponse = await havenProtocol.checkUpkeep([])
			expect(checkUpkeepResponse.upkeepNeeded).to.be.true
			actualDecodedData = abiCoder.decode(['uint256[]'], checkUpkeepResponse.performData)[0]
			
			expect(actualDecodedData).to.deep.equal(expectedDecodedData)
		})
	})
	describe('#performUpkeep()', async () => {
		it('Should renew subscriptions and revoke access if unbillable', async () => {
			const [, signer1 ,signer2] = await ethers.getSigners()
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			await havenToken.connect(signer2).authorizeOperator(havenProtocol.address)
			await havenToken.transfer(signer2.address, parseEther('19')) // unbillable user
			await havenProtocolAsSigner1.subscribe(0)
			await havenProtocol.connect(signer2).subscribe(0)
			await network.provider.send('evm_increaseTime', [30 * 86400])
			await network.provider.send('evm_mine')

			const performData = abiCoder.encode(['uint256[]'], [[BigNumber.from(0), BigNumber.from(1)]])
			
			await expect(() => havenProtocol.performUpkeep(performData))
				.to.changeTokenBalances(havenToken, [signer1, signer2], [parseEther('-10'), 0])
			
			const signer1Sub = await havenProtocol.subscriptions(0)
			const signer1IsSubscribed = await havenProtocol.havenToSubscriptionStatus(0,signer1.address)
			expect(signer1IsSubscribed).to.be.true
			expect(signer1Sub.lastRenewalTimestamp.gt(signer1Sub.initialSubTimestamp))
			const signer2Sub = await havenProtocol.subscriptions(1)
			const signer2IsSubscribed = await havenProtocol.havenToSubscriptionStatus(0, signer2.address)
			expect(signer2IsSubscribed).to.be.false
			expect(signer2Sub.lastRenewalTimestamp.eq(signer2Sub.lastRenewalTimestamp))
		})

		it('Should revert if any subscription passed doesn\'t need renewal', async () => {
			const [, signer1, signer2] = await ethers.getSigners()
			await havenTokenAsSigner1.authorizeOperator(havenProtocol.address)
			await havenToken.connect(signer2).authorizeOperator(havenProtocol.address)
			await havenToken.transfer(signer2.address, parseEther('19')) // unbillable user
			await havenProtocolAsSigner1.subscribe(0)
			await havenProtocol.connect(signer2).subscribe(0)

			const performData = abiCoder.encode(['uint256[]'], [[BigNumber.from(0), BigNumber.from(1)]])
			await expect(havenProtocol.performUpkeep(performData)).to.be.revertedWith('Subscription not yet expired!')
		})
	})

	describe('#post()', async () => {
		it('Should emit created post', async () => {
			const postUri = 'some://posturi'
			const postTx = await havenProtocol.post(0, postUri)
			const receipt = await postTx.wait()
			const currentBlock = await waffle.provider.getBlock(receipt.blockNumber)
		
			await expect(postTx)
				.to.emit(havenProtocol, 'PostCreated')
				.withArgs(0, postUri, currentBlock.timestamp)

			expect((await havenProtocol.posts(0, 0)).post_uri).to.equal(postUri)
		})
		it('Should allow only haven owner otherwise revert', async () => {
			const [ _, signer1 ] = await ethers.getSigners()
			const postUri = 'some://posturi'
			const postTx = await havenProtocol.post(0, postUri)
			await postTx.wait()

			expect((await havenProtocol.posts(0, 0)).post_uri).to.equal(postUri)

			await expect(havenProtocol.connect(signer1).post(0, postUri)).to.be.reverted
		})
	})
})
