import { useState, useEffect } from "react";
import PartnerTile from "./PartnerTile";
import { PartnerData } from "../types";

interface DashboardProps {}

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard({}: DashboardProps) {
    // @ts-expect-error: These variables are currently unused. You will have to either use them or remove them (at which point you should remove this comment)
    const [partners, setPartners] = useState<PartnerData>({});

    // Load all partners on initial page load
    useEffect(() => {
        fetch("http://localhost:4000", {
            method: "GET",
        }).then((res) => res.json());
    }, []);

    return (
        <div id="main-content">
            <div id="main-partners-grid">
                <PartnerTile partnerData={{}} />
            </div>
        </div>
    );
}

export default Dashboard;
