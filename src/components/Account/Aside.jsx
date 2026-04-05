'use client';
import { FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { SlHandbag } from "react-icons/sl";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import Link from "next/link";

const Aside = () => {
    const { user } = useAuth();

    if (!user) return null;
    return (
        <aside>
            <div className='leftSection_header'>
                {user.photoURL ?
                    <img src={user.photoURL || '/assets/image.png'} />
                    :
                    <div className='imgMochup'>
                        <FaRegUser />
                    </div>
                }
                <p className='leftSection_header_name'>{user.displayName}</p>
                <p className='leftSection_header_email'>{user.email}</p>
            </div>
            <ol>
                <li className='selected'><FaRegUser/> Contul meu</li>
                <li><SlHandbag /> Comenzile mele</li>
                <li><IoMdHeartEmpty/> Wishlist</li>
                <li><FiMapPin/> Adrese de livrare</li>
            </ol>
            <hr />
            <button className='logout_btn'><FaSignOutAlt /> Ieșire</button>
        </aside>
    );
}

export default Aside;
