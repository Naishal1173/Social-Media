import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import Sidebar from './Sidebar'; // Import your Sidebar component
import News from './News'; // Import the News component
import Rsidebar from './Rsidebar'; // Import any additional sidebars

const Layout = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <News />
            <Rsidebar />
        </>
    );
};

export default Layout;
