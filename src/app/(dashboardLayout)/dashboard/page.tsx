"use client"
import { useSession } from 'next-auth/react';
import React from 'react';

const DashboardPage = () => {
    const session = useSession();
    return (
        <div>
            <h1 className='lg:p-10'>Welcome Back <span className='text-blue-500'>{session.data?.user.role}</span> !</h1>
            <hr />
            <div>
                
            </div>
        </div>
    );
};

export default DashboardPage;