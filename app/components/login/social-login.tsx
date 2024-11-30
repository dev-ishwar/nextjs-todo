import { doSocialLogin } from "@/app/lib/actions/auth-actions";
import { buttonStyle } from "@/app/lib/styles";

export default function SocialLogin() {
    return (
        <form action={doSocialLogin} >
            <div
                className="flex gap-5 justify-center items-center"
            >
                <button type="submit" name="action" value="google" className={buttonStyle}>
                    Sign In with Google
                </button>
                <button type="submit" name="action" value="github" className={buttonStyle} >
                    Sign In with Github
                </button>
            </div>
        </form>
    )
}