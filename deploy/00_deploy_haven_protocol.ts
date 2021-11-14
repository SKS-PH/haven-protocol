import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'

const func: DeployFunction = async ({getNamedAccounts, deployments}: HardhatRuntimeEnvironment) => {
	const { deploy, log } = deployments
	const { deployer } = await getNamedAccounts()

	log('----------------------------------------------------')
	const havenProtocol = await deploy('HavenProtocol', {
		from: deployer,
		log: true
	})
	log('HavenProtocol contract deployed at: ' + havenProtocol.address)
}

func.tags = ['HavenProtocol']
export default func