"use client";
import { Button } from '@/components/ui/button';
import { ExpertsList } from '@/services/Options';
import { useUser } from '@stackframe/stack';
import Image from 'next/image';
import UserInputDialog from './UserInputDialog';

const FeatureAssistants = () => {
    const user = useUser();
    return (
        <div className="container mx-auto px-4 sm:px-6 py-6">
           
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-8">
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">My WorkSpace</h2>
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        Welcome back, {user?.displayName || 'User'}
                    </h1>
                </div>
                <Button className="w-full sm:w-fit mt-2 sm:mt-0">Profile</Button>
            </div>

            {/* Experts Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {ExpertsList.map((option, index) => (
                    <UserInputDialog ExpertsList={option} key={index}>
                        <div className="flex flex-col items-center p-4 bg-white dark:bg-secondary rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 h-full">
                            <div className="relative mb-3">
                                <Image 
                                    src={option.icon} 
                                    alt={option.name}
                                    width={64}
                                    height={64}
                                    className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain hover:rotate-12 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-center font-medium text-sm sm:text-base text-gray-800 dark:text-white">
                                {option.name}
                            </h3>
                        </div>
                    </UserInputDialog>
                ))}
            </div>
        </div>
    );
};

export default FeatureAssistants;