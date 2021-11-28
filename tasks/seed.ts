import { task } from 'hardhat/config'
<<<<<<< Updated upstream
=======
import fetch from 'node-fetch'
>>>>>>> Stashed changes

task('seed', 'Seeds onchain and offchain', async (taskArgs, hre, runSuper) => {
	const network = hre.network
	const ethers = hre.ethers
	const deployments = hre.deployments
	const [ deployer, account1, account2 ] = await ethers.getSigners()
	const parseEther = ethers.utils.parseEther
	if(network.name === 'hardhat' || network.name === 'localhost') {
		const havenTokenAddress = (await deployments.get('HavenToken')).address
		const havenProtocolAddress = (await deployments.get('HavenProtocol')).address
		const HavenProtocol = await ethers.getContractFactory('HavenProtocol')
		const HavenToken = await ethers.getContractFactory('HavenToken')
		const havenToken = HavenToken.attach(havenTokenAddress)
		const havenProtocol = HavenProtocol.attach(havenProtocolAddress)
		console.log('-------Deploying a haven-------')
		const createTx = await havenProtocol.createHaven(parseEther('15'))
		const createReceipt = await createTx.wait()
		const havenCreatedAbi = ['event HavenCreated(address indexed owner, uint256 havenId)']
		const havenCreatedIface = new ethers.utils.Interface(havenCreatedAbi)
		const havenId = havenCreatedIface.parseLog(createReceipt.logs[0]).args.havenId
		console.log('Haven: %s created', havenId)
		console.log('Funding account#1 and account#2...')
		await havenToken.transfer(account1.address, parseEther('100'))
		await havenToken.transfer(account2.address, parseEther('100'))
		console.log('Funded account#1 and account#2 with 100 Haven!')
		console.log('Subscribing account#1 to haven: %s...', havenId)
		await havenToken.connect(account1).authorizeOperator(havenProtocolAddress)
		await havenProtocol.connect(account1).subscribe(havenId)
		console.log('Subscribed!')

		console.log('Posting for haven: %s...', havenId)
		const post = {
			id: '1',
			createdAt: new Date('2021-11-24T22:09:46.000Z'),
			content: `Hello folks, stay tuned for the album I'm uploading this month. I assure you, this new content is a real banger!

Share the word to your friends so they can listen to the hard work I've been making for these past few months.

Oh, and also for the Tier 2 subscribers and higher, hang on for a while because I will send extra merch to this haven. **More reasons** to get the higher tiers!`,
			title: 'I am releasing a new album this month',
			tags: ['album', 'release'],
			tier: 'Tier 1',
			haven: havenId
		}
		const response = await fetch(`http://localhost:8080/api/haven/${havenId}/posts`, { method: 'POST', body: JSON.stringify(post), headers: { 'Content-Type': 'application/json' }})
		const data = await response.json()

		const postTx = await havenProtocol.post(0, data.streamId)
		await postTx.wait()

	}
})

export default {}