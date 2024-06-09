import { useState, useEffect, useMemo } from "react";
import PartnerTile from "./PartnerTile";
import type { PartnerDetails } from "../../../backend/src/types";

export default function Dashboard() {
    const [partners, setPartners] = useState<PartnerDetails[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000")
            .then((res) => res.json())
            .then(setPartners);
    }, []);

    const searching = useMemo(() => search !== "", [search]);

    const filtered = useMemo(
        () =>
            searching
                ? partners.filter((x) =>
                      x.name
                          .toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase())
                  )
                : partners,
        [partners, search, searching]
    );

    const createPartner = (partner: PartnerDetails) => {
        fetch("http://localhost:4000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(partner),
        })
            .then((res) => res.json())
            .then(setPartners);
    };

    const editPartner = (oldName: string, updated: PartnerDetails) => {
        fetch("http://localhost:4000", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                oldName,
                updated,
            }),
        })
            .then((res) => (res.ok ? res.json() : partners))
            .then(setPartners);
    };

    const deletePartner = (name: string) => {
        fetch("http://localhost:4000", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        })
            .then((res) => res.json())
            .then(setPartners);
    };

    return (
        <div id="main-content">
            <button
                type="button"
                className="new-partner"
                // this isn't strictly required, but there's a high chance that
                // the newly created item won't be in the search filter so the
                // user can't find it as easily.
                // if we just make them get out of search, they'll be able to see it
                disabled={searching}
                title={
                    searching ? "Clear search before creating new partner" : ""
                }
                onClick={() =>
                    createPartner({
                        // this is a bit of a hack to get unique names
                        // and then the user can edit the new item to what they want
                        name: `New Partner ${Math.floor(
                            Math.random() * 1000000
                        ).toString(16)}`,
                        description: "Edit this description",
                        logoUrl: "https://picsum.photos/200/300",
                        active: true,
                    })
                }
            >
                New
            </button>
            <input
                type="text"
                className="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a partner"
            />
            <div id="main-partners-grid">
                {filtered.map((p) => (
                    <PartnerTile
                        key={p.name}
                        partnerData={p}
                        edit={(updated) => editPartner(p.name, updated)}
                        remove={() => deletePartner(p.name)}
                    />
                ))}
            </div>
        </div>
    );
}
