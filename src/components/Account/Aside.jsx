"use client";
import { FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { SlHandbag } from "react-icons/sl";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import VinylDisk from "../VinylDisk";
import Link from "next/link";

const Aside = () => {
  const [diskHover, setDiskHover] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const path = usePathname();


  // if (!user) return null;
  return (
    <aside>
      {!user && (<div className="img-skeleton" style={{ backgroundColor: '#eec99d' }} />)}
      <div className="leftSection_header">

        <div onMouseEnter={() => setDiskHover(true)} onMouseLeave={() => setDiskHover(false)}>
          <VinylDisk spin={diskHover} style={{ marginBottom: 20, transition: '.2s', transform: diskHover ? "scale(1.1)" : "", height: 150, width: 150 }} img={user?.photoURL || "/assets/default_user.png"} hideHole={true} />
        </div>
        <p className="leftSection_header_name">{user?.displayName}</p>
        <p className="leftSection_header_email">{user?.email}</p>
      </div>
      <div className="leftSection_content">
        <ol>
          <li
            className={path === "/user/myaccount" ? "selected" : ""}
          >
            <Link href={"/user/myaccount"}><FaRegUser /> Contul meu</Link>
          </li>
          <li
            className={
              path === "/user/myaccount/orders" ? "selected" : ""
            }
          >
            <Link href={"/user/myaccount/orders"}><SlHandbag /> Comenzile mele</Link>
          </li>
          <li
            className={
              path === "/user/myaccount/mycart" ? "selected" : ""
            }
          >
            <Link href={"/user/myaccount/mycart"}><IoCartOutline /> Coșul meu</Link>
          </li>
          <li
            className={
              path === "/user/myaccount/favorite" ? "selected" : ""
            }
          >
            <Link href={"/user/myaccount/favorite"}><IoMdHeartEmpty /> Favorite</Link>
          </li>
          <li
            className={
              path === "/user/myaccount/addresses" ? "selected" : ""
            }
            >
            <Link href={"/user/myaccount/addresses"}><FiMapPin /> Adrese de livrare</Link>
          </li>
        </ol>
        <hr />
        <button className="logout_btn">
          <FaSignOutAlt /> Ieșire
        </button>
      </div>
    </aside>
  );
};

export default Aside;
