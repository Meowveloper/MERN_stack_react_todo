import React from "react";

export default function CheckAllAndRemaining({ remainingCount, checkAll }) {
    return (
        <div className="check-all-container">
            <div>
                <div onClick={checkAll} className="button">Check All</div>
            </div>

            <span>{remainingCount} item{ remainingCount > 1 && "s"} remaining</span>
        </div>
    );
}
