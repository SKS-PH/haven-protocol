import { Component } from "solid-js";
import { Header } from "components/organisms/Header";
import { Navigation } from "components/organisms/Navigation";

const HomePage: Component = () => {
	return (
		<div className="h-screen flex flex-col">
			<Header />
			<Navigation />
			<main className="md:pl-sidebar pt-header box-border min-h-screen">
				<div className="px-4">Feed</div>
			</main>
		</div>
	);
};

export default HomePage;
