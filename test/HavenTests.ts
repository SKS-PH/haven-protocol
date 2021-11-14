import { expect } from 'chai'
import { ethers, waffle } from 'hardhat'
import { Haven } from '../typechain'

describe('Haven', function () {
	let haven: Haven

	beforeEach(async function() {
		const Haven = await ethers.getContractFactory('Haven')
		haven = await Haven.deploy(10)
		await haven.deployed()
	})
	describe('#post()', async function () {
		it('Should emit created post ', async function () {
			const postUri = 'some://posturi'
			const postTx = await haven.post(postUri)
			const receipt = await postTx.wait()
			const currentBlock = await waffle.provider.getBlock(receipt.blockNumber)
		
			await expect(postTx)
				.to.emit(haven, 'PostCreated')
				.withArgs(0, postUri, currentBlock.timestamp)

			expect((await haven.posts(0))[1]).to.equal(postUri)
		})
		it('Should allow only haven owner otherwise revert', async function() {
			const [ _, signer1 ] = await ethers.getSigners()
			const postUri = 'some://posturi'
			const postTx = await haven.post(postUri)
			await postTx.wait()

			expect((await haven.posts(0))[1]).to.equal(postUri)

			await expect(haven.connect(signer1).post(postUri)).to.be.reverted
		})
	})
})
