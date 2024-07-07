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

// export const ArticleParamsForm = ({
// 	onApply,
// }: {
// 	onApply: (params: ArticleStateType) => void;
// }) => {
// 	const [articleState, setArticleState] =
// 		useState<ArticleStateType>(defaultArticleState);
// 	const rootRef = useRef<HTMLDivElement>(null);
// 	const [isOpen, setIsOpen] = useState(false);

// 	const openForm = () => setIsOpen(!isOpen);

// 	useOutsideClose({ isOpen, rootRef, onChange: setIsOpen });

// 	const handleFontFamilyChange = (selected: OptionType) => {
// 		setArticleState({ ...articleState, fontFamilyOption: selected });
// 	};

// 	const handleFontSizeChange = (selected: OptionType) => {
// 		setArticleState({ ...articleState, fontSizeOption: selected });
// 	};

// 	const handleFontColorChange = (selected: OptionType) => {
// 		setArticleState({ ...articleState, fontColor: selected });
// 	};

// 	const handleBackgroundColorChange = (selected: OptionType) => {
// 		setArticleState({ ...articleState, backgroundColor: selected });
// 	};

// 	const handleContentWidthChange = (selected: OptionType) => {
// 		setArticleState({ ...articleState, contentWidth: selected });
// 	};

// 	const applyChanges = () => {
// 		onApply(articleState);
// 	};

// 	const changeToDefault = () => {
// 		setArticleState(defaultArticleState);
// 		onApply(defaultArticleState);
// 	};

// 	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		applyChanges();
// 	};

// 	return (
// 		<div ref={rootRef}>
// 			<ArrowButton isOpen={isOpen} onClick={openForm} />
// 			<aside
// 				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
// 				<form className={styles.form} onSubmit={onSubmit}>
// 					<Text size={31} weight={800} uppercase align='left'>
// 						Задайте параметры
// 					</Text>
// 					<Select
// 						selected={articleState.fontFamilyOption}
// 						options={fontFamilyOptions}
// 						onChange={handleFontFamilyChange}
// 						title='Шрифт'
// 					/>
// 					<RadioGroup
// 						name='fontSize'
// 						selected={articleState.fontSizeOption}
// 						options={fontSizeOptions}
// 						onChange={handleFontSizeChange}
// 						title='Размер шрифта'
// 					/>
// 					<Select
// 						selected={articleState.fontColor}
// 						options={fontColors}
// 						onChange={handleFontColorChange}
// 						title='Цвет шрифта'
// 					/>
// 					<Separator />
// 					<Select
// 						selected={articleState.backgroundColor}
// 						options={backgroundColors}
// 						onChange={handleBackgroundColorChange}
// 						title='Цвет фона'
// 					/>
// 					<Select
// 						selected={articleState.contentWidth}
// 						options={contentWidthArr}
// 						onChange={handleContentWidthChange}
// 						title='Ширина контента'
// 					/>
// 					<div className={styles.bottomContainer}>
// 						<Button title='Сбросить' type='reset' onClick={changeToDefault} />
// 						<Button title='Применить' type='submit' />
// 					</div>
// 				</form>
// 			</aside>
// 		</div>
// 	);
// };

// type ArticleParamsFormProps = {
// 	onApply: (params: ArticleStateType) => void;
// };

// export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const rootRef = useRef<HTMLDivElement>(null);
// 	const [articleState, setArticleState] =
// 		useState<ArticleStateType>(defaultArticleState);

// 	const openForm = () => {
// 		setIsOpen(!isOpen);
// 	};

// 	useOutsideClose({ isOpen, rootRef, onChange: setIsOpen });

// 	const handleOptionChange = (
// 		type: keyof ArticleStateType,
// 		selected: OptionType
// 	) => {
// 		setArticleState((prevState) => ({
// 			...prevState,
// 			[type]: selected,
// 		}));
// 	};

// 	const applyChanges = () => {
// 		props.onApply(articleState);
// 	};

// 	const changeToDefault = () => {
// 		setArticleState(defaultArticleState);
// 		props.onApply(defaultArticleState);
// 	};

// 	const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
// 		ev.preventDefault();
// 		applyChanges();
// 	};

// 	return (
// 		<div ref={rootRef}>
// 			<ArrowButton isOpen={isOpen} onClick={openForm} />
// 			<aside
// 				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
// 				<form className={styles.form} onSubmit={onSubmit}>
// 					<Text size={31} weight={800} uppercase align='left'>
// 						Задайте параметры
// 					</Text>
// 					<Select
// 						selected={articleState.fontFamilyOption}
// 						options={fontFamilyOptions}
// 						onChange={(selected) =>
// 							handleOptionChange('fontFamilyOption', selected)
// 						}
// 						title='Шрифт'
// 					/>
// 					<RadioGroup
// 						name='fontSize'
// 						selected={articleState.fontSizeOption}
// 						options={fontSizeOptions}
// 						onChange={(selected) =>
// 							handleOptionChange('fontSizeOption', selected)
// 						}
// 						title='Размер шрифта'
// 					/>
// 					<Select
// 						selected={articleState.fontColor}
// 						options={fontColors}
// 						onChange={(selected) => handleOptionChange('fontColor', selected)}
// 						title='Цвет шрифта'
// 					/>
// 					<Separator />
// 					<Select
// 						selected={articleState.backgroundColor}
// 						options={backgroundColors}
// 						onChange={(selected) =>
// 							handleOptionChange('backgroundColor', selected)
// 						}
// 						title='Цвет фона'
// 					/>
// 					<Select
// 						selected={articleState.contentWidth}
// 						options={contentWidthArr}
// 						onChange={(selected) =>
// 							handleOptionChange('contentWidth', selected)
// 						}
// 						title='Ширина контента'
// 					/>
// 					<div className={styles.bottomContainer}>
// 						<Button title='Сбросить' type='reset' onClick={changeToDefault} />
// 						<Button title='Применить' type='submit' />
// 					</div>
// 				</form>
// 			</aside>
// 		</div>
// 	);
// };

// type ArticleParamsFormProps = {
// 	onApply: (params: ArticleStateType) => void;
// };

// export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
// 	const [articleState, setArticleState] = useState<ArticleStateType>({
// 		fontFamilyOption: defaultArticleState.fontFamilyOption,
// 		fontSizeOption: defaultArticleState.fontSizeOption,
// 		fontColor: defaultArticleState.fontColor,
// 		backgroundColor: defaultArticleState.backgroundColor,
// 		contentWidth: defaultArticleState.contentWidth,
// 	});
// 	const rootRef = useRef<HTMLDivElement>(null);
// 	const [isOpen, setIsOpen] = useState<boolean>(false);

// 	const openForm = () => {
// 		setIsOpen(!isOpen);
// 	};

// 	useOutsideClose({
// 		isOpen,
// 		rootRef,
// 		onChange: setIsOpen,
// 	});

// 	const handleFontFamilyChange = (selected: OptionType) => {
// 		setArticleState({ ...articleState, fontFamilyOption: selected });
// 	};

// 	const handleFontSizeChange = (value: OptionType) => {
// 		setArticleState({ ...articleState, fontSizeOption: value });
// 	};

// 	const handleFontColorChange = (selected: OptionType) => {
// 		setArticleState({ ...articleState, fontColor: selected });
// 	};

// 	const handleBackgroundColorChange = (selected: OptionType) => {
// 		setArticleState({ ...articleState, backgroundColor: selected });
// 	};

// 	const handleContentWidthChange = (selected: OptionType) => {
// 		setArticleState({ ...articleState, contentWidth: selected });
// 	};

// 	const applyChanges = () => {
// 		props.onApply(articleState);
// 	};

// 	const changeToDefault = () => {
// 		setArticleState(defaultArticleState);
// 		props.onApply(defaultArticleState);
// 	};

// 	const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
// 		ev.preventDefault();
// 		applyChanges();
// 	};

// 	return (
// 		<div ref={rootRef}>
// 			<ArrowButton isOpen={isOpen} onClick={openForm} />
// 			<aside
// 				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
// 				<form className={styles.form} onSubmit={onSubmit}>
// 					<Text size={31} weight={800} uppercase align='left'>
// 						Задайте параметры
// 					</Text>
// 					<Select
// 						selected={articleState.fontFamilyOption}
// 						options={fontFamilyOptions}
// 						onChange={handleFontFamilyChange}
// 						title='Шрифт'
// 					/>
// 					<RadioGroup
// 						name='fontSize'
// 						selected={articleState.fontSizeOption}
// 						options={fontSizeOptions}
// 						onChange={handleFontSizeChange}
// 						title='Размер шрифта'
// 					/>
// 					<Select
// 						selected={articleState.fontColor}
// 						options={fontColors}
// 						onChange={handleFontColorChange}
// 						title='Цвет шрифта'
// 					/>
// 					<Separator />
// 					<Select
// 						selected={articleState.backgroundColor}
// 						options={backgroundColors}
// 						onChange={handleBackgroundColorChange}
// 						title='Цвет фона'
// 					/>
// 					<Select
// 						selected={articleState.contentWidth}
// 						options={contentWidthArr}
// 						onChange={handleContentWidthChange}
// 						title='Ширина контента'
// 					/>
// 					<div className={styles.bottomContainer}>
// 						<Button title='Сбросить' type='reset' onClick={changeToDefault} />
// 						<Button title='Применить' type='submit' />
// 					</div>
// 				</form>
// 			</aside>
// 		</div>
// 	);
// };

// type ArticleParamsFormProps = {
// 	onApply: (params: ArticleStateType) => void;
// };

// export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
// 	const [isOpen, setIsOpen] = useState<boolean>(false);
// 	const [fontFamily, setFontFamily] = useState<OptionType>(
// 		defaultArticleState.fontFamilyOption
// 	);
// 	const [fontSize, setFontSize] = useState<OptionType>(
// 		defaultArticleState.fontSizeOption
// 	);
// 	const [fontColor, setFontColor] = useState<OptionType>(
// 		defaultArticleState.fontColor
// 	);
// 	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
// 		defaultArticleState.backgroundColor
// 	);
// 	const [contentWidth, setContentWidth] = useState<OptionType>(
// 		defaultArticleState.contentWidth
// 	);
// 	const rootRef = useRef<HTMLDivElement>(null);

// 	const openForm = () => {
// 		setIsOpen(!isOpen);
// 	};

// 	useOutsideClickClose({
// 		isOpen,
// 		rootRef,
// 		onChange: setIsOpen,
// 	});

// 	const changeFontFamily = (selected: OptionType) => {
// 		setFontFamily(selected);
// 	};

// 	const changeFontSize = (value: OptionType) => {
// 		setFontSize(value);
// 	};

// 	const changeFontColor = (selected: OptionType) => {
// 		setFontColor(selected);
// 	};

// 	const changeBackgroundColor = (selected: OptionType) => {
// 		setBackgroundColor(selected);
// 	};

// 	const changeContentWidth = (selected: OptionType) => {
// 		setContentWidth(selected);
// 	};

// 	const applyChanges = (params: ArticleStateType) => {
// 		props.onApply(params);
// 	};

// 	const changeToDefault = () => {
// 		setFontFamily(defaultArticleState.fontFamilyOption);
// 		setFontSize(defaultArticleState.fontSizeOption);
// 		setFontColor(defaultArticleState.fontColor);
// 		setBackgroundColor(defaultArticleState.backgroundColor);
// 		setContentWidth(defaultArticleState.contentWidth);
// 		applyChanges({
// 			fontFamilyOption: defaultArticleState.fontFamilyOption,
// 			fontSizeOption: defaultArticleState.fontSizeOption,
// 			fontColor: defaultArticleState.fontColor,
// 			backgroundColor: defaultArticleState.backgroundColor,
// 			contentWidth: defaultArticleState.contentWidth,
// 		});
// 	};

// 	const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
// 		ev.preventDefault();
// 		applyChanges({
// 			fontFamilyOption: fontFamily,
// 			fontSizeOption: fontSize,
// 			fontColor: fontColor,
// 			backgroundColor: backgroundColor,
// 			contentWidth: contentWidth,
// 		});
// 	};

// 	return (
// 		<div ref={rootRef}>
// 			<ArrowButton isOpen={isOpen} onClick={openForm} />
// 			<aside
// 				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
// 				<form className={styles.form} onSubmit={onSubmit}>
// 					<Text size={31} weight={800} uppercase align='left'>
// 						Задайте параметры
// 					</Text>
// 					<Select
// 						selected={fontFamily}
// 						options={fontFamilyOptions}
// 						onChange={handleFontFamilyChange}
// 						title='шрифт'
// 					/>
// 					<RadioGroup
// 						name='fontSize'
// 						selected={fontSize}
// 						options={fontSizeOptions}
// 						onChange={changeFontSize}
// 						title='Размер шрифта'
// 					/>
// 					<Select
// 						selected={fontColor}
// 						options={fontColors}
// 						onChange={changeFontColor}
// 						title='Цвет шрифта'
// 					/>
// 					<Separator />
// 					<Select
// 						selected={backgroundColor}
// 						options={backgroundColors}
// 						onChange={changeBackgroundColor}
// 						title='Цвет фона'
// 					/>
// 					<Select
// 						selected={contentWidth}
// 						options={contentWidthArr}
// 						onChange={changeContentWidth}
// 						title='Ширина контента'
// 					/>
// 					<div className={styles.bottomContainer}>
// 						<Button title='Сбросить' type='reset' onClick={changeToDefault} />
// 						<Button title='Применить' type='submit' />
// 					</div>
// 				</form>
// 			</aside>
// 		</div>
// 	);
// };
