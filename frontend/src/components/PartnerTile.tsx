import { PartnerData } from "../types";

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

interface PartnerTileProps {
    partnerData: PartnerData;
}

// @ts-expect-error: This variable is currently unused. You will have to either use them or remove them (at which point you should remove this comment)
function PartnerTile({ partnerData }: PartnerTileProps) {
    return (
        <div className="partner-tile">
            <img className="partner-thumbnail" src="" />
            <hr />
            <div className="partner-info">
                This is some placeholder content - you'll need to replace the
                content here with actual partner information.
            </div>
        </div>
    );
}

export default PartnerTile;
