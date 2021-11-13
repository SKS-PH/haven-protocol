import { Component } from "solid-js";
import { Header } from "components/organisms/Header";
import { Navigation } from "components/organisms/Navigation";
import { Select, TextControlSize } from "@haven/web-components-solid";

const HomePage: Component = () => {
	return (
		<div className="h-screen flex flex-col">
			<Header />
			<Navigation />
			<main className="lg:pl-sidebar-lg xl:pl-sidebar-xl 2xl:pl-sidebar-2xl pt-header box-border min-h-screen">
				<div className="bg-bg">
					<div className="bg-bg pt-8 box-border lg:-mb-4 relative z-10">
						<div className="container lg:w-full lg:max-w-none box-border flex items-center">
							<img src="http://placehold.it/250" className="h-24 rounded-full" alt="Haven Name" />
						</div>
					</div>
					<div className="bg-bg sticky top-header left-0 lg:pt-2">
						<div className="absolute pointer-events-none bottom-0 left-0 w-full h-0.25 dark:opacity-25 opacity-10 bg-current" />
						<div className="container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl lg:ml-0 box-border">
							<div className="flex justify-between items-center box-border h-16 space-x-8">
								<div className="md:text-3xl font-light flex-auto">Haven Name</div>
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
					</div>
					<div>
						<div className="container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl lg:ml-0 box-border">
							<div className="h-screen border border-solid">Test</div>
							Feed
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default HomePage;
