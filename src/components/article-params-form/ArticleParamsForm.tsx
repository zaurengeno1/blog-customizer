import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Text } from '../text';
import { Separator } from '../separator';
import {
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import { useOutsideClose } from './hooks/useOutsideClose';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

interface ArticleParamsFormProps {
	onApply: (articleState: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	onApply,
}) => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const openForm = () => setIsOpen(!isOpen);

	useOutsideClose({ isOpen, rootRef, onChange: setIsOpen });

	const handleFontFamilyChange = (selected: OptionType) => {
		setArticleState({ ...articleState, fontFamilyOption: selected });
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setArticleState({ ...articleState, fontSizeOption: selected });
	};

	const handleFontColorChange = (selected: OptionType) => {
		setArticleState({ ...articleState, fontColor: selected });
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		setArticleState({ ...articleState, backgroundColor: selected });
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setArticleState({ ...articleState, contentWidth: selected });
	};

	const applyChanges = () => {
		onApply(articleState);
	};

	const changeToDefault = () => {
		setArticleState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		applyChanges();
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={openForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={onSubmit}>
					<Text size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>
					<Select
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>
					<Select
						selected={articleState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={articleState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>
					<Select
						selected={articleState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={changeToDefault} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
