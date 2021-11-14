import { expect } from 'chai'
import { ethers, waffle } from 'hardhat'
import { Haven, HavenProtocol, HavenToken } from '../typechain'

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
		havenToken = await HavenToken.deploy()
		havenProtocol = await HavenProtocol.deploy(havenToken.address)
		await havenProtocol.deployed()
		havenProtocolAsSigner1 = havenProtocol.connect(signer1)
		await havenToken.transfer(signer1.address, 100)
		havenTokenAsSigner1 = havenToken.connect(signer1)
		const Haven = await ethers.getContractFactory('Haven')

		const createHavenTx = await havenProtocol.createHaven(10)
		await createHavenTx.wait()

		const havenToSubscribeToAddr = await havenProtocol.ownerToHavens(deployer.address, 0)
		havenToSubscribeTo = Haven.attach(havenToSubscribeToAddr)
	})
	describe('#createHaven()', () => {
		it('Should emit created haven with caller as owner', async () => {
			const [signer0] = await ethers.getSigners()
			const Haven = await ethers.getContractFactory('Haven')
			const createHavenTx = await havenProtocol.createHaven(10)
			await createHavenTx.wait()

			const newHavenAddr = await havenProtocol.ownerToHavens(signer0.address, 1)
			expect(newHavenAddr).is.not.equals(0)

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
			const subAmount = 30
			await havenTokenAsSigner1.approve(havenProtocol.address, subAmount)
			const subscribeTx = await havenProtocolAsSigner1.subscribe(subAmount, havenToSubscribeTo.address)
			await subscribeTx.wait()

			await expect(subscribeTx)
				.to.emit(havenProtocol, 'UserSubscribed')
				.withArgs(havenToSubscribeTo.address, signer1.address, subAmount, 10)

			const [isSubscribedToHaven] = await havenProtocol.havenToSubscriber(havenToSubscribeTo.address, signer1.address)
			expect(isSubscribedToHaven).to.be.equal(true)
		})
		it('Should revert when user is already subscribed', async () => {
			const subFee = 10
			await havenTokenAsSigner1.approve(havenProtocol.address, subFee)
			const subscribeTx = await havenProtocolAsSigner1.subscribe(subFee, havenToSubscribeTo.address)

			await subscribeTx.wait()

			await expect(havenProtocolAsSigner1.subscribe(subFee, havenToSubscribeTo.address)).to.be.revertedWith('You are already subscribed!')
		})
		it('Should revert when user\'s subscription fee value is not enough otherwise ok', async () => {
			const [, , signer2, signer3] = await ethers.getSigners()
			await havenToken.transfer(signer2.address, 100)
			await havenToken.transfer(signer3.address, 100)
			await havenTokenAsSigner1.approve(havenProtocol.address, 9)
			await havenToken.connect(signer2).approve(havenProtocol.address, 10)
			await havenToken.connect(signer3).approve(havenProtocol.address, 11)

			await expect(havenProtocolAsSigner1.subscribe(9, havenToSubscribeTo.address)).to.be.revertedWith('Insufficient subscription amount!')
			expect(havenProtocol.connect(signer2).subscribe(10, havenToSubscribeTo.address)).to.be.ok
			expect(havenProtocol.connect(signer3).subscribe(11, havenToSubscribeTo.address)).to.be.ok
		})
		it('Should revert when address isn\'t a haven address otherwise ok', async () => {
			const [, , someNonHavenAddress] = await ethers.getSigners()
			await havenTokenAsSigner1.approve(havenProtocol.address, 10)

			await expect(havenProtocolAsSigner1.subscribe(10, someNonHavenAddress.address)).to.be.revertedWith('Invalid haven address!')
			expect(havenProtocolAsSigner1.subscribe(10, havenToSubscribeTo.address)).to.be.ok
		})
		it('Should transfer subscription fee token amount to haven address and update subscriber balances', async () => {
			const [, signer1] = await ethers.getSigners()
			const subAmount = 50
			await havenTokenAsSigner1.approve(havenProtocol.address, subAmount)

			await expect(() => havenProtocolAsSigner1.subscribe(subAmount, havenToSubscribeTo.address))
				.to.changeTokenBalance(havenToken, havenProtocol, subAmount)
			const [, signer1LockedAmount, signer1Balance] = await havenProtocol.havenToSubscriber(havenToSubscribeTo.address, signer1.address)
			expect(signer1LockedAmount.add(signer1Balance)).to.be.equal(subAmount)
			expect(signer1LockedAmount).to.be.equal(10)
			expect(signer1Balance).to.be.equal(40)
		})
	})
})
