import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'

const func: DeployFunction = async ({getNamedAccounts, deployments}: HardhatRuntimeEnvironment) => {
	const { deploy, log } = deployments
	const { deployer } = await getNamedAccounts()
	const HavenToken = await deployments.get('HavenToken')
	log('----------------------------------------------------')
	const havenProtocol = await deploy('HavenProtocol', {
		from: deployer,
		args: [HavenToken.address, 450], // 4.5%
		log: true
	})
	log('HavenProtocol contract deployed at: ' + havenProtocol.address)
}

func.tags = ['HavenProtocol']
export default func