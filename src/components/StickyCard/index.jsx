import React, { useState } from "react";
import "./index.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../utils/stateSlice";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../languageSelector/index";
import StatisticsCard from "../userStatisticsCard";

const StickyCard = () => {
	const { t } = useTranslation();
	const USERINFO = useSelector(selectUserData);
	const [isExpanded, setIsExpanded] = useState(false);

	const handleExpandClick = () => {
		setIsExpanded(true);
	};

	const handleCloseClick = (e) => {
		e.stopPropagation();
		setIsExpanded(false);
	};

	return (
		<>
			{!USERINFO ? (
				<></>
			) : (
				<div className={`sticky-card ${isExpanded ? "expanded" : ""}`} onClick={!isExpanded ? handleExpandClick : undefined}>
					{!isExpanded && <FaArrowAltCircleRight color='white' className='tab-icon' />}
					{isExpanded && (
						<div className='close-button'>
							<FaArrowAltCircleLeft onClick={handleCloseClick} color='white' />
						</div>
					)}

					{isExpanded && (
						<div className='card-content'>
							<div className='col-lg-12 p-3'>
								<h3>{t("greeting") + USERINFO?.username}</h3>
							</div>

							<div className='col-lg-12 p-4'>
								<div className='darkened-bg border-15 shadow-bg'>
									<div className='p-3'>
										<h3>{t("highlights_sidebar")}</h3>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
											voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
										</p>
									</div>
								</div>
							</div>

							<div className='col-lg-12 p-4'>
								<div className='darkened-bg border-15 shadow-bg'>
									<div className='p-3'>
										<h3>{t("product_catalog_title_sidebar")}</h3>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
											voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
										</p>
									</div>
								</div>
							</div>

							<div className='col-lg-12 p-4'>
								<div className='darkened-bg border-15 shadow-bg'>
									<div className='p-3'>
										<h3>{t("statistics_card_title")}</h3>
										<StatisticsCard user_info={USERINFO} />
									</div>
								</div>
							</div>
							<LanguageSelector />
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default StickyCard;
