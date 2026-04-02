'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const FormatPage = ({format}) => {
    const nav = useRouter();
    useEffect(()=>{nav.replace(`/${format}/genere`)}, [])
    return null;
}

export default FormatPage;
