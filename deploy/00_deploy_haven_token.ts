import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
	const { deploy, log } = deployments
	const { deployer } = await getNamedAccounts()

	log('----------------------------------------------------')
	const havenProtocol = await deploy('HavenToken', {
		from: deployer,
		log: true
	})
	log('HavenToken contract deployed at: ' + havenProtocol.address)
}

func.tags = ['HavenToken']
export default func