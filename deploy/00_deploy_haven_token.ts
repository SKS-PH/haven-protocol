import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const func: DeployFunction = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
	const { deploy, log } = deployments
	const { deployer } = await getNamedAccounts()
	log('----------------------------------------------------')
	const havenProtocol = await deploy('HavenToken', {
		from: deployer,
		log: true,
		args: [ethers.utils.parseEther('1000000000'), []]
	})
	log('HavenToken contract deployed at: ' + havenProtocol.address)
}

func.tags = ['HavenToken']
export default func