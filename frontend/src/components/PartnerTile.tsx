import { useState } from "react";
import type { PartnerDetails } from "../../../backend/src/types";

interface PartnerTileProps {
    partnerData: PartnerDetails;
    remove: () => void;
    edit: (data: PartnerDetails) => void;
}

export default function PartnerTile({
    partnerData,
    remove,
    edit,
}: PartnerTileProps) {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(partnerData.name);
    const [description, setDescription] = useState(partnerData.description);
    const [logoUrl, setLogoUrl] = useState(partnerData.logoUrl);
    const [active, setActive] = useState(partnerData.active);

    return (
        <article className="partner-tile">
            <img
                className="partner-thumbnail"
                alt={`${name} logo`}
                src={logoUrl}
            />
            {editMode && (
                <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://example.com/image.png"
                />
            )}
            <dl>
                <dt>Name</dt>
                <dd>
                    {editMode ? (
                        <input
                            type="text"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    ) : (
                        name
                    )}
                </dd>
                <dt>Description</dt>
                <dd>
                    {editMode ? (
                        <textarea
                            placeholder="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    ) : (
                        <p>{description}</p>
                    )}
                </dd>
                <dt>Active?</dt>
                <dd>
                    {editMode ? (
                        <input
                            placeholder="is active?"
                            type="checkbox"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                        />
                    ) : active ? (
                        "Yes"
                    ) : (
                        "No"
                    )}
                </dd>
            </dl>
            <div className="partner-buttons">
                {editMode ? (
                    <button
                        type="button"
                        className="partner-save"
                        onClick={() => {
                            edit({
                                name,
                                description,
                                logoUrl,
                                active,
                            });

                            setEditMode(false);
                        }}
                    >
                        Done
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            className="partner-edit"
                            onClick={() => setEditMode(true)}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="partner-delete"
                            onClick={() => remove()}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </article>
    );
}
