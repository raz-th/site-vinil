// app/myaccount/layout.js

import { PageTransitionReady } from "@/components/PageTransitionReady";
import "./ProfilPage.css"
import Aside from "@/components/Account/Aside";

export const runtime = 'edge';

export default function MyAccountLayout({ children }) {
    return (
        <div className="userProfilePage">
            <PageTransitionReady />
            <div className="userProfilePageInner">
                <Aside/>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}