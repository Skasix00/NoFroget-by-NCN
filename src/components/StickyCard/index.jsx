import React, { useState } from "react";
import "./index.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const StickyCard = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleExpandClick = () => {
		setIsExpanded(true);
	};

	const handleCloseClick = (e) => {
		e.stopPropagation(); // Prevent click from bubbling up to the card
		setIsExpanded(false);
	};

	return (
		<div className={`sticky-card ${isExpanded ? "expanded" : ""}`} onClick={!isExpanded ? handleExpandClick : undefined}>
            {!isExpanded && <FaArrowAltCircleRight color="white" className="tab-icon" />}
			{isExpanded && (
				<div className='close-button'>
					<FaArrowAltCircleLeft onClick={handleCloseClick} color="white"/>
				</div>
			)}
			
			{isExpanded && (
				<div className='card-content'>
					<p>Some content here...</p>
				</div>
			)}
		</div>
	);
};

export default StickyCard;
