import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as TbIcons from "react-icons/tb";
import * as LuIcons from "react-icons/lu";

export const SidebarData = [
    {
        title: 'Homepage',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Basic Search',
        path: '/search',
        icon: <TbIcons.TbZoomQuestion />,
        cName: 'nav-text'
    },
    {
        title: 'Advanced Search',
        path: '/advanced',
        icon: <LuIcons.LuMicroscope />,
        cName: 'nav-text'
    },
    {
        title: 'Ask ChatGPT',
        path: '/askchatgpt',
        icon: <FaIcons.FaRobot />,
        cName: 'nav-text'
    },
    {
        title: 'Messages',
        path: '/messages',
        icon: <FaIcons.FaEnvelope />,
        cName: 'nav-text'
    },
    {
        title: 'Support',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    },
]