import { Navbar } from "./Navbar/Navbar"

export const HeroSection=({ isSearchOpen , setIsSearchOpen }:{
    isSearchOpen?:boolean | undefined,
    setIsSearchOpen?:React.Dispatch<React.SetStateAction<boolean>>
})=>{

    return (
        <div className="bg-[url(/images/home.png)] bg-cover bg-center bg-no-repeat h-screen">
                    <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
        </div>
    )
}