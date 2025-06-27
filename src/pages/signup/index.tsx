import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form"
import Loader from "../../shared/Loader";

const MYBACKEND_BASEURL = import.meta.env.VITE_BASE_URL

type FormFields = {
    username: string
    email: string
    password: string
}

// type RegisterRequestBody = FormFields

export default function SignupPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<FormFields>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const emailFieldRegistration = register("email", {
        required: "email is required",
        validate: (value) => {
            if (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/g)) return true;
            return "please enter valid email address"
        }
    });

    const passwordFieldRegistration = register("password", {
        required: "password is required",
        minLength: {
            value: 8,
            message: "password must have at least 8 characters"
        }
    });

    const usernameFieldRegistration = register("username", {
        required: "name is required",
        minLength: {
            value: 2,
            message: "name should be at least 2 characters"
        }
    })


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // this func will not run, unless the validation given is passed
        try {
            const response = await fetch(MYBACKEND_BASEURL + "/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.message);
            const token = resData.data.token;
            localStorage.setItem("token", token);
            location.reload()
        } catch (error) {
            let msg = "An unknown error occured";
            if (error instanceof Error) {
                msg = error.message;
            };
            setError("root", { message: msg })
        }
    }

    return (
        <div className="h-dvh flex justify-center items-center">

            <div className="bg-surface border border-border rounded-md p-4">
                <h1 className="text-2xl font-medium mb-10 text-center">Create new account</h1>
                <div>
                    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="usernameInput" className="font-medium">Full name</label>
                            </div>
                            <div>
                                <input id="usernameInput" type="text" placeholder="Enter your name" className="focus:outline-none outline outline-border p-2 rounded-sm min-w-[250px] border-b border-b-transparent focus:border-b-border" {...usernameFieldRegistration} />
                            </div>
                            {errors.username && <div className="text-xs text-danger">{errors.username.message}</div>}
                        </div>
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="emailInput" className="font-medium">Email</label>
                            </div>
                            <div>
                                <input id="emailInput" type="email" placeholder="Enter you email" className="focus:outline-none outline outline-border p-2 rounded-sm min-w-[250px] border-b border-b-transparent focus:border-b-border" {...emailFieldRegistration} />
                            </div>
                            {errors.email && <div className="text-xs text-danger">{errors.email.message}</div>}
                        </div>
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="passInput" className="font-medium">Password</label>
                            </div>
                            <div>
                                <input id="passInput" type="password" placeholder="Enter password" className="focus:outline-none outline outline-border p-2 rounded-sm min-w-[250px] border-b border-b-transparent focus:border-b-border" {...passwordFieldRegistration} />
                            </div>
                            {errors.password && <div className="text-xs text-danger">{errors.password.message}</div>}
                        </div>
                        <div>
                            <button disabled={isSubmitting} type="submit" className="relative h-10 p-1.5 w-full bg-primary-light text-on-primary font-medium border-2 border-transparent rounded-md hover:bg-transparent hover:border-primary-light hover:text-primary-light cursor-pointer transition-colors">
                                {
                                    isSubmitting
                                        ? <Loader size={20} styles="mx-auto" />
                                        : "sign up"
                                }
                            </button>
                        </div>
                        {errors.root && <div className="text-xs text-danger text-center">{errors.root.message}</div>}
                    </form>
                </div>
                <div className="mt-2 text-sm font-normal ">
                    Already have accout? <Link to={"/login"} className="text-blue-800 hover:underline">login</Link>
                </div>
            </div>

        </div>
    )
}