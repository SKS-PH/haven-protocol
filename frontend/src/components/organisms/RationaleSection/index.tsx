import { Component } from 'solid-js'
import ANTI_PLATFORM_RISK from 'assets/img/anti-platform-risk.jpg'
import DAO_GOVERNANCE from 'assets/img/dao-governance.jpg'
import CUSTOMISATION from 'assets/img/customisation.jpg'
import DEMOCRATISATION from 'assets/img/democratisation.jpg'

export const RationaleSection: Component = () => {
	return (
		<>
			<section id="what-is-haven">
				<div className="container lg:max-w-screen-md mx-auto">
					<div className="px-4 lg:px-6 box-border my-8 lg:my-16">
						<h2 className="font-light text-6xl mt-0">What is Haven?</h2>
						<p className="text-2xl">
							Hello. Well, Marty, I'm almost eighteen-years-old, it's not like I've never parked before.
						</p>
						<p>
							Whoa, this is heavy. My equipment, that reminds me, Marty, you better not hook up to the amplifier. There's
							a slight possibility for overload. Cause, George, she wants to go to the dance with you, she just doesn't
							know it yet. That's why we got to show her that you, George McFly, are a fighter. You're somebody who's
							gonna stand up for yourself, someone who's gonna protect her.
						</p>
					</div>
				</div>
			</section>
			<section>
				<div className="container mx-auto">
					<div className="px-4 lg:px-6 box-border lg:flex my-8 lg:my-16 lg:items-center lg:space-x-16 space-y-8 lg:space-y-0">
						<div className="lg:w-0 flex-auto">
							<img
								src={ANTI_PLATFORM_RISK}
								className="w-full h-32 md:h-64 lg:h-128 object-center object-cover"
								alt="Platform risk prevention"
							/>
						</div>
						<div className="lg:w-0 flex-auto">
							<h3 className="font-light text-5xl mt-0">Platform risk prevention</h3>
							<p className="text-2xl">
								Hello. Well, Marty, I'm almost eighteen-years-old, it's not like I've never parked before.
							</p>
							<p>
								Whoa, this is heavy. My equipment, that reminds me, Marty, you better not hook up to the amplifier.
								There's a slight possibility for overload. Cause, George, she wants to go to the dance with you, she just
								doesn't know it yet. That's why we got to show her that you, George McFly, are a fighter. You're somebody
								who's gonna stand up for yourself, someone who's gonna protect her.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container mx-auto">
					<div className="px-4 lg:px-6 box-border lg:flex my-8 lg:my-16 lg:items-center lg:space-x-16 space-y-8 lg:space-y-0">
						<div className="lg:w-0 flex-auto">
							<img
								src={DAO_GOVERNANCE}
								className="w-full h-32 md:h-64 lg:h-128 object-center object-cover"
								alt="DAO governance"
							/>
						</div>
						<div className="lg:w-0 flex-auto">
							<h3 className="font-light text-5xl mt-0">
								<abbr title="Decentralised autonomous organization">DAO</abbr> governance
							</h3>
							<p className="text-2xl">
								Hello. Well, Marty, I'm almost eighteen-years-old, it's not like I've never parked before.
							</p>
							<p>
								Whoa, this is heavy. My equipment, that reminds me, Marty, you better not hook up to the amplifier.
								There's a slight possibility for overload. Cause, George, she wants to go to the dance with you, she just
								doesn't know it yet. That's why we got to show her that you, George McFly, are a fighter. You're somebody
								who's gonna stand up for yourself, someone who's gonna protect her.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container mx-auto">
					<div className="px-4 lg:px-6 box-border lg:flex my-8 lg:my-16 lg:items-center lg:space-x-16 space-y-8 lg:space-y-0">
						<div className="lg:w-0 flex-auto">
							<img
								src={CUSTOMISATION}
								className="w-full h-32 md:h-64 lg:h-128 object-center object-cover"
								alt="Customisation"
							/>
						</div>
						<div className="lg:w-0 flex-auto">
							<h3 className="font-light text-5xl mt-0">Customisation</h3>
							<p className="text-2xl">
								Hello. Well, Marty, I'm almost eighteen-years-old, it's not like I've never parked before.
							</p>
							<p>
								Whoa, this is heavy. My equipment, that reminds me, Marty, you better not hook up to the amplifier.
								There's a slight possibility for overload. Cause, George, she wants to go to the dance with you, she just
								doesn't know it yet. That's why we got to show her that you, George McFly, are a fighter. You're somebody
								who's gonna stand up for yourself, someone who's gonna protect her.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container mx-auto">
					<div className="px-4 lg:px-6 box-border lg:flex my-8 lg:my-16 lg:items-center lg:space-x-16 space-y-8 lg:space-y-0">
						<div className="lg:w-0 flex-auto">
							<img
								src={DEMOCRATISATION}
								className="w-full h-32 md:h-64 lg:h-128 object-center object-cover"
								alt="Democratisation"
							/>
						</div>
						<div className="lg:w-0 flex-auto">
							<h3 className="font-light text-5xl mt-0">Democratisation</h3>
							<p className="text-2xl">
								Hello. Well, Marty, I'm almost eighteen-years-old, it's not like I've never parked before.
							</p>
							<p>
								Whoa, this is heavy. My equipment, that reminds me, Marty, you better not hook up to the amplifier.
								There's a slight possibility for overload. Cause, George, she wants to go to the dance with you, she just
								doesn't know it yet. That's why we got to show her that you, George McFly, are a fighter. You're somebody
								who's gonna stand up for yourself, someone who's gonna protect her.
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
