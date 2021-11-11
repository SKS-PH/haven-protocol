import { expect } from 'chai'
import { ethers, waffle } from 'hardhat'

describe('Haven', function () {
	describe('#post()', function () {
		it('Should emit created post ', async function () {
			const Haven = await ethers.getContractFactory('Haven')
			const haven = await Haven.deploy(10)
			await haven.deployed()

			const postUri = 'some://posturi'
			const postTx = await haven.post(postUri)

			const receipt = await postTx.wait()
			const currentBlock = await waffle.provider.getBlock(receipt.blockNumber)
		
			await expect(postTx)
				.to.emit(haven, 'PostCreated')
				.withArgs(0, postUri, currentBlock.timestamp)

			expect((await haven.posts(0))[1]).to.equal(postUri)
		})
	})
})
