export function ChatSkeleton(){
    return(
        <div className={`relative w-full h-full overflow-hidden md:col-span-4 pt-10`}>
            <div className="flex w-full h-full flex-col gap-4 px-2 pt-4 pb-24">    
                <div className="animate-pulse w-5/12 min-h-[4rem] rounded-2xl p-3 self-end rounded-br-none bg-secondary"/>
                <div className="animate-pulse w-8/12 min-h-[4rem] rounded-2xl p-3 self-start rounded-bl-none bg-secondary"/>
                <div className="animate-pulse w-5/12 min-h-[4rem] rounded-2xl p-3 self-end rounded-br-none bg-secondary"/>
                <div className="animate-pulse w-8/12 min-h-[4rem] rounded-2xl p-3 self-start rounded-bl-none bg-secondary"/>  
            </div>
            <div className="sticky bottom-0 w-full bg-background">
                <div className="mx-auto w-8/12 p-4">         
                    <div className="animate-pulse min-h-[4rem] rounded-full bg-secondary p-1"/>
                </div>
            </div>
    </div>
    )
}