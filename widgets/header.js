import { Search } from "./search"
import Image from "next/image"
import logo from "../public/logo.svg"

export const Header = ({functionSearchHeader}) =>{
    return(
        <div className="bg-[#86C232] rounded-b-[15px] px-[23px] py-3.5 flex items-center justify-between" >
            <Image alt="logo" src={logo}/>
            <Search functionSearch={functionSearchHeader}/>
        </div>
    )
}