// app/myaccount/layout.js

import "./ProfilPage.css"
import Aside from "@/components/Account/Aside";

export default function MyAccountLayout({ children }) {
    return (
        <div className="userProfilePage">
            <div className="userProfilePageInner">
                <Aside/>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}