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
		havenToken = await HavenToken.deploy()
		havenProtocol = await HavenProtocol.deploy(havenToken.address)
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
			const subAmount = parseEther('30')
			await havenTokenAsSigner1.approve(havenProtocol.address, subAmount)
			const subscribeTx = await havenProtocolAsSigner1.subscribe(subAmount, havenToSubscribeTo.address)
			await subscribeTx.wait()

			await expect(subscribeTx)
				.to.emit(havenProtocol, 'UserSubscribed')
				.withArgs(havenToSubscribeTo.address, signer1.address, subAmount, parseEther('10'))

			const [isSubscribedToHaven] = await havenProtocol.havenToSubscriber(havenToSubscribeTo.address, signer1.address)
			expect(isSubscribedToHaven).to.be.true
		})
		it('Should revert when user is already subscribed', async () => {
			const subFee = parseEther('10')
			await havenTokenAsSigner1.approve(havenProtocol.address, subFee)
			const subscribeTx = await havenProtocolAsSigner1.subscribe(subFee, havenToSubscribeTo.address)

			await subscribeTx.wait()

			await expect(havenProtocolAsSigner1.subscribe(subFee, havenToSubscribeTo.address)).to.be.revertedWith('You are already subscribed!')
		})
		it('Should revert when user\'s subscription fee value is not enough otherwise ok', async () => {
			const [, , signer2, signer3] = await ethers.getSigners()
			await havenToken.transfer(signer2.address, parseEther('100'))
			await havenToken.transfer(signer3.address, parseEther('100'))
			await havenTokenAsSigner1.approve(havenProtocol.address, parseEther('9'))
			await havenToken.connect(signer2).approve(havenProtocol.address, parseEther('10'))
			await havenToken.connect(signer3).approve(havenProtocol.address, parseEther('11'))

			await expect(havenProtocolAsSigner1.subscribe(parseEther('9'), havenToSubscribeTo.address)).to.be.revertedWith('Insufficient subscription amount!')
			expect(havenProtocol.connect(signer2).subscribe(parseEther('10'), havenToSubscribeTo.address)).to.be.ok
			expect(havenProtocol.connect(signer3).subscribe(parseEther('11'), havenToSubscribeTo.address)).to.be.ok
		})
		it('Should revert when address isn\'t a haven address otherwise ok', async () => {
			const [, , someNonHavenAddress] = await ethers.getSigners()
			const subAmount = parseEther('10')
			await havenTokenAsSigner1.approve(havenProtocol.address, subAmount)

			await expect(havenProtocolAsSigner1.subscribe(subAmount, someNonHavenAddress.address)).to.be.revertedWith('Invalid haven address!')
			expect(havenProtocolAsSigner1.subscribe(subAmount, havenToSubscribeTo.address)).to.be.ok
		})
		it('Should transfer', async () => {
			const [, signer1] = await ethers.getSigners()
			const subAmount = parseEther('50')
			await havenTokenAsSigner1.approve(havenProtocol.address, subAmount)

			await expect(() => havenProtocolAsSigner1.subscribe(subAmount, havenToSubscribeTo.address))
				.to.changeTokenBalance(havenToken, havenProtocol, subAmount)
			const [, signer1LockedAmount, signer1Balance] = await havenProtocol.havenToSubscriber(havenToSubscribeTo.address, signer1.address)
			expect(signer1LockedAmount.add(signer1Balance)).to.be.equal(subAmount)
			expect(signer1LockedAmount).to.be.equal(parseEther('10'))
			expect(signer1Balance).to.be.equal(parseEther('40'))
		})
	})
	describe('#unsubscribe()', async () => {
		it('Should unsubscribe user and emit unsubscribe event', async () => {
			const [, signer1] = await ethers.getSigners()
			const subAmount = parseEther('10')
			await havenTokenAsSigner1.approve(havenProtocol.address, subAmount)
			const subTx = await havenProtocolAsSigner1.subscribe(subAmount, havenToSubscribeTo.address)
			await subTx.wait()

			await expect(havenProtocolAsSigner1.unsubscribe(havenToSubscribeTo.address))
				.to.emit(havenProtocol, 'UserUnsubscribed')
				.withArgs(havenToSubscribeTo.address, signer1.address)

			const [isSubscribed] = await havenProtocol.havenToSubscriber(havenToSubscribeTo.address, signer1.address)
			expect(isSubscribed).to.be.false
		})
		it('Should transfer balance back to user but not locked amount', async () => {
			const [, signer1] = await ethers.getSigners()
			const subAmount = parseEther('50')
			const subFee = await havenToSubscribeTo.subscriptionFee()
			await havenTokenAsSigner1.approve(havenProtocol.address, subAmount)
			const subTx = await havenProtocolAsSigner1.subscribe(subAmount, havenToSubscribeTo.address)
			await subTx.wait()
			const walletBalanceBeforeUnsub = await havenToken.balanceOf(signer1.address)
			const [, , havenBalanceAfterSub] = await havenProtocol.havenToSubscriber(havenToSubscribeTo.address, signer1.address)

			const unsubTx = await havenProtocolAsSigner1.unsubscribe(havenToSubscribeTo.address)
			await unsubTx.wait()

			const walletBalanceAfterUnsub = await havenToken.balanceOf(signer1.address)
			expect(walletBalanceAfterUnsub).to.be.equal(walletBalanceBeforeUnsub.add(havenBalanceAfterSub))

			const [, lockedAmount, havenBalanceAfterUnsub] = await havenProtocol.havenToSubscriber(havenToSubscribeTo.address, signer1.address)
			expect(lockedAmount).to.be.equal(subFee)
			expect(havenBalanceAfterUnsub).to.be.equal(0)
		})
	})
})
