import FormField from '@/shared/components/form/FormField'
import PasswordInput from '@/shared/components/form/PasswordInput';
import { OAuthButtonGroup } from './OAuthButtonGroup';
// import { Checkbox } from '@/shared/components/ui/Checkbox';



const inputClass =
    "w-full bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] rounded-[var(--radius-md)] px-3.5 py-2.5 transition-colors duration-150 focus:outline-none focus:border-[var(--brand-purple)] focus:shadow-[var(--shadow-glow-purple)] text-[14px] mt-1.5";
const labelClass = "block text-[14px] font-semibold text-[var(--text-secondary)] mt-4";



const AuthForm = () => {
    return (
        <div>
            <form action="" className="p-4 rounded-b-md bg-bg">
                <FormField
                    label="Full Name"
                    htmlFor="fullName"
                    required
                    className={labelClass}
                >
                    <input
                        id="fullName"
                        type="text"
                        className={inputClass}
                    />
                </FormField>

                <FormField
                    label="Username"
                    htmlFor="username"
                    required
                    className={labelClass}
                >
                    <input
                        id="username"
                        type="text"
                        className={inputClass}
                    />
                </FormField>

                <FormField
                    label="Email"
                    htmlFor="email"
                    required
                    className={labelClass}
                >
                    <input
                        id="email"
                        type="email"
                        className={inputClass}
                    />
                </FormField>

                <FormField
                    label="Password"
                    htmlFor="password"
                    required
                    className={labelClass}
                >
                    <PasswordInput className='mt-1.5' />
                </FormField>
                {/* <Checkbox /> */}


            </form>

            <OAuthButtonGroup />
        </div>
    )
}

export default AuthForm