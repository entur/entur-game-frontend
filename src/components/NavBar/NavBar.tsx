import Link from 'next/link'
import Image from 'next/image'
import EnturPartnerIconDark from '@/lib/assets/icons/EnturPartnerDark.svg'
import { AdminNavBar } from '@/components/NavBar/AdminNavBar'

export default function NavBar({ admin = false }: { admin: boolean }) {
    return (
        <div className="flex items-center pt-10 pb-12 ml-5 pl-12">
            <Link href="/" className="mr-20">
                <Image
                    className="cursor-pointer"
                    src={EnturPartnerIconDark}
                    alt="entur partner"
                />
            </Link>
            {admin && <AdminNavBar />}
        </div>
    )
}
