import { Component } from "solid-js";
import { Header } from "components/organisms/Header";
import { Navigation } from "components/organisms/Navigation";
import { Button, Select, TextControlSize } from "@haven/web-components-solid";

const HomePage: Component = () => {
	return (
		<div className="h-screen flex flex-col">
			<Header />
			<Navigation />
			<main className="md:pl-sidebar pt-header box-border min-h-screen">
				<div className="bg-bg">
					<div className="bg-bg px-4 pt-8 box-border flex items-center -mb-4 relative z-10">
						<img src="http://placehold.it/250" className="h-24 rounded-full" alt="Haven Name" />
					</div>
					<div className="bg-bg sticky top-header left-0 pt-4">
						<div className="absolute pointer-events-none bottom-0 left-0 w-full h-0.25 dark:opacity-25 opacity-10 bg-current" />
						<div className="flex justify-between items-center px-4 box-border h-16 space-x-8">
							<div className="text-3xl font-light flex-auto">Haven Name</div>
							<label className="flex items-center space-x-4 relative">
								<span>Sort</span>
								<span>
									<Select size={TextControlSize.SMALL}>
										{[
											{
												label: "Recent",
												value: "created_at",
											},
											{
												label: "Most Viewed",
												value: "view_count",
											},
										]}
									</Select>
								</span>
							</label>
						</div>
					</div>
					<div className="px-4">
						<div className="h-screen border">Test</div>
						Feed
					</div>
				</div>
			</main>
		</div>
	);
};

export default HomePage;
