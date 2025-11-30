import { Song } from "./song";
import tracksList from "../assets/tracksList";

export const SongList = ({songs}) =>{
    return(
        <div className="flex flex-col gap-2 p-5 rounded-2xl mt-5 bg-[#383E43]">
            {songs.map((track)=>{
                return <Song key={track.id} {...track}/>
            })}
        </div>
    )
}