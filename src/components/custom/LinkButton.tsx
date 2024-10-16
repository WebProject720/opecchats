'use client'
import Link from "next/link";
import React, { forwardRef } from "react";

interface ButtonProps {
    className?: string,
    url?: any,
    text?: any
}
export const LinkButton = forwardRef<HTMLAnchorElement, ButtonProps>((
    { className, url, text, ...props }, ref: any) => {
    return (
        <div
            className={`
            text-black bg-white hover:bg-black hover:text-white 
                            p-3 rounded-full transition-all duration-500
                             text-center align-middle flex justify-center items-center
             ${className}`}
            {...props}
        >
            <Link href={url || '#'}>
                {text || '-->'}
            </Link>
        </div>
    )
})

