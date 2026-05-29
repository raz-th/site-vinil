'use client';

import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { Drawer } from 'vaul';

const InfoDrawer = ({title, content}) => {
    return (
        <Drawer.Root>
            <Drawer.Trigger className='drawerTrigger'><BsInfoCircle/></Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="drawerOverlay" />
                <Drawer.Content className="drawerContent">
                    <Drawer.Title className='drawerTitle'>{title}</Drawer.Title>
                    {content}
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}

export default InfoDrawer;
