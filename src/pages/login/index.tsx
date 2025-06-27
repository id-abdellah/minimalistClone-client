import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form"
import Loader from "../../shared/Loader";

const MYBACKEND_BASEURL = import.meta.env.VITE_BASE_URL

type FormFields = {
    email: string,
    password: string
}

export default function LoginPage() {

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


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // this func will not run, unless the validation given is passed
        try {
            const response = await fetch(MYBACKEND_BASEURL + "/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.message)

            const token = resData.data.token;
            localStorage.setItem("token", token);
            location.reload();
        } catch (error) {
            console.log(error)
            let msg = "An unknown error occured";
            if (error instanceof Error) {
                msg = error.message;
            }
            setError("root", { message: msg })
        }
    }

    return (
        <div className="h-dvh flex justify-center items-center">

            <div className="bg-surface border border-border rounded-md p-4">
                <h1 className="text-2xl font-medium mb-10 text-center">Welcome back</h1>
                <div>
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
                                        : "login"
                                }
                            </button>
                        </div>
                        {errors.root && <div className="text-xs text-danger text-center">{errors.root.message}</div>}
                    </form>
                </div>
                <div className="mt-2 text-sm font-normal ">
                    Don't have account? <Link to={"/signup"} className="text-blue-800 hover:underline">sign up</Link>
                </div>
            </div>

        </div>
    )
}