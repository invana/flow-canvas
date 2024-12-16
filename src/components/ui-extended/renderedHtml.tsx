import React from "react"


interface RenderedHTMLProps {
    html: string | React.ReactNode;
    className?: string
}

const RenderedHTML = ({ html, className }: RenderedHTMLProps) => {
    if (typeof html === "string") {
        return <div className={className || ""} dangerouslySetInnerHTML={{ __html: html || "" }} />
    } else {
        return html
    }
}

export default RenderedHTML