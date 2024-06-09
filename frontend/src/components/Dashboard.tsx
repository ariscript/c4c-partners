import { useState, useEffect } from "react";
import PartnerTile from "./PartnerTile";
import type { PartnerDetails } from "../types";

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
export default function Dashboard() {
    const [partners, setPartners] = useState<PartnerDetails[]>([]);

    // Load all partners on initial page load
    useEffect(() => {
        fetch("http://localhost:4000", {
            method: "GET",
        })
            .then((res) => res.json())
            .then(setPartners);
    }, []);

    return (
        <div id="main-content">
            <div id="main-partners-grid">
                {partners.map((p) => (
                    <PartnerTile
                        key={p.name}
                        partnerData={p}
                        edit={console.log}
                        remove={console.log}
                    />
                ))}
            </div>
        </div>
    );
}
