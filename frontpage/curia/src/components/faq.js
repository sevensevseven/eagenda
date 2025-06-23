import { getFAQ } from "@/util"
import Dropdown from "./dropdown"

export default function FAQ() {
    return (
        <div className="my-8" id ="faq">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Suntem aici pentru a te ajuta!</h1>
            <div className="grid grid-cols-1">
                {getFAQ().map((item, index) => (
                    <Dropdown key={index} title={item.title} answer={item.answer} />
                ))}
            </div>
        </div>
    )
}