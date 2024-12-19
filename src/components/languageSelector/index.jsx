import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./index .css";

const languages = [
	{
		code: "en",
		lang: "English",
	},
	{
		code: "pt",
		lang: "Português",
	},
	{
		code: "fr",
		lang: "French",
	},
];

const LanguageSelector = () => {
	const { i18n } = useTranslation();

	useEffect(() => {
		document.body.dir = i18n.dir();
	}, [i18n, i18n.language]);

	const changeLanguage = (code) => {
		i18n.changeLanguage(code);
	};

	return (
		<div className='col-lg-12 btn-group btn-group-sm p-3 mt-0' role='group'>
			{languages.map((item) => {
				return (
					<button className={item.code === i18n.language ? "btn-popout selected w-100 ms-2 me-2" : "btn-popout w-100 ms-2 me-2"} onClick={() => changeLanguage(item.code)} key={item.code}>
						{item.lang}
					</button>
				);
			})}
		</div>
	);
};

export default LanguageSelector;
