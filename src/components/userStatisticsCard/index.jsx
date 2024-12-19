import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Get } from "../../helpers/api.js";

const StatisticsCard = ({ user_info }) => {
	const { t } = useTranslation();
	const [clientData, setClientData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log("user_info:", user_info);

		const loadClientData = async () => {
			if (user_info?.username) {
				try {
					const data = await Get("nofroget/clients/getAll");
					console.log("Fetched data:", data);
					setClientData(data);
				} catch (error) {
					console.error("There was an error loading your profile info:", error);
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		};

		loadClientData();
	}, [user_info]);

	useEffect(() => {
		console.log("Updated clientData:", clientData);
	}, [clientData]);

	if (loading) return <div>{t("loading")}</div>;

	return (
		<React.Fragment>
			{clientData && clientData.length > 0 ? (
				<div>
					<p>{user_info?.username}</p>
					<p>
						Nº de Visitas -{" "}
						{clientData.map((item, index) => (
							<span key={index}>{item.visits} </span>
						))}
					</p>
				</div>
			) : (
				<div>{t("error_statistics_card")}</div>
			)}
		</React.Fragment>
	);
};

export default StatisticsCard;
