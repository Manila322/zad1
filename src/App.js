import React, { useState, useRef, useEffect } from 'react';
import styles from './App.module.css';

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	});
	const [error, setError] = useState(null);
	const registerButtonRef = useRef(null);

	const handleInputChange = ({ target }) => {
		const { name, value } = target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const validateFields = () => {
		if (!/\S+@\S+\.\S+/.test(formData.email)) {
			return 'Некорректный email';
		}
		if (!/^[\w_]*$/.test(formData.password)) {
			return 'Пароль должен содержать только буквы и цифры';
		}
		if (formData.password.length < 5) {
			return 'Пароль должен содержать минимум 5 символов';
		}
		if (formData.password !== formData.repeatPassword) {
			return 'Пароли не совпадают';
		}
		return null;
	};

	const checkAndSetError = () => {
		const validationError = validateFields();
		setError(validationError);
		return validationError;
	};

	const onPasswordRepeatBlur = () => {
		checkAndSetError();
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const validationError = checkAndSetError();
		if (!validationError) {
			sendData(formData);
			resetForm();
		}
	};

	const resetForm = () => {
		setFormData({
			email: '',
			password: '',
			repeatPassword: '',
		});
		setError(null);
	};

	useEffect(() => {
		if (
			!error &&
			formData.password &&
			formData.repeatPassword &&
			formData.password === formData.repeatPassword
		) {
			registerButtonRef.current.focus();
		}
	}, [error, formData.password, formData.repeatPassword]);

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				{error && <div className={styles.errorLabel}>{error}</div>}
				<input
					name="email"
					type="email"
					value={formData.email}
					placeholder="Почта"
					onChange={handleInputChange}
				/>
				<input
					name="password"
					type="password"
					value={formData.password}
					placeholder="Пароль"
					onChange={handleInputChange}
				/>
				<input
					name="repeatPassword"
					type="password"
					value={formData.repeatPassword}
					placeholder="Повторите пароль"
					onChange={handleInputChange}
					onBlur={onPasswordRepeatBlur}
				/>
				<button
					ref={registerButtonRef}
					type="submit"
					disabled={
						formData.password.length < 5 ||
						formData.password === '' ||
						formData.repeatPassword === ''
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
