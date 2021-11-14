import { expect } from 'chai'
import { ethers, waffle } from 'hardhat'

describe('HavenProtocol', function () {
	describe('#createHaven()', function () {
		it('Should emit created haven with caller as owner', async function () {
			const signer = (await ethers.getSigners())[0]
			const HavenProtocol = await ethers.getContractFactory('HavenProtocol')
			const Haven = await ethers.getContractFactory('Haven')
			const havenProtocol = await HavenProtocol.deploy()
			await havenProtocol.deployed()
			
			const createHavenTx = await havenProtocol.createHaven(10)
			await createHavenTx.wait()

			const newHavenAddr = await havenProtocol.ownerToHavens(signer.address, 0)
			expect(newHavenAddr).is.not.equals(0)

			await expect(createHavenTx)
				.to.emit(havenProtocol, 'HavenCreated')
				.withArgs(signer.address, newHavenAddr)

			const newHaven = Haven.attach(newHavenAddr)
			expect(await newHaven.owner()).to.equal(signer.address)
		})
	})
})
