import { Link } from 'react-router-dom'

const MinFooter = () => {
    return (
        <div>
            <footer className="border-t border-(--dborder) bg-(--dsurface) px-6 py-6 text-center md:px-10">
                <span className="text-(length:--fs-xs) text-(--dtext-muted)">
                    © 2026 Sangum. All rights reserved. ·{" "}
                    <Link to="terms" className="hover:text-(--dtext) hover:underline">
                        Terms of Service
                    </Link>{" "}
                    ·{" "}
                    <Link to="/privacy" className="hover:text-(--dtext) hover:underline">
                        Privacy Policy
                    </Link>
                </span>
            </footer>
        </div>
    )
}

export default MinFooter