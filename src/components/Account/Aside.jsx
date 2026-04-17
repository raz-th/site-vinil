"use client";
import { FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { SlHandbag } from "react-icons/sl";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import VinylDisk from "../VinylDisk";

const Aside = () => {
  const { user } = useAuth();
  const router = useRouter();
  const path = usePathname();

  if (!user) return null;
  return (
    <aside>
      <div className="leftSection_header">
        <VinylDisk img={user.photoURL || "/assets/default_user.png"} hideHole={true}/>

        <p className="leftSection_header_name">{user.displayName}</p>
        <p className="leftSection_header_email">{user.email}</p>
      </div>
      <div className="leftSection_content">
        <ol>
          <li
            className={path === "/user/myaccount" ? "selected" : ""}
            onClick={() => router.push("/user/myaccount")}
          >
            <FaRegUser /> Contul meu
          </li>
          <li
            className={
              path === "/user/myaccount/comenzile-mele" ? "selected" : ""
            }
            onClick={() => router.push("/user/myaccount/comenzile-mele")}
          >
            <SlHandbag /> Comenzile mele
          </li>
          <li>
            <IoMdHeartEmpty /> Wishlist
          </li>
          <li>
            <FiMapPin /> Adrese de livrare
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
