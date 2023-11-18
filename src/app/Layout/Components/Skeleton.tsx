import { Card, Skeleton } from "@nextui-org/react";

export const ProfileFormSkeleton = () => {
	return (
		<div className="bg-white dark:bg-darker mt-2 mr-2 rounded-md p-4 max-w-[88vh]">
			<div className="avatar block pt-4 mx-auto relative ">
				<Skeleton className="rounded-full w-32 mx-auto">
					<div className="h-24 rounded-lg bg-default-300"></div>
				</Skeleton>
			</div>
			<div className="flex my-10">
				<div className="w-full flex flex-col gap-2 mt-10">
					<Skeleton className="h-3 w-3/5 rounded-lg my-2" />
					<Skeleton className="h-3 w-4/5 rounded-lg my-2" />
				</div>
				<div className="w-full flex flex-col gap-2 mt-10">
					<Skeleton className="h-3 w-3/5 rounded-lg my-2" />
					<Skeleton className="h-3 w-4/5 rounded-lg my-2" />
				</div>
			</div>
			<div className="flex my-10">
				<div className="w-full flex flex-col gap-2 mt-10">
					<Skeleton className="h-3 w-3/5 rounded-lg my-2" />
					<Skeleton className="h-3 w-4/5 rounded-lg my-2" />
				</div>
				<div className="w-full flex flex-col gap-2 mt-10">
					<Skeleton className="h-3 w-3/5 rounded-lg my-2" />
					<Skeleton className="h-3 w-4/5 rounded-lg my-2" />
				</div>
			</div>
		</div>
	);
};

export const CardSkeleton = () => {
	let count = [1, 2, 3];

	return (
		<div className="grid grid-cols-3 gap-1">
			{count.map((item) => {
				return (
					<Card className=" space-y-5 p-4" radius="lg">
						<Skeleton className="rounded-lg">
							<div className="h-24 rounded-lg bg-default-300"></div>
						</Skeleton>
						<div className="space-y-3">
							<Skeleton className="w-3/5 rounded-lg">
								<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-4/5 rounded-lg">
								<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-2/5 rounded-lg">
								<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
							</Skeleton>
						</div>
					</Card>
				);
			})}
		</div>
	);
};
