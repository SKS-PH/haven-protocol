import { task } from 'hardhat/config'

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
		const Haven = await ethers.getContractFactory('Haven')
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
	}
})

export default {}