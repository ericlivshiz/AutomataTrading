import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const Header = ({children, className} : HeaderProps) => 
{
    return(
        <div className={cn("header", className)}>
            <Link href='/' className="md:flex-1">
                <Image 
                src="/assets/icons/atlogo2.svg"
                alt="Logo with name"
                width={150}
                height={32}
                className="hidden md:block"
                />
                <Image 
                src="/assets/icons/atlogo-icon.svg"
                alt="Logo"
                width={80}
                height={80}
                className="mr-2 md:hidden"
                />
            </Link>
            {children}
        </div>
    )
}

export default Header