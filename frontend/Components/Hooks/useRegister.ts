import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';

export default function useRegister() {
	const router = useRouter();
	const [errors, setErrors] = useState();
	const [register, { isLoading }] = useRegisterMutation();

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		re_password: '',
	});

	const { username, email, password, re_password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("reg data>> ",{ username, email, password, re_password });
		
		register({ username, email, password, re_password })
			.unwrap()
			.then(() => {
				toast.success('Please check email to verify account');
				router.push('/auth/login');
			})
			.catch((err:any) => {
				toast.error('Failed to register account');
				setErrors(err?.data);
			});
	};

	return {
		username,
		email,
		password,
		re_password,
		isLoading,
		onChange,
		onSubmit,
		errors
	};
}