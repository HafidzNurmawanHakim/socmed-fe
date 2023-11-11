import React from "react";
import { useAuth } from "../app/auth/core/AuthProvider";

const Profile = () => {
	const { dataUser } = useAuth();
	return (
		<>
			<div className="mt-2 mr-2">
				<div className="bg-white dark:bg-darker rounded-md ">
					<div className={`custom-transition border-none`}>
						<div className="w-full bg-cover h-96 bg-no-repeat bg-[url('https://source.unsplash.com/random/600x400?sig=1')] rounded-md relative">
							<div className="w-2/5 text-white h-full">
								<div className="w-full h-full bg-top bg-no-repeat bg-specialAva rounded-md overflow-hidden">
									<div className="w-full h-full backdrop-blur-md ">
										<div className="avatar block py-5 mx-auto">
											<div className="w-24 mask mask-squircle mx-auto">
												<img src="/images/special.jpg" alt="Special Avatar" />
											</div>
										</div>
										<div className="w-full">
											<h3 className="text-center">
												{dataUser?.first_name.toUpperCase() + " " + dataUser?.last_name.toUpperCase()}
											</h3>
											<p className="text-center text-xs">@{dataUser?.username}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
