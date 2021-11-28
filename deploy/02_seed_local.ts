import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'

const func: DeployFunction = async ({getNamedAccounts, deployments, network, ethers}: HardhatRuntimeEnvironment) => {
	const { deploy, log } = deployments
	const [ deployer, account1, account2 ] = await ethers.getSigners()
	const parseEther = ethers.utils.parseEther
	if(network.name === 'hardhat') {
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
		const havenCreatedAbi = ['event HavenCreated(address indexed owner, address havenAddress)']
		const havenCreatedIface = new ethers.utils.Interface(havenCreatedAbi)
		const havenAddress = havenCreatedIface.parseLog(createReceipt.logs[2]).args.havenAddress
		const newHaven = Haven.attach(havenAddress)
		console.log('Haven address deployed at: %s', havenAddress)
		console.log('-------Funding account#1 and account#2-------')
		await havenToken.transfer(account1.address, parseEther('100'))
		await havenToken.transfer(account2.address, parseEther('100'))
		console.log('-------Funded account#1 and account#2 with 100 Haven-------')
		console.log('-------Subscribe account#1 to created haven address-------')
		await havenToken.connect(account1).authorizeOperator(havenProtocolAddress)
		await havenProtocol.connect(account1).subscribe(havenAddress)
	}
}

func.tags = ['HavenProtocol']
export default func