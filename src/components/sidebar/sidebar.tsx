export default function Sidebar({className, children}:{className?: string, children?: any}){
    return(
        <aside 
            className={`flex justify-center w-1/4 px-4 bg-white/50  backdrop-blur-lg  blur-9.8 border border-opacity-45 ${className}`}>
                {children}
        </aside>
    );
}